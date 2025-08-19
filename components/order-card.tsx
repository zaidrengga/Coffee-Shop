import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OrderStatusBadge } from "@/components/order-status-badge"
import { ArrowRight } from "lucide-react"
import type { Order } from "@/lib/types"

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getItemCount = () => {
    return order.order_items?.reduce((total, item) => total + item.quantity, 0) || 0
  }

  const getFirstFewItems = () => {
    return order.order_items?.slice(0, 3) || []
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Order #{order.id.slice(-8)}</p>
            <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items Preview */}
        <div className="space-y-2">
          {getFirstFewItems().map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src={item.product?.image_url || "/placeholder.svg?height=40&width=40"}
                  alt={item.product?.name || "Product"}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.product?.name}</p>
                {item.variant && <p className="text-xs text-muted-foreground">{item.variant.name}</p>}
              </div>
              <p className="text-sm text-muted-foreground">×{item.quantity}</p>
            </div>
          ))}
          {(order.order_items?.length || 0) > 3 && (
            <p className="text-sm text-muted-foreground">
              +{(order.order_items?.length || 0) - 3} more item{(order.order_items?.length || 0) - 3 !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <p className="text-sm text-muted-foreground">{getItemCount()} items</p>
            <p className="font-semibold">${order.total_amount.toFixed(2)}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/orders/${order.id}`}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
