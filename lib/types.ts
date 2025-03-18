// User profile type
export interface UserProfile {
  id: string
  username: string
  full_name: string
  avatar_url: string
  created_at: string
  updated_at: string
  level: number
  xp: number
  xp_needed: number
  completed_scenarios: number
  training_hours: number
  badges: number
  email_notifications: boolean
  weekly_reports: boolean
  new_scenario_alerts: boolean
  show_on_leaderboard: boolean
  share_achievements: boolean
  bio: string
}

// Scenario type
export interface Scenario {
  id: number
  slug: string
  title: string
  description: string
  difficulty: string
  category: string
  estimated_time: string
  skills: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

// User progress type
export interface UserProgress {
  id: number
  user_id: string
  scenario_id: number
  progress: number
  completed: boolean
  completed_tasks: string[]
  last_activity: string
  time_spent: number
  scenario?: Scenario
}

// Achievement type
export interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  category: string
  created_at: string
}

// User achievement type
export interface UserAchievement {
  id: number
  user_id: string
  achievement_id: number
  earned_at: string
  achievement?: Achievement
}

