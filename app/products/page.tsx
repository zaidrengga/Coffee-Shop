import { Suspense } from "react"
import { getProducts, getCategories, getProductPriceRange } from "@/lib/actions"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductsPageProps {
  searchParams: {
    category?: string
    search?: string
    minPrice?: string
    maxPrice?: string
    minRating?: string
    sortBy?: string
    featured?: string
  }
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}

async function ProductsContent({ searchParams }: { searchParams: ProductsPageProps["searchParams"] }) {
  const filters = {
    categoryId: searchParams.category,
    search: searchParams.search,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    minRating: searchParams.minRating ? Number(searchParams.minRating) : undefined,
    sortBy: searchParams.sortBy as any,
    featured: searchParams.featured === "true" ? true : undefined,
  }

  const products = await getProducts(filters)

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {products.length} product{products.length !== 1 ? "s" : ""} found
          {searchParams.search && (
            <span>
              {" "}
              for "<strong>{searchParams.search}</strong>"
            </span>
          )}
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  )
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const [categories, priceRange] = await Promise.all([getCategories(), getProductPriceRange()])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Our Products</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of premium coffee beans, expertly crafted beverages, and delicious
            pastries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-4">
            <ProductFilters categories={categories} priceRange={priceRange} />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-4">
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductsContent searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
