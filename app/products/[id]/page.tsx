import { notFound } from "next/navigation"
import Image from "next/image"
import { getProduct } from "@/lib/actions"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface ProductPageProps {
  params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="max-w-md rounded-md overflow-hidden mx-auto">
          <Image src={product.image_url || ""} alt={product.name} width={500} height={500} className="w-full h-auto aspect-square overflow-hidden" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground">{product.description}</p>
          <p>{product.category?.description}</p>
          <div className="flex items-center gap-2">
            <Badge>
              {product.category?.name}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">${product.price}</p>
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.review_count})</span>
          </div>
        </div>
      </div>
    </div>
  )
}
