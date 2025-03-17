import Link from "next/link"
import { ArrowRight, Shield, Terminal, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:linear-gradient(0deg,transparent,white)] pointer-events-none" />
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                    Master Cybersecurity Through Simulation
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Practice defending against real-world cyber attacks in a safe, virtual environment. Build skills,
                    track progress, and become a cybersecurity expert.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/scenarios">
                    <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200">
                      Start Training <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/resources">
                    <Button size="lg" variant="outline" className="hover:bg-muted transition-colors duration-200">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-black shadow-2xl md:h-[420px] border border-primary/20">
                  <div className="absolute inset-0 bg-black/90 p-6 text-green-400 font-mono text-sm overflow-auto">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                      </div>
                      <Terminal className="h-5 w-5 ml-2" />
                      <span className="text-white font-medium">Cyber Sim Lab Terminal</span>
                    </div>
                    <div className="space-y-2">
                      <p>$ initiating security scan</p>
                      <p>$ scanning network ports...</p>
                      <p>$ checking firewall configuration...</p>
                      <p>$ analyzing system vulnerabilities...</p>
                      <p className="text-yellow-400">! potential vulnerability detected: port 22 exposed</p>
                      <p>$ scanning for malware signatures...</p>
                      <p className="text-red-400">! suspicious activity detected in system32/config</p>
                      <p>$ initiating countermeasures...</p>
                      <p className="text-white mt-4">How will you respond?</p>
                      <p className="animate-pulse">_</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Training Scenarios</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Choose from a variety of realistic cybersecurity scenarios to test and improve your skills.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <Card className="group hover:shadow-lg transition-all duration-200 border-primary/20">
                <CardHeader>
                  <CardTitle>Network Defense</CardTitle>
                  <CardDescription>Protect against network-based attacks and intrusions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 rounded-md bg-muted/50 flex items-center justify-center group-hover:bg-muted/70 transition-colors duration-200">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Zap className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <ul className="mt-6 space-y-2 text-sm">
                    <li className="flex items-center text-muted-foreground">
                      <span className="mr-2 text-primary">•</span>
                      <span>Firewall configuration</span>
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <span className="mr-2 text-primary">•</span>
                      <span>Port scanning detection</span>
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <span className="mr-2 text-primary">•</span>
                      <span>DDoS attack mitigation</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary/10 hover:bg-primary/20 text-primary">Start Scenario</Button>
                </CardFooter>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-200 border-primary/20">
                <CardHeader>
                  <CardTitle>Malware Analysis</CardTitle>
                  <CardDescription>Identify and neutralize malicious software</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 rounded-md bg-muted/50 flex items-center justify-center group-hover:bg-muted/70 transition-colors duration-200">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <ul className="mt-6 space-y-2 text-sm">
                    <li className="flex items-center text-muted-foreground">
                      <span className="mr-2 text-primary">•</span>
                      <span>Virus detection</span>
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <span className="mr-2 text-primary">•</span>
                      <span>Ransomware response</span>
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <span className="mr-2 text-primary">•</span>
                      <span>System recovery</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary/10 hover:bg-primary/20 text-primary">Start Scenario</Button>
                </CardFooter>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-200 border-primary/20">
                <CardHeader>
                  <CardTitle>Social Engineering</CardTitle>
                  <CardDescription>Recognize and counter manipulation tactics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 rounded-md bg-muted/50 flex items-center justify-center group-hover:bg-muted/70 transition-colors duration-200">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Terminal className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <ul className="mt-6 space-y-2 text-sm">
                    <li className="flex items-center text-muted-foreground">
                      <span className="mr-2 text-primary">•</span>
                      <span>Phishing detection</span>
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <span className="mr-2 text-primary">•</span>
                      <span>Pretexting scenarios</span>
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <span className="mr-2 text-primary">•</span>
                      <span>Security awareness</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary/10 hover:bg-primary/20 text-primary">Start Scenario</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col gap-8 py-12 md:flex-row md:gap-12 max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-semibold">
              <Shield className="h-6 w-6 text-primary" />
              <span>Cyber Sim Lab</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Train. Defend. Master cybersecurity skills in a safe environment.
            </p>
          </div>
          <div className="ml-auto grid gap-12 sm:grid-cols-2">
            <div className="grid gap-4">
              <h3 className="text-sm font-medium">Platform</h3>
              <nav className="grid gap-3 text-sm">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Features
                </Link>
                <Link href="/scenarios" className="text-muted-foreground hover:text-primary transition-colors">
                  Scenarios
                </Link>
                <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                  Resources
                </Link>
              </nav>
            </div>
            <div className="grid gap-4">
              <h3 className="text-sm font-medium">Company</h3>
              <nav className="grid gap-3 text-sm">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="border-t">
          <div className="container py-6 text-center text-sm text-muted-foreground max-w-7xl mx-auto px-4 md:px-6">
            © 2025 Cyber Sim Lab. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

