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