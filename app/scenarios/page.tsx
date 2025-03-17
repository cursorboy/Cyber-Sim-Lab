import Link from "next/link"
import { ArrowLeft, Shield, Terminal, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ScenariosPage() {
  const scenarios = [
    {
      title: "Network Intrusion",
      description: "Detect and respond to unauthorized network access",
      difficulty: "Beginner",
      duration: "30-45 min",
      completion: "0%",
      icon: Zap,
      href: "/scenarios/network-intrusion",
      category: "Network"
    },
    {
      title: "Ransomware Response",
      description: "Contain and recover from a ransomware attack",
      difficulty: "Intermediate",
      duration: "45-60 min",
      completion: "0%",
      icon: Shield,
      href: "/scenarios/ransomware-response",
      category: "Malware"
    },
    {
      title: "Phishing Detection",
      description: "Identify and handle phishing attempts",
      difficulty: "Beginner",
      duration: "20-30 min",
      completion: "0%",
      icon: Terminal,
      href: "/scenarios/phishing-detection",
      category: "Social Engineering"
    },
    {
      title: "Data Exfiltration",
      description: "Detect and prevent unauthorized data transfer",
      difficulty: "Advanced",
      duration: "60-90 min",
      completion: "0%",
      icon: Zap,
      href: "/scenarios/data-exfiltration",
      category: "Network"
    },
    {
      title: "Privilege Escalation",
      description: "Identify and mitigate unauthorized access elevation",
      difficulty: "Intermediate",
      duration: "45-60 min",
      completion: "0%",
      icon: Shield,
      href: "/scenarios/privilege-escalation",
      category: "Malware"
    },
    {
      title: "Incident Response",
      description: "Coordinate a full security incident response",
      difficulty: "Advanced",
      duration: "90-120 min",
      completion: "0%",
      icon: Terminal,
      href: "/scenarios/incident-response",
      category: "Forensics"
    }
  ]

  const categories = ["All Scenarios", "Network", "Malware", "Social Engineering", "Forensics"]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-16 items-center px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-semibold">
            <Shield className="h-6 w-6 text-primary" />
            <span>Cyber Sim Lab</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/scenarios" className="text-sm font-medium transition-colors hover:text-primary">
              Scenarios
            </Link>
            <Link href="/resources" className="text-sm font-medium transition-colors hover:text-primary">
              Resources
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Training Scenarios</h1>
          </div>
          
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="shrink-0"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon
              return (
                <Link 
                  key={scenario.title} 
                  href={scenario.href}
                  className="group"
                >
                  <div className="rounded-lg border border-primary/20 p-6 hover:shadow-lg transition-all duration-200 h-full flex flex-col">
                    <div className="h-40 rounded-md bg-muted/50 flex items-center justify-center group-hover:bg-muted/70 transition-colors duration-200 mb-6">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{scenario.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          scenario.difficulty === "Beginner" ? "bg-green-100 text-green-700" :
                          scenario.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {scenario.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{scenario.description}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{scenario.duration}</span>
                        <span>Completion: {scenario.completion}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container py-6 text-center text-sm text-muted-foreground max-w-7xl mx-auto px-4 md:px-6">
          © 2025 Cyber Sim Lab. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

