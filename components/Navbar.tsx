import Link from "next/link"
import { Shield } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <span className="font-semibold">Cyber Sim Lab</span>
        </div>
        <nav className="flex gap-8">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/scenarios" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Scenarios
          </Link>
          <Link href="/resources" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Resources
          </Link>
        </nav>
      </div>
    </header>
  )
} 