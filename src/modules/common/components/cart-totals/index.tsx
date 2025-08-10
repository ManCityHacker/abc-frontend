"use client"

import { convertToLocale } from "@/lib/util/money"
import { Text, Button } from "@medusajs/ui"
import React from "react"
import Divider from "../divider"
import { useCart } from "@/lib/context/cart-context"
import { useAuth } from "@/lib/context/auth-context"
import { User } from "@medusajs/icons"
import Link from "next/link"
import { useParams } from "next/navigation"

const CartTotals: React.FC = () => {
  const { isUpdatingCart, cart } = useCart()
  const { isAuthenticated, isLoading } = useAuth()
  const params = useParams()
  const countryCode = params.countryCode as string

  if (!cart) return null

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="bg-gray-100 animate-pulse h-32 rounded-md flex items-center justify-center">
        <Text className="text-gray-500">Loading...</Text>
      </div>
    )
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="border border-gray-200 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center gap-2 text-abc-primary mb-3">
          <User className="w-5 h-5" />
          <Text className="font-medium text-lg">
            Login to view cart totals
          </Text>
        </div>
        <Text className="text-gray-600 mb-4">
          Sign in to see your cart summary and checkout
        </Text>
        <Link href={`/${countryCode}/account`}>
          <Button 
            variant="secondary" 
            className="hover:bg-abc-primary hover:text-white transition-colors"
          >
            Sign in
          </Button>
        </Link>
      </div>
    )
  }

  const {
    currency_code,
    total,
    item_subtotal,
    tax_total,
    shipping_total,
    discount_total,
    gift_card_total,
  } = cart

  return (
    <div>
      <div className="flex flex-col gap-y-2 txt-medium text-ui-fg-subtle ">
        <div className="flex items-center justify-between">
          <Text className="flex gap-x-1 items-center">
            Subtotal (excl. shipping and taxes)
          </Text>
          <Text
            data-testid="cart-item-subtotal"
            data-value={item_subtotal || 0}
          >
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </Text>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <Text>Discount</Text>
            <Text
              className="text-ui-fg-interactive"
              data-testid="cart-discount"
              data-value={discount_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: discount_total ?? 0, currency_code })}
            </Text>
          </div>
        )}
        <div className="flex items-center justify-between">
          <Text>Shipping</Text>
          <Text data-testid="cart-shipping" data-value={shipping_total || 0}>
            {convertToLocale({ amount: shipping_total ?? 0, currency_code })}
          </Text>
        </div>
        <div className="flex justify-between">
          <Text className="flex gap-x-1 items-center ">Taxes</Text>
          <Text data-testid="cart-taxes" data-value={tax_total || 0}>
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </Text>
        </div>
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <Text>Gift card</Text>
            <Text
              className="text-ui-fg-interactive"
              data-testid="cart-gift-card-amount"
              data-value={gift_card_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: gift_card_total ?? 0, currency_code })}
            </Text>
          </div>
        )}
      </div>
      <Divider className="my-2" />
      <div className="flex items-center justify-between text-ui-fg-base mb-2 txt-medium ">
        <Text className="font-medium">Total</Text>
        {isUpdatingCart ? (
          <div className="w-28 h-6 mt-[3px] bg-neutral-200 rounded-full animate-pulse" />
        ) : (
          <Text
            className="txt-xlarge-plus"
            data-testid="cart-total"
            data-value={total || 0}
          >
            {convertToLocale({ amount: total ?? 0, currency_code })}
          </Text>
        )}
      </div>
      <Divider className="my-6" />
    </div>
  )
}

export default CartTotals
