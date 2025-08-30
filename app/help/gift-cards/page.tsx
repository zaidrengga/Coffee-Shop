"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GiftCardsArticle() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        // register ScrollTrigger plugin
        try {
            gsap.registerPlugin(ScrollTrigger);
        } catch (e) {
            // plugin registration may fail if gsap isn't installed in the environment
        }

        // Respect reduced motion preference
        const prefersReduced = typeof window !== "undefined" && window.matchMedia
            ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
            : false;

        if (prefersReduced) {
            // Immediately set visible state without animations
            gsap.set(containerRef.current, { autoAlpha: 1, y: 0 });
            return;
        }

        // Fade in the container on mount
        gsap.fromTo(
            containerRef.current,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );

        // Reveal each section as it scrolls into view
        const sections = containerRef.current.querySelectorAll("[data-scroll]");
        sections.forEach((el) => {
            gsap.fromTo(
                el,
                { autoAlpha: 0, y: 24 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        end: "bottom 60%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        return () => {
            try {
                gsap.killTweensOf(containerRef.current as any);
            } catch (e) {
                // noop
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="container mx-auto py-16 px-6 opacity-0">
            <header className="max-w-3xl mx-auto text-center mb-12" data-scroll>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">Gift Cards</h1>
                <p className="text-muted-foreground text-lg">Give the gift of choice. Note: this site is a promotional showcase and does not sell or redeem gift cards here.</p>
            </header>

            <main className="max-w-3xl mx-auto space-y-8">
                <section data-scroll className="bg-card p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                    <p className="text-muted-foreground">
                        Our gift cards are a convenient way to share a Lumino experience. On our main store these can be purchased and redeemed at checkout; this demo site only showcases the offering.
                    </p>
                </section>

                <section data-scroll className="bg-card p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">How they work</h3>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                        <li>Delivered via email with a unique code.</li>
                        <li>Redeemable at checkout on the store platform.</li>
                        <li>Valid for 12 months from the date of issue.</li>
                    </ul>
                </section>

                <section data-scroll className="bg-card p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">Need help?</h3>
                    <p className="text-muted-foreground mb-2">If you have questions about gift cards, please reach out to our team.</p>
                    <p>
                        <Link href="/contact" className="text-primary underline">Contact Support</Link>
                        {' '}or browse the <Link href="/help" className="underline">Help Center</Link> for related articles.
                    </p>
                </section>
            </main>
        </div>
    );
}
