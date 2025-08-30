import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import SearchBarClient from "@/components/search-bar-client"
import { Coffee } from "lucide-react"
import NavLinks from "@/components/nav-links"

export async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl flex-shrink-0">
            <Coffee className="h-6 w-6 text-primary" />
            <span>BrewCraft</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBarClient className="w-full" />
          </div>

          {/* Navigation */}
          <NavLinks />
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBarClient className="w-full" />
        </div>
      </div>
    </header>
  )
}
