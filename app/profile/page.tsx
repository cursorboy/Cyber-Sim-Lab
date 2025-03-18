"use client"

import type React from "react"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Shield, Terminal, Zap, Award } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  // Handle profile update
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveMessage("")

    // Simulate API call
    setTimeout(() => {
      setSaveMessage("Profile updated successfully")
      setIsSaving(false)
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-pulse text-center">
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container py-10">
        <div className="flex flex-col justify-center items-center h-[60vh] max-w-md mx-auto text-center">
          <Shield className="h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Sign in to view your profile</h1>
          <p className="text-muted-foreground mb-6">You need to be signed in to view and manage your profile.</p>
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

  return (
    <div className="container py-10">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and view your progress</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Your personal information and account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center mb-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.profileImage} alt={user.name} />
                    <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-1">
                  <Label>Name</Label>
                  <div className="font-medium">{user.name}</div>
                </div>
                <div className="space-y-1">
                  <Label>Email</Label>
                  <div className="font-medium">{user.email}</div>
                </div>
                <div className="space-y-1">
                  <Label>Member Since</Label>
                  <div className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="space-y-1">
                  <Label>Role</Label>
                  <div className="font-medium capitalize">{user.role}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Tabs defaultValue="progress">
              <TabsList className="mb-4">
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
              </TabsList>

              <TabsContent value="progress" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Training Progress</CardTitle>
                    <CardDescription>Track your progress across different cybersecurity scenarios</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-primary" />
                          <span>Network Intrusion</span>
                        </div>
                        <span className="text-sm text-muted-foreground">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          <span>Ransomware Response</span>
                        </div>
                        <span className="text-sm text-muted-foreground">20%</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Terminal className="h-4 w-4 text-primary" />
                          <span>Phishing Detection</span>
                        </div>
                        <span className="text-sm text-muted-foreground">100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-primary" />
                          <span>Data Exfiltration</span>
                        </div>
                        <span className="text-sm text-muted-foreground">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          <span>Privilege Escalation</span>
                        </div>
                        <span className="text-sm text-muted-foreground">10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>

                    <div className="mt-4">
                      <Link href="/scenarios">
                        <Button>Continue Training</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Update your account information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" />
                        <p className="text-xs text-muted-foreground">Leave blank to keep current password</p>
                      </div>

                      {saveMessage && <p className="text-sm text-green-500">{saveMessage}</p>}

                      <Button type="submit" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certificates">
                <Card>
                  <CardHeader>
                    <CardTitle>Certificates & Achievements</CardTitle>
                    <CardDescription>View your earned certificates and achievements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Certificates Yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Complete scenarios to earn certificates and achievements
                      </p>
                      <Link href="/scenarios">
                        <Button>Start Training</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

