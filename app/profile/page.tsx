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
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">Manage your account and view your progress</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Button>
            <Button variant="outline" className="gap-2 text-red-500 hover:text-red-500">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-12 w-12 text-primary" />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full bg-background border"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">Alex Johnson</h2>
                    <p className="text-sm text-muted-foreground">alex.johnson@example.com</p>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                    <Trophy className="h-3.5 w-3.5" />
                    <span>Beginner</span>
                  </div>
                  <div className="w-full space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Level 2</span>
                      <span>575/1000 XP</span>
                    </div>
                    <Progress value={57.5} className="h-2" />
                  </div>
                  <div className="grid grid-cols-3 w-full gap-2 text-center">
                    <div className="flex flex-col items-center p-2 rounded-md bg-muted">
                      <span className="text-lg font-bold">2</span>
                      <span className="text-xs text-muted-foreground">Scenarios</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-md bg-muted">
                      <span className="text-lg font-bold">4.5</span>
                      <span className="text-xs text-muted-foreground">Hours</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-md bg-muted">
                      <span className="text-lg font-bold">2</span>
                      <span className="text-xs text-muted-foreground">Badges</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3">
            <Tabs defaultValue="achievements" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Badges</CardTitle>
                    <CardDescription>Badges you've earned through your training</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                          <Shield className="h-10 w-10 text-primary" />
                        </div>
                        <p className="font-medium text-center">First Defense</p>
                        <p className="text-xs text-muted-foreground text-center">Completed first scenario</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                          <Terminal className="h-10 w-10 text-primary" />
                        </div>
                        <p className="font-medium text-center">Network Guardian</p>
                        <p className="text-xs text-muted-foreground text-center">Mastered network security</p>
                      </div>
                      <div className="flex flex-col items-center gap-2 opacity-40">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                          <Award className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-center">Malware Hunter</p>
                        <p className="text-xs text-muted-foreground text-center">Not yet earned</p>
                      </div>
                      <div className="flex flex-col items-center gap-2 opacity-40">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                          <BookOpen className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-center">Security Scholar</p>
                        <p className="text-xs text-muted-foreground text-center">Not yet earned</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>Milestones you've reached in your training</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-3 rounded-lg border">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                        <div className="flex-1">
                          <h3 className="font-medium">Completed First Scenario</h3>
                          <p className="text-sm text-muted-foreground">
                            Successfully completed your first training scenario
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground">Mar 12, 2025</div>
                      </div>
                      <div className="flex items-center gap-4 p-3 rounded-lg border">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                        <div className="flex-1">
                          <h3 className="font-medium">Reached Level 2</h3>
                          <p className="text-sm text-muted-foreground">
                            Accumulated 500+ XP through training activities
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground">Mar 14, 2025</div>
                      </div>
                      <div className="flex items-center gap-4 p-3 rounded-lg border bg-muted/50">
                        <Clock className="h-6 w-6 text-muted-foreground" />
                        <div className="flex-1">
                          <h3 className="font-medium">Complete 5 Scenarios</h3>
                          <p className="text-sm text-muted-foreground">
                            Successfully complete 5 different training scenarios
                          </p>
                        </div>
                        <div className="text-xs text-primary">2/5 completed</div>
                      </div>
                      <div className="flex items-center gap-4 p-3 rounded-lg border bg-muted/50">
                        <Clock className="h-6 w-6 text-muted-foreground" />
                        <div className="flex-1">
                          <h3 className="font-medium">Training Dedication</h3>
                          <p className="text-sm text-muted-foreground">Complete 10 hours of cybersecurity training</p>
                        </div>
                        <div className="text-xs text-primary">4.5/10 hours</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="activity">
                <Card>
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
                            <span className="text-xs text-muted-foreground">Mar 14, 2025 - 2:45 PM</span>
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
                            <span className="text-xs text-muted-foreground">Mar 11, 2025 - 10:30 AM</span>
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
                            <span className="text-xs text-muted-foreground">Mar 9, 2025 - 4:15 PM</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            You earned this badge by completing your first security scenario.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-muted px-2 py-1 rounded-full">Achievement</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Read "Introduction to Network Security"</p>
                            <span className="text-xs text-muted-foreground">Mar 8, 2025 - 11:20 AM</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            You completed reading the article on network security basics.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-muted px-2 py-1 rounded-full">+50 XP</span>
                            <span className="text-xs bg-muted px-2 py-1 rounded-full">Learning</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Activity
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="certificates">
                <Card>
                  <CardHeader>
                    <CardTitle>Certificates</CardTitle>
                    <CardDescription>Certificates you've earned through your training</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 rounded-lg border">
                        <div className="bg-primary/10 p-3 rounded-md">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Cybersecurity Fundamentals</h3>
                          <p className="text-sm text-muted-foreground">
                            Completed the fundamentals course with a score of 92%
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">Issued: Mar 11, 2025</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-center p-8 rounded-lg border border-dashed">
                        <div className="text-center space-y-2">
                          <BookOpen className="h-8 w-8 text-muted-foreground mx-auto" />
                          <h3 className="font-medium">No Additional Certificates Yet</h3>
                          <p className="text-sm text-muted-foreground">Complete more training to earn certificates</p>
                          <Button variant="outline" className="mt-2">
                            Browse Courses
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <input
                              type="text"
                              className="w-full p-2 rounded-md border bg-background"
                              defaultValue="Alex Johnson"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <input
                              type="email"
                              className="w-full p-2 rounded-md border bg-background"
                              defaultValue="alex.johnson@example.com"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Notification Preferences</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Email Notifications</p>
                              <p className="text-sm text-muted-foreground">Receive updates about your progress</p>
                            </div>
                            <div className="h-6 w-11 bg-primary rounded-full relative">
                              <div className="absolute right-1 top-1 bg-white h-4 w-4 rounded-full"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Weekly Progress Reports</p>
                              <p className="text-sm text-muted-foreground">Receive weekly summaries of your activity</p>
                            </div>
                            <div className="h-6 w-11 bg-primary rounded-full relative">
                              <div className="absolute right-1 top-1 bg-white h-4 w-4 rounded-full"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">New Scenario Alerts</p>
                              <p className="text-sm text-muted-foreground">
                                Get notified when new scenarios are available
                              </p>
                            </div>
                            <div className="h-6 w-11 bg-muted rounded-full relative">
                              <div className="absolute left-1 top-1 bg-white h-4 w-4 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Privacy Settings</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Show Profile on Leaderboard</p>
                              <p className="text-sm text-muted-foreground">Allow others to see your progress</p>
                            </div>
                            <div className="h-6 w-11 bg-primary rounded-full relative">
                              <div className="absolute right-1 top-1 bg-white h-4 w-4 rounded-full"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Share Achievements</p>
                              <p className="text-sm text-muted-foreground">
                                Allow others to see your badges and certificates
                              </p>
                            </div>
                            <div className="h-6 w-11 bg-primary rounded-full relative">
                              <div className="absolute right-1 top-1 bg-white h-4 w-4 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
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

