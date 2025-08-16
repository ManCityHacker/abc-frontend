"use client"

import { retrieveCart } from "@/lib/data/cart"
import { retrieveCustomer } from "@/lib/data/customer"
import { listCartFreeShippingPrices } from "@/lib/data/fulfillment"
import { CartProvider } from "@/lib/context/cart-context"
import { B2BCustomer, B2BCart } from "@/types/global"
import { StoreFreeShippingPrice } from "@/types/shipping-option/http"
import { useEffect, useState } from "react"

interface ClientCartProviderProps {
  children: React.ReactNode
}

export default function ClientCartProvider({ children }: ClientCartProviderProps) {
  const [cart, setCart] = useState<B2BCart | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadCartData = async () => {
      try {
        const cartData = await retrieveCart().catch(() => null)
        setCart(cartData)
      } catch (error) {
        console.error("Error loading cart data:", error)
        setCart(null)
      } finally {
        setIsLoaded(true)
      }
    }

    loadCartData()
  }, [])

  // Provide cart as null initially to prevent SSR hydration issues
  return (
    <CartProvider cart={cart}>
      {children}
    </CartProvider>
  )
}
