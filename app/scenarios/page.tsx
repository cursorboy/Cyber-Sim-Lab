"use client"

import Link from "next/link"
import { ArrowLeft, Clock, Shield, Terminal, Zap } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth/auth-provider"

// Define scenario progress type
type ScenarioProgress = {
  [key: string]: {
    completed: boolean
    progress: number
  }
}

export default function ScenariosPage() {
  const { user } = useAuth()
  const [scenarioProgress, setScenarioProgress] = useState<ScenarioProgress>({
    "network-intrusion": { completed: false, progress: 0 },
    "ransomware-response": { completed: false, progress: 0 },
    "phishing-detection": { completed: false, progress: 0 },
    "data-exfiltration": { completed: false, progress: 0 },
    "privilege-escalation": { completed: false, progress: 0 },
    "incident-response": { completed: false, progress: 0 },
    "malware-analysis": { completed: false, progress: 0 },
    "social-engineering": { completed: false, progress: 0 },
  })

  // Load progress from localStorage on component mount
  useEffect(() => {
    if (user) {
      const savedProgress = localStorage.getItem(`scenario-progress-${user.id}`)
      if (savedProgress) {
        setScenarioProgress(JSON.parse(savedProgress))
      }
    }
  }, [user])

  // Simulate updating progress for demo purposes
  useEffect(() => {
    if (user) {
      // For demo purposes, set some random progress
      const demoProgress: ScenarioProgress = {
        "network-intrusion": { completed: false, progress: 65 },
        "ransomware-response": { completed: false, progress: 20 },
        "phishing-detection": { completed: true, progress: 100 },
        "data-exfiltration": { completed: false, progress: 45 },
        "privilege-escalation": { completed: false, progress: 10 },
        "incident-response": { completed: false, progress: 30 },
        "malware-analysis": { completed: false, progress: 0 },
        "social-engineering": { completed: false, progress: 80 },
      }

      setScenarioProgress(demoProgress)
      localStorage.setItem(`scenario-progress-${user?.id}`, JSON.stringify(demoProgress))
    }
  }, [user])

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-8">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold ml-4">Training Scenarios</h1>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Scenarios</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="malware">Malware</TabsTrigger>
            <TabsTrigger value="social">Social Engineering</TabsTrigger>
            <TabsTrigger value="forensics">Forensics</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/scenarios/network-intrusion">
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>Network Intrusion</CardTitle>
                      <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                        Beginner
                      </div>
                    </div>
                    <CardDescription>Detect and respond to unauthorized network access</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-32 rounded-md bg-muted flex items-center justify-center">
                        <Zap className="h-10 w-10 text-muted-foreground/60" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">30-45 min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Completion:</span>
                          <span className="font-medium">{scenarioProgress["network-intrusion"].progress}%</span>
                        </div>
                      </div>
                      <Progress value={scenarioProgress["network-intrusion"].progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/scenarios/ransomware-response">
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>Ransomware Response</CardTitle>
                      <div className="bg-orange-500/10 text-orange-500 text-xs font-medium px-2 py-1 rounded-full">
                        Intermediate
                      </div>
                    </div>
                    <CardDescription>Contain and recover from a ransomware attack</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-32 rounded-md bg-muted flex items-center justify-center">
                        <Shield className="h-10 w-10 text-muted-foreground/60" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">45-60 min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Completion:</span>
                          <span className="font-medium">{scenarioProgress["ransomware-response"].progress}%</span>
                        </div>
                      </div>
                      <Progress value={scenarioProgress["ransomware-response"].progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/scenarios/phishing-detection">
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>Phishing Detection</CardTitle>
                      <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                        Beginner
                      </div>
                    </div>
                    <CardDescription>Identify and handle phishing attempts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-32 rounded-md bg-muted flex items-center justify-center">
                        <Terminal className="h-10 w-10 text-muted-foreground/60" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">20-30 min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Completion:</span>
                          <span className="font-medium">{scenarioProgress["phishing-detection"].progress}%</span>
                        </div>
                      </div>
                      <Progress value={scenarioProgress["phishing-detection"].progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/scenarios/data-exfiltration">
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>Data Exfiltration</CardTitle>
                      <div className="bg-red-500/10 text-red-500 text-xs font-medium px-2 py-1 rounded-full">
                        Advanced
                      </div>
                    </div>
                    <CardDescription>Detect and prevent unauthorized data transfer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-32 rounded-md bg-muted flex items-center justify-center">
                        <Zap className="h-10 w-10 text-muted-foreground/60" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">60-90 min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Completion:</span>
                          <span className="font-medium">{scenarioProgress["data-exfiltration"].progress}%</span>
                        </div>
                      </div>
                      <Progress value={scenarioProgress["data-exfiltration"].progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/scenarios/privilege-escalation">
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>Privilege Escalation</CardTitle>
                      <div className="bg-orange-500/10 text-orange-500 text-xs font-medium px-2 py-1 rounded-full">
                        Intermediate
                      </div>
                    </div>
                    <CardDescription>Identify and mitigate unauthorized access elevation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-32 rounded-md bg-muted flex items-center justify-center">
                        <Shield className="h-10 w-10 text-muted-foreground/60" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">45-60 min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Completion:</span>
                          <span className="font-medium">{scenarioProgress["privilege-escalation"].progress}%</span>
                        </div>
                      </div>
                      <Progress value={scenarioProgress["privilege-escalation"].progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/scenarios/incident-response">
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>Incident Response</CardTitle>
                      <div className="bg-red-500/10 text-red-500 text-xs font-medium px-2 py-1 rounded-full">
                        Advanced
                      </div>
                    </div>
                    <CardDescription>Coordinate a full security incident response</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-32 rounded-md bg-muted flex items-center justify-center">
                        <Terminal className="h-10 w-10 text-muted-foreground/60" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">90-120 min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Completion:</span>
                          <span className="font-medium">{scenarioProgress["incident-response"].progress}%</span>
                        </div>
                      </div>
                      <Progress value={scenarioProgress["incident-response"].progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>
          <TabsContent value="network">
            {/* Network specific scenarios would go here */}
            <div className="text-center py-12">
              <div className="inline-block bg-primary/10 text-primary font-medium px-3 py-1 rounded-md mb-4">
                Coming Soon
              </div>
              <p className="text-muted-foreground">New network security scenarios are currently in development.</p>
            </div>
          </TabsContent>
          <TabsContent value="malware">
            {/* Malware specific scenarios would go here */}
            <div className="text-center py-12">
              <div className="inline-block bg-primary/10 text-primary font-medium px-3 py-1 rounded-md mb-4">
                Coming Soon
              </div>
              <p className="text-muted-foreground">New malware security scenarios are currently in development.</p>
            </div>
          </TabsContent>
          <TabsContent value="social">
            {/* Social engineering specific scenarios would go here */}
            <div className="text-center py-12">
              <div className="inline-block bg-primary/10 text-primary font-medium px-3 py-1 rounded-md mb-4">
                Coming Soon
              </div>
              <p className="text-muted-foreground">New social security scenarios are currently in development.</p>
            </div>
          </TabsContent>
          <TabsContent value="forensics">
            {/* Forensics specific scenarios would go here */}
            <div className="text-center py-12">
              <div className="inline-block bg-primary/10 text-primary font-medium px-3 py-1 rounded-md mb-4">
                Coming Soon
              </div>
              <p className="text-muted-foreground">New forensics security scenarios are currently in development.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          © 2025 Cyber Sim Lab. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

