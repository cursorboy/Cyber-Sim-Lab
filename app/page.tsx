import Link from "next/link"
import { ArrowRight, Shield, Terminal, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background border-b">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Shield className="h-6 w-6 text-primary" />
            <span>Cyber Sim Lab</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="/scenarios" className="text-sm font-medium hover:underline underline-offset-4">
              Scenarios
            </Link>
            <Link href="/resources" className="text-sm font-medium hover:underline underline-offset-4">
              Resources
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Master Cybersecurity Through Simulation
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Practice defending against real-world cyber attacks in a safe, virtual environment. Build skills,
                    track progress, and become a cybersecurity expert.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/scenarios">
                    <Button size="lg" className="gap-1">
                      Start Training <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/learn">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-background shadow-xl md:h-[420px]">
                  <div className="absolute inset-0 bg-black/80 p-4 text-green-400 font-mono text-sm overflow-auto">
                    <div className="flex items-center gap-2 mb-4">
                      <Terminal className="h-5 w-5" />
                      <span className="text-white">Cyber Sim Lab Terminal</span>
                    </div>
                    <p>$ initiating security scan</p>
                    <p>$ scanning network ports...</p>
                    <p>$ checking firewall configuration...</p>
                    <p>$ analyzing system vulnerabilities...</p>
                    <p className="text-yellow-400">! potential vulnerability detected: port 22 exposed</p>
                    <p>$ scanning for malware signatures...</p>
                    <p className="text-red-400">! suspicious activity detected in system32/config</p>
                    <p>$ initiating countermeasures...</p>
                    <p className="text-white">How will you respond?</p>
                    <p className="animate-pulse">_</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Training Scenarios</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Choose from a variety of realistic cybersecurity scenarios to test and improve your skills.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Network Defense</CardTitle>
                  <CardDescription>Protect against network-based attacks and intrusions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 rounded-md bg-muted flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Zap className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <span>Firewall configuration</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <span>Port scanning detection</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <span>DDoS attack mitigation</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Scenario</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Malware Analysis</CardTitle>
                  <CardDescription>Identify and neutralize malicious software</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 rounded-md bg-muted flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <span>Virus detection</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <span>Ransomware response</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <span>System recovery</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Scenario</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Social Engineering</CardTitle>
                  <CardDescription>Recognize and counter manipulation tactics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 rounded-md bg-muted flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Terminal className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <span>Phishing detection</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <span>Pretexting scenarios</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <span>Security awareness</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Scenario</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8">
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex items-center gap-2 font-semibold">
              <Shield className="h-6 w-6 text-primary" />
              <span>Cyber Sim Lab</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Train. Defend. Master cybersecurity skills in a safe environment.
            </p>
          </div>
          <div className="ml-auto grid gap-8 sm:grid-cols-2">
            <div className="grid gap-2">
              <h3 className="text-sm font-medium">Platform</h3>
              <nav className="grid gap-2 text-sm">
                <Link href="#" className="text-muted-foreground hover:underline">
                  Features
                </Link>
                <Link href="/scenarios" className="text-muted-foreground hover:underline">
                  Scenarios
                </Link>
                <Link href="/resources" className="text-muted-foreground hover:underline">
                  Resources
                </Link>
              </nav>
            </div>
            <div className="grid gap-2">
              <h3 className="text-sm font-medium">Company</h3>
              <nav className="grid gap-2 text-sm">
                <Link href="#" className="text-muted-foreground hover:underline">
                  About
                </Link>
                <Link href="#" className="text-muted-foreground hover:underline">
                  Blog
                </Link>
                <Link href="#" className="text-muted-foreground hover:underline">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="container py-6 text-center text-sm text-muted-foreground">
          © 2025 Cyber Sim Lab. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

