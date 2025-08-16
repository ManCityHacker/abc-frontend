"use client"

import { retrieveCustomer } from "@/lib/data/customer"
import NavigationContent from "@/modules/layout/components/navigation-content"
import { B2BCustomer } from "@/types/global"
import { useEffect, useState } from "react"

export default function ClientNavigationWrapper() {
  const [customer, setCustomer] = useState<B2BCustomer | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const customerData = await retrieveCustomer()
        setCustomer(customerData)
      } catch (error) {
        setCustomer(null)
      } finally {
        setIsLoaded(true)
      }
    }

    loadCustomer()
  }, [])

  // Show skeleton or basic nav while loading
  if (!isLoaded) {
    return <NavigationContent customer={null} />
  }

  return <NavigationContent customer={customer} />
}
