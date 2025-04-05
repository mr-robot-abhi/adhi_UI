"use client"

import { createContext, useState, useEffect, useContext } from "react"

// Sample users for demo purposes
const SAMPLE_USERS = [
  { email: "lawyer@example.com", password: "password123", name: "John Lawyer", role: "lawyer" },
  { email: "client@example.com", password: "password123", name: "Jane Client", role: "client" },
  { email: "admin@example.com", password: "password123", name: "Admin User", role: "admin" },
]

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for user in localStorage first (for sample users)
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (e) {
          console.error("Error parsing stored user:", e)
          localStorage.removeItem("user")
        }
      }
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    // Check if it's a sample user
    const sampleUser = SAMPLE_USERS.find((u) => u.email === email && u.password === password)

    if (sampleUser) {
      const userData = {
        uid: `sample-${Date.now()}`,
        email: sampleUser.email,
        name: sampleUser.name,
        role: sampleUser.role,
        isSampleUser: true,
      }
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)
      return userData
    }

    // If not a sample user, return error
    throw new Error("Invalid credentials")
  }

  const register = async (email, password, name, role = "lawyer") => {
    // For demo purposes, just create a new user
    const userData = {
      uid: `user-${Date.now()}`,
      email,
      name,
      role,
      isSampleUser: true,
    }

    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const loginWithGoogle = async () => {
    // For demo purposes, create a Google user
    const userData = {
      uid: `google-${Date.now()}`,
      email: "google.user@example.com",
      name: "Google User",
      role: "lawyer",
      isSampleUser: true,
    }

    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const logout = async () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

