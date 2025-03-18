"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Clock, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/hooks/use-toast"

export default function RansomwareResponsePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [simulationActive, setSimulationActive] = useState(false)
  const [completedTasks, setCompletedTasks] = useState<string[]>([])
  const [systemsIsolated, setSystemsIsolated] = useState<string[]>([])
  const [filesDecrypted, setFilesDecrypted] = useState(0)
  const [backupRestored, setBackupRestored] = useState(false)
  const [vulnerabilitiesPatched, setVulnerabilitiesPatched] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)

  const totalSteps = 5
  const totalFiles = 100

  const tasks = [
    "Isolate infected systems",
    "Identify the ransomware variant",
    "Restore from clean backups",
    "Patch vulnerabilities",
    "Document the incident",
  ]

  const affectedSystems = [
    {
      id: "fs-01",
      name: "File Server 01",
      type: "Server",
      os: "Windows Server 2019",
      status: "Infected",
      files: 342,
      encrypted: 342,
    },
    {
      id: "ws-15",
      name: "Workstation 15",
      type: "Desktop",
      os: "Windows 10",
      status: "Infected",
      files: 156,
      encrypted: 156,
    },
    {
      id: "ws-23",
      name: "Workstation 23",
      type: "Desktop",
      os: "Windows 10",
      status: "Infected",
      files: 89,
      encrypted: 89,
    },
    {
      id: "db-02",
      name: "Database Server 02",
      type: "Server",
      os: "Linux Ubuntu 20.04",
      status: "At Risk",
      files: 215,
      encrypted: 0,
    },
    {
      id: "mail-01",
      name: "Mail Server",
      type: "Server",
      os: "Linux Ubuntu 20.04",
      status: "At Risk",
      files: 178,
      encrypted: 0,
    },
  ]

  const ransomwareDetails = {
    name: "CryptoLock",
    variant: "CL-2025.1",
    encryptionType: "AES-256 + RSA-2048",
    fileExtension: ".locked",
    ransom: "5 Bitcoin",
    knownVulnerabilities: [
      "Outdated email filtering system",
      "Unpatched Windows vulnerability (CVE-2024-1234)",
      "Weak password policy",
      "Lack of network segmentation",
    ],
    indicators: [
      "Encrypted files with .locked extension",
      "Ransom note (README.txt) on affected systems",
      "Unusual network traffic to external IP 91.242.145.12",
      "Multiple failed authentication attempts before encryption",
    ],
  }

  const startSimulation = () => {
    setSimulationActive(true)
    setProgress(10)
    toast({
      title: "Simulation Started",
      description: "Ransomware response simulation is now active.",
      duration: 3000,
    })
  }

  const isolateSystem = (systemId: string) => {
    if (systemsIsolated.includes(systemId)) {
      toast({
        title: "System Already Isolated",
        description: `${affectedSystems.find((s) => s.id === systemId)?.name} is already isolated.`,
        duration: 3000,
      })
      return
    }

    setSystemsIsolated([...systemsIsolated, systemId])

    // Update progress
    const newProgress = Math.min(100, progress + 10)
    setProgress(newProgress)

    // Check if all infected systems are isolated
    const infectedSystems = affectedSystems.filter((s) => s.status === "Infected").map((s) => s.id)
    const allInfectedIsolated = infectedSystems.every((id) => [...systemsIsolated, systemId].includes(id))

    if (allInfectedIsolated && !completedTasks.includes("Isolate infected systems")) {
      setCompletedTasks([...completedTasks, "Isolate infected systems"])
      toast({
        title: "Task Completed",
        description: "You've successfully isolated all infected systems.",
        duration: 3000,
      })
    }
  }

  const identifyRansomware = () => {
    if (completedTasks.includes("Identify the ransomware variant")) {
      return
    }

    setCompletedTasks([...completedTasks, "Identify the ransomware variant"])
    setProgress(Math.min(100, progress + 20))

    toast({
      title: "Ransomware Identified",
      description: `Identified as ${ransomwareDetails.name} (${ransomwareDetails.variant})`,
      duration: 3000,
    })
  }

  const restoreFromBackup = () => {
    if (backupRestored) {
      return
    }

    setBackupRestored(true)
    setFilesDecrypted(totalFiles)
    setProgress(Math.min(100, progress + 25))

    if (!completedTasks.includes("Restore from clean backups")) {
      setCompletedTasks([...completedTasks, "Restore from clean backups"])
      toast({
        title: "Systems Restored",
        description: "Successfully restored systems from clean backups.",
        duration: 3000,
      })
    }
  }

  const patchVulnerabilities = () => {
    if (vulnerabilitiesPatched) {
      return
    }

    setVulnerabilitiesPatched(true)
    setProgress(Math.min(100, progress + 20))

    if (!completedTasks.includes("Patch vulnerabilities")) {
      setCompletedTasks([...completedTasks, "Patch vulnerabilities"])
      toast({
        title: "Vulnerabilities Patched",
        description: "Successfully patched all identified vulnerabilities.",
        duration: 3000,
      })
    }
  }

  const generateReport = () => {
    if (reportGenerated) {
      return
    }

    setReportGenerated(true)
    setProgress(Math.min(100, progress + 15))

    if (!completedTasks.includes("Document the incident")) {
      setCompletedTasks([...completedTasks, "Document the incident"])
      toast({
        title: "Report Generated",
        description: "Incident report has been generated and documented.",
        duration: 3000,
      })
    }

    // Check if all tasks are completed
    if (completedTasks.length >= 4) {
      toast({
        title: "Scenario Completed!",
        description: "You've successfully responded to the ransomware attack.",
        duration: 5000,
      })
    }
  }

  const resetSimulation = () => {
    setSimulationActive(false)
    setProgress(0)
    setCompletedTasks([])
    setSystemsIsolated([])
    setFilesDecrypted(0)
    setBackupRestored(false)
    setVulnerabilitiesPatched(false)
    setReportGenerated(false)
    setCurrentStep(1)

    toast({
      title: "Simulation Reset",
      description: "The ransomware response simulation has been reset.",
      duration: 3000,
    })
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-8">
        <div className="flex items-center mb-8">
          <Link href="/scenarios">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Scenarios
            </Button>
          </Link>
          <h1 className="text-3xl font-bold ml-4">Ransomware Response Scenario</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Ransomware Response Simulation</CardTitle>
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
                            Respond to a ransomware attack by isolating systems, identifying the threat, and restoring
                            operations.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <CardDescription>Contain and recover from a ransomware attack</CardDescription>
                <Progress value={progress} className="h-2 mt-2" />
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="systems" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="systems">Affected Systems</TabsTrigger>
                    <TabsTrigger value="analysis">Threat Analysis</TabsTrigger>
                    <TabsTrigger value="recovery">Recovery</TabsTrigger>
                  </TabsList>

                  <TabsContent value="systems">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {affectedSystems.map((system) => (
                          <Card
                            key={system.id}
                            className={`border ${systemsIsolated.includes(system.id) ? "border-green-500" : system.status === "Infected" ? "border-red-500" : "border-yellow-500"}`}
                          >
                            <CardHeader className="py-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-base">{system.name}</CardTitle>
                                  <CardDescription>
                                    {system.type} - {system.os}
                                  </CardDescription>
                                </div>
                                <div
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    systemsIsolated.includes(system.id)
                                      ? "bg-green-500/10 text-green-500"
                                      : system.status === "Infected"
                                        ? "bg-red-500/10 text-red-500"
                                        : "bg-yellow-500/10 text-yellow-500"
                                  }`}
                                >
                                  {systemsIsolated.includes(system.id) ? "Isolated" : system.status}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="py-2">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Files:</span>
                                <span>{system.files}</span>
                              </div>
                              <div className="flex justify-between text-sm mb-3">
                                <span>Encrypted:</span>
                                <span className={system.encrypted > 0 ? "text-red-500" : ""}>{system.encrypted}</span>
                              </div>
                              <Button
                                size="sm"
                                className="w-full"
                                variant={systemsIsolated.includes(system.id) ? "outline" : "default"}
                                onClick={() => isolateSystem(system.id)}
                                disabled={!simulationActive || systemsIsolated.includes(system.id)}
                              >
                                {systemsIsolated.includes(system.id) ? "System Isolated" : "Isolate System"}
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="bg-muted p-4 rounded-md">
                        <h3 className="font-medium mb-2">Network Status</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Systems Isolated:</span>
                            <span>
                              {systemsIsolated.length} / {affectedSystems.length}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Network Segments Affected:</span>
                            <span>2 / 5</span>
                          </div>
                          <div className="flex justify-between">
                            <span>External Communications:</span>
                            <span className={systemsIsolated.length >= 3 ? "text-green-500" : "text-red-500"}>
                              {systemsIsolated.length >= 3 ? "Blocked" : "Active (Malicious)"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="analysis">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Ransomware Analysis</CardTitle>
                          <CardDescription>Identify the ransomware variant and its characteristics</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-sm font-medium mb-1">Name</h3>
                                <p className="text-sm">
                                  {completedTasks.includes("Identify the ransomware variant")
                                    ? ransomwareDetails.name
                                    : "Unknown"}
                                </p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium mb-1">Variant</h3>
                                <p className="text-sm">
                                  {completedTasks.includes("Identify the ransomware variant")
                                    ? ransomwareDetails.variant
                                    : "Unknown"}
                                </p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium mb-1">Encryption</h3>
                                <p className="text-sm">
                                  {completedTasks.includes("Identify the ransomware variant")
                                    ? ransomwareDetails.encryptionType
                                    : "Unknown"}
                                </p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium mb-1">File Extension</h3>
                                <p className="text-sm">{ransomwareDetails.fileExtension}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium mb-1">Ransom Demand</h3>
                                <p className="text-sm">{ransomwareDetails.ransom}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium mb-1">First Detected</h3>
                                <p className="text-sm">2025-03-16 08:45:22</p>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium mb-2">Indicators of Compromise</h3>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                {ransomwareDetails.indicators.map((indicator, index) => (
                                  <li key={index}>{indicator}</li>
                                ))}
                              </ul>
                            </div>

                            <Button
                              onClick={identifyRansomware}
                              disabled={!simulationActive || completedTasks.includes("Identify the ransomware variant")}
                            >
                              {completedTasks.includes("Identify the ransomware variant")
                                ? "Ransomware Identified"
                                : "Run Analysis Tool"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Vulnerability Assessment</CardTitle>
                          <CardDescription>Identify how the ransomware entered the system</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-sm font-medium mb-2">Known Vulnerabilities</h3>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                {ransomwareDetails.knownVulnerabilities.map((vulnerability, index) => (
                                  <li
                                    key={index}
                                    className={vulnerabilitiesPatched ? "text-green-500 line-through" : ""}
                                  >
                                    {vulnerability}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium mb-2">Attack Vector</h3>
                              <p className="text-sm">
                                Phishing email with malicious attachment sent to user jdoe@company.com
                              </p>
                            </div>

                            <Button
                              onClick={patchVulnerabilities}
                              disabled={!simulationActive || vulnerabilitiesPatched}
                            >
                              {vulnerabilitiesPatched ? "Vulnerabilities Patched" : "Patch Vulnerabilities"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="recovery">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Data Recovery</CardTitle>
                          <CardDescription>Restore systems from clean backups</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span>Files Recovered:</span>
                              <span>
                                {filesDecrypted} / {totalFiles}
                              </span>
                            </div>
                            <Progress value={(filesDecrypted / totalFiles) * 100} className="h-2" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-sm font-medium mb-2">Available Backups</h3>
                                <ul className="space-y-2">
                                  <li className="flex justify-between text-sm">
                                    <span>Daily Backup</span>
                                    <span>2025-03-15 23:00</span>
                                  </li>
                                  <li className="flex justify-between text-sm">
                                    <span>Weekly Backup</span>
                                    <span>2025-03-14 22:00</span>
                                  </li>
                                  <li className="flex justify-between text-sm">
                                    <span>Monthly Backup</span>
                                    <span>2025-03-01 22:00</span>
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <h3 className="text-sm font-medium mb-2">Recovery Status</h3>
                                <ul className="space-y-2">
                                  {affectedSystems.map((system) => (
                                    <li key={system.id} className="flex justify-between text-sm">
                                      <span>{system.name}</span>
                                      <span className={backupRestored ? "text-green-500" : "text-red-500"}>
                                        {backupRestored ? "Restored" : "Pending"}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <Button onClick={restoreFromBackup} disabled={!simulationActive || backupRestored}>
                              {backupRestored ? "Systems Restored" : "Restore from Backup"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Incident Documentation</CardTitle>
                          <CardDescription>Document the incident for future reference</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-sm font-medium mb-2">Report Components</h3>
                                <ul className="space-y-1">
                                  <li className="flex items-center gap-2 text-sm">
                                    <div
                                      className={`h-4 w-4 rounded-full ${reportGenerated ? "bg-green-500" : "bg-muted"}`}
                                    ></div>
                                    <span>Executive Summary</span>
                                  </li>
                                  <li className="flex items-center gap-2 text-sm">
                                    <div
                                      className={`h-4 w-4 rounded-full ${reportGenerated ? "bg-green-500" : "bg-muted"}`}
                                    ></div>
                                    <span>Incident Timeline</span>
                                  </li>
                                  <li className="flex items-center gap-2 text-sm">
                                    <div
                                      className={`h-4 w-4 rounded-full ${reportGenerated ? "bg-green-500" : "bg-muted"}`}
                                    ></div>
                                    <span>Technical Analysis</span>
                                  </li>
                                  <li className="flex items-center gap-2 text-sm">
                                    <div
                                      className={`h-4 w-4 rounded-full ${reportGenerated ? "bg-green-500" : "bg-muted"}`}
                                    ></div>
                                    <span>Recovery Actions</span>
                                  </li>
                                  <li className="flex items-center gap-2 text-sm">
                                    <div
                                      className={`h-4 w-4 rounded-full ${reportGenerated ? "bg-green-500" : "bg-muted"}`}
                                    ></div>
                                    <span>Recommendations</span>
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <h3 className="text-sm font-medium mb-2">Lessons Learned</h3>
                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                  <li>Implement email filtering to detect and block phishing attempts</li>
                                  <li>Disable macros in Office documents from untrusted sources</li>
                                  <li>Implement network segmentation to limit lateral movement</li>
                                  <li>Conduct regular security awareness training</li>
                                  <li>Improve backup and recovery procedures</li>
                                </ul>
                              </div>
                            </div>

                            <Button onClick={generateReport} disabled={!simulationActive || reportGenerated}>
                              {reportGenerated ? "Report Generated" : "Generate Incident Report"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button onClick={startSimulation} disabled={simulationActive}>
                    Start Simulation
                  </Button>
                  <Button variant="outline" onClick={resetSimulation} disabled={!simulationActive}>
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
                  {["Introduction", "Containment", "Identification", "Recovery", "Post-Incident"][currentStep - 1]}
                </CardTitle>
                <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
              </CardHeader>
              <CardContent>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Welcome to the Ransomware Response Scenario</h3>
                    <p>
                      In this simulation, you will learn how to respond to a ransomware attack. Your organization has
                      been hit by ransomware that has encrypted files on multiple systems. Your task is to contain the
                      incident, identify the ransomware, recover the systems, and document the incident.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Getting Started:</h4>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Click "Start Simulation" to begin</li>
                        <li>First, isolate all infected systems to prevent further spread</li>
                        <li>Analyze the ransomware to identify its characteristics</li>
                        <li>Restore systems from clean backups</li>
                        <li>Document the incident and implement lessons learned</li>
                      </ol>
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Containment Phase</h3>
                    <p>
                      The first step in responding to a ransomware attack is to contain the incident to prevent further
                      spread. This involves isolating infected systems from the network and securing unaffected systems.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Key Actions:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Identify and isolate infected systems</li>
                        <li>Disconnect systems from the network</li>
                        <li>Block malicious IP addresses and domains</li>
                        <li>Secure unaffected systems</li>
                      </ul>
                    </div>
                    <p>
                      Go to the "Affected Systems" tab and isolate all systems marked as "Infected" to prevent the
                      ransomware from spreading further.
                    </p>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Identification Phase</h3>
                    <p>
                      After containing the incident, the next step is to identify the ransomware variant and understand
                      its characteristics. This information will help in determining the appropriate recovery strategy.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Key Actions:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Analyze the ransomware sample</li>
                        <li>Identify the ransomware variant</li>
                        <li>Determine the encryption method used</li>
                        <li>Identify the attack vector and vulnerabilities exploited</li>
                      </ul>
                    </div>
                    <p>
                      Go to the "Threat Analysis" tab and run the analysis tool to identify the ransomware variant.
                      Also, review the vulnerabilities that were exploited and patch them to prevent future attacks.
                    </p>
                  </div>
                )}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Recovery Phase</h3>
                    <p>
                      Once the ransomware has been identified and contained, the next step is to recover the affected
                      systems and restore normal operations. This typically involves restoring from clean backups.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Key Actions:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Identify the most recent clean backups</li>
                        <li>Restore systems from backups</li>
                        <li>Verify the integrity of restored data</li>
                        <li>Scan systems for remaining malware</li>
                      </ul>
                    </div>
                    <p>
                      Go to the "Recovery" tab and restore the affected systems from clean backups. Ensure all systems
                      are properly restored before bringing them back online.
                    </p>
                  </div>
                )}
                {currentStep === 5 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Post-Incident Phase</h3>
                    <p>
                      After recovering from the ransomware attack, it's important to document the incident and implement
                      lessons learned to prevent future attacks. This includes conducting a thorough analysis of what
                      happened and how to improve security.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Key Actions:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Document the incident timeline and response actions</li>
                        <li>Identify security gaps and vulnerabilities</li>
                        <li>Implement security improvements</li>
                        <li>Conduct security awareness training</li>
                        <li>Update incident response procedures</li>
                      </ul>
                    </div>
                    <p>
                      Go to the "Recovery" tab and generate an incident report to document the ransomware attack and
                      response. This will help improve future incident response capabilities.
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
                    <span className="bg-orange-500/10 text-orange-500 text-xs font-medium px-2 py-1 rounded-full">
                      Intermediate
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Estimated Time:</span>
                    <span className="text-sm">45-60 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Category:</span>
                    <span className="text-sm">Incident Response</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Skills:</span>
                    <div className="flex flex-wrap gap-1 justify-end">
                      <span className="bg-muted text-xs px-2 py-1 rounded-full">Containment</span>
                      <span className="bg-muted text-xs px-2 py-1 rounded-full">Recovery</span>
                      <span className="bg-muted text-xs px-2 py-1 rounded-full">Analysis</span>
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
                    <span>Understand ransomware attack patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Implement effective containment strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Restore systems from clean backups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Identify and patch security vulnerabilities</span>
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

