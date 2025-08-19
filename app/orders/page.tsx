import { getUserOrders } from "@/lib/order-actions"
import { OrderCard } from "@/components/order-card"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

export default async function OrdersPage() {
  const orders = await getUserOrders()

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">No orders yet</h1>
            <p className="text-muted-foreground">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Your Orders</h1>
          <p className="text-muted-foreground">Track and manage your coffee orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  )
}
