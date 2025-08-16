"use client"

import { B2BCustomer } from "@/types/global"
import { createContext, useContext, useState, ReactNode } from "react"

interface AuthContextType {
  customer: B2BCustomer | null
  isAuthenticated: boolean
  isLoading: boolean
  setCustomer: (customer: B2BCustomer | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
  initialCustomer?: B2BCustomer | null
}

export function AuthProvider({ children, initialCustomer = null }: AuthProviderProps) {
  const [customer, setCustomer] = useState<B2BCustomer | null>(initialCustomer)

  const value: AuthContextType = {
    customer,
    isAuthenticated: !!customer,
    isLoading: false, // No loading since we rely on server-side auth
    setCustomer,
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
