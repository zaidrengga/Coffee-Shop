"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

export function CartButton() {
  const [itemCount, setItemCount] = useState(0)

  // This would typically be connected to a cart context or state management
  // For now, we'll use a simple counter that updates on page load
  useEffect(() => {
    // TODO: Connect to actual cart state
    setItemCount(0)
  }, [])

  return (
    <Button variant="outline" size="sm" asChild className="relative bg-transparent">
      <Link href="/cart">
        <ShoppingCart className="h-4 w-4" />
        {itemCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
            {itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  )
}
