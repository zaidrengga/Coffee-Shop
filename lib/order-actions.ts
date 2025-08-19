"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Order } from "@/lib/types"

export async function getUserOrders(): Promise<Order[]> {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return []
  }

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items:order_items(*,
        product:products(*,
          category:categories(*)
        ),
        variant:product_variants(*)
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user orders:", error)
    return []
  }

  return data || []
}

export async function getOrder(orderId: string): Promise<Order | null> {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return null
  }

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items:order_items(*,
        product:products(*,
          category:categories(*)
        ),
        variant:product_variants(*)
      )
    `)
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single()

  if (error) {
    console.error("Error fetching order:", error)
    return null
  }

  return data
}

export async function cancelOrder(orderId: string) {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: "Unauthorized" }
  }

  // Check if order can be cancelled (only pending or confirmed orders)
  const { data: order, error: fetchError } = await supabase
    .from("orders")
    .select("status")
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single()

  if (fetchError || !order) {
    return { error: "Order not found" }
  }

  if (!["pending", "confirmed"].includes(order.status)) {
    return { error: "Order cannot be cancelled at this stage" }
  }

  const { error } = await supabase
    .from("orders")
    .update({
      status: "cancelled",
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .eq("user_id", user.id)

  if (error) {
    return { error: "Failed to cancel order" }
  }

  revalidatePath("/orders")
  return { success: true }
}

export async function reorderItems(orderId: string) {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: "Unauthorized" }
  }

  // Get order items
  const { data: orderItems, error: fetchError } = await supabase
    .from("order_items")
    .select("product_id, variant_id, quantity")
    .eq("order_id", orderId)

  if (fetchError || !orderItems) {
    return { error: "Order not found" }
  }

  // Add items to cart
  for (const item of orderItems) {
    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", item.product_id)
      .eq("variant_id", item.variant_id)
      .single()

    if (existingItem) {
      // Update quantity
      await supabase
        .from("cart_items")
        .update({
          quantity: existingItem.quantity + item.quantity,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingItem.id)
    } else {
      // Add new item
      await supabase.from("cart_items").insert({
        user_id: user.id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: item.quantity,
      })
    }
  }

  revalidatePath("/cart")
  return { success: true }
}
