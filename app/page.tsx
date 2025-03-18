import Link from "next/link"
import { ArrowRight, Shield, Terminal, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex items-center gap-2 font-semibold">
            <Shield className="h-6 w-6 text-primary" />
            <span>Cyber Sim Lab</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="/scenarios" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Scenarios
            </Link>
            <Link href="/resources" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Resources
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              Master Cybersecurity Through Simulation
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Practice defending against real-world cyber attacks in a safe, virtual environment. Build skills,
              track progress, and become a cybersecurity expert.
            </p>
            <div className="space-x-4">
              <Link href="/scenarios">
                <Button size="lg" className="gap-2">
                  Start Training <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/learn">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Training Scenarios
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Choose from a variety of realistic cybersecurity scenarios to test and improve your skills.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle>Network Defense</CardTitle>
                    <CardDescription>
                      Protect against network-based attacks
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Firewall configuration
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Port scanning detection
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    DDoS attack mitigation
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start Scenario</Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle>Malware Analysis</CardTitle>
                    <CardDescription>
                      Identify and neutralize malicious software
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Virus detection
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Ransomware response
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    System recovery
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start Scenario</Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Terminal className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle>Social Engineering</CardTitle>
                    <CardDescription>
                      Recognize and counter manipulation tactics
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Phishing detection
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Pretexting scenarios
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Security awareness
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start Scenario</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Shield className="h-6 w-6 text-primary" />
            <p className="text-center text-sm leading-loose md:text-left">
              Built by{" "}
              <a href="#" className="font-medium underline underline-offset-4">
                Cyber Sim Lab
              </a>
              . The source code is available on{" "}
              <a href="#" className="font-medium underline underline-offset-4">
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

