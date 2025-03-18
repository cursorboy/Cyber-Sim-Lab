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

export default function SocialEngineeringScenario() {
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [simulationActive, setSimulationActive] = useState(false)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to CyberDefender Social Engineering Defense Terminal",
    "Type 'help' to see available commands",
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null)
  const [completedTasks, setCompletedTasks] = useState<string[]>([])
  const [correctResponses, setCorrectResponses] = useState(0)

  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const totalSteps = 5

  const tasks = [
    "Identify social engineering techniques",
    "Analyze suspicious scenarios",
    "Respond to manipulation attempts",
    "Document security incidents",
    "Implement preventive measures",
  ]

  const scenarios = [
    {
      id: 1,
      title: "Pretexting Phone Call",
      description:
        "You receive a call from someone claiming to be from IT support who needs your password to fix an urgent system issue.",
      type: "Phone",
      technique: "Pretexting",
      options: [
        {
          id: "a",
          text: "Provide your password since it's an urgent issue",
          isCorrect: false,
          feedback:
            "Never share your password with anyone, even IT support. Legitimate IT staff will never ask for your password.",
        },
        {
          id: "b",
          text: "Refuse to provide your password and report the incident",
          isCorrect: true,
          feedback: "Correct! This is a pretexting attack. IT support should never ask for your password.",
        },
        {
          id: "c",
          text: "Ask for their employee ID and call them back on the official IT support number",
          isCorrect: true,
          feedback:
            "Good approach! Verifying identity through official channels is a safe way to handle such requests.",
        },
      ],
      analysis:
        "This is a pretexting attack where the caller creates a fabricated scenario (urgent system issue) to obtain sensitive information (your password). They're exploiting urgency and authority to manipulate you into bypassing security protocols.",
    },
    {
      id: 2,
      title: "Tailgating Attempt",
      description:
        "A well-dressed person you don't recognize is waiting at the secure entrance to your office building. They smile and say they forgot their access card.",
      type: "Physical",
      technique: "Tailgating",
      options: [
        {
          id: "a",
          text: "Hold the door open for them since they look professional",
          isCorrect: false,
          feedback: "Appearances can be deceiving. This is a tailgating attempt to gain unauthorized physical access.",
        },
        {
          id: "b",
          text: "Direct them to the reception desk to get a visitor badge",
          isCorrect: true,
          feedback: "Correct! All visitors should follow proper security protocols, regardless of appearance.",
        },
        {
          id: "c",
          text: "Ask for their ID and which department they work in",
          isCorrect: true,
          feedback:
            "Good approach! Verifying identity is important, though directing them to reception is the safest option.",
        },
      ],
      analysis:
        "This is a tailgating attack where the person is trying to bypass physical security controls by exploiting social courtesy. They're using appearance (well-dressed) and a plausible excuse (forgot access card) to manipulate you into granting unauthorized access.",
    },
    {
      id: 3,
      title: "Baiting USB Drive",
      description:
        "You find a USB drive in the parking lot with a label that says 'Confidential - Executive Salaries'.",
      type: "Physical",
      technique: "Baiting",
      options: [
        {
          id: "a",
          text: "Plug it into your computer to see if it contains valuable information",
          isCorrect: false,
          feedback: "This is a baiting attack. The USB drive likely contains malware that would infect your computer.",
        },
        {
          id: "b",
          text: "Turn it in to security or IT without plugging it in",
          isCorrect: true,
          feedback:
            "Correct! Unknown USB drives could contain malware and should be handled by security professionals.",
        },
        {
          id: "c",
          text: "Ask colleagues if anyone lost a USB drive",
          isCorrect: false,
          feedback:
            "This still puts the organization at risk. The USB should be given to security or IT professionals.",
        },
      ],
      analysis:
        "This is a baiting attack where the attacker has left a tempting item (USB drive with intriguing label) to exploit curiosity. When plugged in, the USB likely contains malware that would compromise your system and potentially the entire network.",
    },
    {
      id: 4,
      title: "Quid Pro Quo Offer",
      description:
        "You receive a call offering free technical support or a software upgrade in exchange for access to your computer.",
      type: "Phone",
      technique: "Quid Pro Quo",
      options: [
        {
          id: "a",
          text: "Accept the offer since you've been having computer issues",
          isCorrect: false,
          feedback:
            "This is a quid pro quo attack. The caller is trying to gain unauthorized access to your computer to install malware or steal data.",
        },
        {
          id: "b",
          text: "Decline the offer and report the call to IT security",
          isCorrect: true,
          feedback: "Correct! Unsolicited technical support offers are often social engineering attacks.",
        },
        {
          id: "c",
          text: "Ask for their company information and say you'll call back",
          isCorrect: true,
          feedback: "Good approach! This allows you to verify the legitimacy of the offer through official channels.",
        },
      ],
      analysis:
        "This is a quid pro quo attack where the caller offers something of value (free technical support) in exchange for something they want (access to your computer). They're exploiting your desire for help with computer issues to gain unauthorized access.",
    },
    {
      id: 5,
      title: "Authority-Based Request",
      description:
        "You receive an urgent email that appears to be from your CEO asking you to wire money to a new vendor immediately.",
      type: "Email",
      technique: "Authority",
      options: [
        {
          id: "a",
          text: "Comply immediately since it's from the CEO",
          isCorrect: false,
          feedback:
            "This is likely a business email compromise attack. Attackers impersonate executives to exploit the authority they hold.",
        },
        {
          id: "b",
          text: "Verify the request through a different communication channel before taking action",
          isCorrect: true,
          feedback: "Correct! Always verify unusual requests, especially financial ones, through a different channel.",
        },
        {
          id: "c",
          text: "Forward the email to your manager for guidance",
          isCorrect: true,
          feedback: "Good approach! Consulting with others can help identify social engineering attempts.",
        },
      ],
      analysis:
        "This is an authority-based attack (likely business email compromise) where the attacker impersonates a high-ranking executive to exploit the authority they hold. They're creating urgency to prevent you from following normal verification procedures for financial transactions.",
    },
    {
      id: 6,
      title: "Scarcity Tactic",
      description:
        "You receive a message saying you've won a limited-time prize, but you must provide your account credentials within the next hour to claim it.",
      type: "Message",
      technique: "Scarcity",
      options: [
        {
          id: "a",
          text: "Provide your credentials quickly to claim the prize before it expires",
          isCorrect: false,
          feedback:
            "This is a scarcity tactic designed to make you act quickly without thinking. It's a social engineering attack.",
        },
        {
          id: "b",
          text: "Ignore the message and report it as suspicious",
          isCorrect: true,
          feedback:
            "Correct! Legitimate organizations don't request credentials for prize claims, especially with urgent deadlines.",
        },
        {
          id: "c",
          text: "Click on the link to learn more about the prize without entering credentials",
          isCorrect: false,
          feedback: "Even clicking the link can be dangerous as it might lead to malware or phishing sites.",
        },
      ],
      analysis:
        "This is a scarcity attack that creates a false sense of urgency and limited availability (limited-time prize) to pressure you into acting quickly without proper verification. The time constraint (next hour) is designed to prevent you from thinking critically about the request.",
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
    addTerminalLine("System initialized. Starting social engineering defense training...")
    addTerminalLine("Loading scenario database...")
    addTerminalLine("Environment ready. You can now begin your training.")
    addTerminalLine("Type 'list' to view available scenarios.")

    toast({
      title: "Simulation Started",
      description: "Use terminal commands to analyze social engineering scenarios and practice appropriate responses.",
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
        listScenarios()
        break
      case "view":
        viewScenario(Number.parseInt(args[1]))
        break
      case "analyze":
        analyzeScenario(Number.parseInt(args[1]))
        break
      case "respond":
        respondToScenario(Number.parseInt(args[1]), args[2])
        break
      case "techniques":
        showTechniques()
        break
      case "document":
        documentIncident(Number.parseInt(args[1]))
        break
      case "prevent":
        showPreventionStrategies()
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
    addTerminalLine("  list                - List all social engineering scenarios")
    addTerminalLine("  view [id]           - View details of a specific scenario")
    addTerminalLine("  analyze [id]        - Analyze a scenario for social engineering techniques")
    addTerminalLine("  respond [id] [a|b|c] - Respond to a scenario with option a, b, or c")
    addTerminalLine("  techniques          - Show common social engineering techniques")
    addTerminalLine("  document [id]       - Document a security incident for a scenario")
    addTerminalLine("  prevent             - Show prevention strategies")
    addTerminalLine("  tasks               - Show current tasks")
    addTerminalLine("  clear               - Clear terminal")
  }

  const listScenarios = () => {
    addTerminalLine("Available Scenarios:")
    addTerminalLine("ID  Type      Title")
    addTerminalLine("--  --------  ----------------------------------")

    scenarios.forEach((scenario) => {
      const id = scenario.id.toString().padEnd(4)
      const type = scenario.type.padEnd(10)
      const title = scenario.title

      addTerminalLine(`${id}${type}${title}`)
    })
  }

  const viewScenario = (id: number) => {
    const scenario = scenarios.find((s) => s.id === id)

    if (!scenario) {
      addTerminalLine(`Scenario with ID ${id} not found.`)
      return
    }

    setSelectedScenario(id)

    addTerminalLine("=== Scenario Details ===")
    addTerminalLine(`Title: ${scenario.title}`)
    addTerminalLine(`Type: ${scenario.type}`)
    addTerminalLine(`Description: ${scenario.description}`)
    addTerminalLine("")
    addTerminalLine("Response Options:")
    scenario.options.forEach((option) => {
      addTerminalLine(`${option.id}) ${option.text}`)
    })
    addTerminalLine("========================")
    addTerminalLine("Use 'analyze [id]' to identify the social engineering technique.")
    addTerminalLine("Use 'respond [id] [a|b|c]' to choose your response.")
  }

  const analyzeScenario = (id: number) => {
    const scenario = scenarios.find((s) => s.id === id)

    if (!scenario) {
      addTerminalLine(`Scenario with ID ${id} not found.`)
      return
    }

    addTerminalLine("=== Social Engineering Analysis ===")
    addTerminalLine(`Analyzing scenario: ${scenario.title}`)

    setTimeout(() => {
      addTerminalLine(`Technique identified: ${scenario.technique}`)
      addTerminalLine("")
      addTerminalLine(scenario.analysis)
      addTerminalLine("==================================")

      if (!completedTasks.includes("Identify social engineering techniques")) {
        setCompletedTasks((prev) => [...prev, "Identify social engineering techniques"])
        toast({
          title: "Task Completed",
          description: "You've successfully identified social engineering techniques.",
          duration: 3000,
        })
      }

      if (!completedTasks.includes("Analyze suspicious scenarios")) {
        setCompletedTasks((prev) => [...prev, "Analyze suspicious scenarios"])
        toast({
          title: "Task Completed",
          description: "You've successfully analyzed suspicious scenarios.",
          duration: 3000,
        })
      }
    }, 1500)
  }

  const respondToScenario = (id: number, optionId?: string) => {
    const scenario = scenarios.find((s) => s.id === id)

    if (!scenario) {
      addTerminalLine(`Scenario with ID ${id} not found.`)
      return
    }

    if (!optionId || !["a", "b", "c"].includes(optionId.toLowerCase())) {
      addTerminalLine("Usage: respond [id] [a|b|c]")
      return
    }

    const option = scenario.options.find((o) => o.id.toLowerCase() === optionId.toLowerCase())

    if (!option) {
      addTerminalLine(`Option ${optionId} not found for this scenario.`)
      return
    }

    addTerminalLine(`You chose: ${option.text}`)

    setTimeout(() => {
      addTerminalLine(`Feedback: ${option.feedback}`)

      if (option.isCorrect) {
        setCorrectResponses((prev) => prev + 1)
        addTerminalLine("This was the correct response!")

        if (!completedTasks.includes("Respond to manipulation attempts")) {
          setCompletedTasks((prev) => [...prev, "Respond to manipulation attempts"])
          toast({
            title: "Task Completed",
            description: "You've successfully responded to manipulation attempts.",
            duration: 3000,
          })
        }
      } else {
        addTerminalLine("This was not the best response. Consider the alternatives.")
      }
    }, 1000)
  }

  const showTechniques = () => {
    addTerminalLine("Common Social Engineering Techniques:")
    addTerminalLine("")
    addTerminalLine("1. Pretexting: Creating a fabricated scenario to obtain information")
    addTerminalLine("   Example: Calling as IT support needing your password for 'urgent maintenance'")
    addTerminalLine("")
    addTerminalLine("2. Baiting: Offering something enticing to spark curiosity")
    addTerminalLine("   Example: Leaving infected USB drives in a parking lot labeled 'Confidential'")
    addTerminalLine("")
    addTerminalLine("3. Quid Pro Quo: Offering a service in exchange for information")
    addTerminalLine("   Example: Offering free tech support in exchange for access to your computer")
    addTerminalLine("")
    addTerminalLine("4. Tailgating: Following someone into a secure area")
    addTerminalLine("   Example: Waiting at a door and asking someone to hold it open")
    addTerminalLine("")
    addTerminalLine("5. Authority: Impersonating someone with power")
    addTerminalLine("   Example: Sending emails pretending to be the CEO requesting urgent action")
    addTerminalLine("")
    addTerminalLine("6. Scarcity: Creating a false sense of urgency or limited availability")
    addTerminalLine("   Example: 'You must act within 24 hours or your account will be suspended'")

    if (!completedTasks.includes("Identify social engineering techniques")) {
      setCompletedTasks((prev) => [...prev, "Identify social engineering techniques"])
      toast({
        title: "Task Completed",
        description: "You've successfully identified social engineering techniques.",
        duration: 3000,
      })
    }
  }

  const documentIncident = (id: number) => {
    const scenario = scenarios.find((s) => s.id === id)

    if (!scenario) {
      addTerminalLine(`Scenario with ID ${id} not found.`)
      return
    }

    addTerminalLine("Generating security incident report...")

    setTimeout(() => {
      addTerminalLine("=== SECURITY INCIDENT REPORT ===")
      addTerminalLine(`Date: ${new Date().toISOString().split("T")[0]}`)
      addTerminalLine(`Time: ${new Date().toTimeString().split(" ")[0]}`)
      addTerminalLine(`Incident Type: Social Engineering - ${scenario.technique}`)
      addTerminalLine(`Method: ${scenario.type}`)
      addTerminalLine("")
      addTerminalLine("Incident Description:")
      addTerminalLine(scenario.description)
      addTerminalLine("")
      addTerminalLine("Analysis:")
      addTerminalLine(scenario.analysis)
      addTerminalLine("")
      addTerminalLine("Recommended Actions:")
      addTerminalLine("1. Report the incident to the security team")
      addTerminalLine("2. Document all details of the interaction")
      addTerminalLine("3. Alert colleagues about similar attempts")
      addTerminalLine("4. Review and reinforce security awareness training")
      addTerminalLine("===============================")

      if (!completedTasks.includes("Document security incidents")) {
        setCompletedTasks((prev) => [...prev, "Document security incidents"])
        toast({
          title: "Task Completed",
          description: "You've successfully documented security incidents.",
          duration: 3000,
        })
      }
    }, 2000)
  }

  const showPreventionStrategies = () => {
    addTerminalLine("=== Social Engineering Prevention Strategies ===")
    addTerminalLine("")
    addTerminalLine("1. Verify identities through official channels")
    addTerminalLine("   - Call back using official phone numbers, not provided numbers")
    addTerminalLine("   - Confirm unusual requests with the supposed sender via a different method")
    addTerminalLine("")
    addTerminalLine("2. Be skeptical of urgency")
    addTerminalLine("   - Urgent requests are often used to bypass normal security procedures")
    addTerminalLine("   - Take time to verify even when pressured to act quickly")
    addTerminalLine("")
    addTerminalLine("3. Protect sensitive information")
    addTerminalLine("   - Never share passwords, even with IT support")
    addTerminalLine("   - Be cautious about what information you share online")
    addTerminalLine("")
    addTerminalLine("4. Follow security policies")
    addTerminalLine("   - Adhere to visitor management procedures")
    addTerminalLine("   - Follow proper channels for financial transactions")
    addTerminalLine("")
    addTerminalLine("5. Report suspicious activities")
    addTerminalLine("   - Document and report all social engineering attempts")
    addTerminalLine("   - Share information about attacks with colleagues")
    addTerminalLine("")
    addTerminalLine("6. Participate in security awareness training")
    addTerminalLine("   - Stay informed about the latest social engineering techniques")
    addTerminalLine("   - Practice recognizing and responding to attacks")
    addTerminalLine("==============================================")

    if (!completedTasks.includes("Implement preventive measures")) {
      setCompletedTasks((prev) => [...prev, "Implement preventive measures"])
      toast({
        title: "Task Completed",
        description: "You've successfully implemented preventive measures.",
        duration: 3000,
      })
    }
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
            <h1 className="text-3xl font-bold">Social Engineering Defense</h1>
            <p className="text-muted-foreground">
              Learn to identify and respond to social engineering attacks.
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
                        <span>25:00</span>
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
                              Use terminal commands to analyze social engineering scenarios and practice appropriate
                              responses. Type 'help' to see available commands.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <CardDescription>Identify and respond to various social engineering attempts</CardDescription>
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
                          "Welcome to CyberDefender Social Engineering Defense Terminal",
                          "Type 'help' to see available commands",
                        ])
                        setSelectedScenario(null)
                        setCompletedTasks([])
                        setCorrectResponses(0)
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
                    {["Introduction", "Recognition", "Analysis", "Response", "Prevention"][currentStep - 1]}
                  </CardTitle>
                  <CardDescription>Progress: {Math.round(progress)}%</CardDescription>
                  <Progress value={progress} className="h-2" />
                </CardHeader>
                <CardContent>
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Welcome to the Social Engineering Defense Scenario</h3>
                      <p>
                        In this simulation, you will learn how to recognize and respond to various social engineering
                        attacks. Social engineering is the psychological manipulation of people into performing actions or
                        divulging confidential information.
                      </p>
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Getting Started:</h4>
                        <ol className="list-decimal pl-5 space-y-1">
                          <li>Click "Start Simulation" to begin</li>
                          <li>Type "help" to see available commands</li>
                          <li>Type "list" to view available scenarios</li>
                          <li>Use "view [id]" to examine a specific scenario</li>
                          <li>Use "analyze [id]" to identify the social engineering technique</li>
                        </ol>
                      </div>
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Recognition Phase</h3>
                      <p>
                        The first step in defending against social engineering is recognizing the attack. You need to
                        understand common techniques used by attackers to manipulate people.
                      </p>
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Key Commands:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>
                            <code>techniques</code> - Learn about social engineering techniques
                          </li>
                          <li>
                            <code>view [id]</code> - Examine a specific scenario
                          </li>
                          <li>
                            <code>analyze [id]</code> - Identify the technique being used
                          </li>
                        </ul>
                      </div>
                      <p>
                        Pay attention to psychological triggers like urgency, authority, fear, curiosity, and trust that
                        attackers exploit to manipulate their targets.
                      </p>
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Analysis Phase</h3>
                      <p>
                        Once you recognize a potential social engineering attack, analyze the situation to understand the
                        technique being used and the attacker's goal.
                      </p>
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Analysis Questions:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>What information or access is the attacker trying to obtain?</li>
                          <li>What technique are they using to manipulate you?</li>
                          <li>What psychological triggers are they exploiting?</li>
                          <li>Is the request unusual, unexpected, or out of character?</li>
                          <li>Are there any red flags or inconsistencies in the scenario?</li>
                        </ul>
                      </div>
                      <p>
                        Use the <code>analyze [id]</code> command to perform a detailed analysis of each scenario.
                      </p>
                    </div>
                  )}
                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Response Phase</h3>
                      <p>
                        After identifying a social engineering attempt, it's important to respond appropriately to protect
                        yourself and your organization.
                      </p>
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Key Commands:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>
                            <code>respond [id] [a|b|c]</code> - Choose your response to a scenario
                          </li>
                          <li>
                            <code>document [id]</code> - Document the security incident
                          </li>
                        </ul>
                      </div>
                      <p>Remember these key principles when responding:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Verify requests through official channels</li>
                        <li>Don't be pressured by urgency or authority</li>
                        <li>Report suspicious activities to your security team</li>
                        <li>Follow established security protocols</li>
                        <li>When in doubt, politely decline and consult with security personnel</li>
                      </ul>
                    </div>
                  )}
                  {currentStep === 5 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Prevention Phase</h3>
                      <p>
                        The best defense against social engineering is prevention. Implementing strong security practices
                        and awareness can significantly reduce the risk of successful attacks.
                      </p>
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Key Command:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>
                            <code>prevent</code> - Learn about prevention strategies
                          </li>
                        </ul>
                      </div>
                      <p>Effective prevention strategies include:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Regular security awareness training</li>
                        <li>Establishing clear security policies and procedures</li>
                        <li>Implementing verification processes for sensitive requests</li>
                        <li>Creating a culture where security is everyone's responsibility</li>
                        <li>Staying informed about the latest social engineering techniques</li>
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
                      <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                        Beginner
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Estimated Time:</span>
                      <span className="text-sm">25-35 minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Category:</span>
                      <span className="text-sm">Social Engineering</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Skills:</span>
                      <div className="flex flex-wrap gap-1 justify-end">
                        <span className="bg-muted text-xs px-2 py-1 rounded-full">Recognition</span>
                        <span className="bg-muted text-xs px-2 py-1 rounded-full">Analysis</span>
                        <span className="bg-muted text-xs px-2 py-1 rounded-full">Response</span>
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
                      <span>Identify common social engineering techniques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>Recognize psychological triggers used by attackers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>Analyze suspicious scenarios for red flags</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>Respond appropriately to social engineering attempts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>Implement preventive measures against manipulation</span>
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
          © 2025 CyberDefender. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

