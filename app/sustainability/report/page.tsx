import Link from "next/link";

export default function SustainabilityReport() {
    return (
        <div className="container mx-auto py-16 px-6">
            <h1 className="text-3xl font-bold mb-4">Sustainability Report</h1>
            <p className="mb-4">Our annual sustainability report outlines progress, goals, and metrics. This site serves as a promotional showcase.</p>
            <p>If you'd like the full report or have questions, please <Link href="/contact" className="underline">contact our team</Link>.</p>
        </div>
    );
}
