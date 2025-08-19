import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Coffee, Leaf, Award, Clock } from "lucide-react"
import { getFeaturedProducts } from "@/lib/actions"
import { ProductGrid } from "@/components/product-grid"

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-dvh bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="w-fit bg-accent/20 text-accent-foreground border-accent/30">
                  Premium Coffee Experience
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Crafted with
                  <span className="text-primary block">Passion & Precision</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  From bean to cup, we source the finest coffee beans and craft each beverage with artisanal care.
                  Experience the perfect blend of tradition and innovation.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                  <Link href="/about">Learn Our Story</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-square max-w-lg mx-auto">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="BrewCraft Coffee Shop"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Why Choose BrewCraft?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're committed to delivering exceptional coffee experiences through quality, sustainability, and
              craftsmanship.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 bg-background/50 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Coffee className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Premium Beans</h3>
                <p className="text-muted-foreground">
                  Sourced directly from the world's finest coffee growing regions for exceptional flavor.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 bg-background/50 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Leaf className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Sustainable</h3>
                <p className="text-muted-foreground">
                  Ethically sourced and environmentally conscious practices in every cup.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 bg-background/50 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Award Winning</h3>
                <p className="text-muted-foreground">
                  Recognized for excellence in coffee roasting and brewing techniques.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 bg-background/50 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Fresh Daily</h3>
                <p className="text-muted-foreground">
                  Roasted in small batches daily to ensure peak freshness and flavor.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our most popular coffee selections, carefully chosen for their exceptional quality and taste.
            </p>
          </div>
          <ProductGrid products={featuredProducts} />
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Experience BrewCraft?</h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Join thousands of coffee lovers who have made BrewCraft their daily ritual. Start your journey to the
              perfect cup today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link href="/products">Shop Coffee</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                asChild
              >
                <Link href="/contact">Visit Our Shop</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                <Coffee className="h-6 w-6 text-primary" />
                <span>BrewCraft</span>
              </div>
              <p className="text-muted-foreground">
                Crafting exceptional coffee experiences since 2020. From bean to cup, we're passionate about quality.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Shop</h3>
              <div className="space-y-2 text-muted-foreground">
                <Link href="/products" className="block hover:text-foreground transition-colors">
                  All Products
                </Link>
                <Link href="/products?category=coffee-beans" className="block hover:text-foreground transition-colors">
                  Coffee Beans
                </Link>
                <Link href="/products?category=hot-drinks" className="block hover:text-foreground transition-colors">
                  Hot Drinks
                </Link>
                <Link href="/products?category=pastries" className="block hover:text-foreground transition-colors">
                  Pastries
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Company</h3>
              <div className="space-y-2 text-muted-foreground">
                <Link href="/about" className="block hover:text-foreground transition-colors">
                  About Us
                </Link>
                <Link href="/contact" className="block hover:text-foreground transition-colors">
                  Contact
                </Link>
                <Link href="/careers" className="block hover:text-foreground transition-colors">
                  Careers
                </Link>
                <Link href="/sustainability" className="block hover:text-foreground transition-colors">
                  Sustainability
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Support</h3>
              <div className="space-y-2 text-muted-foreground">
                <Link href="/help" className="block hover:text-foreground transition-colors">
                  Help Center
                </Link>
                <Link href="/shipping" className="block hover:text-foreground transition-colors">
                  Shipping Info
                </Link>
                <Link href="/returns" className="block hover:text-foreground transition-colors">
                  Returns
                </Link>
                <Link href="/privacy" className="block hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 BrewCraft. All rights reserved. Crafted with passion for coffee lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
