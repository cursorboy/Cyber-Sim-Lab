"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import SignInModal from "./sign-in-modal"
import SignUpModal from "./sign-up-modal"

// Define user type
export type User = {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  completedScenarios: string[]
  profileImage?: string
}

// Define auth context type
type AuthContextType = {
  user: User | null
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (name: string, email: string, password: string) => Promise<boolean>
  signOut: () => void
  isLoading: boolean
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Listen for custom events to open modals
  useEffect(() => {
    const handleOpenSignIn = () => setShowSignIn(true)
    const handleOpenSignUp = () => setShowSignUp(true)

    document.addEventListener("open-signin-modal", handleOpenSignIn)
    document.addEventListener("open-signup-modal", handleOpenSignUp)

    return () => {
      document.removeEventListener("open-signin-modal", handleOpenSignIn)
      document.removeEventListener("open-signup-modal", handleOpenSignUp)
    }
  }, [])

  // Sign in function
  const signIn = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would call an API
    // For demo purposes, we'll simulate a successful login if the email contains "@"
    if (!email.includes("@")) {
      return false
    }

    // Create a mock user
    const mockUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: email.split("@")[0],
      email,
      role: "user",
      createdAt: new Date().toISOString(),
      completedScenarios: [],
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    }

    // Store user in localStorage
    localStorage.setItem("user", JSON.stringify(mockUser))
    setUser(mockUser)
    return true
  }

  // Sign up function
  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    // In a real app, this would call an API
    // For demo purposes, we'll simulate a successful registration if all fields are provided
    if (!name || !email || !password || !email.includes("@")) {
      return false
    }

    // Create a new user
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      role: "user",
      createdAt: new Date().toISOString(),
      completedScenarios: [],
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    }

    // Store user in localStorage
    localStorage.setItem("user", JSON.stringify(newUser))
    setUser(newUser)
    return true
  }

  // Sign out function
  const signOut = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>
      {children}
      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} onSignIn={signIn} />
      <SignUpModal isOpen={showSignUp} onClose={() => setShowSignUp(false)} onSignUp={signUp} />
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

