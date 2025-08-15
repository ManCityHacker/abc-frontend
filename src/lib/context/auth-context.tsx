"use client"

import { B2BCustomer } from "@/types/global"
import { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface AuthContextType {
  customer: B2BCustomer | null
  isAuthenticated: boolean
  isLoading: boolean
  refreshCustomer: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
  initialCustomer?: B2BCustomer | null
}

export function AuthProvider({ children, initialCustomer = null }: AuthProviderProps) {
  const [customer, setCustomer] = useState<B2BCustomer | null>(initialCustomer)
  const [isLoading, setIsLoading] = useState(true)

  const refreshCustomer = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/customer", { credentials: "include" })
      if (!res.ok) {
        throw new Error("Failed to fetch customer")
      }
      const data = await res.json()
      setCustomer(data.customer)
    } catch (error) {
      console.error("Error refreshing customer:", error)
      setCustomer(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!initialCustomer) {
      refreshCustomer()
    } else {
      setIsLoading(false)
    }
  }, [initialCustomer])

  const value: AuthContextType = {
    customer,
    isAuthenticated: !!customer,
    isLoading,
    refreshCustomer,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
