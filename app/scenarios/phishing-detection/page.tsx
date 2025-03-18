"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Clock, HelpCircle, Search, Shield, Terminal, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/hooks/use-toast"

export default function PhishingDetectionScenario() {
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [simulationActive, setSimulationActive] = useState(false)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to CyberDefender Phishing Detection Terminal",
    "Type 'help' to see available commands",
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null)
  const [analyzedEmails, setAnalyzedEmails] = useState<number[]>([])
  const [detectedThreats, setDetectedThreats] = useState(0)
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const totalSteps = 5

  const tasks = [
    "Examine email headers",
    "Identify phishing indicators",
    "Analyze suspicious links",
    "Classify emails as safe or malicious",
    "Report phishing attempts",
  ]

  const emails = [
    {
      id: 1,
      sender: "paypal-service@paypa1-secure.com",
      subject: "Your PayPal account has been limited",
      date: "Today, 10:23 AM",
      preview:
        "Dear valued customer, We've noticed some unusual activity on your PayPal account. Your account has been temporarily limited. Click here to verify your information...",
      body: `Dear valued customer,

We've noticed some unusual activity on your PayPal account. To ensure your account security, we've temporarily limited some features.

To restore full access to your account, please verify your information by clicking the link below:

https://paypa1-secure.com/verify/account

If you don't verify your information within 24 hours, your account access will be permanently limited.

Thank you for your cooperation,
PayPal Security Team`,
      headers: {
        From: "PayPal Service <paypal-service@paypa1-secure.com>",
        To: "customer@example.com",
        Subject: "Your PayPal account has been limited",
        Date: "Mon, 16 Mar 2025 10:23:15 -0700",
        "Message-ID": "<a1b2c3d4e5@paypa1-secure.com>",
        "MIME-Version": "1.0",
        "Content-Type": "text/html; charset=UTF-8",
        "X-Mailer": "PHPMailer 6.0.5",
      },
      links: ["https://paypa1-secure.com/verify/account"],
      isPhishing: true,
      indicators: [
        "Sender email domain is misspelled (paypa1 instead of paypal)",
        "Creates urgency with account limitation",
        "Generic greeting instead of using your name",
        "Suspicious link URL with misspelled domain",
        "Threat of account limitation to create urgency",
      ],
    },
    {
      id: 2,
      sender: "newsletter@amazon.com",
      subject: "Your Amazon order #A123456 has shipped",
      date: "Today, 9:15 AM",
      preview:
        "Hello Alex, Your recent Amazon order #A123456 has shipped and is on its way. You can track your package using the link in your account...",
      body: `Hello Alex,

Your recent Amazon order #A123456 has shipped and is on its way!

Order Details:
- Order #: A123456
- Estimated Delivery: March 19, 2025
- Items: Wireless Headphones, USB Cable

You can track your package by visiting Your Orders in your Amazon account.

Thank you for shopping with Amazon!

Amazon Customer Service`,
      headers: {
        From: "Amazon.com <newsletter@amazon.com>",
        To: "alex@example.com",
        Subject: "Your Amazon order #A123456 has shipped",
        Date: "Mon, 16 Mar 2025 09:15:22 -0700",
        "Message-ID": "<987654321@amazon.com>",
        "MIME-Version": "1.0",
        "Content-Type": "text/html; charset=UTF-8",
        "X-SES-Outgoing": "2025.03.16-54.240.8.23",
        "Feedback-ID": "1.us-east-1.DI59RGTJVgj4T4/f8AJ8UHO2DfE=:AmazonSES",
      },
      links: ["https://www.amazon.com/gp/css/order-history"],
      isPhishing: false,
      indicators: [
        "Legitimate amazon.com domain",
        "Addresses you by name",
        "References specific order number",
        "No suspicious links or attachments",
        "No urgent call to action",
        "Proper Amazon email headers",
      ],
    },
    {
      id: 3,
      sender: "security-alert@g00gle.security-check.com",
      subject: "⚠️ URGENT: Your Google account has been compromised",
      date: "Yesterday, 2:30 PM",
      preview:
        "We have detected unauthorized access to your Google account from a new device in [Location]. If this wasn't you, your account may be compromised. Click here to secure your account immediately...",
      body: `⚠️ URGENT SECURITY ALERT ⚠️

We have detected unauthorized access to your Google account from a new device in Moscow, Russia.

Device: Windows PC
Browser: Chrome
IP Address: 185.159.82.54
Date: March 15, 2025, 14:22:45 UTC

If this wasn't you, your account may be compromised. 

CLICK HERE TO SECURE YOUR ACCOUNT IMMEDIATELY: https://g00gle.security-check.com/secure-account

Failure to verify your account within 24 hours will result in account suspension.

Google Security Team`,
      headers: {
        From: "Google Security <security-alert@g00gle.security-check.com>",
        To: "user@example.com",
        Subject: "⚠️ URGENT: Your Google account has been compromised",
        Date: "Sun, 15 Mar 2025 14:30:22 -0700",
        "Message-ID": "<abc123xyz@g00gle.security-check.com>",
        "MIME-Version": "1.0",
        "Content-Type": "text/html; charset=UTF-8",
        "X-Mailer": "PHPMailer 6.1.7",
      },
      links: ["https://g00gle.security-check.com/secure-account"],
      isPhishing: true,
      indicators: [
        "Suspicious domain (not google.com)",
        "Misspelled domain (g00gle instead of google)",
        "Creates urgency with security alert",
        "Uses excessive formatting (warning emoji)",
        "Suspicious link URL",
        "Threat of account suspension to create urgency",
      ],
    },
    {
      id: 4,
      sender: "support@dropbox.com",
      subject: "Your Dropbox shared document",
      date: "Yesterday, 11:20 AM",
      preview: "A document has been shared with you on Dropbox. Click here to view the document...",
      body: `Hello,

A document has been shared with you on Dropbox.

Document: Q1 Financial Report.pdf
Shared by: finance@yourcompany.com
Message: "Here's the Q1 financial report for your review."

You can view this document by signing in to your Dropbox account.

The Dropbox Team`,
      headers: {
        From: "Dropbox <support@dropbox.com>",
        To: "recipient@example.com",
        Subject: "Your Dropbox shared document",
        Date: "Sun, 15 Mar 2025 11:20:05 -0700",
        "Message-ID": "<dropbox-share-notification-5678@dropbox.com>",
        "MIME-Version": "1.0",
        "Content-Type": "text/html; charset=UTF-8",
        "X-Dropbox-Message-ID": "12345abcde",
        "Feedback-ID": "45:account:dropbox",
      },
      links: ["https://www.dropbox.com/home"],
      isPhishing: false,
      indicators: [
        "Legitimate dropbox.com domain",
        "Simple, direct message",
        "No urgent call to action",
        "No request for personal information",
        "Proper Dropbox email headers",
      ],
    },
    {
      id: 5,
      sender: "bank-secure@bankofamerica-secure.info",
      subject: "ALERT: Your Bank of America account needs verification",
      date: "2 days ago, 3:45 PM",
      preview:
        "Dear customer, Due to scheduled system maintenance, we require all customers to verify their account information. Failure to do so within 24 hours will result in account suspension...",
      body: `Dear valued customer,

Due to scheduled system maintenance, we require all customers to verify their account information. Failure to do so within 24 hours will result in account suspension.

Please click the link below to verify your account:

https://bankofamerica-secure.info/verify

You will need to provide the following information:
- Full name
- Account number
- Social Security Number
- Online banking password
- Credit card information (for verification purposes only)

Thank you for your cooperation,
Bank of America Security Team`,
      headers: {
        From: "Bank of America <bank-secure@bankofamerica-secure.info>",
        To: "customer@example.com",
        Subject: "ALERT: Your Bank of America account needs verification",
        Date: "Sat, 14 Mar 2025 15:45:30 -0700",
        "Message-ID": "<bofa-alert-12345@bankofamerica-secure.info>",
        "MIME-Version": "1.0",
        "Content-Type": "text/html; charset=UTF-8",
        "X-Mailer": "PHPMailer 6.2.0",
      },
      links: ["https://bankofamerica-secure.info/verify"],
      isPhishing: true,
      indicators: [
        "Suspicious domain (not bankofamerica.com)",
        "Creates urgency with threat of account suspension",
        "Generic greeting",
        "Requests sensitive information (SSN, password, credit card)",
        "Suspicious link URL",
        "Suspicious reason for verification (system maintenance)",
      ],
    },
  ]

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalHistory])

  useEffect(() => {
    if (simulationActive && inputRef.current) {
      inputRef.current.focus()
    }
  }, [simulationActive])

  const startSimulation = () => {
    setSimulationActive(true)
    addTerminalLine("System initialized. Starting email security environment...")
    addTerminalLine("Loading email analysis tools...")
    addTerminalLine("Environment ready. You can now begin your investigation.")
    addTerminalLine("Type 'list' to view available emails.")

    toast({
      title: "Simulation Started",
      description: "Use terminal commands to analyze emails and identify phishing attempts.",
      duration: 3000,
    })
  }

  const addTerminalLine = (line: string) => {
    setTerminalHistory((prev) => [...prev, line])
  }

  const handleTerminalInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && terminalInput.trim()) {
      const command = terminalInput.trim()
      processCommand(command)
      setCommandHistory((prev) => [...prev, command])
      setHistoryIndex(-1)
      setTerminalInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setTerminalInput("")
      }
    }
  }

  const processCommand = (command: string) => {
    addTerminalLine(`$ ${command}`)

    const args = command.split(" ")
    const cmd = args[0].toLowerCase()

    switch (cmd) {
      case "help":
        showHelp()
        break
      case "list":
        listEmails()
        break
      case "view":
        viewEmail(Number.parseInt(args[1]))
        break
      case "headers":
        showHeaders(Number.parseInt(args[1]))
        break
      case "analyze":
        analyzeEmail(Number.parseInt(args[1]))
        break
      case "links":
        checkLinks(Number.parseInt(args[1]))
        break
      case "classify":
        classifyEmail(Number.parseInt(args[1]), args[2])
        break
      case "report":
        reportPhishing(Number.parseInt(args[1]))
        break
      case "tasks":
        showTasks()
        break
      case "clear":
        setTerminalHistory([])
        break
      default:
        addTerminalLine(`Command not found: ${cmd}. Type 'help' for available commands.`)
    }
  }

  const showHelp = () => {
    addTerminalLine("Available commands:")
    addTerminalLine("  help                - Show this help message")
    addTerminalLine("  list                - List all emails")
    addTerminalLine("  view [id]           - View email content")
    addTerminalLine("  headers [id]        - Show email headers")
    addTerminalLine("  analyze [id]        - Analyze email for phishing indicators")
    addTerminalLine("  links [id]          - Check links in the email")
    addTerminalLine("  classify [id] [safe|phishing] - Classify email as safe or phishing")
    addTerminalLine("  report [id]         - Report phishing email")
    addTerminalLine("  tasks               - Show current tasks")
    addTerminalLine("  clear               - Clear terminal")
  }

  const listEmails = () => {
    addTerminalLine("Available Emails:")
    addTerminalLine("ID  From                                  Subject                                       Date")
    addTerminalLine(
      "--  ------------------------------------  --------------------------------------------  ---------------",
    )

    emails.forEach((email) => {
      const id = email.id.toString().padEnd(4)
      const sender = email.sender.padEnd(38)
      const subject = email.subject.length > 44 ? email.subject.substring(0, 41) + "..." : email.subject.padEnd(44)
      const date = email.date

      addTerminalLine(`${id}${sender}${subject}${date}`)
    })
  }

  const viewEmail = (id: number) => {
    const email = emails.find((e) => e.id === id)

    if (!email) {
      addTerminalLine(`Email with ID ${id} not found.`)
      return
    }

    setSelectedEmail(id)

    addTerminalLine("=== Email Content ===")
    addTerminalLine(`From: ${email.sender}`)
    addTerminalLine(`Subject: ${email.subject}`)
    addTerminalLine(`Date: ${email.date}`)
    addTerminalLine("")
    addTerminalLine(email.body)
    addTerminalLine("===================")

    if (!analyzedEmails.includes(id)) {
      setAnalyzedEmails((prev) => [...prev, id])
    }
  }

  const showHeaders = (id: number) => {
    const email = emails.find((e) => e.id === id)

    if (!email) {
      addTerminalLine(`Email with ID ${id} not found.`)
      return
    }

    addTerminalLine("=== Email Headers ===")
    Object.entries(email.headers).forEach(([key, value]) => {
      addTerminalLine(`${key}: ${value}`)
    })
    addTerminalLine("=====================")

    if (!completedTasks.includes("Examine email headers")) {
      setCompletedTasks((prev) => [...prev, "Examine email headers"])
      toast({
        title: "Task Completed",
        description: "You've successfully examined email headers.",
        duration: 3000,
      })
    }
  }

  const analyzeEmail = (id: number) => {
    const email = emails.find((e) => e.id === id)

    if (!email) {
      addTerminalLine(`Email with ID ${id} not found.`)
      return
    }

    addTerminalLine("=== Phishing Analysis ===")
    addTerminalLine(`Analyzing email ID ${id} from ${email.sender}...`)

    setTimeout(() => {
      if (email.isPhishing) {
        addTerminalLine("WARNING: This email contains multiple phishing indicators:")
        email.indicators.forEach((indicator, index) => {
          addTerminalLine(`${index + 1}. ${indicator}`)
        })
        addTerminalLine("Recommendation: This email is likely a phishing attempt.")
      } else {
        addTerminalLine("No suspicious indicators detected. This email appears to be legitimate:")
        email.indicators.forEach((indicator, index) => {
          addTerminalLine(`${index + 1}. ${indicator}`)
        })
        addTerminalLine("Recommendation: This email is likely safe.")
      }
      addTerminalLine("=========================")

      if (!completedTasks.includes("Identify phishing indicators")) {
        setCompletedTasks((prev) => [...prev, "Identify phishing indicators"])
        toast({
          title: "Task Completed",
          description: "You've successfully identified phishing indicators.",
          duration: 3000,
        })
      }
    }, 1500)
  }

  const checkLinks = (id: number) => {
    const email = emails.find((e) => e.id === id)

    if (!email) {
      addTerminalLine(`Email with ID ${id} not found.`)
      return
    }

    addTerminalLine("=== Link Analysis ===")
    addTerminalLine(`Analyzing links in email ID ${id}...`)

    setTimeout(() => {
      if (email.links.length === 0) {
        addTerminalLine("No links found in this email.")
      } else {
        addTerminalLine(`Found ${email.links.length} link(s):`)

        email.links.forEach((link, index) => {
          addTerminalLine(`${index + 1}. ${link}`)

          if (email.isPhishing) {
            if (link.includes("paypa1") || link.includes("g00gle") || link.includes("bankofamerica-secure.info")) {
              addTerminalLine(`   WARNING: Suspicious URL detected. This appears to be a phishing link.`)
              addTerminalLine(`   - Domain is similar to a legitimate service but is misspelled or suspicious.`)
              addTerminalLine(`   - This link likely leads to a fake website designed to steal credentials.`)
            }
          } else {
            addTerminalLine(`   This appears to be a legitimate link to ${new URL(link).hostname}.`)
          }
        })
      }
      addTerminalLine("=====================")

      if (!completedTasks.includes("Analyze suspicious links")) {
        setCompletedTasks((prev) => [...prev, "Analyze suspicious links"])
        toast({
          title: "Task Completed",
          description: "You've successfully analyzed suspicious links.",
          duration: 3000,
        })
      }
    }, 1500)
  }

  const classifyEmail = (id: number, classification?: string) => {
    const email = emails.find((e) => e.id === id)

    if (!email) {
      addTerminalLine(`Email with ID ${id} not found.`)
      return
    }

    if (!classification || (classification !== "safe" && classification !== "phishing")) {
      addTerminalLine("Usage: classify [id] [safe|phishing]")
      return
    }

    const isCorrect =
      (classification === "phishing" && email.isPhishing) || (classification === "safe" && !email.isPhishing)

    addTerminalLine(`Classifying email ID ${id} as ${classification}...`)

    setTimeout(() => {
      if (isCorrect) {
        addTerminalLine(`Correct classification! Email ID ${id} is indeed ${classification}.`)

        if (!completedTasks.includes("Classify emails as safe or malicious")) {
          setCompletedTasks((prev) => [...prev, "Classify emails as safe or malicious"])
          toast({
            title: "Task Completed",
            description: "You've successfully classified emails as safe or malicious.",
            duration: 3000,
          })
        }
      } else {
        addTerminalLine(`Incorrect classification. Please analyze the email more carefully.`)
      }
    }, 1000)
  }

  const reportPhishing = (id: number) => {
    const email = emails.find((e) => e.id === id)

    if (!email) {
      addTerminalLine(`Email with ID ${id} not found.`)
      return
    }

    addTerminalLine(`Reporting email ID ${id} as phishing...`)

    setTimeout(() => {
      if (email.isPhishing) {
        addTerminalLine("Thank you for your report. This email has been confirmed as phishing.")
        addTerminalLine("The following actions have been taken:")
        addTerminalLine("1. Email has been removed from the inbox")
        addTerminalLine("2. Sender has been added to block list")
        addTerminalLine("3. Similar emails sent to other users have been quarantined")
        addTerminalLine("4. Security team has been notified for further investigation")

        if (!completedTasks.includes("Report phishing attempts")) {
          setCompletedTasks((prev) => [...prev, "Report phishing attempts"])
          toast({
            title: "Task Completed",
            description: "You've successfully reported phishing attempts.",
            duration: 3000,
          })
        }
      } else {
        addTerminalLine("This email does not appear to be phishing. No action taken.")
        addTerminalLine("If you believe this is a mistake, please analyze the email again.")
      }
    }, 1500)
  }

  const showTasks = () => {
    addTerminalLine("Current Tasks:")
    tasks.forEach((task, index) => {
      const completed = completedTasks.includes(task)
      addTerminalLine(`${index + 1}. [${completed ? "X" : " "}] ${task}`)
    })
    addTerminalLine(`Progress: ${completedTasks.length}/${tasks.length} tasks completed`)
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setProgress((currentStep / totalSteps) * 100)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setProgress(((currentStep - 2) / totalSteps) * 100)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Phishing Detection</h1>
            <p className="text-muted-foreground">
              Learn to identify and analyze phishing attempts in a simulated environment.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Interactive Terminal</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>20:00</span>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Use terminal commands to analyze emails and identify phishing attempts. Type 'help' to see
                              available commands.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <CardDescription>Identify and analyze potential phishing emails</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-md p-4 font-mono text-sm text-green-400 h-[400px] flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <Terminal className="h-5 w-5" />
                      <span className="text-white">CyberDefender Terminal</span>
                    </div>
                    <div className="flex-1 overflow-auto mb-2" ref={terminalRef}>
                      {terminalHistory.map((line, index) => (
                        <div key={index} className="py-0.5 break-words whitespace-pre-wrap">
                          {line}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        onKeyDown={handleTerminalInput}
                        className="flex-1 bg-transparent outline-none"
                        disabled={!simulationActive}
                      />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => processCommand("list")}
                      disabled={!simulationActive}
                    >
                      list
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => processCommand("analyze 1")}
                      disabled={!simulationActive}
                    >
                      analyze
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => processCommand("help")}
                      disabled={!simulationActive}
                    >
                      help
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => processCommand("tasks")}
                      disabled={!simulationActive}
                    >
                      tasks
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button onClick={startSimulation} disabled={simulationActive}>
                      Start Simulation
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-1"
                      disabled={!simulationActive}
                      onClick={() => {
                        setTerminalHistory([
                          "Welcome to CyberDefender Phishing Detection Terminal",
                          "Type 'help' to see available commands",
                        ])
                        setSelectedEmail(null)
                        setAnalyzedEmails([])
                        setCompletedTasks([])
                        setSimulationActive(false)
                        toast({
                          title: "Simulation Reset",
                          description: "The simulation has been reset.",
                          duration: 3000,
                        })
                      }}
                    >
                      <Search className="h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                  <div className="text-sm">
                    Tasks Completed:{" "}
                    <span className="font-bold">
                      {completedTasks.length}/{tasks.length}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

