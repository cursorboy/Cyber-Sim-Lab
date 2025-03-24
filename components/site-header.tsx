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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <span className="font-bold text-xl">Cyber Sim Lab</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              href="/scenarios"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Scenarios
            </Link>
            <Link
              href="/resources"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Resources
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <ModeToggle />
            {!user ? (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" className="text-sm">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="text-sm bg-black text-white hover:bg-gray-800">Sign Up</Button>
                </Link>
              </>
            ) : (
              <UserNav />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

