"use client"

import Link from "next/link"
import { Shield } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/auth/user-nav"
import { useAuth } from "@/components/auth/auth-provider"

export function SiteHeader() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="font-bold text-xl">Cyber Sim Lab</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/scenarios"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Scenarios
          </Link>
          <Link
            href="/resources"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Resources
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          {!user ? (
            <>
              <Button variant="ghost" asChild>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    document.dispatchEvent(new CustomEvent("open-signin-modal"))
                  }}
                >
                  Sign In
                </Link>
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800" asChild>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    document.dispatchEvent(new CustomEvent("open-signup-modal"))
                  }}
                >
                  Sign Up
                </Link>
              </Button>
            </>
          ) : (
            <UserNav />
          )}
        </div>
      </div>
    </header>
  )
}

