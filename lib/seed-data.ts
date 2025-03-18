import { createClient } from "@/lib/supabase/client"

export async function seedScenarios() {
  const supabase = createClient()

  const scenarios = [
    {
      slug: "network-intrusion",
      title: "Network Intrusion Detection",
      description: "Learn to identify and respond to unauthorized network access attempts",
      difficulty: "Beginner",
      category: "Network Security",
      estimated_time: "20-30 min",
      skills: ["Network Monitoring", "Intrusion Detection", "Log Analysis"],
      is_active: true,
    },
    {
      slug: "malware-analysis",
      title: "Malware Analysis",
      description: "Identify and analyze malicious software to understand its behavior and impact",
      difficulty: "Intermediate",
      category: "Malware Defense",
      estimated_time: "30-45 min",
      skills: ["Malware Detection", "Behavior Analysis", "Containment"],
      is_active: true,
    },
    {
      slug: "phishing-detection",
      title: "Phishing Detection",
      description: "Learn to identify and handle phishing attempts targeting your organization",
      difficulty: "Beginner",
      category: "Social Engineering",
      estimated_time: "15-20 min",
      skills: ["Email Security", "Social Engineering Awareness", "Threat Identification"],
      is_active: true,
    },
    {
      slug: "privilege-escalation",
      title: "Privilege Escalation Detection",
      description: "Detect and prevent unauthorized elevation of system privileges",
      difficulty: "Advanced",
      category: "Security Operations",
      estimated_time: "45-60 min",
      skills: ["Access Control", "System Monitoring", "Privilege Management"],
      is_active: true,
    },
    {
      slug: "social-engineering",
      title: "Social Engineering Defense",
      description: "Recognize and counter manipulation tactics used by attackers",
      difficulty: "Beginner",
      category: "Social Engineering",
      estimated_time: "20-30 min",
      skills: ["Security Awareness", "Psychological Manipulation Recognition", "Defense Strategies"],
      is_active: true,
    },
    {
      slug: "data-exfiltration",
      title: "Data Exfiltration Prevention",
      description: "Identify and prevent unauthorized data transfers out of your network",
      difficulty: "Intermediate",
      category: "Data Security",
      estimated_time: "30-40 min",
      skills: ["Data Loss Prevention", "Network Monitoring", "Anomaly Detection"],
      is_active: true,
    },
    {
      slug: "incident-response",
      title: "Incident Response",
      description: "Learn the proper procedures for responding to security incidents",
      difficulty: "Intermediate",
      category: "Security Operations",
      estimated_time: "40-50 min",
      skills: ["Incident Handling", "Forensics", "Communication"],
      is_active: true,
    },
    {
      slug: "ransomware-response",
      title: "Ransomware Response",
      description: "Detect, contain, and recover from ransomware attacks",
      difficulty: "Advanced",
      category: "Malware Defense",
      estimated_time: "50-60 min",
      skills: ["Malware Detection", "Disaster Recovery", "Business Continuity"],
      is_active: true,
    },
  ]

  // Insert scenarios
  const { error } = await supabase.from("scenarios").upsert(scenarios, { onConflict: "slug" })

  if (error) {
    console.error("Error seeding scenarios:", error)
    return false
  }

  return true
}

export async function seedAchievements() {
  const supabase = createClient()

  const achievements = [
    {
      title: "First Defense",
      description: "Completed your first security scenario",
      icon: "shield",
      category: "Beginner",
    },
    {
      title: "Network Guardian",
      description: "Successfully completed a network security scenario",
      icon: "network",
      category: "Network Security",
    },
    {
      title: "Malware Hunter",
      description: "Identified and neutralized malicious software",
      icon: "virus",
      category: "Malware Defense",
    },
    {
      title: "Phishing Expert",
      description: "Demonstrated expertise in identifying phishing attempts",
      icon: "fish",
      category: "Social Engineering",
    },
    {
      title: "Privilege Protector",
      description: "Successfully prevented unauthorized privilege escalation",
      icon: "lock",
      category: "Security Operations",
    },
    {
      title: "Social Engineering Defender",
      description: "Successfully defended against social engineering attacks",
      icon: "users",
      category: "Social Engineering",
    },
    {
      title: "Data Guardian",
      description: "Prevented unauthorized data exfiltration",
      icon: "database",
      category: "Data Security",
    },
    {
      title: "Incident Responder",
      description: "Successfully managed a security incident",
      icon: "alert",
      category: "Security Operations",
    },
  ]

  // Insert achievements
  const { error } = await supabase.from("achievements").upsert(achievements, { onConflict: "title" })

  if (error) {
    console.error("Error seeding achievements:", error)
    return false
  }

  return true
}

