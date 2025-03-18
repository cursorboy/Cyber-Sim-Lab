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

export default function DataExfiltrationScenario() {
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [simulationActive, setSimulationActive] = useState(false)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to CyberDefender Data Exfiltration Terminal",
    "Type 'help' to see available commands",
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [selectedFile, setSelectedFile] = useState<number | null>(null)
  const [analyzedFiles, setAnalyzedFiles] = useState<number[]>([])
  const [detectedExfiltration, setDetectedExfiltration] = useState(0)
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const totalSteps = 5

  const tasks = [
    "Monitor network traffic",
    "Identify suspicious data transfers",
    "Analyze exfiltration techniques",
    "Implement data loss prevention controls",
    "Document incident and response",
  ]

  // Network connections data
  const networkConnections = [
    {
      id: 1,
      source: "192.168.1.105",
      destination: "192.168.1.1",
      port: 443,
      protocol: "HTTPS",
      bytes: 2450,
      status: "ESTABLISHED",
      suspicious: false,
    },
    {
      id: 2,
      source: "192.168.1.105",
      destination: "8.8.8.8",
      port: 53,
      protocol: "DNS",
      bytes: 120,
      status: "ESTABLISHED",
      suspicious: false,
    },
    {
      id: 3,
      source: "192.168.1.105",
      destination: "185.159.82.54",
      port: 443,
      protocol: "HTTPS",
      bytes: 1250000,
      status: "ESTABLISHED",
      suspicious: true,
      details: "Large data transfer to unknown external IP",
    },
    {
      id: 4,
      source: "192.168.1.105",
      destination: "192.168.1.100",
      port: 445,
      protocol: "SMB",
      bytes: 5600,
      status: "ESTABLISHED",
      suspicious: false,
    },
    {
      id: 5,
      source: "192.168.1.105",
      destination: "104.18.22.45",
      port: 443,
      protocol: "HTTPS",
      bytes: 8900,
      status: "ESTABLISHED",
      suspicious: false,
    },
    {
      id: 6,
      source: "192.168.1.105",
      destination: "91.242.145.12",
      port: 22,
      protocol: "SSH",
      bytes: 850000,
      status: "ESTABLISHED",
      suspicious: true,
      details: "Unusual SSH connection to external IP with large data transfer",
    },
    {
      id: 7,
      source: "192.168.1.105",
      destination: "172.217.167.78",
      port: 443,
      protocol: "HTTPS",
      bytes: 12500,
      status: "ESTABLISHED",
      suspicious: false,
    },
    {
      id: 8,
      source: "192.168.1.105",
      destination: "192.168.1.200",
      port: 3306,
      protocol: "MySQL",
      bytes: 7800,
      status: "ESTABLISHED",
      suspicious: false,
    },
    {
      id: 9,
      source: "192.168.1.105",
      destination: "45.33.22.123",
      port: 53,
      protocol: "DNS",
      bytes: 450000,
      status: "ESTABLISHED",
      suspicious: true,
      details: "Excessive DNS traffic, possible DNS tunneling",
    },
  ]

  // Suspicious processes
  const processes = [
    {
      pid: 1234,
      name: "chrome.exe",
      user: "jsmith",
      cpu: "2.1%",
      memory: "350MB",
      connections: 5,
      suspicious: false,
    },
    {
      pid: 2345,
      name: "outlook.exe",
      user: "jsmith",
      cpu: "1.5%",
      memory: "280MB",
      connections: 2,
      suspicious: false,
    },
    {
      pid: 3456,
      name: "explorer.exe",
      user: "jsmith",
      cpu: "0.8%",
      memory: "120MB",
      connections: 1,
      suspicious: false,
    },
    {
      pid: 4567,
      name: "data_sync.exe",
      user: "jsmith",
      cpu: "15.2%",
      memory: "450MB",
      connections: 3,
      suspicious: true,
      details: "Unknown process with high resource usage and external connections",
    },
    {
      pid: 5678,
      name: "svchost.exe",
      user: "SYSTEM",
      cpu: "0.5%",
      memory: "85MB",
      connections: 2,
      suspicious: false,
    },
    {
      pid: 6789,
      name: "dns_client.exe",
      user: "jsmith",
      cpu: "8.3%",
      memory: "210MB",
      connections: 1,
      suspicious: true,
      details: "Unusual DNS client process with high CPU usage",
    },
  ]

  // File access logs
  const fileAccessLogs = [
    {
      id: 1,
      timestamp: "2025-03-16 09:15:22",
      user: "jsmith",
      action: "READ",
      file: "/home/jsmith/documents/project_notes.txt",
      process: "notepad.exe",
      suspicious: false,
    },
    {
      id: 2,
      timestamp: "2025-03-16 09:32:45",
      user: "jsmith",
      action: "READ",
      file: "/home/jsmith/documents/meeting_minutes.docx",
      process: "winword.exe",
      suspicious: false,
    },
    {
      id: 3,
      timestamp: "2025-03-16 10:05:18",
      user: "jsmith",
      action: "READ",
      file: "/home/jsmith/confidential/customer_database.csv",
      process: "data_sync.exe",
      suspicious: true,
      details: "Sensitive file accessed by suspicious process",
    },
    {
      id: 4,
      timestamp: "2025-03-16 10:08:33",
      user: "jsmith",
      action: "READ",
      file: "/home/jsmith/confidential/financial_report_2025.xlsx",
      process: "data_sync.exe",
      suspicious: true,
      details: "Sensitive file accessed by suspicious process",
    },
    {
      id: 5,
      timestamp: "2025-03-16 10:15:42",
      user: "jsmith",
      action: "READ",
      file: "/home/jsmith/confidential/employee_data.csv",
      process: "data_sync.exe",
      suspicious: true,
      details: "Sensitive file accessed by suspicious process",
    },
    {
      id: 6,
      timestamp: "2025-03-16 10:45:12",
      user: "admin",
      action: "READ",
      file: "/etc/passwd",
      process: "cat",
      suspicious: false,
    },
    {
      id: 7,
      timestamp: "2025-03-16 11:22:36",
      user: "jsmith",
      action: "WRITE",
      file: "/home/jsmith/documents/compressed_data.zip",
      process: "data_sync.exe",
      suspicious: true,
      details: "Suspicious process creating compressed archive",
    },
  ]

  // DLP controls
  const [dlpControls, setDlpControls] = useState<
    { id: number; name: string; description: string; implemented: boolean }[]
  >([
    {
      id: 1,
      name: "Network Monitoring",
      description: "Monitor all network traffic for suspicious data transfers",
      implemented: false,
    },
    {
      id: 2,
      name: "Data Classification",
      description: "Classify data based on sensitivity to enforce appropriate controls",
      implemented: false,
    },
    {
      id: 3,
      name: "Endpoint DLP",
      description: "Deploy endpoint agents to monitor and prevent unauthorized data transfers",
      implemented: false,
    },
    {
      id: 4,
      name: "Email DLP",
      description: "Scan emails and attachments for sensitive data",
      implemented: false,
    },
    {
      id: 5,
      name: "USB Device Control",
      description: "Restrict or monitor USB device usage",
      implemented: false,
    },
  ])

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
    addTerminalLine("System initialized. Starting data exfiltration detection environment...")
    addTerminalLine("Loading network monitoring tools...")
    addTerminalLine("Environment ready. You can now begin your investigation.")
    addTerminalLine("Type 'netstat' to view current network connections.")

    toast({
      title: "Simulation Started",
      description: "Use terminal commands to detect and prevent data exfiltration attempts.",
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
      case "netstat":
        showNetworkConnections()
        break
      case "ps":
        showProcesses()
        break
      case "filelog":
        showFileAccessLogs()
        break
      case "analyze":
        analyzeConnection(args[1])
        break
      case "inspect":
        inspectProcess(args[1])
        break
      case "examine":
        examineFileAccess(args[1])
        break
      case "block":
        blockConnection(args[1])
        break
      case "kill":
        killProcess(args[1])
        break
      case "dlp":
        showDLPControls()
        break
      case "implement":
        implementDLPControl(args[1])
        break
      case "techniques":
        showExfiltrationTechniques()
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
    addTerminalLine("  netstat             - Show current network connections")
    addTerminalLine("  ps                  - Show running processes")
    addTerminalLine("  filelog             - Show file access logs")
    addTerminalLine("  analyze [id]        - Analyze a network connection")
    addTerminalLine("  inspect [pid]       - Inspect a process")
    addTerminalLine("  examine [id]        - Examine a file access log")
    addTerminalLine("  block [id]          - Block a suspicious network connection")
    addTerminalLine("  kill [pid]          - Terminate a suspicious process")
    addTerminalLine("  dlp                 - Show available DLP controls")
    addTerminalLine("  implement [id]      - Implement a DLP control")
    addTerminalLine("  techniques          - Show data exfiltration techniques")
    addTerminalLine("  report              - Generate an incident report")
    addTerminalLine("  tasks               - Show current tasks")
    addTerminalLine("  clear               - Clear terminal")
  }

  const showNetworkConnections = () => {
    if (!completedTasks.includes("Monitor network traffic")) {
      setCompletedTasks((prev) => [...prev, "Monitor network traffic"])
      toast({
        title: "Task Completed",
        description: "You've successfully monitored network traffic.",
        duration: 3000,
      })
    }

    addTerminalLine("Active Network Connections:")
    addTerminalLine("ID  Source           Destination      Port  Protocol  Bytes     Status")
    addTerminalLine("--  ---------------  ---------------  ----  --------  --------  -----------")

    networkConnections.forEach((conn) => {
      const id = conn.id.toString().padEnd(4)
      const source = conn.source.padEnd(17)
      const destination = conn.destination.padEnd(17)
      const port = conn.port.toString().padEnd(6)
      const protocol = conn.protocol.padEnd(10)
      const bytes = conn.bytes.toString().padEnd(10)
      const status = conn.status

      addTerminalLine(`${id}${source}${destination}${port}${protocol}${bytes}${status}`)
    })
  }

  const showProcesses = () => {
    addTerminalLine("Running Processes:")
    addTerminalLine("PID   Name             User     CPU    Memory   Connections")
    addTerminalLine("----- ---------------- -------- ------ -------- -----------")

    processes.forEach((proc) => {
      const pid = proc.pid.toString().padEnd(6)
      const name = proc.name.padEnd(17)
      const user = proc.user.padEnd(9)
      const cpu = proc.cpu.padEnd(7)
      const memory = proc.memory.padEnd(9)
      const connections = proc.connections.toString()

      addTerminalLine(`${pid}${name}${user}${cpu}${memory}${connections}`)
    })
  }

  const showFileAccessLogs = () => {
    addTerminalLine("File Access Logs:")
    addTerminalLine("ID  Timestamp               User     Action  File                                  Process")
    addTerminalLine("--  ----------------------  -------  ------  ------------------------------------  ------------")

    fileAccessLogs.forEach((log) => {
      const id = log.id.toString().padEnd(4)
      const timestamp = log.timestamp.padEnd(24)
      const user = log.user.padEnd(9)
      const action = log.action.padEnd(8)
      const file = log.file.length > 38 ? log.file.substring(0, 35) + "..." : log.file.padEnd(38)
      const process = log.process

      addTerminalLine(`${id}${timestamp}${user}${action}${file}${process}`)
    })
  }

  const analyzeConnection = (id?: string) => {
    if (!id) {
      addTerminalLine("Usage: analyze [id]")
      return
    }

    const connId = Number.parseInt(id)
    const connection = networkConnections.find((conn) => conn.id === connId)

    if (!connection) {
      addTerminalLine(`Connection with ID ${id} not found.`)
      return
    }

    addTerminalLine(`Analyzing network connection ID ${id}...`)

    setTimeout(() => {
      addTerminalLine("=== Connection Analysis ===")
      addTerminalLine(`Source: ${connection.source}`)
      addTerminalLine(`Destination: ${connection.destination}`)
      addTerminalLine(`Port: ${connection.port}`)
      addTerminalLine(`Protocol: ${connection.protocol}`)
      addTerminalLine(`Data Transferred: ${connection.bytes} bytes`)
      addTerminalLine(`Status: ${connection.status}`)

      if (connection.suspicious) {
        addTerminalLine("")
        addTerminalLine("WARNING: This connection is suspicious!")
        addTerminalLine(`Details: ${connection.details}`)
        addTerminalLine("Recommendation: Consider blocking this connection.")

        if (!completedTasks.includes("Identify suspicious data transfers")) {
          setCompletedTasks((prev) => [...prev, "Identify suspicious data transfers"])
          toast({
            title: "Task Completed",
            description: "You've successfully identified suspicious data transfers.",
            duration: 3000,
          })
        }

        if (!completedTasks.includes("Analyze exfiltration techniques")) {
          setCompletedTasks((prev) => [...prev, "Analyze exfiltration techniques"])
          toast({
            title: "Task Completed",
            description: "You've successfully analyzed exfiltration techniques.",
            duration: 3000,
          })
        }
      } else {
        addTerminalLine("")
        addTerminalLine("No suspicious activity detected in this connection.")
      }
      addTerminalLine("===========================")
    }, 1500)
  }

  const inspectProcess = (pid?: string) => {
    if (!pid) {
      addTerminalLine("Usage: inspect [pid]")
      return
    }

    const processPid = Number.parseInt(pid)
    const process = processes.find((proc) => proc.pid === processPid)

    if (!process) {
      addTerminalLine(`Process with PID ${pid} not found.`)
      return
    }

    addTerminalLine(`Inspecting process PID ${pid}...`)

    setTimeout(() => {
      addTerminalLine("=== Process Inspection ===")
      addTerminalLine(`PID: ${process.pid}`)
      addTerminalLine(`Name: ${process.name}`)
      addTerminalLine(`User: ${process.user}`)
      addTerminalLine(`CPU Usage: ${process.cpu}`)
      addTerminalLine(`Memory Usage: ${process.memory}`)
      addTerminalLine(`Network Connections: ${process.connections}`)

      if (process.suspicious) {
        addTerminalLine("")
        addTerminalLine("WARNING: This process is suspicious!")
        addTerminalLine(`Details: ${process.details}`)
        addTerminalLine("Recommendation: Consider terminating this process.")

        if (!completedTasks.includes("Identify suspicious data transfers")) {
          setCompletedTasks((prev) => [...prev, "Identify suspicious data transfers"])
          toast({
            title: "Task Completed",
            description: "You've successfully identified suspicious data transfers.",
            duration: 3000,
          })
        }
      } else {
        addTerminalLine("")
        addTerminalLine("No suspicious activity detected for this process.")
      }
      addTerminalLine("==========================")
    }, 1500)
  }

  const examineFileAccess = (id?: string) => {
    if (!id) {
      addTerminalLine("Usage: examine [id]")
      return
    }

    const logId = Number.parseInt(id)
    const log = fileAccessLogs.find((l) => l.id === logId)

    if (!log) {
      addTerminalLine(`File access log with ID ${id} not found.`)
      return
    }

    addTerminalLine(`Examining file access log ID ${id}...`)

    setTimeout(() => {
      addTerminalLine("=== File Access Analysis ===")
      addTerminalLine(`Timestamp: ${log.timestamp}`)
      addTerminalLine(`User: ${log.user}`)
      addTerminalLine(`Action: ${log.action}`)
      addTerminalLine(`File: ${log.file}`)
      addTerminalLine(`Process: ${log.process}`)

      if (log.suspicious) {
        addTerminalLine("")
        addTerminalLine("WARNING: This file access is suspicious!")
        addTerminalLine(`Details: ${log.details}`)
        addTerminalLine("Recommendation: Investigate the accessing process.")

        if (!completedTasks.includes("Identify suspicious data transfers")) {
          setCompletedTasks((prev) => [...prev, "Identify suspicious data transfers"])
          toast({
            title: "Task Completed",
            description: "You've successfully identified suspicious data transfers.",
            duration: 3000,
          })
        }
      } else {
        addTerminalLine("")
        addTerminalLine("No suspicious activity detected in this file access.")
      }
      addTerminalLine("============================")
    }, 1500)
  }

  const blockConnection = (id?: string) => {
    if (!id) {
      addTerminalLine("Usage: block [id]")
      return
    }

    const connId = Number.parseInt(id)
    const connection = networkConnections.find((conn) => conn.id === connId)

    if (!connection) {
      addTerminalLine(`Connection with ID ${id} not found.`)
      return
    }

    addTerminalLine(`Blocking network connection ID ${id}...`)

    setTimeout(() => {
      if (connection.suspicious) {
        addTerminalLine(
          `Connection from ${connection.source} to ${connection.destination}:${connection.port} has been blocked.`,
        )
        addTerminalLine("Firewall rule has been added to prevent future connections.")
        setDetectedExfiltration((prev) => prev + 1)

        if (!completedTasks.includes("Implement data loss prevention controls")) {
          setCompletedTasks((prev) => [...prev, "Implement data loss prevention controls"])
          toast({
            title: "Task Completed",
            description: "You've successfully implemented data loss prevention controls.",
            duration: 3000,
          })
        }
      } else {
        addTerminalLine("WARNING: You've blocked a legitimate connection.")
        addTerminalLine("This may disrupt normal business operations.")
      }
    }, 1000)
  }

  const killProcess = (pid?: string) => {
    if (!pid) {
      addTerminalLine("Usage: kill [pid]")
      return
    }

    const processPid = Number.parseInt(pid)
    const process = processes.find((proc) => proc.pid === processPid)

    if (!process) {
      addTerminalLine(`Process with PID ${pid} not found.`)
      return
    }

    addTerminalLine(`Terminating process PID ${pid}...`)

    setTimeout(() => {
      if (process.suspicious) {
        addTerminalLine(`Process ${process.name} (PID: ${process.pid}) has been terminated.`)
        addTerminalLine("System has been secured from this threat.")
        setDetectedExfiltration((prev) => prev + 1)

        if (!completedTasks.includes("Implement data loss prevention controls")) {
          setCompletedTasks((prev) => [...prev, "Implement data loss prevention controls"])
          toast({
            title: "Task Completed",
            description: "You've successfully implemented data loss prevention controls.",
            duration: 3000,
          })
        }
      } else {
        addTerminalLine("WARNING: You've terminated a legitimate process.")
        addTerminalLine("This may disrupt normal business operations.")
      }
    }, 1000)
  }

  const showDLPControls = () => {
    addTerminalLine("Available Data Loss Prevention Controls:")
    addTerminalLine("ID  Name                  Status           Description")
    addTerminalLine("--  --------------------  ---------------  -----------------------------------------")

    dlpControls.forEach((control) => {
      const id = control.id.toString().padEnd(4)
      const name = control.name.padEnd(22)
      const status = control.implemented ? "Implemented".padEnd(17) : "Not Implemented".padEnd(17)
      const description = control.description

      addTerminalLine(`${id}${name}${status}${description}`)
    })

    addTerminalLine("")
    addTerminalLine("Use 'implement [id]' to implement a DLP control.")
  }

  const implementDLPControl = (id?: string) => {
    if (!id) {
      addTerminalLine("Usage: implement [id]")
      return
    }

    const controlId = Number.parseInt(id)
    const control = dlpControls.find((c) => c.id === controlId)

    if (!control) {
      addTerminalLine(`DLP control with ID ${id} not found.`)
      return
    }

    addTerminalLine(`Implementing DLP control: ${control.name}...`)

    setTimeout(() => {
      setDlpControls((prev) => prev.map((c) => (c.id === controlId ? { ...c, implemented: true } : c)))

      addTerminalLine(`DLP control "${control.name}" has been successfully implemented.`)
      addTerminalLine(`Description: ${control.description}`)

      if (!completedTasks.includes("Implement data loss prevention controls")) {
        setCompletedTasks((prev) => [...prev, "Implement data loss prevention controls"])
        toast({
          title: "Task Completed",
          description: "You've successfully implemented data loss prevention controls.",
          duration: 3000,
        })
      }
    }, 1500)
  }

  const showExfiltrationTechniques = () => {
    addTerminalLine("Common Data Exfiltration Techniques:")
    addTerminalLine("")
    addTerminalLine("1. Network-based Exfiltration")
    addTerminalLine("   - HTTP/HTTPS transfers to external servers")
    addTerminalLine("   - DNS tunneling (hiding data in DNS queries)")
    addTerminalLine("   - SSH/SFTP transfers to unauthorized destinations")
    addTerminalLine("   - Custom protocols on non-standard ports")
    addTerminalLine("")
    addTerminalLine("2. Physical Exfiltration")
    addTerminalLine("   - USB devices and removable media")
    addTerminalLine("   - Printing sensitive information")
    addTerminalLine("   - Taking photos of screens or documents")
    addTerminalLine("")
    addTerminalLine("3. Email-based Exfiltration")
    addTerminalLine("   - Sending sensitive data as attachments")
    addTerminalLine("   - Embedding data in images (steganography)")
    addTerminalLine("   - Using personal email accounts for business data")
    addTerminalLine("")
    addTerminalLine("4. Cloud-based Exfiltration")
    addTerminalLine("   - Unauthorized uploads to cloud storage services")
    addTerminalLine("   - Using personal cloud accounts for business data")
    addTerminalLine("")
    addTerminalLine("5. Covert Channel Exfiltration")
    addTerminalLine("   - Steganography (hiding data within other data)")
    addTerminalLine("   - Timing-based covert channels")
    addTerminalLine("   - Social media as an exfiltration channel")

    if (!completedTasks.includes("Analyze exfiltration techniques")) {
      setCompletedTasks((prev) => [...prev, "Analyze exfiltration techniques"])
      toast({
        title: "Task Completed",
        description: "You've successfully analyzed exfiltration techniques.",
        duration: 3000,
      })
    }
  }

  const generateReport = () => {
    addTerminalLine("Generating data exfiltration incident report...")

    setTimeout(() => {
      const implementedControls = dlpControls.filter((c) => c.implemented).length

      addTerminalLine("=== DATA EXFILTRATION INCIDENT REPORT ===")
      addTerminalLine(`Date: ${new Date().toISOString().split("T")[0]}`)
      addTerminalLine(`Time: ${new Date().toTimeString().split(" ")[0]}`)
      addTerminalLine(`Analyst: Security Trainee`)

      addTerminalLine("")
      addTerminalLine("Summary of Findings:")
      addTerminalLine(
        `- Suspicious network connections detected: ${networkConnections.filter((c) => c.suspicious).length}`,
      )
      addTerminalLine(`- Suspicious processes detected: ${processes.filter((p) => p.suspicious).length}`)
      addTerminalLine(`- Suspicious file accesses detected: ${fileAccessLogs.filter((l) => l.suspicious).length}`)
      addTerminalLine(`- Threats mitigated: ${detectedExfiltration}`)
      addTerminalLine(`- DLP controls implemented: ${implementedControls}/${dlpControls.length}`)

      addTerminalLine("")
      addTerminalLine("Detected Exfiltration Attempts:")
      networkConnections
        .filter((conn) => conn.suspicious)
        .forEach((conn) => {
          addTerminalLine(
            `- Network: ${conn.source} to ${conn.destination}:${conn.port} (${conn.protocol}) - ${conn.details}`,
          )
        })

      processes
        .filter((proc) => proc.suspicious)
        .forEach((proc) => {
          addTerminalLine(`- Process: ${proc.name} (PID: ${proc.pid}) - ${proc.details}`)
        })

      fileAccessLogs
        .filter((log) => log.suspicious)
        .forEach((log) => {
          addTerminalLine(`- File Access: ${log.file} by ${log.process} - ${log.details}`)
        })

      addTerminalLine("")
      addTerminalLine("Implemented DLP Controls:")
      dlpControls
        .filter((c) => c.implemented)
        .forEach((control) => {
          addTerminalLine(`- ${control.name}: ${control.description}`)
        })

      addTerminalLine("")
      addTerminalLine("Recommendations:")
      addTerminalLine("1. Implement comprehensive network monitoring and data loss prevention")
      addTerminalLine("2. Establish data classification and handling policies")
      addTerminalLine("3. Deploy endpoint DLP solutions to prevent unauthorized data transfers")
      addTerminalLine("4. Conduct regular security awareness training on data handling")
      addTerminalLine("5. Implement strict access controls based on the principle of least privilege")
      addTerminalLine("=======================================")

      if (!completedTasks.includes("Document incident and response")) {
        setCompletedTasks((prev) => [...prev, "Document incident and response"])
        toast({
          title: "Task Completed",
          description: "You've successfully documented the incident and response.",
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
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Data Exfiltration</h1>
            <p className="text-muted-foreground">
              Learn to detect and prevent unauthorized data exfiltration attempts.
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
                              Use terminal commands to detect and prevent data exfiltration attempts. Type 'help' to see available commands.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <CardDescription>Guide your organization through data exfiltration detection and prevention</CardDescription>
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
                      onClick={() => processCommand("monitor")}
                      disabled={!simulationActive}
                    >
                      monitor
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => processCommand("analyze")}
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
                          "Welcome to CyberDefender Data Exfiltration Terminal",
                          "Type 'help' to see available commands",
                        ])
                        setSelectedFile(null)
                        setAnalyzedFiles([])
                        setDetectedExfiltration(0)
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

