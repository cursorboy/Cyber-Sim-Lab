"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Clock, HelpCircle, Shield, Terminal, User } from "lucide-react"

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
  const [incidentPhase, setIncidentPhase] = useState("preparation")
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
      case "incident":
        showIncidentDetails()
        break
      case "logs":
        showSystemLogs()
        break
      case "netstat":
        showNetworkConnections()
        break
      case "analyze":
        analyzeLog(args[1])
        break
      case "examine":
        examineConnection(args[1])
        break
      case "procedures":
        showIRProcedures()
        break
      case "implement":
        implementProcedure(args[1])
        break
      case "phase":
        changePhase(args[1])
        break
      case "isolate":
        isolateSystem(args[1])
        break
      case "lockaccount":
        lockUserAccount(args[1])
        break
      case "restore":
        restoreSystem(args[1])
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
    addTerminalLine("  incident            - Show details of the current security incident")
    addTerminalLine("  logs                - Show system logs")
    addTerminalLine("  netstat             - Show network connections")
    addTerminalLine("  analyze [id]        - Analyze a specific log entry")
    addTerminalLine("  examine [id]        - Examine a network connection")
    addTerminalLine("  procedures          - Show incident response procedures")
    addTerminalLine("  implement [id]      - Implement an incident response procedure")
    addTerminalLine("  phase [name]        - Change to a different incident response phase")
    addTerminalLine("  isolate [system]    - Isolate a system from the network")
    addTerminalLine("  lockaccount [user]  - Lock a user account")
    addTerminalLine("  restore [system]    - Restore a system from backup")
    addTerminalLine("  report              - Generate an incident response report")
    addTerminalLine("  tasks               - Show current tasks")
    addTerminalLine("  clear               - Clear terminal")
  }

  const showIncidentDetails = () => {
    addTerminalLine("=== Current Security Incident ===")
    addTerminalLine(`Type: ${incidentDetails.type}`)
    addTerminalLine(`Timestamp: ${incidentDetails.timestamp}`)
    addTerminalLine(`Affected Systems: ${incidentDetails.affectedSystems.join(", ")}`)
    addTerminalLine("")
    addTerminalLine("Indicators of Compromise:")
    incidentDetails.indicators.forEach((indicator, index) => {
      addTerminalLine(`  ${index + 1}. ${indicator}`)
    })
    addTerminalLine("")
    addTerminalLine(`Attack Vector: ${incidentDetails.attackVector}`)
    addTerminalLine("================================")

    if (!completedTasks.includes("Identify and analyze the security incident")) {
      setCompletedTasks((prev) => [...prev, "Identify and analyze the security incident"])
      toast({
        title: "Task Completed",
        description: "You've successfully identified and analyzed the security incident.",
        duration: 3000,
      })
    }
  }

  const showSystemLogs = () => {
    addTerminalLine("System Logs:")
    addTerminalLine("ID  Timestamp               System         Event                Details")
    addTerminalLine("--  ----------------------  -------------  -------------------  -------------------------------")

    systemLogs.forEach((log) => {
      const id = log.id.toString().padEnd(4)
      const timestamp = log.timestamp.padEnd(24)
      const system = log.system.padEnd(15)
      const event = log.event.padEnd(21)
      const details = log.details.length > 30 ? log.details.substring(0, 27) + "..." : log.details

      addTerminalLine(`${id}${timestamp}${system}${event}${details}`)
    })

    if (!completedTasks.includes("Identify and analyze the security incident")) {
      setCompletedTasks((prev) => [...prev, "Identify and analyze the security incident"])
      toast({
        title: "Task Completed",
        description: "You've successfully identified and analyzed the security incident.",
        duration: 3000,
      })
    }
  }

  const showNetworkConnections = () => {
    addTerminalLine("Network Connections:")
    addTerminalLine("ID  Source         Destination     Port  Protocol  Status        Bytes")
    addTerminalLine("--  -------------  -------------  -----  --------  ------------  --------")

    networkConnections.forEach((conn) => {
      const id = conn.id.toString().padEnd(4)
      const source = conn.source.padEnd(15)
      const destination = conn.destination.padEnd(15)
      const port = conn.port.toString().padEnd(7)
      const protocol = conn.protocol.padEnd(10)
      const status = conn.status.padEnd(14)
      const bytes = conn.bytes.toString()

      addTerminalLine(`${id}${source}${destination}${port}${protocol}${status}${bytes}`)
    })

    if (!completedTasks.includes("Identify and analyze the security incident")) {
      setCompletedTasks((prev) => [...prev, "Identify and analyze the security incident"])
      toast({
        title: "Task Completed",
        description: "You've successfully identified and analyzed the security incident.",
        duration: 3000,
      })
    }
  }

  const analyzeLog = (id?: string) => {
    if (!id) {
      addTerminalLine("Usage: analyze [id]")
      return
    }

    const logId = Number.parseInt(id)
    const log = systemLogs.find((l) => l.id === logId)

    if (!log) {
      addTerminalLine(`Log entry with ID ${id} not found.`)
      return
    }

    addTerminalLine(`Analyzing log entry ID ${id}...`)

    setTimeout(() => {
      addTerminalLine("=== Log Analysis ===")
      addTerminalLine(`Timestamp: ${log.timestamp}`)
      addTerminalLine(`System: ${log.system}`)
      addTerminalLine(`Event: ${log.event}`)
      addTerminalLine(`Details: ${log.details}`)

      if (log.suspicious) {
        addTerminalLine("")
        addTerminalLine("WARNING: This log entry indicates suspicious activity!")

        // Provide specific analysis based on the log
        if (log.id === 1) {
          addTerminalLine("Analysis: This email appears to be the initial attack vector.")
          addTerminalLine("The email contains a malicious attachment that likely initiated the ransomware attack.")
        } else if (log.id === 3) {
          addTerminalLine("Analysis: Macro execution in the Excel file indicates malicious code execution.")
          addTerminalLine("This is a common technique used in ransomware attacks to establish initial access.")
        } else if (log.id === 4) {
          addTerminalLine("Analysis: Command execution shows the malware using PowerShell with encoded commands.")
          addTerminalLine("This is likely used to evade detection and download additional malicious components.")
        } else if (log.id === 5) {
          addTerminalLine("Analysis: Connection to external IP indicates command and control communication.")
          addTerminalLine("The malware is communicating with its control server to receive instructions.")
        } else if (log.id === 7) {
          addTerminalLine("Analysis: Multiple file operations on the file server indicate the encryption process.")
          addTerminalLine("The ransomware is accessing files to encrypt them.")
        } else if (log.id === 9) {
          addTerminalLine("Analysis: Mass file modifications show the encryption of files by the ransomware.")
          addTerminalLine("Files are being encrypted and renamed with the .locked extension.")
        }
      } else {
        addTerminalLine("")
        addTerminalLine("This log entry appears to be normal system activity.")
      }
      addTerminalLine("====================")

      if (!completedTasks.includes("Identify and analyze the security incident")) {
        setCompletedTasks((prev) => [...prev, "Identify and analyze the security incident"])
        toast({
          title: "Task Completed",
          description: "You've successfully identified and analyzed the security incident.",
          duration: 3000,
        })
      }
    }, 1500)
  }

  const examineConnection = (id?: string) => {
    if (!id) {
      addTerminalLine("Usage: examine [id]")
      return
    }

    const connId = Number.parseInt(id)
    const connection = networkConnections.find((c) => c.id === connId)

    if (!connection) {
      addTerminalLine(`Network connection with ID ${id} not found.`)
      return
    }

    addTerminalLine(`Examining network connection ID ${id}...`)

    setTimeout(() => {
      addTerminalLine("=== Connection Analysis ===")
      addTerminalLine(`Source: ${connection.source}`)
      addTerminalLine(`Destination: ${connection.destination}`)
      addTerminalLine(`Port: ${connection.port}`)
      addTerminalLine(`Protocol: ${connection.protocol}`)
      addTerminalLine(`Status: ${connection.status}`)
      addTerminalLine(`Data Transferred: ${connection.bytes} bytes`)

      if (connection.suspicious) {
        addTerminalLine("")
        addTerminalLine("WARNING: This connection is suspicious!")

        // Provide specific analysis based on the connection
        if (connection.id === 1) {
          addTerminalLine("Analysis: Connection to external IP 91.242.145.12 is likely command and control traffic.")
          addTerminalLine("This IP is associated with the ransomware's control infrastructure.")
        } else if (connection.id === 2 || connection.id === 3) {
          addTerminalLine("Analysis: Large data transfer to file server indicates file access for encryption.")
          addTerminalLine("The ransomware is accessing and encrypting files on the server.")
        } else if (connection.id === 5) {
          addTerminalLine("Analysis: RDP connection between workstations indicates lateral movement.")
          addTerminalLine("The attacker is moving between systems to spread the ransomware.")
        }
      } else {
        addTerminalLine("")
        addTerminalLine("This connection appears to be normal network traffic.")
      }
      addTerminalLine("==========================")

      if (!completedTasks.includes("Identify and analyze the security incident")) {
        setCompletedTasks((prev) => [...prev, "Identify and analyze the security incident"])
        toast({
          title: "Task Completed",
          description: "You've successfully identified and analyzed the security incident.",
          duration: 3000,
        })
      }
    }, 1500)
  }

  const showIRProcedures = () => {
    addTerminalLine("Incident Response Procedures:")
    addTerminalLine("ID  Phase              Name                      Status           Description")
    addTerminalLine(
      "--  -----------------  ------------------------  ---------------  -----------------------------------------",
    )

    // Filter procedures based on current phase
    const relevantProcedures = irProcedures.filter(
      (p) => p.phase === incidentPhase || (incidentPhase === "identification" && p.phase === "preparation"),
    )

    relevantProcedures.forEach((procedure) => {
      const id = procedure.id.toString().padEnd(4)
      const phase = procedure.phase.padEnd(19)
      const name = procedure.name.padEnd(26)
      const status = procedure.implemented ? "Implemented".padEnd(17) : "Not Implemented".padEnd(17)
      const description = procedure.description

      addTerminalLine(`${id}${phase}${name}${status}${description}`)
    })

    addTerminalLine("")
    addTerminalLine("Use 'implement [id]' to implement a procedure.")
    addTerminalLine("Use 'phase [name]' to change to a different phase.")
    addTerminalLine(
      "Available phases: preparation, identification, containment, eradication, recovery, lessons_learned",
    )
  }

  const implementProcedure = (id?: string) => {
    if (!id) {
      addTerminalLine("Usage: implement [id]")
      return
    }

    const procedureId = Number.parseInt(id)
    const procedure = irProcedures.find((p) => p.id === procedureId)

    if (!procedure) {
      addTerminalLine(`Procedure with ID ${id} not found.`)
      return
    }

    // Check if the procedure is relevant to the current phase
    if (
      procedure.phase !== incidentPhase &&
      !(incidentPhase === "identification" && procedure.phase === "preparation")
    ) {
      addTerminalLine(`This procedure is not relevant to the current phase (${incidentPhase}).`)
      addTerminalLine(`Use 'phase ${procedure.phase}' to change to the appropriate phase.`)
      return
    }

    addTerminalLine(`Implementing procedure: ${procedure.name}...`)

    setTimeout(() => {
      // Update the procedure status
      const updatedProcedures = [...irProcedures]
      const index = updatedProcedures.findIndex((p) => p.id === procedureId)
      if (index !== -1) {
        updatedProcedures[index] = { ...updatedProcedures[index], implemented: true }
      }

      // Update task completion based on implemented procedures
      if (procedure.phase === "preparation" && !completedTasks.includes("Prepare incident response plan")) {
        // Check if all preparation procedures are implemented
        const allPrepImplemented = updatedProcedures
          .filter((p) => p.phase === "preparation")
          .every((p) => p.id === procedureId || p.implemented)

        if (allPrepImplemented || procedureId === 1) {
          setCompletedTasks((prev) => [...prev, "Prepare incident response plan"])
          toast({
            title: "Task Completed",
            description: "You've successfully prepared an incident response plan.",
            duration: 3000,
          })
        }
      } else if (procedure.phase === "containment" && !completedTasks.includes("Contain the incident")) {
        // Check if all containment procedures are implemented
        const allContainmentImplemented = updatedProcedures
          .filter((p) => p.phase === "containment")
          .every((p) => p.id === procedureId || p.implemented)

        if (allContainmentImplemented || procedureId === 6) {
          setCompletedTasks((prev) => [...prev, "Contain the incident"])
          toast({
            title: "Task Completed",
            description: "You've successfully contained the incident.",
            duration: 3000,
          })
        }
      } else if (procedure.phase === "eradication" && !completedTasks.includes("Eradicate the threat")) {
        // Check if all eradication procedures are implemented
        const allEradicationImplemented = updatedProcedures
          .filter((p) => p.phase === "eradication")
          .every((p) => p.id === procedureId || p.implemented)

        if (allEradicationImplemented || procedureId === 8) {
          setCompletedTasks((prev) => [...prev, "Eradicate the threat"])
          toast({
            title: "Task Completed",
            description: "You've successfully eradicated the threat.",
            duration: 3000,
          })
        }
      } else if (procedure.phase === "recovery" && !completedTasks.includes("Recover affected systems")) {
        // Check if all recovery procedures are implemented
        const allRecoveryImplemented = updatedProcedures
          .filter((p) => p.phase === "recovery")
          .every((p) => p.id === procedureId || p.implemented)

        if (allRecoveryImplemented || procedureId === 10) {
          setCompletedTasks((prev) => [...prev, "Recover affected systems"])
          toast({
            title: "Task Completed",
            description: "You've successfully recovered affected systems.",
            duration: 3000,
          })
        }
      } else if (procedure.phase === "lessons_learned" && !completedTasks.includes("Document lessons learned")) {
        // Check if all lessons learned procedures are implemented
        const allLessonsImplemented = updatedProcedures
          .filter((p) => p.phase === "lessons_learned")
          .every((p) => p.id === procedureId || p.implemented)

        if (allLessonsImplemented || procedureId === 12) {
          setCompletedTasks((prev) => [...prev, "Document lessons learned"])
          toast({
            title: "Task Completed",
            description: "You've successfully documented lessons learned.",
            duration: 3000,
          })
        }
      }

      addTerminalLine(`Procedure "${procedure.name}" has been successfully implemented.`)
      addTerminalLine(`Description: ${procedure.description}`)
    }, 1500)
  }

  const changePhase = (phase?: string) => {
    if (!phase) {
      addTerminalLine("Usage: phase [name]")
      addTerminalLine(
        "Available phases: preparation, identification, containment, eradication, recovery, lessons_learned",
      )
      return
    }

    const validPhases = ["preparation", "identification", "containment", "eradication", "recovery", "lessons_learned"]

    if (!validPhases.includes(phase)) {
      addTerminalLine(`Invalid phase: ${phase}`)
      addTerminalLine(
        "Available phases: preparation, identification, containment, eradication, recovery, lessons_learned",
      )
      return
    }

    addTerminalLine(`Changing to ${phase} phase...`)
    setIncidentPhase(phase)

    // Provide guidance based on the new phase
    setTimeout(() => {
      addTerminalLine(`Now in ${phase.toUpperCase()} phase.`)

      switch (phase) {
        case "preparation":
          addTerminalLine("Focus on establishing incident response procedures and team readiness.")
          addTerminalLine("Use 'procedures' to view and implement preparation procedures.")
          break
        case "identification":
          addTerminalLine("Focus on identifying and analyzing the security incident.")
          addTerminalLine("Use 'incident', 'logs', and 'netstat' to gather information.")
          addTerminalLine("Use 'analyze' and 'examine' to investigate suspicious activities.")
          break
        case "containment":
          addTerminalLine("Focus on containing the incident to prevent further damage.")
          addTerminalLine("Use 'isolate' to isolate affected systems from the network.")
          addTerminalLine("Use 'lockaccount' to lock down compromised user accounts.")
          break
        case "eradication":
          addTerminalLine("Focus on removing the threat from the environment.")
          addTerminalLine("Implement eradication procedures to remove malware and vulnerabilities.")
          break
        case "recovery":
          addTerminalLine("Focus on restoring systems to normal operation.")
          addTerminalLine("Use 'restore' to restore systems from clean backups.")
          break
        case "lessons_learned":
          addTerminalLine("Focus on documenting the incident and improving future response.")
          addTerminalLine("Use 'report' to generate a comprehensive incident report.")
          break
      }
    }, 1000)
  }

  const isolateSystem = (system?: string) => {
    if (!system) {
      addTerminalLine("Usage: isolate [system]")
      return
    }

    if (!incidentDetails.affectedSystems.includes(system)) {
      addTerminalLine(`System ${system} is not listed as an affected system.`)
      addTerminalLine(`Affected systems: ${incidentDetails.affectedSystems.join(", ")}`)
      return
    }

    addTerminalLine(`Isolating system ${system} from the network...`)

    setTimeout(() => {
      addTerminalLine(`System ${system} has been successfully isolated.`)
      addTerminalLine("Network access has been restricted to prevent further spread of the attack.")

      if (!completedTasks.includes("Contain the incident")) {
        // Check if all affected systems have been isolated
        const allIsolated = incidentDetails.affectedSystems.every((s) => s === system || s.includes("isolated"))

        if (allIsolated || system === "file-server-01") {
          setCompletedTasks((prev) => [...prev, "Contain the incident"])
          toast({
            title: "Task Completed",
            description: "You've successfully contained the incident.",
            duration: 3000,
          })
        }
      }
    }, 1500)
  }

  const lockUserAccount = (user?: string) => {
    if (!user) {
      addTerminalLine("Usage: lockaccount [user]")
      return
    }

    addTerminalLine(`Locking user account ${user}...`)

    setTimeout(() => {
      if (user === "jdoe") {
        addTerminalLine(`User account ${user} has been successfully locked.`)
        addTerminalLine("All active sessions have been terminated.")

        if (!completedTasks.includes("Contain the incident")) {
          setCompletedTasks((prev) => [...prev, "Contain the incident"])
          toast({
            title: "Task Completed",
            description: "You've successfully contained the incident.",
            duration: 3000,
          })
        }
      } else {
        addTerminalLine(`User account ${user} locked, but this may not be relevant to the incident.`)
        addTerminalLine("The compromised account appears to be 'jdoe' based on the logs.")
      }
    }, 1500)
  }

  const restoreSystem = (system?: string) => {
    if (!system) {
      addTerminalLine("Usage: restore [system]")
      return
    }

    if (!incidentDetails.affectedSystems.includes(system)) {
      addTerminalLine(`System ${system} is not listed as an affected system.`)
      addTerminalLine(`Affected systems: ${incidentDetails.affectedSystems.join(", ")}`)
      return
    }

    addTerminalLine(`Restoring system ${system} from clean backup...`)

    setTimeout(() => {
      addTerminalLine(`System ${system} has been successfully restored from backup.`)
      addTerminalLine("All encrypted files have been recovered and the system is clean.")

      if (!completedTasks.includes("Recover affected systems")) {
        // Check if all affected systems have been restored
        const allRestored = incidentDetails.affectedSystems.every((s) => s === system || s.includes("restored"))

        if (allRestored || system === "file-server-01") {
          setCompletedTasks((prev) => [...prev, "Recover affected systems"])
          toast({
            title: "Task Completed",
            description: "You've successfully recovered affected systems.",
            duration: 3000,
          })
        }
      }
    }, 2000)
  }

  const generateReport = () => {
    addTerminalLine("Generating incident response report...")

    setTimeout(() => {
      addTerminalLine("=== INCIDENT RESPONSE REPORT ===")
      addTerminalLine(`Date: ${new Date().toISOString().split("T")[0]}`)
      addTerminalLine(`Time: ${new Date().toTimeString().split(" ")[0]}`)
      addTerminalLine(`Incident Type: ${incidentDetails.type}`)
      addTerminalLine(`Incident Time: ${incidentDetails.timestamp}`)

      addTerminalLine("")
      addTerminalLine("Executive Summary:")
      addTerminalLine("A ransomware attack was detected affecting multiple systems in the organization.")
      addTerminalLine("The attack originated from a phishing email with a malicious attachment.")
      addTerminalLine("Files on the affected systems were encrypted with a .locked extension.")

      addTerminalLine("")
      addTerminalLine("Affected Systems:")
      incidentDetails.affectedSystems.forEach((system) => {
        addTerminalLine(`- ${system}`)
      })

      addTerminalLine("")
      addTerminalLine("Attack Timeline:")
      addTerminalLine("1. Initial compromise via phishing email with malicious Excel attachment")
      addTerminalLine("2. Execution of malicious macro in the Excel file")
      addTerminalLine("3. PowerShell command execution to download additional malware")
      addTerminalLine("4. Communication with command and control server")
      addTerminalLine("5. Lateral movement to additional systems")
      addTerminalLine("6. File encryption and ransom note deployment")

      addTerminalLine("")
      addTerminalLine("Response Actions:")
      addTerminalLine("1. Identified and analyzed the incident through log and network analysis")
      addTerminalLine("2. Contained the incident by isolating affected systems and locking compromised accounts")
      addTerminalLine("3. Eradicated the threat by removing malware and patching vulnerabilities")
      addTerminalLine("4. Recovered systems from clean backups")

      addTerminalLine("")
      addTerminalLine("Lessons Learned:")
      addTerminalLine("1. Implement email filtering to detect and block phishing attempts")
      addTerminalLine("2. Disable macros in Office documents from untrusted sources")
      addTerminalLine("3. Implement application whitelisting to prevent unauthorized code execution")
      addTerminalLine("4. Enhance network monitoring to detect suspicious connections")
      addTerminalLine("5. Conduct regular security awareness training for all employees")
      addTerminalLine("6. Improve backup and recovery procedures for faster incident recovery")

      addTerminalLine("")
      addTerminalLine("Recommendations:")
      addTerminalLine("1. Deploy advanced email security solution with anti-phishing capabilities")
      addTerminalLine("2. Implement endpoint detection and response (EDR) solution")
      addTerminalLine("3. Enhance network segmentation to limit lateral movement")
      addTerminalLine("4. Conduct regular tabletop exercises to practice incident response")
      addTerminalLine("5. Review and update security policies and procedures")
      addTerminalLine("================================")

      if (!completedTasks.includes("Document lessons learned")) {
        setCompletedTasks((prev) => [...prev, "Document lessons learned"])
        toast({
          title: "Task Completed",
          description: "You've successfully documented lessons learned.",
          duration: 3000,
        })
      }

      // Check if all tasks are completed
      if (completedTasks.length >= 5) {
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
          <h1 className="text-3xl font-bold ml-4">Incident Response Scenario</h1>
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
                      <span>90:00</span>
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
                            Use terminal commands to respond to the security incident. Type 'help' to see available
                            commands.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <CardDescription>Coordinate a full security incident response</CardDescription>
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
                    onClick={() => processCommand("logs")}
                    disabled={!simulationActive}
                  >
                    logs
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
                      setIncidentPhase("preparation")
                      setCompletedTasks([])
                      setSimulationActive(false)
                      toast({
                        title: "Simulation Reset",
                        description: "The simulation has been reset.",
                        duration: 3000,
                      })
                    }}
                  >
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
                  {
                    [
                      "Introduction",
                      "Preparation",
                      "Identification",
                      "Containment",
                      "Eradication",
                      "Recovery/Lessons Learned",
                    ][currentStep - 1]
                  }
                </CardTitle>
                <CardDescription>Progress: {Math.round(progress)}%</CardDescription>
                <Progress value={progress} className="h-2" />
              </CardHeader>
              <CardContent>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Welcome to the Incident Response Scenario</h3>
                    <p>
                      In this simulation, you will learn how to respond to a security incident following a structured
                      incident response process. You will guide your organization through the key phases of incident
                      response to effectively manage and recover from a ransomware attack.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Getting Started:</h4>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Click "Start Simulation" to begin</li>
                        <li>Type "help" to see available commands</li>
                        <li>Type "incident" to view details of the security incident</li>
                        <li>Type "procedures" to view incident response procedures</li>
                        <li>Type "phase" to change between incident response phases</li>
                      </ol>
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Preparation Phase</h3>
                    <p>
                      The preparation phase focuses on establishing the necessary procedures, tools, and team structure
                      to effectively respond to security incidents before they occur.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Key Commands:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <code>procedures</code> - View incident response procedures
                        </li>
                        <li>
                          <code>implement [id]</code> - Implement a preparation procedure
                        </li>
                        <li>
                          <code>phase identification</code> - Move to the identification phase
                        </li>
                      </ul>
                    </div>
                    <p>Key preparation activities include:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Establishing an incident response plan</li>
                      <li>Forming an incident response team with defined roles</li>
                      <li>Creating communication protocols</li>
                      <li>Ensuring necessary tools and resources are available</li>
                      <li>Conducting training and exercises</li>
                    </ul>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Identification Phase</h3>
                    <p>
                      The identification phase focuses on detecting and analyzing a potential security incident to
                      determine its scope, impact, and nature.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Key Commands:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <code>incident</code> - View incident details
                        </li>
                        <li>
                          <code>logs</code> - View system logs
                        </li>
                        <li>
                          <code>netstat</code> - View network connections
                        </li>
                        <li>
                          <code>analyze [id]</code> - Analyze a log entry
                        </li>
                        <li>
                          <code>examine [id]</code> - Examine a network connection
                        </li>
                        <li>
                          <code>phase containment</code> - Move to the containment phase
                        </li>
                      </ul>
                    </div>
                    <p>
                      During this phase, you'll gather and analyze evidence to understand the incident and determine the
                      appropriate response strategy.
                    </p>
                  </div>
                )}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Containment Phase</h3>
                    <p>
                      The containment phase focuses on limiting the damage of the incident and preventing further spread
                      or impact to the organization.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Key Commands:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <code>isolate [system]</code> - Isolate an affected system
                        </li>
                        <li>
                          <code>lockaccount [user]</code> - Lock a compromised user account
                        </li>
                        <li>
                          <code>implement [id]</code> - Implement a containment procedure
                        </li>
                        <li>
                          <code>phase eradication</code> - Move to the eradication phase
                        </li>
                      </ul>
                    </div>
                    <p>Containment strategies include:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Short-term containment: Immediate actions to limit damage</li>
                      <li>System isolation: Disconnecting affected systems from the network</li>
                      <li>Account lockdown: Disabling compromised accounts</li>
                      <li>Network segmentation: Preventing lateral movement</li>
                    </ul>
                  </div>
                )}
                {currentStep === 5 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Eradication Phase</h3>
                    <p>
                      The eradication phase focuses on removing the threat from the environment and addressing the
                      vulnerabilities that allowed the incident to occur.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Key Commands:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <code>implement [id]</code> - Implement an eradication procedure
                        </li>
                        <li>
                          <code>phase recovery</code> - Move to the recovery phase
                        </li>
                      </ul>
                    </div>
                    <p>Eradication activities include:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Removing malware from affected systems</li>
                      <li>Patching vulnerabilities that were exploited</li>
                      <li>Hardening systems against similar attacks</li>
                      <li>Validating that the threat has been completely removed</li>
                    </ul>
                  </div>
                )}
                {currentStep === 6 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Recovery & Lessons Learned Phases</h3>
                    <p>
                      The recovery phase focuses on restoring affected systems to normal operation, while the lessons
                      learned phase involves documenting the incident and improving future response capabilities.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Key Commands:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <code>restore [system]</code> - Restore a system from backup
                        </li>
                        <li>
                          <code>implement [id]</code> - Implement a recovery procedure
                        </li>
                        <li>
                          <code>phase lessons_learned</code> - Move to the lessons learned phase
                        </li>
                        <li>
                          <code>report</code> - Generate an incident report
                        </li>
                      </ul>
                    </div>
                    <p>Recovery and lessons learned activities include:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Restoring systems from clean backups</li>
                      <li>Verifying system functionality</li>
                      <li>Monitoring for signs of recurring issues</li>
                      <li>Documenting the incident and response</li>
                      <li>Identifying improvements to security controls and processes</li>
                      <li>Conducting a post-incident review</li>
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
                    <span className="bg-red-500/10 text-red-500 text-xs font-medium px-2 py-1 rounded-full">
                      Advanced
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Estimated Time:</span>
                    <span className="text-sm">90-120 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Category:</span>
                    <span className="text-sm">Incident Response</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Skills:</span>
                    <div className="flex flex-wrap gap-1 justify-end">
                      <span className="bg-muted text-xs px-2 py-1 rounded-full">Analysis</span>
                      <span className="bg-muted text-xs px-2 py-1 rounded-full">Containment</span>
                      <span className="bg-muted text-xs px-2 py-1 rounded-full">Recovery</span>
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
                    <span>Understand the incident response lifecycle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Identify and analyze security incidents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Implement effective containment strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Execute proper eradication and recovery procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Document incidents and implement lessons learned</span>
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

