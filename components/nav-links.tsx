"use client";

import { Button } from "@/components/ui/button";
import TransitionLink from "@/components/transition-link";

export default function NavLinks() {
    return (
        <nav className="hidden lg:flex items-center gap-6">
            <Button variant="ghost" asChild>
                <TransitionLink href="/">Home</TransitionLink>
            </Button>
            <Button variant="ghost" asChild>
                <TransitionLink href="/products">Products</TransitionLink>
            </Button>
            <Button variant="ghost" asChild>
                <TransitionLink href="/about">About</TransitionLink>
            </Button>
            <Button variant="ghost" asChild>
                <TransitionLink href="/contact">Contact</TransitionLink>
            </Button>
        </nav>
    );
}
