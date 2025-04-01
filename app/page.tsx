import Link from "next/link"
import { Shield, Brain, GraduationCap, Target, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen space-y-16 py-12">
      <section className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1fr,1fr] lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Learn Cybersecurity with AI
              </h1>
              <p className="text-base text-gray-500 md:text-lg dark:text-gray-400">
                Master cybersecurity through interactive AI-powered scenarios. Practice real-world security challenges in a safe environment.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <Link href="/scenarios">
                <Button className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 px-8 py-2">
                  Start Training <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/resources">
                <Button variant="outline" className="w-full sm:w-auto px-8 py-2">
                  Explore Resources
                </Button>
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
      </section>

      <section className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interactive Learning</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Hands-on</div>
              <p className="text-xs text-muted-foreground">
                Learn by doing with real-world scenarios
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI-Powered Guidance</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24/7 Support</div>
              <p className="text-xs text-muted-foreground">
                Get instant help from AI security experts
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Real Threats</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Practical</div>
              <p className="text-xs text-muted-foreground">
                Practice with realistic attack scenarios
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Focus</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Comprehensive</div>
              <p className="text-xs text-muted-foreground">
                Cover all aspects of cybersecurity
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Available Scenarios</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Network Intrusion Detection</CardTitle>
                <CardDescription>Learn to detect and respond to network attacks</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/scenarios/network-intrusion">
                  <Button className="w-full">Start Scenario</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Malware Analysis</CardTitle>
                <CardDescription>Analyze and respond to malware threats</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/scenarios/malware-analysis">
                  <Button className="w-full">Start Scenario</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Social Engineering</CardTitle>
                <CardDescription>Identify and prevent social engineering attacks</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/scenarios/social-engineering">
                  <Button className="w-full">Start Scenario</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

