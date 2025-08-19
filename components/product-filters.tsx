"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Filter } from "lucide-react"
import type { Category } from "@/lib/types"

interface ProductFiltersProps {
  categories: Category[]
  priceRange: { min: number; max: number }
}

export function ProductFilters({ categories, priceRange }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [priceMin, setPriceMin] = useState(Number(searchParams.get("minPrice")) || priceRange.min)
  const [priceMax, setPriceMax] = useState(Number(searchParams.get("maxPrice")) || priceRange.max)
  const [minRating, setMinRating] = useState(Number(searchParams.get("minRating")) || 0)
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "default")
  const [featuredOnly, setFeaturedOnly] = useState(searchParams.get("featured") === "true")

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (selectedCategory !== "all") params.set("category", selectedCategory)
    if (searchQuery.trim()) params.set("search", searchQuery.trim())
    if (priceMin > priceRange.min) params.set("minPrice", priceMin.toString())
    if (priceMax < priceRange.max) params.set("maxPrice", priceMax.toString())
    if (minRating > 0) params.set("minRating", minRating.toString())
    if (sortBy !== "default") params.set("sortBy", sortBy)
    if (featuredOnly) params.set("featured", "true")

    router.push(`/products?${params.toString()}`)
    setIsOpen(false)
  }

  const clearFilters = () => {
    setSelectedCategory("all")
    setSearchQuery("")
    setPriceMin(priceRange.min)
    setPriceMax(priceRange.max)
    setMinRating(0)
    setSortBy("default")
    setFeaturedOnly(false)
    router.push("/products")
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (selectedCategory !== "all") count++
    if (searchQuery.trim()) count++
    if (priceMin > priceRange.min || priceMax < priceRange.max) count++
    if (minRating > 0) count++
    if (sortBy !== "default") count++
    if (featuredOnly) count++
    return count
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary" className="ml-1">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </Button>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className={`space-y-6 ${isOpen ? "block" : "hidden"}`}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Filters
              {getActiveFiltersCount() > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <Label>Search</Label>
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <Label>Price Range</Label>
              <div className="px-2">
                <Slider
                  value={[priceMin, priceMax]}
                  onValueChange={([min, max]) => {
                    setPriceMin(min)
                    setPriceMax(max)
                  }}
                  min={priceRange.min}
                  max={priceRange.max}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>${priceMin}</span>
                <span>-</span>
                <span>${priceMax}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label>Minimum Rating</Label>
              <Select value={minRating.toString()} onValueChange={(value) => setMinRating(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any Rating</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Featured Only */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={featuredOnly}
                onChange={(e) => setFeaturedOnly(e.target.checked)}
                className="rounded border-border"
              />
              <Label htmlFor="featured">Featured products only</Label>
            </div>

            <Button onClick={applyFilters} className="w-full">
              Apply Filters
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
