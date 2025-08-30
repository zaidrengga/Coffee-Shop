"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "@/components/search-bar";

export default function SearchBarClient({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // render an empty placeholder with same layout to avoid layout shift
        return <div className={className} />;
    }

    return <div className={className}><SearchBar /></div>;
}
