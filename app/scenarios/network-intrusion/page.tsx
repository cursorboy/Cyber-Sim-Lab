"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Clock, HelpCircle, Shield, Terminal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/hooks/use-toast"

export default function NetworkIntrusionScenario() {
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [simulationActive, setSimulationActive] = useState(false)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to Cyber Sim Lab Network Security Terminal",
    "Type 'help' to see available commands",
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [detectedThreats, setDetectedThreats] = useState(0)
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const totalSteps = 5

  const tasks = [
    "Monitor network traffic",
    "Detect suspicious activity",
    "Identify the attack type",
    "Block malicious traffic",
    "Document the incident",
  ]

  // Network traffic data
  const networkConnections = [
    {
      id: 1,
      source: "192.168.1.100",
      destination: "192.168.1.1",
      port: 443,
      protocol: "HTTPS",
      status: "ESTABLISHED",
      suspicious: false,
    },
    {
      id: 2,
      source: "192.168.1.100",
      destination: "8.8.8.8",
      port: 53,
      protocol: "DNS",
      status: "ESTABLISHED",
      suspicious: false,
    },
    {
      id: 3,
      source: "45.33.22.123",
      destination: "192.168.1.100",
      port: 22,
      protocol: "SSH",
      status: "SYN_SENT",
      suspicious: true,
    },
    {
      id: 4,
      source: "45.33.22.123",
      destination: "192.168.1.100",
      port: 22,
      protocol: "SSH",
      status: "SYN_SENT",
      suspicious: true,
    },
    {
      id: 5,
      source: "45.33.22.123",
      destination: "192.168.1.100",
      port: 22,
      protocol: "SSH",
      status: "SYN_SENT",
      suspicious: true,
    },
    {
      id: 6,
      source: "192.168.1.100",
      destination: "172.217.167.78",
      port: 443,
      protocol: "HTTPS",
      status: "ESTABLISHED",
      suspicious: false,
    },
    {
      id: 7,
      source: "45.33.22.123",
      destination: "192.168.1.100",
      port: 22,
      protocol: "SSH",
      status: "SYN_SENT",
      suspicious: true,
    },
    {
      id: 8,
      source: "45.33.22.123",
      destination: "192.168.1.100",
      port: 22,
      protocol: "SSH",
      status: "SYN_SENT",
      suspicious: true,
    },
    {
      id: 9,
      source: "192.168.1.100",
      destination: "104.18.22.45",
      port: 443,
      protocol: "HTTPS",
      status: "ESTABLISHED",
      suspicious: false,
    },
    {
      id: 10,
      source: "45.33.22.123",
      destination: "192.168.1.100",
      port: 22,
      protocol: "SSH",
      status: "SYN_SENT",
      suspicious: true,
    },
  ]

  // Firewall rules
  const [firewallRules, setFirewallRules] = useState<
    { source: string; destination: string; port: number; action: string }[]
  >([
    { source: "ANY", destination: "192.168.1.0/24", port: 80, action: "ALLOW" },
    { source: "ANY", destination: "192.168.1.0/24", port: 443, action: "ALLOW" },
    { source: "192.168.1.0/24", destination: "ANY", port: 0, action: "ALLOW" },
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
    addTerminalLine("System initialized. Starting network monitoring...")
    addTerminalLine("Loading firewall configuration...")
    addTerminalLine("Network interfaces initialized...")
    addTerminalLine("Monitoring active. Type 'netstat' to view current connections.")

    toast({
      title: "Simulation Started",
      description: "Use terminal commands to monitor network traffic and detect intrusions.",
      duration: 3000,
    })

    // Simulate incoming connections
    simulateNetworkActivity()
  }

  const simulateNetworkActivity = () => {
    const intervals: NodeJS.Timeout[] = []

    // Simulate SSH brute force attack
    const sshInterval = setInterval(() => {
      if (!simulationActive) {
        clearInterval(sshInterval)
        return
      }

      const attackIP = "45.33.22.123"
      const blockedByFirewall = firewallRules.some(
        (rule) => (rule.source === attackIP || rule.source === "ANY") && rule.port === 22 && rule.action === "BLOCK",
      )

      if (!blockedByFirewall) {
        addTerminalLine(`[${new Date().toLocaleTimeString()}] Connection attempt from ${attackIP} to port 22 (SSH)`)
      }
    }, 5000)

    intervals.push(sshInterval)

    // Clean up intervals when simulation ends
    return () => {
      intervals.forEach((interval) => clearInterval(interval))
    }
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
      case "ping":
        pingHost(args[1])
        break
      case "traceroute":
        tracerouteHost(args[1])
        break
      case "nmap":
        nmapScan(args[1])
        break
      case "firewall":
        manageFirewall(args.slice(1))
        break
      case "analyze":
        analyzeTraffic(args[1])
        break
      case "block":
        blockIP(args[1], args[2] ? Number.parseInt(args[2]) : 0)
        break
      case "report":
        generateReport()
        break
      case "clear":
        setTerminalHistory([])
        break
      case "tasks":
        showTasks()
        break
      default:
        addTerminalLine(`Command not found: ${cmd}. Type 'help' for available commands.`)
    }
  }

  const showHelp = () => {
    addTerminalLine("Available commands:")
    addTerminalLine("  help                - Show this help message")
    addTerminalLine("  netstat             - Show current network connections")
    addTerminalLine("  ping [host]         - Ping a host to check connectivity")
    addTerminalLine("  traceroute [host]   - Trace the route to a host")
    addTerminalLine("  nmap [host]         - Scan a host for open ports")
    addTerminalLine("  firewall list       - List current firewall rules")
    addTerminalLine("  firewall add [src] [dst] [port] [action] - Add firewall rule")
    addTerminalLine("  analyze [ip]        - Analyze traffic from an IP address")
    addTerminalLine("  block [ip] [port]   - Block traffic from an IP address (optional port)")
    addTerminalLine("  report              - Generate incident report")
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
    addTerminalLine("ID  Source           Destination      Port  Protocol  Status")
    addTerminalLine("--  ---------------  ---------------  ----  --------  -----------")

    networkConnections.forEach((conn) => {
      const blockedByFirewall = firewallRules.some(
        (rule) =>
          (rule.source === conn.source || rule.source === "ANY") &&
          (rule.port === conn.port || rule.port === 0) &&
          rule.action === "BLOCK",
      )

      if (!blockedByFirewall) {
        addTerminalLine(
          `${conn.id.toString().padEnd(4)} ${conn.source.padEnd(17)} ${conn.destination.padEnd(17)} ${conn.port.toString().padEnd(6)} ${conn.protocol.padEnd(10)} ${conn.status}`,
        )
      }
    })
  }

  const pingHost = (host?: string) => {
    if (!host) {
      addTerminalLine("Usage: ping [host]")
      return
    }

    addTerminalLine(`Pinging ${host}...`)

    setTimeout(() => {
      if (host === "45.33.22.123") {
        addTerminalLine(`PING ${host} (${host}): 56 data bytes`)
        addTerminalLine(`64 bytes from ${host}: icmp_seq=0 ttl=53 time=120.5 ms`)
        addTerminalLine(`64 bytes from ${host}: icmp_seq=1 ttl=53 time=118.2 ms`)
        addTerminalLine(`64 bytes from ${host}: icmp_seq=2 ttl=53 time=121.7 ms`)
        addTerminalLine(`64 bytes from ${host}: icmp_seq=3 ttl=53 time=119.3 ms`)
        addTerminalLine("")
        addTerminalLine(`--- ${host} ping statistics ---`)
        addTerminalLine("4 packets transmitted, 4 packets received, 0.0% packet loss")
        addTerminalLine("round-trip min/avg/max/stddev = 118.2/119.9/121.7/1.3 ms")
      } else if (host.startsWith("192.168.")) {
        addTerminalLine(`PING ${host} (${host}): 56 data bytes`)
        addTerminalLine(`64 bytes from ${host}: icmp_seq=0 ttl=64 time=0.5 ms`)
        addTerminalLine(`64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.4 ms`)
        addTerminalLine(`64 bytes from ${host}: icmp_seq=2 ttl=64 time=0.5 ms`)
        addTerminalLine(`64 bytes from ${host}: icmp_seq=3 ttl=64 time=0.4 ms`)
        addTerminalLine("")
        addTerminalLine(`--- ${host} ping statistics ---`)
        addTerminalLine("4 packets transmitted, 4 packets received, 0.0% packet loss")
        addTerminalLine("round-trip min/avg/max/stddev = 0.4/0.45/0.5/0.05 ms")
      } else {
        addTerminalLine(`PING ${host} (${host}): 56 data bytes`)
        addTerminalLine(`64 bytes from ${host}: icmp_seq=0 ttl=57 time=25.5 ms`)
        addTerminalLine(`64 bytes from ${host}: icmp_seq=1 ttl=57 time=24.8 ms`)
        addTerminalLine(`64 bytes from ${host}: icmp_seq=2 ttl=57 time=26.2 ms`)
        addTerminalLine(`64 bytes from ${host}: icmp_seq=3 ttl=57 time=25.1 ms`)
        addTerminalLine("")
        addTerminalLine(`--- ${host} ping statistics ---`)
        addTerminalLine("4 packets transmitted, 4 packets received, 0.0% packet loss")
        addTerminalLine("round-trip min/avg/max/stddev = 24.8/25.4/26.2/0.5 ms")
      }
    }, 1500)
  }

  const tracerouteHost = (host?: string) => {
    if (!host) {
      addTerminalLine("Usage: traceroute [host]")
      return
    }

    addTerminalLine(`traceroute to ${host} (${host}), 30 hops max, 60 byte packets`)

    setTimeout(() => {
      if (host === "45.33.22.123") {
        addTerminalLine(" 1  192.168.1.1  1.2 ms  1.1 ms  1.0 ms")
        addTerminalLine(" 2  10.0.0.1  5.3 ms  5.2 ms  5.4 ms")
        addTerminalLine(" 3  172.16.0.1  10.1 ms  10.3 ms  10.2 ms")
        addTerminalLine(" 4  isp-router.net (203.0.113.1)  15.5 ms  15.3 ms  15.6 ms")
        addTerminalLine(" 5  backbone-1.isp.net (203.0.113.10)  20.2 ms  20.5 ms  20.3 ms")
        addTerminalLine(" 6  backbone-2.isp.net (203.0.113.18)  25.1 ms  25.3 ms  25.0 ms")
        addTerminalLine(" 7  45.33.22.1  30.5 ms  30.2 ms  30.4 ms")
        addTerminalLine(" 8  45.33.22.123  35.3 ms  35.5 ms  35.2 ms")
      } else if (host.startsWith("192.168.")) {
        addTerminalLine(" 1  192.168.1.1  0.5 ms  0.4 ms  0.5 ms")
        addTerminalLine(" 2  " + host + "  0.8 ms  0.7 ms  0.8 ms")
      } else {
        addTerminalLine(" 1  192.168.1.1  1.2 ms  1.1 ms  1.0 ms")
        addTerminalLine(" 2  10.0.0.1  5.3 ms  5.2 ms  5.4 ms")
        addTerminalLine(" 3  172.16.0.1  10.1 ms  10.3 ms  10.2 ms")
        addTerminalLine(" 4  isp-router.net (203.0.113.1)  15.5 ms  15.3 ms  15.6 ms")
        addTerminalLine(" 5  * * *")
        addTerminalLine(" 6  * * *")
        addTerminalLine(" 7  destination-router.net (198.51.100.1)  25.3 ms  25.5 ms  25.2 ms")
        addTerminalLine(" 8  " + host + "  30.1 ms  30.3 ms  30.0 ms")
      }
    }, 2000)
  }

  const nmapScan = (host?: string) => {
    if (!host) {
      addTerminalLine("Usage: nmap [host]")
      return
    }

    addTerminalLine(`Starting Nmap scan on ${host}...`)

    setTimeout(() => {
      addTerminalLine(`Nmap scan report for ${host}`)
      addTerminalLine(`Host is up (0.025s latency).`)

      if (host === "45.33.22.123") {
        addTerminalLine("PORT     STATE    SERVICE")
        addTerminalLine("22/tcp   open     ssh")
        addTerminalLine("80/tcp   filtered http")
        addTerminalLine("443/tcp  filtered https")
        addTerminalLine("3389/tcp filtered ms-wbt-server")

        if (!completedTasks.includes("Detect suspicious activity")) {
          setCompletedTasks((prev) => [...prev, "Detect suspicious activity"])
          toast({
            title: "Task Completed",
            description: "You've detected suspicious activity from 45.33.22.123.",
            duration: 3000,
          })
        }
      } else if (host.startsWith("192.168.")) {
        addTerminalLine("PORT     STATE  SERVICE")
        addTerminalLine("22/tcp   open   ssh")
        addTerminalLine("80/tcp   open   http")
        addTerminalLine("443/tcp  open   https")
        addTerminalLine("3306/tcp open   mysql")
      } else {
        addTerminalLine("PORT     STATE  SERVICE")
        addTerminalLine("80/tcp   open   http")
        addTerminalLine("443/tcp  open   https")
        addTerminalLine("25/tcp   open   smtp")
        addTerminalLine("53/tcp   open   domain")
      }
    }, 2000)
  }

  const manageFirewall = (args: string[]) => {
    if (!args.length || args[0] === "help") {
      addTerminalLine("Firewall management commands:")
      addTerminalLine("  firewall list - List current firewall rules")
      addTerminalLine("  firewall add [source] [destination] [port] [action] - Add a new rule")
      addTerminalLine("  firewall delete [rule_number] - Delete a rule by number")
      return
    }

    const subcommand = args[0].toLowerCase()

    if (subcommand === "list") {
      addTerminalLine("Current Firewall Rules:")
      addTerminalLine("NUM  SOURCE           DESTINATION      PORT  ACTION")
      addTerminalLine("---  ---------------  ---------------  ----  ------")

      firewallRules.forEach((rule, index) => {
        addTerminalLine(
          `${(index + 1).toString().padEnd(5)} ${rule.source.padEnd(17)} ${rule.destination.padEnd(17)} ${rule.port === 0 ? "ANY".padEnd(6) : rule.port.toString().padEnd(6)} ${rule.action}`,
        )
      })
    } else if (subcommand === "add") {
      if (args.length < 5) {
        addTerminalLine("Usage: firewall add [source] [destination] [port] [action]")
        return
      }

      const source = args[1]
      const destination = args[2]
      const port = args[3] === "ANY" ? 0 : Number.parseInt(args[3])
      const action = args[4].toUpperCase()

      if (isNaN(port)) {
        addTerminalLine("Error: Port must be a number or 'ANY'")
        return
      }

      if (action !== "ALLOW" && action !== "BLOCK") {
        addTerminalLine("Error: Action must be ALLOW or BLOCK")
        return
      }

      setFirewallRules((prev) => [...prev, { source, destination, port, action }])
      addTerminalLine(`Firewall rule added: ${source} -> ${destination} port ${port === 0 ? "ANY" : port} ${action}`)

      if (source === "45.33.22.123" && (port === 22 || port === 0) && action === "BLOCK") {
        if (!completedTasks.includes("Block malicious traffic")) {
          setCompletedTasks((prev) => [...prev, "Block malicious traffic"])
          toast({
            title: "Task Completed",
            description: "You've successfully blocked the malicious traffic.",
            duration: 3000,
          })
        }
      }
    } else if (subcommand === "delete") {
      if (args.length < 2) {
        addTerminalLine("Usage: firewall delete [rule_number]")
        return
      }

      const ruleNumber = Number.parseInt(args[1])

      if (isNaN(ruleNumber) || ruleNumber < 1 || ruleNumber > firewallRules.length) {
        addTerminalLine(`Error: Invalid rule number. Must be between 1 and ${firewallRules.length}`)
        return
      }

      const deletedRule = firewallRules[ruleNumber - 1]
      setFirewallRules((prev) => prev.filter((_, index) => index !== ruleNumber - 1))
      addTerminalLine(
        `Firewall rule deleted: ${deletedRule.source} -> ${deletedRule.destination} port ${deletedRule.port === 0 ? "ANY" : deletedRule.port} ${deletedRule.action}`,
      )
    } else {
      addTerminalLine(`Unknown firewall subcommand: ${subcommand}`)
    }
  }

  const analyzeTraffic = (ip?: string) => {
    if (!ip) {
      addTerminalLine("Usage: analyze [ip]")
      return
    }

    addTerminalLine(`Analyzing traffic from ${ip}...`)

    setTimeout(() => {
      if (ip === "45.33.22.123") {
        addTerminalLine("=== Traffic Analysis Results ===")
        addTerminalLine(`IP Address: ${ip}`)
        addTerminalLine("Connection attempts: 32 in the last 5 minutes")
        addTerminalLine("Target ports: 22 (SSH)")
        addTerminalLine("Pattern: Multiple failed connection attempts")
        addTerminalLine("Analysis: Potential SSH brute force attack")
        addTerminalLine("Recommendation: Block this IP address")
        addTerminalLine("==============================")

        if (!completedTasks.includes("Identify the attack type")) {
          setCompletedTasks((prev) => [...prev, "Identify the attack type"])
          toast({
            title: "Task Completed",
            description: "You've identified the attack as an SSH brute force attempt.",
            duration: 3000,
          })
        }

        setDetectedThreats((prev) => prev + 1)
      } else if (ip.startsWith("192.168.")) {
        addTerminalLine("=== Traffic Analysis Results ===")
        addTerminalLine(`IP Address: ${ip}`)
        addTerminalLine("Connection attempts: Normal activity")
        addTerminalLine("Target ports: Various (80, 443, 53)")
        addTerminalLine("Pattern: Normal browsing behavior")
        addTerminalLine("Analysis: No suspicious activity detected")
        addTerminalLine("Recommendation: No action needed")
        addTerminalLine("==============================")
      } else {
        addTerminalLine("=== Traffic Analysis Results ===")
        addTerminalLine(`IP Address: ${ip}`)
        addTerminalLine("Connection attempts: Minimal")
        addTerminalLine("Target ports: Various")
        addTerminalLine("Pattern: Normal network traffic")
        addTerminalLine("Analysis: No suspicious activity detected")
        addTerminalLine("Recommendation: Continue monitoring")
        addTerminalLine("==============================")
      }
    }, 2000)
  }

  const blockIP = (ip?: string, port?: number) => {
    if (!ip) {
      addTerminalLine("Usage: block [ip] [port]")
      return
    }

    const portStr = port ? `port ${port}` : "all ports"
    addTerminalLine(`Blocking traffic from ${ip} on ${portStr}...`)

    setFirewallRules((prev) => [
      ...prev,
      {
        source: ip,
        destination: "ANY",
        port: port || 0,
        action: "BLOCK",
      },
    ])

    addTerminalLine(`Firewall rule added: BLOCK traffic from ${ip} on ${portStr}`)

    if (ip === "45.33.22.123" && (!port || port === 22)) {
      if (!completedTasks.includes("Block malicious traffic")) {
        setCompletedTasks((prev) => [...prev, "Block malicious traffic"])
        toast({
          title: "Task Completed",
          description: "You've successfully blocked the malicious traffic.",
          duration: 3000,
        })
      }
    }
  }

  const generateReport = () => {
    addTerminalLine("Generating security incident report...")

    setTimeout(() => {
      addTerminalLine("=== SECURITY INCIDENT REPORT ===")
      addTerminalLine(`Date: ${new Date().toISOString().split("T")[0]}`)
      addTerminalLine(`Time: ${new Date().toTimeString().split(" ")[0]}`)
      addTerminalLine(`Analyst: Security Trainee`)

      addTerminalLine("")
      addTerminalLine("Incident Summary:")
      addTerminalLine("Detected SSH brute force attack from IP 45.33.22.123")
      addTerminalLine("Multiple failed login attempts targeting port 22")

      addTerminalLine("")
      addTerminalLine("Actions Taken:")
      const blockedIP = firewallRules.some(
        (rule) => rule.source === "45.33.22.123" && (rule.port === 22 || rule.port === 0) && rule.action === "BLOCK",
      )

      if (blockedIP) {
        addTerminalLine("- Blocked malicious IP address 45.33.22.123")
        addTerminalLine("- Prevented unauthorized access to the system")
      } else {
        addTerminalLine("- Identified malicious IP address 45.33.22.123")
        addTerminalLine("- WARNING: IP has not been blocked yet")
      }

      addTerminalLine("")
      addTerminalLine("Recommendations:")
      addTerminalLine("1. Continue monitoring for similar attack patterns")
      addTerminalLine("2. Update SSH configuration to limit login attempts")
      addTerminalLine("3. Implement IP reputation checking")
      addTerminalLine("4. Consider implementing multi-factor authentication")
      addTerminalLine("===============================")

      if (!completedTasks.includes("Document the incident")) {
        setCompletedTasks((prev) => [...prev, "Document the incident"])
        toast({
          title: "Task Completed",
          description: "You've successfully documented the security incident.",
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
            <h1 className="text-3xl font-bold">Network Intrusion Detection</h1>
            <p className="text-muted-foreground">
              Learn to identify and respond to network-based attacks in real-time.
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
                              Use terminal commands to monitor network traffic and detect intrusions. Type 'help' to see
                              available commands.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <CardDescription>Detect and respond to unauthorized network access attempts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-md p-4 font-mono text-sm text-green-400 h-[400px] flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <Terminal className="h-5 w-5" />
                      <span className="text-white">Cyber Sim Lab Terminal</span>
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
                      onClick={() => processCommand("netstat")}
                      disabled={!simulationActive}
                    >
                      netstat
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => processCommand("analyze 45.33.22.123")}
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
                          "Welcome to Cyber Sim Lab Network Security Terminal",
                          "Type 'help' to see available commands",
                        ])
                        setDetectedThreats(0)
                        setCompletedTasks([])
                        setFirewallRules([
                          { source: "ANY", destination: "192.168.1.0/24", port: 80, action: "ALLOW" },
                          { source: "ANY", destination: "192.168.1.0/24", port: 443, action: "ALLOW" },
                          { source: "192.168.1.0/24", destination: "ANY", port: 0, action: "ALLOW" },
                        ])
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
                    {["Introduction", "Reconnaissance", "Detection", "Mitigation", "Analysis"][currentStep - 1]}
                  </CardTitle>
                  <CardDescription>Progress: {Math.round(progress)}%</CardDescription>
                  <Progress value={progress} className="h-2" />
                </CardHeader>
                <CardContent>
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Welcome to the Network Intrusion Scenario</h3>
                      <p>
                        In this simulation, you will learn how to detect and respond to unauthorized network access
                        attempts. You will be presented with a virtual environment where you can monitor network traffic,
                        identify suspicious activities, and take appropriate actions to mitigate threats.
                      </p>
                      <p>
                        This scenario will guide you through the process of identifying a brute force SSH attack and
                        implementing countermeasures to protect your system.
                      </p>
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Getting Started:</h4>
                        <ol className="list-decimal pl-5 space-y-1">
                          <li>Click "Start Simulation" to begin</li>
                          <li>Type "help" to see available commands</li>
                          <li>Type "tasks" to see your objectives</li>
                          <li>Use "netstat" to view current network connections</li>
                          <li>Look for suspicious patterns in network traffic</li>
                        </ol>
                      </div>
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Reconnaissance Phase</h3>
                      <p>
                        Start by monitoring your network traffic. Look for unusual patterns or suspicious activities. Pay
                        special attention to connection attempts on common service ports like SSH (22), FTP (21), and RDP
                        (3389).
                      </p>
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Key Commands:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>
                            <code>netstat</code> - View current network connections
                          </li>
                          <li>
                            <code>ping [host]</code> - Check connectivity to a host
                          </li>
                          <li>
                            <code>traceroute [host]</code> - Trace the route to a host
                          </li>
                          <li>
                            <code>nmap [host]</code> - Scan a host for open ports
                          </li>
                        </ul>
                      </div>
                      <p>
                        Use these commands to gather information about the network and identify any suspicious hosts or
                        connection attempts.
                      </p>
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Detection Phase</h3>
                      <p>
                        Now that you've observed suspicious activity, it's time to identify the type of attack. Multiple
                        failed login attempts on port 22 (SSH) indicate a possible brute force attack.
                      </p>
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Key Commands:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>
                            <code>analyze [ip]</code> - Analyze traffic from an IP address
                          </li>
                          <li>
                            <code>firewall list</code> - View current firewall rules
                          </li>
                        </ul>
                      </div>
                      <p>
                        Use the analyze command on suspicious IP addresses to determine the nature of the attack. Look for
                        patterns like multiple connection attempts to the same port.
                      </p>
                    </div>
                  )}
                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Mitigation Phase</h3>
                      <p>
                        Now that you've identified the threat, it's time to take action to stop the attack. For a brute
                        force SSH attack, you can block the attacking IP address using the firewall.
                      </p>
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Key Commands:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>
                            <code>block [ip] [port]</code> - Block traffic from an IP address
                          </li>
                          <li>
                            <code>firewall add [src] [dst] [port] [action]</code> - Add a firewall rule
                          </li>
                        </ul>
                      </div>
                      <p>
                        Block the malicious IP address to prevent further attack attempts. You can block all traffic from
                        the IP or specifically target port 22 (SSH).
                      </p>
                    </div>
                  )}
                  {currentStep === 5 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Analysis Phase</h3>
                      <p>
                        Great job! You've successfully detected and mitigated a brute force SSH attack. Let's analyze what
                        happened and document the incident.
                      </p>
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Key Commands:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>
                            <code>report</code> - Generate an incident report
                          </li>
                        </ul>
                      </div>
                      <p>
                        Generate a report to document the incident, including the attack type, actions taken, and
                        recommendations for future prevention. This documentation is crucial for security audits and
                        improving your security posture.
                      </p>
                      <p>
                        Consider implementing additional security measures like SSH key authentication, rate limiting for
                        login attempts, and intrusion detection systems.
                      </p>
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
                      <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                        Beginner
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Estimated Time:</span>
                      <span className="text-sm">30-45 minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Category:</span>
                      <span className="text-sm">Network Security</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Skills:</span>
                      <div className="flex flex-wrap gap-1 justify-end">
                        <span className="bg-muted text-xs px-2 py-1 rounded-full">Monitoring</span>
                        <span className="bg-muted text-xs px-2 py-1 rounded-full">Detection</span>
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
                      <span>Use command-line tools for network monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>Identify suspicious network activity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>Recognize patterns of brute force attacks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>Implement appropriate countermeasures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>Document and analyze security incidents</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          © 2025 Cyber Sim Lab. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

