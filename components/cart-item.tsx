"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Minus, Trash2 } from "lucide-react"
import { updateCartItemQuantity, removeFromCart } from "@/lib/cart-actions"
import { toast } from "sonner"
import type { CartItem as CartItemType } from "@/lib/types"

interface CartItemProps {
  item: CartItemType
}

export function CartItemComponent({ item }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = async (newQuantity: number) => {
    setIsUpdating(true)
    const result = await updateCartItemQuantity(item.id, newQuantity)

    if (result.error) {
      toast.error(result.error)
    }

    setIsUpdating(false)
  }

  const handleRemove = async () => {
    setIsUpdating(true)
    const result = await removeFromCart(item.id)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Item removed from cart")
    }

    setIsUpdating(false)
  }

  const getItemPrice = () => {
    const basePrice = item.product?.price || 0
    const variantPrice = item.variant?.price_modifier || 0
    return basePrice + variantPrice
  }

  const getTotalPrice = () => {
    return getItemPrice() * item.quantity
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={item.product?.image_url || "/placeholder.svg?height=80&width=80"}
              alt={item.product?.name || "Product"}
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{item.product?.name}</h3>
                {item.variant && <p className="text-sm text-muted-foreground">Size: {item.variant.name}</p>}
                <p className="text-sm font-medium">${getItemPrice().toFixed(2)} each</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                disabled={isUpdating}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1 || isUpdating}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={isUpdating}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-right">
                <p className="font-bold">${getTotalPrice().toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
