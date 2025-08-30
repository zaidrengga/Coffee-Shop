import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const basePrice =
    product.variants && product.variants.length > 0
      ? Math.min(...product.variants.map((v) => product.price + v.price_modifier))
      : product.price

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image_url || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">Featured</Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
            {/* Promotional notice: site is informational only */}
            <p className="text-xs text-muted-foreground mt-2 italic">This site is for promotion only — purchases are not handled here.</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.review_count})</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">
                  ${basePrice.toFixed(2)}
                  {product.variants && product.variants.length > 0 && (
                    <span className="text-sm text-muted-foreground">+</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
