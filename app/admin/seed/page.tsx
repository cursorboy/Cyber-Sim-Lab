"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { seedScenarios, seedAchievements } from "@/lib/seed-data"

export default function SeedPage() {
  const [isSeedingScenarios, setIsSeedingScenarios] = useState(false)
  const [isSeedingAchievements, setIsSeedingAchievements] = useState(false)
  const [scenariosResult, setScenariosResult] = useState<string | null>(null)
  const [achievementsResult, setAchievementsResult] = useState<string | null>(null)

  const handleSeedScenarios = async () => {
    setIsSeedingScenarios(true)
    setScenariosResult(null)

    try {
      const result = await seedScenarios()
      setScenariosResult(result ? "Scenarios seeded successfully!" : "Error seeding scenarios")
    } catch (error) {
      console.error("Error seeding scenarios:", error)
      setScenariosResult("Error seeding scenarios")
    } finally {
      setIsSeedingScenarios(false)
    }
  }

  const handleSeedAchievements = async () => {
    setIsSeedingAchievements(true)
    setAchievementsResult(null)

    try {
      const result = await seedAchievements()
      setAchievementsResult(result ? "Achievements seeded successfully!" : "Error seeding achievements")
    } catch (error) {
      console.error("Error seeding achievements:", error)
      setAchievementsResult("Error seeding achievements")
    } finally {
      setIsSeedingAchievements(false)
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Admin: Seed Database</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Seed Scenarios</CardTitle>
            <CardDescription>Populate the database with predefined cybersecurity scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This will create or update the scenarios in the database. Existing scenarios with the same slug will be
              updated.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleSeedScenarios} disabled={isSeedingScenarios}>
              {isSeedingScenarios ? "Seeding..." : "Seed Scenarios"}
            </Button>
            {scenariosResult && (
              <p className={`text-sm ${scenariosResult.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                {scenariosResult}
              </p>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seed Achievements</CardTitle>
            <CardDescription>Populate the database with predefined achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This will create or update the achievements in the database. Existing achievements with the same title
              will be updated.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleSeedAchievements} disabled={isSeedingAchievements}>
              {isSeedingAchievements ? "Seeding..." : "Seed Achievements"}
            </Button>
            {achievementsResult && (
              <p className={`text-sm ${achievementsResult.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                {achievementsResult}
              </p>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

