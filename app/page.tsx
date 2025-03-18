import Link from "next/link"
import { ArrowRight, Shield, Terminal, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import TerminalWrapper from "@/components/TerminalWrapper"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Content */}
              <div className="space-y-8">
                <h1 className="text-5xl font-bold tracking-tight">
                  Master Cybersecurity<br />
                  Through Simulation
                </h1>
                <p className="text-xl text-muted-foreground">
                  Practice defending against real-world cyber attacks in a safe,
                  virtual environment. Build skills, track progress, and become a
                  cybersecurity expert.
                </p>
                <div className="flex gap-4">
                  <Link href="/scenarios">
                    <Button size="lg" className="gap-2">
                      Start Training <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline" size="lg">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right side - Terminal */}
              <TerminalWrapper />
            </div>
          </div>
        </section>

        {/* Training Scenarios Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Training Scenarios
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose from a variety of realistic cybersecurity scenarios to test and improve your skills.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Network Defense</CardTitle>
                      <CardDescription>
                        Protect against network-based attacks
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      Firewall configuration
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      Port scanning detection
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      DDoS attack mitigation
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/scenarios/network-intrusion" className="w-full">
                    <Button className="w-full">Start Scenario</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Malware Analysis</CardTitle>
                      <CardDescription>
                        Identify and neutralize malicious software
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      Virus detection
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      Ransomware response
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      System recovery
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/scenarios/malware-analysis" className="w-full">
                    <Button className="w-full">Start Scenario</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Terminal className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Social Engineering</CardTitle>
                      <CardDescription>
                        Recognize and counter manipulation tactics
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      Phishing detection
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      Pretexting scenarios
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      Security awareness
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/scenarios/social-engineering" className="w-full">
                    <Button className="w-full">Start Scenario</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <Shield className="h-6 w-6 text-primary" />
            <p className="text-sm text-muted-foreground">
              Built by{" "}
              <a href="#" className="font-medium underline underline-offset-4 hover:text-primary transition-colors">
                Cyber Sim Lab
              </a>
              . The source code is available on{" "}
              <a href="https://github.com/cursorboy/Cyber-Sim-Lab" className="font-medium underline underline-offset-4 hover:text-primary transition-colors">
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

