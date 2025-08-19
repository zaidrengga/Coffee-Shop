"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addToCart } from "@/lib/cart-actions"
import { toast } from "sonner"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleAddToCart = async () => {
    setIsLoading(true)

    const result = await addToCart(product.id, selectedVariant, quantity)

    if (result.error) {
      if (result.error === "Please sign in to add items to cart") {
        toast.error("Please sign in to add items to cart")
        router.push(`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`)
      } else {
        toast.error(result.error)
      }
    } else {
      toast.success(`Added ${quantity} ${product.name} to cart`)
    }

    setIsLoading(false)
  }

  const getPrice = () => {
    const basePrice = product.price
    const variantPrice = selectedVariant
      ? product.variants?.find((v) => v.id === selectedVariant)?.price_modifier || 0
      : 0
    return basePrice + variantPrice
  }

  return (
    <div className="space-y-4">
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-2">
          <label className="font-medium">Size:</label>
          <Select value={selectedVariant || ""} onValueChange={setSelectedVariant}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {product.variants.map((variant) => (
                <SelectItem key={variant.id} value={variant.id}>
                  {variant.name} (+${variant.price_modifier.toFixed(2)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-center gap-3">
        <span className="font-medium">Quantity:</span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button
        onClick={handleAddToCart}
        disabled={
          !product.in_stock || isLoading || (product.variants && product.variants.length > 0 && !selectedVariant)
        }
        className="w-full"
        size="lg"
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        {isLoading ? "Adding..." : `Add to Cart - $${(getPrice() * quantity).toFixed(2)}`}
      </Button>
    </div>
  )
}
