import { notFound } from "next/navigation"
import Image from "next/image"
import { getProduct } from "@/lib/actions"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { AddToCartButton } from "@/components/add-to-cart-button"

interface ProductPageProps {
  params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.image_url || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.featured && (
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">Featured</Badge>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.review_count} reviews)</span>
              </div>
              {product.category && <Badge variant="outline">{product.category.name}</Badge>}
            </div>
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed">{product.description}</p>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                  <Badge variant={product.in_stock ? "default" : "destructive"}>
                    {product.in_stock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>

                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold">Size Options:</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {product.variants.map((variant) => (
                        <Button key={variant.id} variant="outline" className="flex flex-col h-auto p-3 bg-transparent">
                          <span className="font-medium">{variant.name}</span>
                          <span className="text-sm text-muted-foreground">+${variant.price_modifier.toFixed(2)}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <AddToCartButton product={product} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
