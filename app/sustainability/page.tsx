import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Coffee, Leaf, Globe, BarChart } from "lucide-react"

export default function SustainabilityPage() {
    const pillars = [
        {
            title: 'Ethical Sourcing',
            desc: 'We partner directly with farmers to ensure fair pricing and long-term relationships.',
            icon: Coffee,
        },
        {
            title: 'Environmental Stewardship',
            desc: 'Programs to reduce waste, improve recycling, and support regenerative agriculture.',
            icon: Leaf,
        },
        {
            title: 'Community Investment',
            desc: 'Local initiatives and education programs that give back to the communities we work with.',
            icon: Globe,
        },
    ]

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4">
                {/* Hero */}
                <div className="text-center space-y-6 mb-12">
                    <Badge className="w-fit bg-accent/20 text-accent-foreground border-accent/30">Sustainability</Badge>
                    <h1 className="text-4xl lg:text-5xl font-bold">Our Commitments to a Better Cup</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        BrewCraft is committed to minimizing environmental impact and maximizing social benefit across our whole
                        supply chain — from farm to cup.
                    </p>
                    <div className="flex justify-center mt-4">
                        <Button asChild>
                            <Link href="#initiatives">Learn about our initiatives</Link>
                        </Button>
                    </div>
                </div>

                {/* Initiatives */}
                <section id="initiatives" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">What we're doing</h2>
                        <p className="text-muted-foreground max-w-xl">
                            We focus on three core pillars that shape our sustainability work: ethical sourcing, environmental
                            stewardship, and community investment. Below are a few concrete programs we run and support.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            {pillars.map((p) => {
                                const Icon = p.icon
                                return (
                                    <Card key={p.title} className="p-4">
                                        <CardContent className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                                <Icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{p.title}</h3>
                                                <p className="text-sm text-muted-foreground">{p.desc}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold">Impact at a glance</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Card className="p-4">
                                <CardContent>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold">95%</div>
                                        <div className="text-sm text-muted-foreground">Direct trade relationships</div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="p-4">
                                <CardContent>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold">50k+</div>
                                        <div className="text-sm text-muted-foreground">Trees supported through reforestation programs</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mt-4">
                            <h4 className="font-semibold">Learn more</h4>
                            <p className="text-sm text-muted-foreground">Read our full sustainability report for detailed metrics and progress.</p>
                            <div className="mt-3">
                                <Button asChild>
                                    <Link href="/sustainability/report">View Report</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Programs / Examples */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-6">Programs we run</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="p-6">
                            <CardContent>
                                <h3 className="font-semibold">Farmer Support Grants</h3>
                                <p className="text-sm text-muted-foreground mt-2">Small grants to support sustainable farming practices.</p>
                            </CardContent>
                        </Card>
                        <Card className="p-6">
                            <CardContent>
                                <h3 className="font-semibold">Waste Reduction</h3>
                                <p className="text-sm text-muted-foreground mt-2">Compost and recycling programs at all store locations.</p>
                            </CardContent>
                        </Card>
                        <Card className="p-6">
                            <CardContent>
                                <h3 className="font-semibold">Training & Education</h3>
                                <p className="text-sm text-muted-foreground mt-2">Barista and roasting workshops focused on sustainability.</p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-12 bg-muted/20 rounded-xl p-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold">Want to partner with us?</h3>
                            <p className="text-muted-foreground">If you're a farmer, organization, or supplier interested in working together, we'd love to hear from you.</p>
                        </div>
                        <div>
                            <Button asChild>
                                <Link href="/contact">Contact Sustainability Team</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
