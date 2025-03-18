import { createClient } from "@/lib/supabase/client"
import type { UserProfile, UserAchievement } from "@/lib/types"

// Get user profile
export async function getUserProfile(userId: string) {
  const supabase = createClient()

  try {
    console.log("Fetching profile for user ID:", userId)

    // First check if the profile exists with the exact ID
    let { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle()

    if (error) {
      console.error("Error in first profile query:", error.message)

      // If there was an error with UUID format, try querying by auth_id instead
      // This assumes you have an auth_id column in your profiles table
      const { data: authData, error: authError } = await supabase
        .from("profiles")
        .select("*")
        .eq("auth_id", userId)
        .maybeSingle()

      if (authError) {
        console.error("Error in auth_id profile query:", authError.message)
        return null
      }

      data = authData
    }

    if (!data) {
      console.log("No profile found, creating default profile")
      // Create a default profile if none exists
      const { data: newProfile, error: createError } = await supabase
        .from("profiles")
        .insert({
          auth_id: userId,
          username: `user_${userId.substring(0, 6)}`,
          full_name: "New User",
          level: 1,
          xp: 0,
          xp_needed: 100,
          completed_scenarios: 0,
          training_hours: 0,
          badges: 0,
          email_notifications: true,
          weekly_reports: false,
          new_scenario_alerts: true,
          show_on_leaderboard: true,
          share_achievements: true,
          bio: "",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (createError) {
        console.error("Error creating default profile:", createError.message)
        return null
      }

      return newProfile as UserProfile
    }

    return data as UserProfile
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}

// Update user profile
export async function updateUserProfile(userId: string, profileData: Partial<UserProfile>) {
  const supabase = createClient()

  try {
    // First get the profile to ensure we have the correct ID
    const profile = await getUserProfile(userId)

    if (!profile) {
      console.error("Profile not found for update")
      return null
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...profileData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id) // Use the profile ID from the database
      .select()

    if (error) {
      console.error("Error updating user profile:", error)
      return null
    }

    return data[0] as UserProfile
  } catch (error) {
    console.error("Error updating user profile:", error)
    return null
  }
}

// Add XP to user profile
export async function addUserXP(userId: string, xpAmount: number) {
  const supabase = createClient()

  try {
    // Get current profile
    const profile = await getUserProfile(userId)

    if (!profile) {
      console.error("Profile not found")
      return null
    }

    // Calculate new XP and check for level up
    const newXP = profile.xp + xpAmount
    let newLevel = profile.level
    let newXPNeeded = profile.xp_needed

    // Check if user leveled up
    if (newXP >= profile.xp_needed) {
      newLevel += 1
      const newXPVar = newXP - profile.xp_needed
      newXPNeeded = profile.xp_needed * 1.5 // Increase XP needed for next level
    }

    // Update profile
    const { data, error } = await supabase
      .from("profiles")
      .update({
        xp: newXP,
        level: newLevel,
        xp_needed: newXPNeeded,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id) // Use the profile ID from the database
      .select()

    if (error) {
      console.error("Error updating user XP:", error)
      return null
    }

    return data[0] as UserProfile
  } catch (error) {
    console.error("Error updating user XP:", error)
    return null
  }
}

// Get user achievements
export async function getUserAchievements(userId: string) {
  const supabase = createClient()

  try {
    // First get the profile to ensure we have the correct ID
    const profile = await getUserProfile(userId)

    if (!profile) {
      console.error("Profile not found for achievements")
      return []
    }

    const { data, error } = await supabase
      .from("user_achievements")
      .select(`
        *,
        achievement:achievements(*)
      `)
      .eq("user_id", profile.id) // Use the profile ID from the database

    if (error) {
      console.error("Error fetching user achievements:", error)
      return []
    }

    return data as UserAchievement[]
  } catch (error) {
    console.error("Error fetching user achievements:", error)
    return []
  }
}

// Award achievement to user
export async function awardAchievement(userId: string, achievementId: number) {
  const supabase = createClient()

  try {
    // First get the profile to ensure we have the correct ID
    const profile = await getUserProfile(userId)

    if (!profile) {
      console.error("Profile not found for awarding achievement")
      return null
    }

    // Check if user already has this achievement
    const { data: existingAchievement, error: checkError } = await supabase
      .from("user_achievements")
      .select("*")
      .eq("user_id", profile.id) // Use the profile ID from the database
      .eq("achievement_id", achievementId)

    if (checkError) {
      console.error("Error checking existing achievement:", checkError)
      return null
    }

    // If user already has this achievement, return it
    if (existingAchievement && existingAchievement.length > 0) {
      return existingAchievement[0]
    }

    // Award new achievement
    const { data, error } = await supabase
      .from("user_achievements")
      .insert({
        user_id: profile.id, // Use the profile ID from the database
        achievement_id: achievementId,
        earned_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Error awarding achievement:", error)
      return null
    }

    // Update badges count in profile
    await updateUserProfile(userId, {
      badges: (await getUserAchievements(userId)).length,
    })

    return data[0]
  } catch (error) {
    console.error("Error awarding achievement:", error)
    return null
  }
}

