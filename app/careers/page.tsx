import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Coffee, Users, Globe } from "lucide-react"

export default function CareersPage() {
    const openings = [
        { id: 'barista', title: 'Senior Barista', location: 'Downtown', type: 'Full-time' },
        { id: 'roaster', title: 'Roaster / Production Lead', location: 'Roastery', type: 'Full-time' },
        { id: 'marketing', title: 'Marketing & Community Manager', location: 'Remote', type: 'Part-time' },
    ]

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4">
                {/* Hero */}
                <div className="text-center space-y-6 mb-12">
                    <Badge className="w-fit bg-accent/20 text-accent-foreground border-accent/30">Join Our Team</Badge>
                    <h1 className="text-4xl lg:text-5xl font-bold">Careers at BrewCraft</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        We're a tight-knit team of coffee lovers focused on quality, sustainability and hospitality. Explore open
                        roles and help us craft exceptional coffee experiences.
                    </p>
                    <div className="flex justify-center mt-4">
                        <Button asChild>
                            <Link href="#openings">View Open Positions</Link>
                        </Button>
                    </div>
                </div>

                {/* Culture / Benefits */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">Why work with us?</h2>
                        <p className="text-muted-foreground leading-relaxed max-w-xl">
                            At BrewCraft we care about people as much as we care about coffee. We offer competitive pay, flexible
                            schedules, career growth, and opportunities to learn specialty coffee skills from experienced roasters
                            and baristas.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            <Card className="p-4">
                                <CardContent className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Coffee className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Coffee Education</h3>
                                        <p className="text-sm text-muted-foreground">Training and certification for barista & cupping skills.</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="p-4">
                                <CardContent className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                                        <Globe className="h-6 w-6 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Sustainable Practices</h3>
                                        <p className="text-sm text-muted-foreground">Work with ethically-sourced beans and sustainable programs.</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="p-4">
                                <CardContent className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                                        <Users className="h-6 w-6 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Community</h3>
                                        <p className="text-sm text-muted-foreground">A supportive team that values growth and collaboration.</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="p-4">
                                <CardContent className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Briefcase className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Career Growth</h3>
                                        <p className="text-sm text-muted-foreground">Paths from barista to roaster, store manager, and beyond.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="relative aspect-video rounded-2xl overflow-hidden">
                        <Image src="/placeholder.jpg" alt="Team at BrewCraft" fill className="object-cover" />
                    </div>
                </section>

                {/* Openings */}
                <section id="openings" className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold">Open Positions</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">We're hiring across stores and our roastery — apply below.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {openings.map((o) => (
                            <Card key={o.id} className="p-6">
                                <CardContent>
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-semibold">{o.title}</h3>
                                            <p className="text-sm text-muted-foreground">{o.location} • {o.type}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button asChild size="sm">
                                                <Link href={`/careers/${o.id}`}>View</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-12 bg-muted/20 rounded-xl p-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold">Don't see the right role?</h3>
                            <p className="text-muted-foreground">Send us a general application and we'll keep your info on file.</p>
                        </div>
                        <div>
                            <Button asChild>
                                <Link href="/contact">Send General Application</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
