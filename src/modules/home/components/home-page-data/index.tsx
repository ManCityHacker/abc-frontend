"use client"

import { B2BCustomer, B2BCart } from "@/types/global"
import { StoreFreeShippingPrice } from "@/types/shipping-option/http"
import { useAuth } from "@/lib/context/auth-context"
import { useEffect } from "react"

interface HomePageDataProps {
  customer: B2BCustomer | null
  cart: B2BCart | null
  categories: any[]
  freeShippingPrices: StoreFreeShippingPrice[]
}

export function HomePageData({ 
  customer,
  cart,
  categories,
  freeShippingPrices 
}: HomePageDataProps) {
  const { setCustomer } = useAuth()

  // Update the auth context with the fetched customer data
  useEffect(() => {
    setCustomer(customer)
  }, [customer, setCustomer])

  // This component doesn't render anything visible, it just manages data
  return null
}
