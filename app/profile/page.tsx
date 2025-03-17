"use client"
import Link from "next/link"
import {
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Edit,
  FileText,
  LogOut,
  Settings,
  Shield,
  Terminal,
  Trophy,
  User,
  ArrowLeft,
  Star,
  Activity,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  // This would normally come from a database/auth system
  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2024",
    completedScenarios: 12,
    totalTime: "45 hours",
    rank: "Cybersecurity Analyst",
    progress: 65,
    recentAchievements: [
      "Completed Network Defense Basics",
      "Detected Advanced Phishing Attack",
      "Resolved Ransomware Incident"
    ],
    skills: [
      { name: "Network Security", level: 75 },
      { name: "Malware Analysis", level: 60 },
      { name: "Incident Response", level: 85 },
      { name: "Social Engineering", level: 70 }
    ],
    recentActivity: [
      {
        scenario: "Privilege Escalation",
        date: "2 days ago",
        status: "Completed",
        score: "92%"
      },
      {
        scenario: "Network Intrusion",
        date: "5 days ago",
        status: "Completed",
        score: "88%"
      },
      {
        scenario: "Phishing Detection",
        date: "1 week ago",
        status: "Completed",
        score: "95%"
      }
    ]
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-16 items-center px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-semibold">
            <Shield className="h-6 w-6 text-primary" />
            <span>Cyber Sim Lab</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/scenarios" className="text-sm font-medium transition-colors hover:text-primary">
              Scenarios
            </Link>
            <Link href="/resources" className="text-sm font-medium transition-colors hover:text-primary">
              Resources
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/scenarios">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Scenarios
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Profile</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>Your cybersecurity training progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">{userProfile.name}</h2>
                      <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                      <p className="text-sm text-muted-foreground">Member since {userProfile.joinDate}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <Trophy className="h-5 w-5 text-primary mb-2" />
                      <div className="text-2xl font-semibold">{userProfile.completedScenarios}</div>
                      <div className="text-sm text-muted-foreground">Scenarios Completed</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <Clock className="h-5 w-5 text-primary mb-2" />
                      <div className="text-2xl font-semibold">{userProfile.totalTime}</div>
                      <div className="text-sm text-muted-foreground">Training Time</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <Star className="h-5 w-5 text-primary mb-2" />
                      <div className="text-2xl font-semibold">{userProfile.rank}</div>
                      <div className="text-sm text-muted-foreground">Current Rank</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Overall Progress</h3>
                    <Progress value={userProfile.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground text-right">{userProfile.progress}% Complete</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest training sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userProfile.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div>
                          <h4 className="font-medium">{activity.scenario}</h4>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-primary">{activity.score}</div>
                          <div className="text-sm text-muted-foreground">{activity.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>Your proficiency levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userProfile.skills.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{skill.name}</span>
                          <span className="text-primary">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                  <CardDescription>Your latest accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userProfile.recentAchievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Activity className="h-5 w-5 text-primary mt-0.5" />
                        <span className="text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container py-6 text-center text-sm text-muted-foreground max-w-7xl mx-auto px-4 md:px-6">
          © 2025 Cyber Sim Lab. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

