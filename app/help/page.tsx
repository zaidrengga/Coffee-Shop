import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"

const faqs = [
    {
        q: 'How can I learn more about a product?',
        a: 'Each product page contains detailed tasting notes and origin information. For further questions, contact us via the Contact page.',
    },
    {
        q: 'Can I return an item I purchased elsewhere?',
        a: 'This site is informational and promotional only. For returns or purchases, please contact the store directly or the retailer where you made the purchase.',
    },
    {
        q: 'Do you offer wholesale or bulk orders?',
        a: 'Yes — please contact our sales team through the Contact page and select "Wholesale" in your message.',
    },
    {
        q: 'How do I apply a promo code?',
        a: 'Enter your promo code at checkout in the "Promo code" field before completing payment.',
    },
]

export default function HelpPage() {
    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-6 mb-8">
                    <Badge className="w-fit bg-accent/20 text-accent-foreground border-accent/30">Help Center</Badge>
                    <h1 className="text-4xl lg:text-5xl font-bold">How can we help?</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Find answers, troubleshooting guides, and ways to contact support.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <SearchBar />
                        </div>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
                            <div className="mt-4 space-y-3">
                                {faqs.map((f, idx) => (
                                    <details key={idx} className="rounded-lg border bg-background/50 p-4">
                                        <summary className="cursor-pointer font-medium">{f.q}</summary>
                                        <div className="mt-2 text-muted-foreground">{f.a}</div>
                                    </details>
                                ))}
                            </div>
                        </section>

                        <section className="mt-8">
                            <h2 className="text-2xl font-semibold">Popular articles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <Card className="p-4">
                                    <CardContent>
                                        <h3 className="font-semibold">Product Guides</h3>
                                        <p className="text-sm text-muted-foreground mt-2">Learn about tasting notes, brewing tips, and pairings for our featured products.</p>
                                        <div className="mt-4">
                                            <Button asChild size="sm">
                                                <Link href="/products">Explore products</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="p-4">
                                    <CardContent>
                                        <h3 className="font-semibold">Visit & Events</h3>
                                        <p className="text-sm text-muted-foreground mt-2">Information about visiting our cafe, events, and tastings.</p>
                                        <div className="mt-4">
                                            <Button asChild size="sm">
                                                <Link href="/contact">Visit us</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="p-4">
                                    <CardContent>
                                        <h3 className="font-semibold">Gift Cards & Promo Codes</h3>
                                        <p className="text-sm text-muted-foreground mt-2">Using gift cards and applying discounts.</p>
                                        <div className="mt-4">
                                            <Button asChild size="sm">
                                                <Link href="/help/gift-cards">Read article</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-6">
                        <Card className="p-4">
                            <CardContent>
                                <h3 className="font-semibold">Contact Support</h3>
                                <p className="text-sm text-muted-foreground mt-2">Need help from a person? Our team is available Mon–Fri.</p>
                                <div className="mt-4">
                                    <Button asChild>
                                        <Link href="/contact">Get in touch</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="p-4">
                            <CardContent>
                                <h3 className="font-semibold">Order Lookup</h3>
                                <p className="text-sm text-muted-foreground mt-2">Have your order number ready to get faster help.</p>
                                <div className="mt-4">
                                    <Button asChild size="sm">
                                        <Link href="/contact">Lookup order</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="p-4">
                            <CardContent>
                                <h3 className="font-semibold">Business & Wholesale</h3>
                                <p className="text-sm text-muted-foreground mt-2">Questions about bulk orders or partnerships.</p>
                                <div className="mt-4">
                                    <Button asChild size="sm">
                                        <Link href="/contact">Contact sales</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>
                </div>

                <section className="py-12 bg-muted/20 rounded-xl p-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold">Still need help?</h3>
                            <p className="text-muted-foreground">Send us a message and we'll respond as quickly as we can.</p>
                        </div>
                        <div>
                            <Button asChild>
                                <Link href="/contact">Contact Support</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
