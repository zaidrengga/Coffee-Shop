export interface Category {
  id: string
  name: string
  description: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category_id: string | null
  in_stock: boolean
  featured: boolean
  rating: number
  review_count: number
  created_at: string
  updated_at: string
  category?: Category
  variants?: ProductVariant[]
}

export interface ProductVariant {
  id: string
  product_id: string
  name: string
  price_modifier: number
  created_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  variant_id: string | null
  quantity: number
  created_at: string
  updated_at: string
  product?: Product
  variant?: ProductVariant
}

export interface Order {
  id: string
  user_id: string
  status: "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled"
  total_amount: number
  delivery_address: any
  payment_status: "pending" | "paid" | "failed"
  created_at: string
  updated_at: string
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  variant_id: string | null
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
  product?: Product
  variant?: ProductVariant
}
