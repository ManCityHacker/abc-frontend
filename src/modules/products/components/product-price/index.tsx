"use client"

import { clx, Text, Button } from "@medusajs/ui"
import { getProductPrice } from "@/lib/util/get-product-price"
import { useAuth } from "@/lib/context/auth-context"
import { HttpTypes } from "@medusajs/types"
import { User } from "@medusajs/icons"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ProductPrice({
  product,
}: {
  product: HttpTypes.StoreProduct
}) {
  const { isAuthenticated, isLoading } = useAuth()
  const params = useParams()
  const countryCode = params.countryCode as string
  
  const { cheapestPrice } = getProductPrice({
    product,
  })

  if (!cheapestPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col gap-3 py-2">
        <div className="flex items-center gap-2 text-abc-primary">
          <User className="w-5 h-5" />
          <Text className="font-medium text-lg">
            Login to view pricing
          </Text>
        </div>
        <Link href={`/${countryCode}/account`}>
          <Button 
            variant="secondary" 
            size="small"
            className="w-fit hover:bg-abc-primary hover:text-white transition-colors"
          >
            Sign in
          </Button>
        </Link>
      </div>
    )
  }

  // Show pricing for authenticated users
  return (
    <div className="flex flex-col text-neutral-950">
      <span
        className={clx({
          "text-ui-fg-interactive": cheapestPrice.price_type === "sale",
        })}
      >
        <Text
          className="font-medium text-xl"
          data-testid="product-price"
          data-value={cheapestPrice.calculated_price_number}
        >
          From {cheapestPrice.calculated_price}
        </Text>
        <Text className="text-neutral-600 text-[0.6rem]">Excl. VAT</Text>
      </span>
      {cheapestPrice.price_type === "sale" && (
        <p
          className="line-through text-neutral-500"
          data-testid="original-product-price"
          data-value={cheapestPrice.original_price_number}
        >
          {cheapestPrice.original_price}
        </p>
      )}
    </div>
  )
}
