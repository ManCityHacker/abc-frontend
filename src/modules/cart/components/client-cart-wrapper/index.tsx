"use client"

import { retrieveCart } from "@/lib/data/cart"
import { retrieveCustomer } from "@/lib/data/customer"
import { listCartFreeShippingPrices } from "@/lib/data/fulfillment"
import CartButton from "@/modules/cart/components/cart-button"
import { B2BCustomer, B2BCart } from "@/types/global"
import { StoreFreeShippingPrice } from "@/types/shipping-option/http"
import { useEffect, useState } from "react"

export default function ClientCartWrapper() {
  const [cart, setCart] = useState<B2BCart | null>(null)
  const [customer, setCustomer] = useState<B2BCustomer | null>(null)
  const [freeShippingPrices, setFreeShippingPrices] = useState<StoreFreeShippingPrice[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadCartData = async () => {
      try {
        const [cartData, customerData] = await Promise.all([
          retrieveCart().catch(() => null),
          retrieveCustomer().catch(() => null)
        ])
        
        setCart(cartData)
        setCustomer(customerData)

        if (cartData) {
          const shippingPrices = await listCartFreeShippingPrices(cartData.id).catch(() => [])
          setFreeShippingPrices(shippingPrices)
        }
      } catch (error) {
        console.error("Error loading cart data:", error)
      } finally {
        setIsLoaded(true)
      }
    }

    loadCartData()
  }, [])

  // Show skeleton while loading
  if (!isLoaded) {
    return <CartButton />
  }

  return (
    <CartButton 
      cart={cart}
      customer={customer}
      freeShippingPrices={freeShippingPrices}
    />
  )
}
