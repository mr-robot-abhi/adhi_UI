"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { auth, googleProvider } from "@/lib/firebase"
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  User as FirebaseUser
} from "firebase/auth"

type UserRole = 'client' | 'lawyer'

type User = {
  id: string
  name: string
  email: string
  role: UserRole
  accessToken: string
} | null

interface AuthContextType {
  user: User
  status: "loading" | "authenticated" | "unauthenticated"
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User>(null)
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const idToken = await firebaseUser.getIdToken()
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
            headers: { Authorization: `Bearer ${idToken}` }
          })
          
          if (response.ok) {
            const userData = await response.json()
            handleAuthSuccess(userData.user)
          } else {
            setStatus("unauthenticated")
          }
        } else {
          setStatus("unauthenticated")
        }
      } catch (error) {
        console.error("Auth state error:", error)
        setStatus("unauthenticated")
      }
    })

    return () => unsubscribe()
  }, [])

  const handleAuthSuccess = (userData: User) => {
    if (!userData) return
    
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
    setStatus("authenticated")
    router.push(userData.role === 'lawyer' ? '/lawyer-dashboard' : '/client-dashboard')
  }

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await userCredential.user.getIdToken()
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) throw new Error('Login failed')
      
      const data = await response.json()
      handleAuthSuccess(data.user)
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const idToken = await userCredential.user.getIdToken()

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role })
      })

      if (!response.ok) throw new Error('Registration failed')
      
      const data = await response.json()
      handleAuthSuccess(data.user)
      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const idToken = await result.user.getIdToken()

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      })

      if (!response.ok) throw new Error('Google login failed')
      
      const data = await response.json()
      handleAuthSuccess(data.user)
    } catch (error) {
      console.error("Google login error:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem("user")
      setUser(null)
      setStatus("unauthenticated")
      router.push("/auth/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, status, login, register, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}