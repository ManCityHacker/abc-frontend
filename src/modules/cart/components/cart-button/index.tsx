"use client"

import { useCart } from "@/lib/context/cart-context"
import { retrieveCustomer } from "@/lib/data/customer"
import { listCartFreeShippingPrices } from "@/lib/data/fulfillment"
import CartDrawer from "@/modules/cart/components/cart-drawer"
import { StoreFreeShippingPrice } from "@/types/shipping-option/http"
import { B2BCustomer } from "@/types/global"
import { useEffect, useState } from "react"

interface CartButtonProps {
  customer?: B2BCustomer | null
}

export default function CartButton({ customer = null }: CartButtonProps = {}) {
  const { cart } = useCart()
  const [customerData, setCustomerData] = useState<B2BCustomer | null>(customer)
  const [freeShippingPrices, setFreeShippingPrices] = useState<StoreFreeShippingPrice[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const customerResult = await retrieveCustomer().catch(() => null)
        setCustomerData(customerResult)

        if (cart) {
          const shippingPrices = await listCartFreeShippingPrices(cart.id).catch(() => [])
          setFreeShippingPrices(shippingPrices)
        }
      } catch (error) {
        console.error("Error loading cart button data:", error)
      }
    }

    loadData()
  }, [cart])

  return <CartDrawer customer={customerData} freeShippingPrices={freeShippingPrices} />
}
