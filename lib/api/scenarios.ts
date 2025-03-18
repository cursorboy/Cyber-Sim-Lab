import { createClient } from "@/lib/supabase/client"
import type { UserProgress, Scenario } from "@/lib/types"
import { getUserProfile } from "@/lib/api/user"

// Get all scenarios
export async function getScenarios() {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.from("scenarios").select("*").order("id", { ascending: true })

    if (error) {
      console.error("Error fetching scenarios:", error)
      return []
    }

    return data as Scenario[]
  } catch (error) {
    console.error("Error fetching scenarios:", error)
    return []
  }
}

// Get a single scenario by slug
export async function getScenarioBySlug(slug: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.from("scenarios").select("*").eq("slug", slug).single()

    if (error) {
      console.error("Error fetching scenario:", error)
      return null
    }

    return data as Scenario
  } catch (error) {
    console.error("Error fetching scenario:", error)
    return null
  }
}

// Get user progress for all scenarios
export async function getUserProgress(userId: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("user_progress")
      .select(`
        *,
        scenario:scenarios(*)
      `)
      .eq("user_id", userId)

    if (error) {
      console.error("Error fetching user progress:", error)
      return []
    }

    return data as UserProgress[]
  } catch (error) {
    console.error("Error fetching user progress:", error)
    return []
  }
}

// Get user progress for a specific scenario
export async function getUserScenarioProgress(userId: string, scenarioId: number) {
  const supabase = createClient()

  try {
    // First get the profile to ensure we have the correct ID
    const profile = await getUserProfile(userId)

    if (!profile) {
      console.error("Profile not found for scenario progress")
      return null
    }

    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", profile.id)
      .eq("scenario_id", scenarioId)
      .single()

    if (error && error.code !== "PGRST116") {
      // PGRST116 is the error code for "no rows returned"
      console.error("Error fetching user scenario progress:", error)
      return null
    }

    return data as UserProgress
  } catch (error) {
    console.error("Error fetching user scenario progress:", error)
    return null
  }
}

// Update user progress for a scenario
export async function updateUserScenarioProgress(
  userId: string,
  scenarioId: number,
  progressData: Partial<UserProgress>,
) {
  const supabase = createClient()

  try {
    // First get the profile to ensure we have the correct ID
    const profile = await getUserProfile(userId)

    if (!profile) {
      console.error("Profile not found for updating scenario progress")
      return null
    }

    // Check if progress record exists
    const existingProgress = await getUserScenarioProgress(userId, scenarioId)

    if (existingProgress) {
      // Update existing progress
      const { data, error } = await supabase
        .from("user_progress")
        .update({
          ...progressData,
          last_activity: new Date().toISOString(),
        })
        .eq("id", existingProgress.id)
        .select()

      if (error) {
        console.error("Error updating user scenario progress:", error)
        return null
      }

      return data[0] as UserProgress
    } else {
      // Create new progress record
      const { data, error } = await supabase
        .from("user_progress")
        .insert({
          user_id: profile.id,
          scenario_id: scenarioId,
          progress: progressData.progress || 0,
          completed: progressData.completed || false,
          completed_tasks: progressData.completed_tasks || [],
          last_activity: new Date().toISOString(),
          time_spent: progressData.time_spent || 0,
        })
        .select()

      if (error) {
        console.error("Error creating user scenario progress:", error)
        return null
      }

      return data[0] as UserProgress
    }
  } catch (error) {
    console.error("Error updating user scenario progress:", error)
    return null
  }
}

// Mark a scenario as completed
export async function completeScenario(userId: string, scenarioId: number, progress: number) {
  const supabase = createClient()

  try {
    // First get the profile to ensure we have the correct ID
    const profile = await getUserProfile(userId)

    if (!profile) {
      console.error("Profile not found for completing scenario")
      return null
    }

    // Update progress
    const { data, error } = await supabase
      .from("user_progress")
      .upsert({
        user_id: profile.id,
        scenario_id: scenarioId,
        progress: progress,
        completed: true,
        last_activity: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Error completing scenario:", error)
      return null
    }

    // Update user profile
    await supabase
      .from("profiles")
      .update({
        completed_scenarios: profile.completed_scenarios + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id)

    return data[0] as UserProgress
  } catch (error) {
    console.error("Error completing scenario:", error)
    return null
  }
}

