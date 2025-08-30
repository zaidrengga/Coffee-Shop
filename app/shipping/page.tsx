import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ShippingInfoPage() {
    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-6 mb-8">
                    <Badge className="w-fit bg-accent/20 text-accent-foreground border-accent/30">Shipping Information</Badge>
                    <h1 className="text-4xl font-bold">About Shipping</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        This website is an informational and promotional site for our cafe and products. We do not process
                        online orders or handle shipping here.
                    </p>
                </div>

                <div className="prose mx-auto text-center">
                    <p>If you purchased our products through a retailer, please contact that retailer for shipping and tracking details.</p>
                    <p>For store visits, events, or product availability at our cafe, please contact us directly.</p>
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
