"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

/**
 * PageTransitions
 * - plays an enter animation when pathname changes
 * - exposes window.__pageTransition.playExit() which returns a Promise that resolves after exit animation completes
 */
export default function PageTransitions({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (!containerRef.current) return;

        const el = containerRef.current;

        // Enter animation
        try {
            gsap.fromTo(el, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.48, ease: "power2.out" });
        } catch (e) {
            // noop
        }
    }, [pathname]);

    useEffect(() => {
        // Register a global exit animation function that other components (links) can call.
        (window as any).__pageTransition = (window as any).__pageTransition || {};

        (window as any).__pageTransition.playExit = () => {
            return new Promise<void>((resolve) => {
                const el = containerRef.current;
                if (!el) return resolve();

                try {
                    gsap.to(el, {
                        autoAlpha: 0,
                        y: -18,
                        duration: 0.36,
                        ease: "power2.in",
                        onComplete: () => resolve(),
                    });
                } catch (e) {
                    resolve();
                }
            });
        };

        return () => {
            try {
                delete (window as any).__pageTransition?.playExit;
            } catch (e) { }
        };
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen">
            {children}
        </div>
    );
}
