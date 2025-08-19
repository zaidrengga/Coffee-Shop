import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Coffee, Users, Globe, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold">Our Story</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            BrewCraft was born from a simple belief: that great coffee has the power to bring people together and create
            moments of joy in everyday life.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">From Passion to Purpose</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2020 by coffee enthusiasts Sarah and Michael, BrewCraft began as a small roastery in the
                heart of the city. What started as a weekend hobby quickly grew into a mission to share exceptional
                coffee with our community.
              </p>
              <p>
                We believe that every cup tells a story - from the farmers who grow the beans to the moment you take
                your first sip. That's why we work directly with coffee growers around the world, ensuring fair trade
                practices and sustainable farming methods.
              </p>
              <p>
                Today, BrewCraft serves thousands of coffee lovers who appreciate quality, sustainability, and the
                artistry that goes into every cup. We're not just a coffee shop - we're a community of people who
                believe that great coffee makes life better.
              </p>
            </div>
          </div>
          <div className="relative aspect-square">
            <Image
              src="/placeholder.svg?height=500&width=500"
              alt="BrewCraft Roastery"
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-12 mb-20">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Our Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything we do is guided by our core values that shape how we source, roast, and serve our coffee.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Coffee className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Quality First</h3>
                <p className="text-muted-foreground">
                  We never compromise on quality, from bean selection to the final brew.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Globe className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Sustainability</h3>
                <p className="text-muted-foreground">
                  Environmental responsibility is at the heart of everything we do.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Community</h3>
                <p className="text-muted-foreground">
                  Building connections and supporting our local and global communities.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Passion</h3>
                <p className="text-muted-foreground">
                  Every cup is crafted with love and dedication to the art of coffee.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The passionate people behind BrewCraft who make every cup possible.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="relative w-32 h-32 mx-auto">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="Sarah Johnson"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                  <p className="text-muted-foreground">Co-Founder & Head Roaster</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Sarah's passion for coffee began during her travels through South America, where she learned about
                  traditional roasting techniques.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="relative w-32 h-32 mx-auto">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="Michael Chen"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Michael Chen</h3>
                  <p className="text-muted-foreground">Co-Founder & Operations</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Michael brings his business expertise and love for community building to create exceptional customer
                  experiences.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="relative w-32 h-32 mx-auto">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="Emma Rodriguez"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Emma Rodriguez</h3>
                  <p className="text-muted-foreground">Head Barista</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Emma is a certified barista champion who ensures every drink meets our exacting standards for taste
                  and presentation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
