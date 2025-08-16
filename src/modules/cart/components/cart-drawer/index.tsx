"use client"

import { useCart } from "@/lib/context/cart-context"
import { checkSpendingLimit } from "@/lib/util/check-spending-limit"
import { getCheckoutStep } from "@/lib/util/get-checkout-step"
import { convertToLocale } from "@/lib/util/money"
import AppliedPromotions from "@/modules/cart/components/applied-promotions"
import ApprovalStatusBanner from "@/modules/cart/components/approval-status-banner"
import ItemsTemplate from "@/modules/cart/templates/items"
import Button from "@/modules/common/components/button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import ShoppingBag from "@/modules/common/icons/shopping-bag"
import FreeShippingPriceNudge from "@/modules/shipping/components/free-shipping-price-nudge"
import { B2BCustomer } from "@/types"
import { StoreFreeShippingPrice } from "@/types/shipping-option/http"
import { ExclamationCircle, LockClosedSolidMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { X } from "lucide-react"

type CartDrawerProps = {
  customer: B2BCustomer | null
  freeShippingPrices: StoreFreeShippingPrice[]
}

const CartDrawer = ({
  customer,
  freeShippingPrices,
}: CartDrawerProps) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const { cart } = useCart()

  const items = cart?.items || []
  const promotions = cart?.promotions || []

  const totalItems =
    items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = useMemo(() => cart?.item_subtotal ?? 0, [cart])

  const spendLimitExceeded = useMemo(
    () => checkSpendingLimit(cart, customer),
    [cart, customer]
  )

  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    if (isOpen) {
      return
    }

    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  const cancelTimer = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }
  }

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (
      itemRef.current !== totalItems &&
      !pathname.includes("/cart") &&
      !pathname.includes("/account")
    ) {
      timedOpen()
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  //close cart drawer when navigating to a different page
  useEffect(() => {
    cancelTimer()
    close()
  }, [pathname])

  // Update itemRef when totalItems changes
  useEffect(() => {
    itemRef.current = totalItems
  }, [totalItems])

  const checkoutStep = cart ? getCheckoutStep(cart) : undefined
  const checkoutPath = customer
    ? checkoutStep
      ? `/checkout?step=${checkoutStep}`
      : "/checkout"
    : "/account"

  return (
    <>
      {/* Cart Button */}
      <button 
        className="transition-fg relative inline-flex w-fit items-center justify-center overflow-hidden outline-none txt-compact-small-plus gap-x-1.5 px-3 py-1.5 rounded-full hover:bg-neutral-100 text-abc-red"
        onClick={open}
      >
        <ShoppingBag fill="#D04A37" />
        <span className="text-sm font-normal hidden small:inline-block text-abc-red">
          {cart && items && items.length > 0
            ? convertToLocale({
                amount: subtotal,
                currency_code: cart.currency_code,
              })
            : "Cart"}
        </span>
        <div className="bg-green-500 text-white text-xs px-1.5 py-px rounded-full">
          {totalItems}
        </div>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={close}
        />
      )}

      {/* Cart Drawer */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {totalItems > 0
              ? `You have ${totalItems} items in your cart`
              : "Your cart is empty"}
          </h2>
          <button
            onClick={close}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          {/* Approval Status */}
          {cart?.approvals && cart.approvals.length > 0 && (
            <div className="p-4">
              <ApprovalStatusBanner cart={cart} />
            </div>
          )}

          {/* Promotions */}
          {promotions.length > 0 && (
            <div className="p-4">
              <AppliedPromotions promotions={promotions} />
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-auto">
            {cart && cart.items && cart.items.length > 0 ? (
              <ItemsTemplate
                cart={cart}
                showBorders={false}
                showTotal={false}
              />
            ) : (
              <div className="p-4 text-center text-gray-500">
                Your cart is empty
              </div>
            )}
          </div>

          {/* Footer */}
          {cart && cart.items && cart.items.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              {/* Free Shipping Nudge */}
              {cart && freeShippingPrices && (
                <FreeShippingPriceNudge
                  variant="inline"
                  cart={cart}
                  freeShippingPrices={freeShippingPrices}
                />
              )}

              {/* Subtotal */}
              <div className="flex justify-between">
                <Text>Subtotal</Text>
                <Text>
                  {convertToLocale({
                    amount: subtotal,
                    currency_code: cart?.currency_code,
                  })}
                </Text>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <LocalizedClientLink href="/cart">
                  <Button
                    variant="secondary"
                    className="w-full"
                    size="large"
                  >
                    View Cart
                  </Button>
                </LocalizedClientLink>
                <LocalizedClientLink href={checkoutPath}>
                  <Button
                    className="w-full"
                    size="large"
                    disabled={totalItems === 0 || spendLimitExceeded}
                  >
                    <LockClosedSolidMini />
                    {customer
                      ? spendLimitExceeded
                        ? "Spending Limit Exceeded"
                        : "Secure Checkout"
                      : "Log in to checkout"}
                  </Button>
                </LocalizedClientLink>
                
                {/* Spending Limit Warning */}
                {spendLimitExceeded && (
                  <div className="flex items-center gap-x-2 bg-neutral-100 p-3 rounded-md shadow-borders-base">
                    <ExclamationCircle className="text-orange-500 w-fit overflow-visible" />
                    <p className="text-neutral-950 text-xs">
                      This order exceeds your spending limit. Please contact
                      your manager for approval.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CartDrawer
