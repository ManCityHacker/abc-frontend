"use client"

import { retrieveCustomer } from "@/lib/data/customer"
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
      const fetchedCustomer = await retrieveCustomer()
      setCustomer(fetchedCustomer)
    } catch (error) {
      console.error("Error refreshing customer:", error)
      setCustomer(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (initialCustomer) {
      setCustomer(initialCustomer)
      setIsLoading(false)
    } else {
      refreshCustomer()
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
