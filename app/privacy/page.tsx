import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="container mx-auto py-16 px-6">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <p className="mb-4">
                This site is a promotional showcase and does not process purchases. We
                do not collect payment details here. For questions about privacy or data
                handling, please <Link href="/contact" className="underline">contact us</Link>.
            </p>
            <p>
                For more detail, please reach out via our <Link href="/help" className="underline">Help Center</Link>.
            </p>
        </div>
    );
}
