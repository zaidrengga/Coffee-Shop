"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderStatusBadge } from "@/components/order-status-badge"
import { ArrowLeft, RotateCcw } from "lucide-react"
import { getOrder, cancelOrder, reorderItems } from "@/lib/order-actions"
import { toast } from "sonner"
import type { Order } from "@/lib/types"

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCancelling, setIsCancelling] = useState(false)
  const [isReordering, setIsReordering] = useState(false)

  useEffect(() => {
    const fetchOrder = async () => {
      if (params.id) {
        const orderData = await getOrder(params.id as string)
        setOrder(orderData)
      }
      setIsLoading(false)
    }

    fetchOrder()
  }, [params.id])

  const handleCancelOrder = async () => {
    if (!order) return

    setIsCancelling(true)
    const result = await cancelOrder(order.id)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Order cancelled successfully")
      // Refresh order data
      const updatedOrder = await getOrder(order.id)
      setOrder(updatedOrder)
    }

    setIsCancelling(false)
  }

  const handleReorder = async () => {
    if (!order) return

    setIsReordering(true)
    const result = await reorderItems(order.id)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Items added to cart")
      router.push("/cart")
    }

    setIsReordering(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const canCancelOrder = order && ["pending", "confirmed"].includes(order.status)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h1 className="text-3xl font-bold">Order not found</h1>
          <p className="text-muted-foreground">
            The order you're looking for doesn't exist or you don't have access to it.
          </p>
          <Button asChild>
            <Link href="/orders">Back to Orders</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </Button>
        </div>

        {/* Order Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Order #{order.id.slice(-8)}</h1>
              <p className="text-muted-foreground">Placed on {formatDate(order.created_at)}</p>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>

          <div className="flex gap-4">
            {canCancelOrder && (
              <Button variant="outline" onClick={handleCancelOrder} disabled={isCancelling}>
                {isCancelling ? "Cancelling..." : "Cancel Order"}
              </Button>
            )}
            <Button variant="outline" onClick={handleReorder} disabled={isReordering}>
              <RotateCcw className="h-4 w-4 mr-2" />
              {isReordering ? "Adding to Cart..." : "Reorder"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.order_items?.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.product?.image_url || "/placeholder.svg?height=64&width=64"}
                        alt={item.product?.name || "Product"}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">{item.product?.name}</h3>
                      {item.variant && <p className="text-sm text-muted-foreground">Size: {item.variant.name}</p>}
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${item.total_price.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">${item.unit_price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Delivery */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.total_amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${order.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {order.delivery_address && (
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-medium">
                    {order.delivery_address.firstName} {order.delivery_address.lastName}
                  </p>
                  <p className="text-muted-foreground">{order.delivery_address.address}</p>
                  <p className="text-muted-foreground">
                    {order.delivery_address.city}, {order.delivery_address.postalCode}
                  </p>
                  <p className="text-muted-foreground">{order.delivery_address.phone}</p>
                  {order.delivery_address.notes && (
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium">Special Instructions:</p>
                      <p className="text-sm text-muted-foreground">{order.delivery_address.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
