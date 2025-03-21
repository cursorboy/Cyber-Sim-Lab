import Link from "next/link"
import { ArrowRight, Shield, Terminal, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Master Cybersecurity Through Simulation
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Practice defending against real-world cyber threats in a safe, controlled environment. Build skills
                    through hands-on scenarios.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/scenarios">
                    <Button className="bg-black text-white hover:bg-gray-800">
                      Start Training <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/resources">
                    <Button variant="outline">Explore Resources</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] h-[350px] bg-[#222222] rounded-xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 p-4 font-mono text-sm overflow-auto">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-green-400">{">"}</span>
                      <span className="text-gray-300">Cyber Sim Lab Terminal</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="text-green-400 mr-2">$</span>
                        <span className="text-green-400">initiating security scan</span>
                      </div>
                      <div className="flex">
                        <span className="text-green-400 mr-2">$</span>
                        <span className="text-green-400">scanning network ports...</span>
                      </div>
                      <div className="flex">
                        <span className="text-green-400 mr-2">$</span>
                        <span className="text-green-400">checking firewall configuration...</span>
                      </div>
                      <div className="flex">
                        <span className="text-green-400 mr-2">$</span>
                        <span className="text-green-400">analyzing system vulnerabilities...</span>
                      </div>
                      <div className="flex">
                        <span className="text-yellow-400 mr-2">!</span>
                        <span className="text-yellow-400">potential vulnerability detected: port 22 exposed</span>
                      </div>
                      <div className="flex">
                        <span className="text-green-400 mr-2">$</span>
                        <span className="text-green-400">scanning for malware signatures...</span>
                      </div>
                      <div className="flex">
                        <span className="text-yellow-400 mr-2">!</span>
                        <span className="text-yellow-400">suspicious activity detected in system32/config</span>
                      </div>
                      <div className="flex">
                        <span className="text-green-400 mr-2">$</span>
                        <span className="text-green-400">initiating countermeasures...</span>
                      </div>
                      <div className="text-white mt-2">How will you respond?</div>
                      <div className="flex mt-1">
                        <span className="text-green-400 mr-2">-</span>
                        <span className="animate-pulse">_</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted-foreground/20 px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Train Like It's Real</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides realistic cybersecurity scenarios to help you develop practical skills in a safe
                  environment.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Realistic Scenarios</h3>
                <p className="text-center text-muted-foreground">
                  Practice with simulations based on real-world cyber attacks and defense strategies.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Terminal className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Hands-on Learning</h3>
                <p className="text-center text-muted-foreground">
                  Interactive terminals and tools that mimic actual cybersecurity environments.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Skill Progression</h3>
                <p className="text-center text-muted-foreground">
                  Track your progress and gradually tackle more advanced security challenges.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 font-semibold">
              <Shield className="h-6 w-6 text-primary" />
              <span>Cyber Sim Lab</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A safe environment to practice and master cybersecurity skills.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <h3 className="font-semibold">Platform</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/scenarios" className="hover:underline">
                Scenarios
              </Link>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/resources" className="hover:underline">
                Resources
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <h3 className="font-semibold">Support</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="#" className="hover:underline">
                Documentation
              </Link>
              <Link href="#" className="hover:underline">
                Community
              </Link>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <h3 className="font-semibold">Legal</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="#" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:underline">
                Terms of Service
              </Link>
              <Link href="#" className="hover:underline">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
        <div className="container py-6 text-center text-sm text-muted-foreground">
          © 2025 Cyber Sim Lab. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

