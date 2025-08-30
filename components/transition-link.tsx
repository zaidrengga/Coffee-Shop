"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

type Props = React.PropsWithChildren<{ href: string; className?: string }>

export default function TransitionLink({ href, children, className }: Props) {
    const router = useRouter();

    async function onClick(e: MouseEvent) {
        // allow modifier keys to open in new tab
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();

        // if an exit animation is registered, play it first
        const api = (window as any).__pageTransition;
        if (api?.playExit) {
            try {
                await api.playExit();
            } catch (err) {
                // ignore
            }
        }

        router.push(href);
    }

    return (
        <a href={href} onClick={onClick} className={className}>
            {children}
        </a>
    );
}
