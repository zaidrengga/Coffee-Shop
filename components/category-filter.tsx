"use client"

import { Button } from "@/components/ui/button"
import type { Category } from "@/lib/types"
import { useRouter, useSearchParams } from "next/navigation"

interface CategoryFilterProps {
  categories: Category[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get("category")

  const handleCategoryChange = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (categoryId) {
      params.set("category", categoryId)
    } else {
      params.delete("category")
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={!selectedCategory ? "default" : "outline"}
        onClick={() => handleCategoryChange(null)}
        className="rounded-full"
      >
        All Products
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => handleCategoryChange(category.id)}
          className="rounded-full"
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}
