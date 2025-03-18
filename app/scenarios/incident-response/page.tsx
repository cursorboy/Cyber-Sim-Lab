"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Clock, HelpCircle, Shield, Terminal, User, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/hooks/use-toast"

export default function IncidentResponseScenario() {
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [simulationActive, setSimulationActive] = useState(false)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to CyberDefender Incident Response Terminal",
    "Type 'help' to see available commands",
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [selectedIncident, setSelectedIncident] = useState<number | null>(null)
  const [analyzedIncidents, setAnalyzedIncidents] = useState<number[]>([])
  const [resolvedIncidents, setResolvedIncidents] = useState(0)
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const totalSteps = 6

  const tasks = [
    "Prepare incident response plan",
    "Identify and analyze the security incident",
    "Contain the incident",
    "Eradicate the threat",
    "Recover affected systems",
    "Document lessons learned",
  ]

  // Incident details
  const incidentDetails = {
    type: "Ransomware Attack",
    timestamp: "2025-03-16 08:45:22",
    affectedSystems: ["file-server-01", "workstation-15", "workstation-23"],
    indicators: [
      "Encrypted files with .locked extension",
      "Ransom note (README.txt) on affected systems",
      "Unusual network traffic to external IP 91.242.145.12",
      "Multiple failed authentication attempts before encryption",
    ],
    attackVector: "Phishing email with malicious attachment",
  }

  // System logs
  const systemLogs = [
    {
      id: 1,
      timestamp: "2025-03-16 08:15:33",
      system: "mail-server-01",
      event: "Email received",
      details: "From: invoice@supplies-vendor.com, Subject: Invoice #INV-29581, Attachment: invoice.xlsx",
      suspicious: true,
    },
    {
      id: 2,
      timestamp: "2025-03-16 08:22:45",
      system: "workstation-15",
      event: "File downloaded",
      details: "User jdoe downloaded invoice.xlsx from email",
      suspicious: true,
    },
    {
      id: 3,
      timestamp: "2025-03-16 08:23:12",
      system: "workstation-15",
      event: "Macro execution",
      details: "Microsoft Excel executed macro in invoice.xlsx",
      suspicious: true,
    },
    {
      id: 4,
      timestamp: "2025-03-16 08:25:36",
      system: "workstation-15",
      event: "Process created",
      details: "Process cmd.exe created by excel.exe with command: powershell -enc [base64 encoded command]",
      suspicious: true,
    },
    {
      id: 5,
      timestamp: "2025-03-16 08:27:19",
      system: "workstation-15",
      event: "Network connection",
      details: "Connection to 91.242.145.12:443 established",
      suspicious: true,
    },
    {
      id: 6,
      timestamp: "2025-03-16 08:30:45",
      system: "workstation-15",
      event: "Authentication",
      details: "User jdoe authenticated to file-server-01",
      suspicious: false,
    },
    {
      id: 7,
      timestamp: "2025-03-16 08:35:22",
      system: "file-server-01",
      event: "File operations",
      details: "Multiple file read/write operations from user jdoe",
      suspicious: true,
    },
    {
      id: 8,
      timestamp: "2025-03-16 08:42:15",
      system: "workstation-23",
      event: "Authentication",
      details: "User jdoe authenticated to workstation-23 via remote desktop",
      suspicious: true,
    },
    {
      id: 9,
      timestamp: "2025-03-16 08:45:22",
      system: "file-server-01",
      event: "File operations",
      details: "Mass file modifications - extension changed to .locked",
      suspicious: true,
    },
    {
      id: 10,
      timestamp: "2025-03-16 08:46:05",
      system: "file-server-01",
      event: "File created",
      details: "File README.txt created in multiple directories",
      suspicious: true,
    },
  ]

  // Network connections
  const networkConnections = [
    {
      id: 1,
      source: "workstation-15",
      destination: "91.242.145.12",
      port: 443,
      protocol: "HTTPS",
      status: "ESTABLISHED",
      bytes: 1250000,
      suspicious: true,
    },
    {
      id: 2,
      source: "workstation-15",
      destination: "file-server-01",
      port: 445,
      protocol: "SMB",
      status: "ESTABLISHED",
      bytes: 5600000,
      suspicious: true,
    },
    {
      id: 3,
      source: "workstation-23",
      destination: "file-server-01",
      port: 445,
      protocol: "SMB",
      status: "ESTABLISHED",
      bytes: 2800000,
      suspicious: true,
    },
    {
      id: 4,
      source: "workstation-15",
      destination: "dns-server-01",
      port: 53,
      protocol: "DNS",
      status: "ESTABLISHED",
      bytes: 1200,
      suspicious: false,
    },
    {
      id: 5,
      source: "workstation-15",
      destination: "workstation-23",
      port: 3389,
      protocol: "RDP",
      status: "ESTABLISHED",
      bytes: 450000,
      suspicious: true,
    },
  ]

  // Incident response procedures
  const irProcedures = [
    {
      id: 1,
      phase: "preparation",
      name: "Incident Response Plan",
      description: "Establish an incident response plan with defined roles and procedures",
      implemented: false,
    },
    {
      id: 2,
      phase: "preparation",
      name: "IR Team Formation",
      description: "Form an incident response team with designated roles and responsibilities",
      implemented: false,
    },
    {
      id: 3,
      phase: "preparation",
      name: "Communication Plan",
      description: "Establish communication protocols for incident reporting and updates",
      implemented: false,
    },
    {
      id: 4,
      phase: "identification",
      name: "Log Analysis",
      description: "Analyze system logs to identify indicators of compromise",
      implemented: false,
    },
    {
      id: 5,
      phase: "identification",
      name: "Network Traffic Analysis",
      description: "Analyze network traffic to identify suspicious connections",
      implemented: false,
    },
    {
      id: 6,
      phase: "containment",
      name: "Network Isolation",
      description: "Isolate affected systems from the network to prevent spread",
      implemented: false,
    },
    {
      id: 7,
      phase: "containment",
      name: "Account Lockdown",
      description: "Lock down affected user accounts to prevent further access",
      implemented: false,
    },
    {
      id: 8,
      phase: "eradication",
      name: "Malware Removal",
      description: "Remove malware from affected systems",
      implemented: false,
    },
    {
      id: 9,
      phase: "eradication",
      name: "Vulnerability Patching",
      description: "Patch vulnerabilities that were exploited in the attack",
      implemented: false,
    },
    {
      id: 10,
      phase: "recovery",
      name: "System Restoration",
      description: "Restore systems from clean backups",
      implemented: false,
    },
    {
      id: 11,
      phase: "recovery",
      name: "Verification",
      description: "Verify that systems are clean and functioning properly",
      implemented: false,
    },
    {
      id: 12,
      phase: "lessons_learned",
      name: "Incident Documentation",
      description: "Document the incident, response actions, and outcomes",
      implemented: false,
    },
    {
      id: 13,
      phase: "lessons_learned",
      name: "Process Improvement",
      description: "Identify and implement improvements to security controls and IR processes",
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
    addTerminalLine("System initialized. Starting incident response simulation...")
    addTerminalLine("Loading incident response tools and procedures...")
    addTerminalLine("Environment ready. You can now begin your investigation.")
    addTerminalLine("Type 'incident' to view details of the current security incident.")

    toast({
      title: "Simulation Started",
      description: "Use terminal commands to respond to the security incident.",
      duration: 3000,
    })
  }

  const addTerminalLine = (line: string) => {
    setTerminalHistory((prev) => [...prev, line])
  }

  const handleTerminalInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && terminalInput.trim()) {
      processCommand(terminalInput.trim().toLowerCase())
      setTerminalInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setTerminalInput("")
      }
    }
  }

  const processCommand = (command: string) => {
    setCommandHistory([...commandHistory, command])
    setHistoryIndex(-1)

    switch (command) {
      case "help":
        setTerminalHistory([
          ...terminalHistory,
          "\nAvailable commands:",
          "help - Show this help message",
          "incident - View incident details",
          "procedures - View incident response procedures",
          "tasks - View current tasks",
          "clear - Clear the terminal",
        ])
        break
      case "clear":
        setTerminalHistory([])
        break
      case "incident":
        if (selectedIncident === null) {
          setTerminalHistory([
            ...terminalHistory,
            "\nIncident Report #1:",
            "Type: Ransomware Attack",
            "Status: Active",
            "Affected Systems: Multiple workstations and servers",
            "Initial Detection: Automated alert from EDR system",
            "Current Phase: Initial Response",
            "\nUse 'analyze 1' to begin analysis.",
          ])
        } else {
          setTerminalHistory([
            ...terminalHistory,
            "\nIncident #1 is already under analysis.",
            "Use 'procedures' to view response procedures.",
          ])
        }
        break
      case "procedures":
        setTerminalHistory([
          ...terminalHistory,
          "\nIncident Response Procedures:",
          "1. Initial Response",
          "2. Containment",
          "3. Eradication",
          "4. Recovery",
          "\nUse 'implement [number]' to execute a procedure.",
        ])
        break
      case "tasks":
        setTerminalHistory([
          ...terminalHistory,
          "\nCurrent Tasks:",
          ...tasks.map((task, index) => `${index + 1}. ${task} ${completedTasks.includes(task) ? "[✓]" : ""}`),
        ])
        break
      default:
        if (command.startsWith("analyze")) {
          const id = parseInt(command.split(" ")[1])
          if (!isNaN(id) && !analyzedIncidents.includes(id)) {
            setAnalyzedIncidents([...analyzedIncidents, id])
            setSelectedIncident(id)
            setTerminalHistory([
              ...terminalHistory,
              "\nAnalyzing Incident #" + id,
              "- Multiple encrypted files detected",
              "- Ransom note found on affected systems",
              "- Network traffic shows communication with known C2 servers",
              "\nRecommendation: Proceed with containment procedures.",
            ])
            if (!completedTasks.includes("Analyze the security incident")) {
              setCompletedTasks([...completedTasks, "Analyze the security incident"])
            }
          } else {
            setTerminalHistory([...terminalHistory, "\nInvalid incident ID or already analyzed."])
          }
        } else if (command.startsWith("implement")) {
          const id = parseInt(command.split(" ")[1])
          if (!isNaN(id) && id >= 1 && id <= 4) {
            const procedures = [
              "Initiating incident response plan...",
              "Implementing containment measures...",
              "Executing eradication procedures...",
              "Beginning recovery process...",
            ]
            setTerminalHistory([...terminalHistory, "\n" + procedures[id - 1]])
            const tasks = [
              "Initialize incident response",
              "Contain the threat",
              "Remove the malware",
              "Restore affected systems",
            ]
            if (!completedTasks.includes(tasks[id - 1])) {
              setCompletedTasks([...completedTasks, tasks[id - 1]])
            }
          } else {
            setTerminalHistory([...terminalHistory, "\nInvalid procedure ID. Use 'procedures' to view available procedures."])
          }
        } else {
          setTerminalHistory([...terminalHistory, "\nUnknown command. Type 'help' for available commands."])
        }
    }
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
            <h1 className="text-3xl font-bold">Incident Response</h1>
            <p className="text-muted-foreground">
              Learn to identify, analyze, and respond to security incidents in real-time.
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
                        <span>45:00</span>
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
                              Use terminal commands to manage the incident response process. Type 'help' to see available commands.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <CardDescription>Guide your organization through a structured incident response process</CardDescription>
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
                      onClick={() => processCommand("incident")}
                      disabled={!simulationActive}
                    >
                      incident
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => processCommand("procedures")}
                      disabled={!simulationActive}
                    >
                      procedures
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
                          "Welcome to CyberDefender Incident Response Terminal",
                          "Type 'help' to see available commands",
                        ])
                        setSelectedIncident(null)
                        setAnalyzedIncidents([])
                        setResolvedIncidents(0)
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

