"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { CartItem } from "@/lib/types"

export async function addToCart(productId: string, variantId: string | null, quantity = 1) {
  const supabase = createClient()

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: "Please sign in to add items to cart" }
  }

  // Check if item already exists in cart
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .eq("variant_id", variantId)
    .single()

  if (existingItem) {
    // Update quantity
    const { error } = await supabase
      .from("cart_items")
      .update({
        quantity: existingItem.quantity + quantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingItem.id)

    if (error) {
      return { error: "Failed to update cart" }
    }
  } else {
    // Add new item
    const { error } = await supabase.from("cart_items").insert({
      user_id: user.id,
      product_id: productId,
      variant_id: variantId,
      quantity,
    })

    if (error) {
      return { error: "Failed to add to cart" }
    }
  }

  revalidatePath("/cart")
  return { success: true }
}

export async function updateCartItemQuantity(cartItemId: string, quantity: number) {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: "Unauthorized" }
  }

  if (quantity <= 0) {
    return removeFromCart(cartItemId)
  }

  const { error } = await supabase
    .from("cart_items")
    .update({
      quantity,
      updated_at: new Date().toISOString(),
    })
    .eq("id", cartItemId)
    .eq("user_id", user.id)

  if (error) {
    return { error: "Failed to update cart" }
  }

  revalidatePath("/cart")
  return { success: true }
}

export async function removeFromCart(cartItemId: string) {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId).eq("user_id", user.id)

  if (error) {
    return { error: "Failed to remove from cart" }
  }

  revalidatePath("/cart")
  return { success: true }
}

export async function getCartItems(): Promise<CartItem[]> {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return []
  }

  const { data, error } = await supabase
    .from("cart_items")
    .select(`
      *,
      product:products(*,
        category:categories(*)
      ),
      variant:product_variants(*)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching cart items:", error)
    return []
  }

  return data || []
}

export async function clearCart() {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase.from("cart_items").delete().eq("user_id", user.id)

  if (error) {
    return { error: "Failed to clear cart" }
  }

  revalidatePath("/cart")
  return { success: true }
}

export async function createOrder(deliveryAddress: any) {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: "Please sign in to place an order" }
  }

  // Get cart items
  const cartItems = await getCartItems()

  if (cartItems.length === 0) {
    return { error: "Cart is empty" }
  }

  // Calculate total
  const totalAmount = cartItems.reduce((total, item) => {
    const basePrice = item.product?.price || 0
    const variantPrice = item.variant?.price_modifier || 0
    return total + (basePrice + variantPrice) * item.quantity
  }, 0)

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      total_amount: totalAmount,
      delivery_address: deliveryAddress,
      status: "pending",
    })
    .select()
    .single()

  if (orderError) {
    return { error: "Failed to create order" }
  }

  // Create order items
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    variant_id: item.variant_id,
    quantity: item.quantity,
    unit_price: (item.product?.price || 0) + (item.variant?.price_modifier || 0),
    total_price: ((item.product?.price || 0) + (item.variant?.price_modifier || 0)) * item.quantity,
  }))

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

  if (itemsError) {
    return { error: "Failed to create order items" }
  }

  // Clear cart
  await clearCart()

  revalidatePath("/orders")
  return { success: true, orderId: order.id }
}
