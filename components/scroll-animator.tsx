"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollAnimator(): null {
    useEffect(() => {
        // register plugin safely
        try {
            gsap.registerPlugin(ScrollTrigger);
        } catch (e) {
            // ignore if registration fails in some environments
        }

        const prefersReduced = typeof window !== "undefined" && window.matchMedia
            ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
            : false;

        const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"));
        if (nodes.length === 0) return;

        if (prefersReduced) {
            // set visible state without animations
            gsap.set(nodes, { autoAlpha: 1, y: 0 });
            return;
        }

        // prepare initial state to avoid flicker
        gsap.set(nodes, { autoAlpha: 0, y: 24 });

        const anims = nodes.map((el) => {
            return gsap.fromTo(
                el,
                { autoAlpha: 0, y: 24 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 88%",
                        end: "bottom 20%",
                        scrub: true,
                        toggleActions: "play reverse play reverse",
                    },
                }
            );
        });

        return () => {
            try {
                // kill ScrollTrigger instances created by GSAP
                ScrollTrigger.getAll().forEach((st) => st.kill());
            } catch (e) { }
            try {
                anims.forEach((a) => a.kill());
            } catch (e) { }
        };
    }, []);

    return null;
}
