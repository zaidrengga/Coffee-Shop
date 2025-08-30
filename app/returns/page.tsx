import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ReturnsInfoPage() {
    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-6 mb-8">
                    <Badge className="w-fit bg-accent/20 text-accent-foreground border-accent/30">Returns</Badge>
                    <h1 className="text-4xl font-bold">Returns & Refunds</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        BrewCraft's website is promotional only and does not handle purchases or returns. If you made a purchase
                        through a third-party retailer, please contact that retailer for returns and refund policies.
                    </p>
                </div>

                <div className="prose mx-auto text-center">
                    <p>For questions about in-store returns or gift items bought directly at our cafe, reach out to us via the contact page.</p>
                    <div className="mt-6">
                        <Button asChild>
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                        <Button asChild variant="outline" className="ml-3">
                            <Link href="/help">Help Center</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
