"use server"

import { createClient } from "@/lib/supabase/server"
import type { Product, Category } from "@/lib/types"

interface ProductFilters {
  categoryId?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  sortBy?: "name" | "price_asc" | "price_desc" | "rating" | "newest"
  featured?: boolean
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const supabase = await createClient()

  let query = supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      variants:product_variants(*)
    `)
    .eq("in_stock", true)

  // Apply filters
  if (filters.categoryId) {
    // Check if it's a UUID (contains hyphens) or a slug
    if (filters.categoryId.includes("-") && filters.categoryId.length === 36) {
      // It's a UUID
      query = query.eq("category_id", filters.categoryId)
    } else {
      // It's a slug, convert to category name and filter by joining categories
      const categoryName = filters.categoryId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      // Get category ID first
      const { data: categories } = await supabase.from("categories").select("id").ilike("name", categoryName).limit(1)

      if (categories && categories.length > 0) {
        query = query.eq("category_id", categories[0].id)
      } else {
        // No matching category found, return empty results
        return []
      }
    }
  }

  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  if (filters.minPrice !== undefined) {
    query = query.gte("price", filters.minPrice)
  }

  if (filters.maxPrice !== undefined) {
    query = query.lte("price", filters.maxPrice)
  }

  if (filters.minRating !== undefined) {
    query = query.gte("rating", filters.minRating)
  }

  if (filters.featured !== undefined) {
    query = query.eq("featured", filters.featured)
  }

  // Apply sorting
  switch (filters.sortBy) {
    case "name":
      query = query.order("name", { ascending: true })
      break
    case "price_asc":
      query = query.order("price", { ascending: true })
      break
    case "price_desc":
      query = query.order("price", { ascending: false })
      break
    case "rating":
      query = query.order("rating", { ascending: false })
      break
    case "newest":
      query = query.order("created_at", { ascending: false })
      break
    default:
      query = query.order("featured", { ascending: false }).order("created_at", { ascending: false })
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data || []
}

export async function getProduct(id: string): Promise<Product | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      variants:product_variants(*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data || []
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      variants:product_variants(*)
    `)
    .eq("featured", true)
    .eq("in_stock", true)
    .order("rating", { ascending: false })
    .limit(6)

  if (error) {
    console.error("Error fetching featured products:", error)
    return []
  }

  return data || []
}

export async function searchProducts(searchTerm: string): Promise<Product[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      variants:product_variants(*)
    `)
    .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .eq("in_stock", true)
    .order("featured", { ascending: false })
    .order("rating", { ascending: false })
    .limit(10)

  if (error) {
    console.error("Error searching products:", error)
    return []
  }

  return data || []
}

export async function getProductPriceRange(): Promise<{ min: number; max: number }> {
  const supabase =  await createClient()

  const { data, error } = await supabase
    .from("products")
    .select("price")
    .eq("in_stock", true)
    .order("price", { ascending: true })

  if (error || !data || data.length === 0) {
    return { min: 0, max: 100 }
  }

  const prices = data.map((p) => p.price)
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  }
}
