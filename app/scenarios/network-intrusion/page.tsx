"use client"

import { useState } from "react"
import { ArrowLeft, Terminal, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIAssistant } from "@/components/ai-assistant"

export default function NetworkIntrusionPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)

  const steps = [
    {
      title: "Initial Assessment",
      description: "Analyze the network logs for suspicious activity",
      content: (
        <div className="space-y-4">
          <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
            <div className="flex items-center gap-2 mb-2">
              <span>{">"}</span>
              <span>Starting network analysis...</span>
            </div>
            <div className="space-y-1">
              <div className="flex">
                <span className="text-green-400 mr-2">$</span>
                <span>scanning ports...</span>
              </div>
              <div className="flex">
                <span className="text-yellow-400 mr-2">!</span>
                <span>Multiple failed login attempts detected</span>
              </div>
              <div className="flex">
                <span className="text-red-400 mr-2">!</span>
                <span>Potential brute force attack in progress</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What would you do next?</h3>
            <div className="grid gap-2">
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => {
                  setCurrentStep(2)
                  setProgress(25)
                }}
              >
                <Shield className="mr-2 h-4 w-4" />
                Block suspicious IP addresses
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => {
                  setCurrentStep(2)
                  setProgress(25)
                }}
              >
                <Terminal className="mr-2 h-4 w-4" />
                Investigate the source of the attacks
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Investigation",
      description: "Deep dive into the attack patterns",
      content: (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attack Analysis</CardTitle>
              <CardDescription>Review the attack patterns and identify the threat actor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Attack Type</h4>
                    <p className="text-sm text-muted-foreground">Brute Force</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Target Ports</h4>
                    <p className="text-sm text-muted-foreground">22, 3389, 445</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Time Window</h4>
                    <p className="text-sm text-muted-foreground">Last 2 hours</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Attempts</h4>
                    <p className="text-sm text-muted-foreground">1,234</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Recommended Actions</h4>
                  <div className="grid gap-2">
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => {
                        setCurrentStep(3)
                        setProgress(50)
                      }}
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Implement rate limiting
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => {
                        setCurrentStep(3)
                        setProgress(50)
                      }}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Update firewall rules
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      title: "Response",
      description: "Implement security measures",
      content: (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Implementation</CardTitle>
              <CardDescription>Apply the necessary security measures to prevent future attacks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Firewall Rules</h4>
                  <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="space-y-1">
                      <div className="flex">
                        <span className="text-green-400 mr-2">$</span>
                        <span>iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --set</span>
                      </div>
                      <div className="flex">
                        <span className="text-green-400 mr-2">$</span>
                        <span>iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --update --seconds 60 --hitcount 4 -j DROP</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Next Steps</h4>
                  <div className="grid gap-2">
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => {
                        setCurrentStep(4)
                        setProgress(75)
                      }}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Monitor for new attacks
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => {
                        setCurrentStep(4)
                        setProgress(75)
                      }}
                    >
                      <Terminal className="mr-2 h-4 w-4" />
                      Review system logs
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      title: "Review",
      description: "Evaluate the response and learn",
      content: (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Complete</CardTitle>
              <CardDescription>Review what you've learned and best practices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Key Learnings</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Importance of monitoring failed login attempts</li>
                    <li>Implementing rate limiting to prevent brute force attacks</li>
                    <li>Using firewall rules to protect vulnerable services</li>
                    <li>Regular review of system logs for suspicious activity</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Best Practices</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Regular security audits and monitoring</li>
                    <li>Implementing strong password policies</li>
                    <li>Using multi-factor authentication</li>
                    <li>Keeping systems and software up to date</li>
                  </ul>
                </div>
                <Button
                  className="w-full"
                  onClick={() => {
                    setProgress(100)
                  }}
                >
                  Complete Scenario
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Network Intrusion Detection</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Learn to detect and respond to network intrusion attempts
            </p>
          </div>
          <Link href="/scenarios">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Scenarios
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">Progress</h2>
              <p className="text-sm text-muted-foreground">
                Step {currentStep} of {steps.length}
              </p>
            </div>
            <div className="w-48">
              <Progress value={progress} />
            </div>
          </div>

          <Tabs value={`step-${currentStep}`} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              {steps.map((step, index) => (
                <TabsTrigger
                  key={index}
                  value={`step-${index + 1}`}
                  onClick={() => {
                    setCurrentStep(index + 1)
                  }}
                >
                  {step.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {steps.map((step, index) => (
              <TabsContent key={index} value={`step-${index + 1}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent>{step.content}</CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <div className="hidden lg:block">
        <AIAssistant 
          scenarioId="network-intrusion"
          initialContext="I'm your Network Intrusion Detection AI assistant. I can help you understand:
- Network security concepts
- Intrusion detection techniques
- Firewall configuration
- Log analysis
- Incident response procedures
- Best practices for network security

Feel free to ask questions about any aspect of network intrusion detection!"
        />
      </div>
    </div>
  )
}

