import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, Truck, Coffee, XCircle } from "lucide-react"

interface OrderStatusBadgeProps {
  status: "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled"
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: "Pending",
      variant: "secondary" as const,
      icon: Clock,
    },
    confirmed: {
      label: "Confirmed",
      variant: "default" as const,
      icon: CheckCircle,
    },
    preparing: {
      label: "Preparing",
      variant: "default" as const,
      icon: Coffee,
    },
    ready: {
      label: "Ready",
      variant: "default" as const,
      icon: Truck,
    },
    completed: {
      label: "Completed",
      variant: "default" as const,
      icon: CheckCircle,
    },
    cancelled: {
      label: "Cancelled",
      variant: "destructive" as const,
      icon: XCircle,
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  )
}
