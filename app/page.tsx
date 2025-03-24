import Link from "next/link"
import { ArrowRight, Shield, Terminal, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr,1fr] lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
                    Master Cybersecurity Through Simulation
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Practice defending against real-world cyber threats in a safe, controlled environment. Build skills
                    through hands-on scenarios.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <Link href="/scenarios">
                    <Button className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 px-8 py-2">
                      Start Training <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/resources">
                    <Button variant="outline" className="w-full sm:w-auto px-8 py-2">Explore Resources</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] h-[350px] bg-[#1a1a1a] rounded-lg overflow-hidden shadow-2xl border border-gray-800">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-[#2a2a2a] flex items-center px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="ml-4 text-sm text-gray-400">Cyber Sim Lab Terminal</span>
                  </div>
                  <div className="absolute inset-0 pt-8 p-4 font-mono text-sm overflow-auto">
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
                      <div className="text-white mt-4">How will you respond?</div>
                      <div className="flex mt-1">
                        <span className="text-green-400 mr-2">_</span>
                        <span className="animate-pulse">|</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Train Like It's Real</h2>
                <p className="max-w-[900px] text-gray-600 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides realistic cybersecurity scenarios to help you develop practical skills in a safe
                  environment.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
                <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3">
                  <Shield className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                </div>
                <h3 className="text-xl font-bold">Realistic Scenarios</h3>
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Practice with simulations based on real-world cyber attacks and defense strategies.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
                <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3">
                  <Terminal className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                </div>
                <h3 className="text-xl font-bold">Hands-on Learning</h3>
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Interactive terminals and tools that mimic actual cybersecurity environments.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
                <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3">
                  <Zap className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                </div>
                <h3 className="text-xl font-bold">Skill Progression</h3>
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Track your progress and gradually tackle more advanced security challenges.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 py-12 md:flex-row md:gap-12">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 font-semibold">
                <Shield className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                <span>Cyber Sim Lab</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A safe environment to practice and master cybersecurity skills.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:gap-12">
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold">Platform</h3>
                <nav className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Link href="/scenarios" className="hover:text-gray-900 dark:hover:text-white">Scenarios</Link>
                  <Link href="/dashboard" className="hover:text-gray-900 dark:hover:text-white">Dashboard</Link>
                  <Link href="/resources" className="hover:text-gray-900 dark:hover:text-white">Resources</Link>
                </nav>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold">Support</h3>
                <nav className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Link href="#" className="hover:text-gray-900 dark:hover:text-white">Documentation</Link>
                  <Link href="#" className="hover:text-gray-900 dark:hover:text-white">Community</Link>
                  <Link href="#" className="hover:text-gray-900 dark:hover:text-white">Contact</Link>
                </nav>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold">Legal</h3>
                <nav className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Link href="#" className="hover:text-gray-900 dark:hover:text-white">Privacy Policy</Link>
                  <Link href="#" className="hover:text-gray-900 dark:hover:text-white">Terms of Service</Link>
                  <Link href="#" className="hover:text-gray-900 dark:hover:text-white">Cookie Policy</Link>
                </nav>
              </div>
            </div>
          </div>
          <div className="border-t py-6 text-center text-sm text-gray-600 dark:text-gray-400">
            © 2025 Cyber Sim Lab. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

