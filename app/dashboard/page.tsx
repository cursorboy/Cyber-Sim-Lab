"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Activity,
  Award,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Shield,
  Terminal,
  Trophy,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth/auth-provider"
import { getUserProgress } from "@/lib/api/scenarios"
import { getUserAchievements, getUserProfile } from "@/lib/api/user"
import type { UserProgress, UserProfile } from "@/lib/types"

export default function DashboardPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress[]>([])
  const [userAchievements, setUserAchievements] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (user) {
        try {
          setIsLoading(true)
          setError(null)

          console.log("Fetching data for user:", user.id)

          // Fetch user profile
          const profileData = await getUserProfile(user.id)
          console.log("Profile data:", profileData)

          if (!profileData) {
            setError("Could not load your profile. Please try again later.")
            setIsLoading(false)
            return
          }

          setProfile(profileData)

          // Fetch user progress
          const progress = await getUserProgress(profileData.id)
          console.log("Progress data:", progress)
          setUserProgress(progress || [])

          // Fetch user achievements
          const achievements = await getUserAchievements(profileData.id)
          console.log("Achievements data:", achievements)
          setUserAchievements(achievements || [])
        } catch (err) {
          console.error("Error fetching dashboard data:", err)
          setError("Failed to load dashboard data. Please try again.")
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchData()
  }, [user])

  // If not logged in, show sign-in prompt
  if (!user) {
    return (
      <div className="container py-10">
        <div className="flex flex-col justify-center items-center h-[60vh] max-w-md mx-auto text-center">
          <Shield className="h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Sign in to view your dashboard</h1>
          <p className="text-muted-foreground mb-6">You need to be signed in to view and manage your dashboard.</p>
          <div className="flex gap-4">
            <Button onClick={() => document.dispatchEvent(new CustomEvent("open-signin-modal"))}>Sign In</Button>
            <Button variant="outline" onClick={() => document.dispatchEvent(new CustomEvent("open-signup-modal"))}>
              Create Account
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-1/3 bg-muted rounded"></div>
          <div className="h-4 w-1/2 bg-muted rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-24 bg-muted rounded"></div>
            <div className="h-24 bg-muted rounded"></div>
            <div className="h-24 bg-muted rounded"></div>
          </div>
          <div className="h-[400px] bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-10">
        <div className="flex flex-col justify-center items-center h-[60vh] max-w-md mx-auto text-center">
          <Shield className="h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  // Calculate completed scenarios
  const completedScenarios = userProgress.filter((p) => p.completed).length
  const totalScenarios = 8 // Total number of scenarios in our system
  const completionPercentage = Math.round((completedScenarios / totalScenarios) * 100)

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-8">
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
            <Link href="/scenarios">
              <Button className="gap-2">
                <Zap className="h-4 w-4" />
                <span>Start New Scenario</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Scenarios Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">
                  {completedScenarios}/{totalScenarios}
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
              <Progress value={completionPercentage} className="h-2 mt-4" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Training Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{profile?.training_hours || 0}</div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-4">
                {profile?.training_hours ? `+${profile.training_hours} hours this week` : "No training yet this week"}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Skill Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">
                  {profile?.level === 1
                    ? "Beginner"
                    : profile?.level === 2
                      ? "Intermediate"
                      : profile?.level === 3
                        ? "Advanced"
                        : "Expert"}
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-4">
                {profile ? `${profile.xp_needed - profile.xp} XP to next level` : ""}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
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
                    {userProgress.length > 0 ? (
                      <div className="space-y-6">
                        {userProgress
                          .sort((a, b) => new Date(b.last_activity).getTime() - new Date(a.last_activity).getTime())
                          .slice(0, 3)
                          .map((progress) => (
                            <div key={progress.id} className="flex items-start gap-4">
                              <div className="bg-primary/10 p-2 rounded-full">
                                <Terminal className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium">
                                    {progress.completed ? "Completed" : "Progress in"} {progress.scenario?.title}{" "}
                                    Scenario
                                  </p>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(progress.last_activity).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {progress.completed
                                    ? `You successfully completed this scenario with a score of ${progress.progress}%.`
                                    : `Current progress: ${progress.progress}%`}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                                    +{Math.round(progress.progress * 2)} XP
                                  </span>
                                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                                    {progress.scenario?.category}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}

                        {userAchievements.length > 0 && (
                          <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Award className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Earned "{userAchievements[0].achievement.title}" Badge</p>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(userAchievements[0].earned_at).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {userAchievements[0].achievement.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs bg-muted px-2 py-1 rounded-full">Achievement</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Activity Yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Start your cybersecurity training to see your activity here
                        </p>
                        <Link href="/scenarios">
                          <Button>Start Training</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Scenarios</CardTitle>
                    <CardDescription>Based on your skill level and progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userProgress.length < totalScenarios
                        ? // Show scenarios the user hasn't started yet
                          userProgress
                            .filter((p) => !p.completed)
                            .slice(0, 2)
                            .map((p) => (
                              <Link key={p.scenario_id} href={`/scenarios/${p.scenario?.slug}`}>
                                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                                  <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                      <CardTitle className="text-base">{p.scenario?.title}</CardTitle>
                                      <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                                        {p.scenario?.difficulty}
                                      </div>
                                    </div>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                      {p.scenario?.description?.substring(0, 80)}...
                                    </p>
                                    <div className="flex items-center justify-between text-sm">
                                      <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">{p.scenario?.estimated_time}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Trophy className="h-4 w-4 text-primary" />
                                        <span className="text-primary">Continue ({p.progress}%)</span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </Link>
                            ))
                        : // If all scenarios are completed or started, recommend reviewing completed ones
                          userProgress
                            .filter((p) => p.completed)
                            .slice(0, 2)
                            .map((p) => (
                              <Link key={p.scenario_id} href={`/scenarios/${p.scenario?.slug}`}>
                                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                                  <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                      <CardTitle className="text-base">{p.scenario?.title}</CardTitle>
                                      <div className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                                        Completed
                                      </div>
                                    </div>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                      {p.scenario?.description?.substring(0, 80)}...
                                    </p>
                                    <div className="flex items-center justify-between text-sm">
                                      <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">{p.scenario?.estimated_time}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Trophy className="h-4 w-4 text-primary" />
                                        <span className="text-primary">Review</span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </Link>
                            ))}
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
                      {/* Calculate skill percentages based on scenarios completed */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Network Security</span>
                          <span className="text-sm">
                            {Math.round(
                              (userProgress
                                .filter((p) => p.scenario?.category === "Network Security")
                                .reduce((sum, p) => sum + p.progress, 0) /
                                Math.max(
                                  1,
                                  userProgress.filter((p) => p.scenario?.category === "Network Security").length * 100,
                                )) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (userProgress
                              .filter((p) => p.scenario?.category === "Network Security")
                              .reduce((sum, p) => sum + p.progress, 0) /
                              Math.max(
                                1,
                                userProgress.filter((p) => p.scenario?.category === "Network Security").length * 100,
                              )) *
                              100,
                          )}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Malware Defense</span>
                          <span className="text-sm">
                            {Math.round(
                              (userProgress
                                .filter((p) => p.scenario?.category === "Malware Defense")
                                .reduce((sum, p) => sum + p.progress, 0) /
                                Math.max(
                                  1,
                                  userProgress.filter((p) => p.scenario?.category === "Malware Defense").length * 100,
                                )) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (userProgress
                              .filter((p) => p.scenario?.category === "Malware Defense")
                              .reduce((sum, p) => sum + p.progress, 0) /
                              Math.max(
                                1,
                                userProgress.filter((p) => p.scenario?.category === "Malware Defense").length * 100,
                              )) *
                              100,
                          )}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Social Engineering</span>
                          <span className="text-sm">
                            {Math.round(
                              (userProgress
                                .filter((p) => p.scenario?.category === "Social Engineering")
                                .reduce((sum, p) => sum + p.progress, 0) /
                                Math.max(
                                  1,
                                  userProgress.filter((p) => p.scenario?.category === "Social Engineering").length *
                                    100,
                                )) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (userProgress
                              .filter((p) => p.scenario?.category === "Social Engineering")
                              .reduce((sum, p) => sum + p.progress, 0) /
                              Math.max(
                                1,
                                userProgress.filter((p) => p.scenario?.category === "Social Engineering").length * 100,
                              )) *
                              100,
                          )}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Data Security</span>
                          <span className="text-sm">
                            {Math.round(
                              (userProgress
                                .filter((p) => p.scenario?.category === "Data Security")
                                .reduce((sum, p) => sum + p.progress, 0) /
                                Math.max(
                                  1,
                                  userProgress.filter((p) => p.scenario?.category === "Data Security").length * 100,
                                )) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (userProgress
                              .filter((p) => p.scenario?.category === "Data Security")
                              .reduce((sum, p) => sum + p.progress, 0) /
                              Math.max(
                                1,
                                userProgress.filter((p) => p.scenario?.category === "Data Security").length * 100,
                              )) *
                              100,
                          )}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Security Operations</span>
                          <span className="text-sm">
                            {Math.round(
                              (userProgress
                                .filter((p) => p.scenario?.category === "Security Operations")
                                .reduce((sum, p) => sum + p.progress, 0) /
                                Math.max(
                                  1,
                                  userProgress.filter((p) => p.scenario?.category === "Security Operations").length *
                                    100,
                                )) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (userProgress
                              .filter((p) => p.scenario?.category === "Security Operations")
                              .reduce((sum, p) => sum + p.progress, 0) /
                              Math.max(
                                1,
                                userProgress.filter((p) => p.scenario?.category === "Security Operations").length * 100,
                              )) *
                              100,
                          )}
                          className="h-2"
                        />
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
                          <p className="text-xs text-muted-foreground">{completedScenarios}/2 completed</p>
                          <Progress value={Math.min(100, (completedScenarios / 2) * 100)} className="h-1.5 mt-1" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Train for 3 hours</p>
                          <p className="text-xs text-muted-foreground">{profile?.training_hours || 0}/3 hours</p>
                          <Progress
                            value={Math.min(100, ((profile?.training_hours || 0) / 3) * 100)}
                            className="h-1.5 mt-1"
                          />
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
                    <Link href="/resources">
                      <Button variant="outline" className="w-full">
                        View Learning Resources
                      </Button>
                    </Link>
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
                {userProgress.length > 0 ? (
                  <div className="space-y-6">
                    {userProgress.map((progress) => (
                      <div key={progress.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Terminal className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium">{progress.scenario?.title}</span>
                          </div>
                          <span className="text-sm">{progress.progress}%</span>
                        </div>
                        <Progress value={progress.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Last activity: {new Date(progress.last_activity).toLocaleDateString()}</span>
                          <span>
                            {progress.completed ? "Completed" : "In Progress"} • {progress.scenario?.difficulty}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <BarChart3 className="h-16 w-16" />
                      <p>Start completing scenarios to track your progress</p>
                      <Link href="/scenarios">
                        <Button variant="outline" className="mt-2">
                          Browse Scenarios
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
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
                {userAchievements.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {userAchievements.map((achievement) => (
                      <div key={achievement.id} className="flex flex-col items-center gap-2">
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                          <Shield className="h-12 w-12 text-primary" />
                        </div>
                        <p className="font-medium text-center">{achievement.achievement.title}</p>
                        <p className="text-xs text-muted-foreground text-center">
                          {achievement.achievement.description}
                        </p>
                      </div>
                    ))}

                    {/* Placeholder for unearned achievements */}
                    {Array(Math.max(0, 8 - userAchievements.length))
                      .fill(0)
                      .map((_, i) => (
                        <div key={`placeholder-${i}`} className="flex flex-col items-center gap-2 opacity-40">
                          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                            <Award className="h-12 w-12 text-muted-foreground" />
                          </div>
                          <p className="font-medium text-center">Achievement Locked</p>
                          <p className="text-xs text-muted-foreground text-center">Complete more scenarios to unlock</p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Award className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No Achievements Yet</h3>
                    <p className="text-muted-foreground mb-6">Complete scenarios to earn badges and achievements</p>
                    <Link href="/scenarios">
                      <Button>Start Training</Button>
                    </Link>
                  </div>
                )}
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
                    <div
                      className={`${profile?.level && profile.level >= 1 ? "bg-primary" : "bg-muted"} text-${profile?.level && profile.level >= 1 ? "primary-foreground" : "muted-foreground"} w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0`}
                    >
                      1
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="font-medium">Cybersecurity Fundamentals</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Learn the basics of cybersecurity principles and practices
                      </p>
                      <div className="flex items-center gap-2">
                        {profile?.level && profile.level >= 1 ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-500">Completed</span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Not Started</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div
                      className={`${profile?.level && profile.level >= 2 ? "bg-primary" : profile?.level === 1 ? "bg-primary" : "bg-muted"} text-${profile?.level && profile.level >= 2 ? "primary-foreground" : profile?.level === 1 ? "primary-foreground" : "muted-foreground"} w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0`}
                    >
                      2
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="font-medium">Network Security Essentials</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Master the fundamentals of securing networks and detecting intrusions
                      </p>
                      {profile?.level && profile.level >= 2 ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-500">Completed</span>
                        </div>
                      ) : profile?.level === 1 ? (
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-primary" />
                          <span className="text-sm text-primary">
                            In Progress ({Math.round((profile.xp / profile.xp_needed) * 100)}%)
                          </span>
                          <Progress value={Math.round((profile.xp / profile.xp_needed) * 100)} className="h-1.5 mt-2" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Not Started</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div
                      className={`${profile?.level && profile.level >= 3 ? "bg-primary" : "bg-muted"} text-${profile?.level && profile.level >= 3 ? "primary-foreground" : "muted-foreground"} w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0`}
                    >
                      3
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="font-medium">Malware Analysis & Response</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Learn to identify, analyze, and neutralize malicious software
                      </p>
                      {profile?.level && profile.level >= 3 ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-500">Completed</span>
                        </div>
                      ) : profile?.level === 2 ? (
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-primary" />
                          <span className="text-sm text-primary">
                            In Progress ({Math.round((profile.xp / profile.xp_needed) * 100)}%)
                          </span>
                          <Progress value={Math.round((profile.xp / profile.xp_needed) * 100)} className="h-1.5 mt-2" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Not Started</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div
                      className={`${profile?.level && profile.level >= 4 ? "bg-primary" : "bg-muted"} text-${profile?.level && profile.level >= 4 ? "primary-foreground" : "muted-foreground"} w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0`}
                    >
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
                <Link href="/scenarios">
                  <Button className="w-full">Continue Your Learning Path</Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          © 2025 Cyber Sim Lab. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

