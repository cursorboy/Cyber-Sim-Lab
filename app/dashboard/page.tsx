"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Activity,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Shield,
  Terminal,
  Trophy,
  User,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Track your progress and explore cybersecurity training scenarios.
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Track your progress and continue your cybersecurity training</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                <span>Training Calendar</span>
              </Button>
              <Button className="gap-2">
                <Zap className="h-4 w-4" />
                <span>Start New Scenario</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Scenarios Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">2/12</div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <Progress value={16.7} className="h-2 mt-4" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Training Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">4.5</div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-4">+1.5 hours this week</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Skill Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">Beginner</div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-4">425 XP to next level</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="learning">Learning Path</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your recent training activities and progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Terminal className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">Completed Network Intrusion Scenario</p>
                              <span className="text-xs text-muted-foreground">2 days ago</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              You successfully detected and mitigated a brute force attack.
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs bg-muted px-2 py-1 rounded-full">+150 XP</span>
                              <span className="text-xs bg-muted px-2 py-1 rounded-full">Network Security</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">Completed Cybersecurity Fundamentals Course</p>
                              <span className="text-xs text-muted-foreground">5 days ago</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              You completed all modules in the fundamentals course.
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs bg-muted px-2 py-1 rounded-full">+300 XP</span>
                              <span className="text-xs bg-muted px-2 py-1 rounded-full">Fundamentals</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Award className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">Earned "First Defense" Badge</p>
                              <span className="text-xs text-muted-foreground">1 week ago</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              You earned this badge by completing your first security scenario.
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs bg-muted px-2 py-1 rounded-full">Achievement</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended Scenarios</CardTitle>
                      <CardDescription>Based on your skill level and progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/scenarios/phishing-detection">
                          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-base">Phishing Detection</CardTitle>
                                <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                                  Beginner
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground mb-4">
                                Learn to identify and handle phishing attempts
                              </p>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">20-30 min</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Trophy className="h-4 w-4 text-primary" />
                                  <span className="text-primary">+200 XP</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                        <Link href="/scenarios/malware-analysis">
                          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-base">Malware Analysis</CardTitle>
                                <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                                  Beginner
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground mb-4">
                                Identify and neutralize malicious software
                              </p>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">30-45 min</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Trophy className="h-4 w-4 text-primary" />
                                  <span className="text-primary">+250 XP</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Skill Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Network Security</span>
                            <span className="text-sm">65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Malware Analysis</span>
                            <span className="text-sm">40%</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Social Engineering</span>
                            <span className="text-sm">25%</span>
                          </div>
                          <Progress value={25} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Incident Response</span>
                            <span className="text-sm">15%</span>
                          </div>
                          <Progress value={15} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Forensics</span>
                            <span className="text-sm">10%</span>
                          </div>
                          <Progress value={10} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Goals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <CheckCircle className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Complete 2 scenarios</p>
                            <p className="text-xs text-muted-foreground">1/2 completed</p>
                            <Progress value={50} className="h-1.5 mt-1" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Clock className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Train for 3 hours</p>
                            <p className="text-xs text-muted-foreground">1.5/3 hours</p>
                            <Progress value={50} className="h-1.5 mt-1" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-muted p-2 rounded-full">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Read 2 security articles</p>
                            <p className="text-xs text-muted-foreground">0/2 read</p>
                            <Progress value={0} className="h-1.5 mt-1" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View All Goals
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>Track your progress across all cybersecurity domains</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <BarChart3 className="h-16 w-16" />
                      <p>Detailed progress charts will appear here as you complete more scenarios</p>
                      <Button variant="outline" className="mt-2">
                        View Sample Chart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>Badges and certifications you've earned</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-12 w-12 text-primary" />
                      </div>
                      <p className="font-medium text-center">First Defense</p>
                      <p className="text-xs text-muted-foreground text-center">Completed first scenario</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                        <Terminal className="h-12 w-12 text-primary" />
                      </div>
                      <p className="font-medium text-center">Network Guardian</p>
                      <p className="text-xs text-muted-foreground text-center">Mastered network security</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 opacity-40">
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                        <Zap className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <p className="font-medium text-center">Malware Hunter</p>
                      <p className="text-xs text-muted-foreground text-center">Not yet earned</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 opacity-40">
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                        <Activity className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <p className="font-medium text-center">Incident Responder</p>
                      <p className="text-xs text-muted-foreground text-center">Not yet earned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="learning">
              <Card>
                <CardHeader>
                  <CardTitle>Your Learning Path</CardTitle>
                  <CardDescription>Recommended training sequence based on your goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                        1
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="font-medium">Cybersecurity Fundamentals</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Learn the basics of cybersecurity principles and practices
                        </p>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-500">Completed</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                        2
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="font-medium">Network Security Essentials</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Master the fundamentals of securing networks and detecting intrusions
                        </p>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-primary" />
                          <span className="text-sm text-primary">In Progress (65%)</span>
                        </div>
                        <Progress value={65} className="h-1.5 mt-2" />
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                        3
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="font-medium">Malware Analysis & Response</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Learn to identify, analyze, and neutralize malicious software
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Not Started</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                        4
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="font-medium">Social Engineering Defense</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Develop skills to recognize and counter manipulation tactics
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Not Started</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                        5
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="font-medium">Incident Response & Forensics</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Learn advanced techniques for responding to and investigating security incidents
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Not Started</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Continue Your Learning Path</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
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

