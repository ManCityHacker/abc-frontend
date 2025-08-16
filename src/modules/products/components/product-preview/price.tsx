"use client"

import { VariantPrice } from "@/lib/util/get-product-price"
import { Text, clx } from "@medusajs/ui"
import { User } from "@medusajs/icons"

export default function PreviewPrice({ price }: { price: VariantPrice | null }) {
  // Show login prompt if no price provided (means not authenticated)
  if (!price) {
    return (
      <div className="flex items-center gap-1 text-abc-primary">
        <User className="w-4 h-4" />
        <Text className="font-medium text-sm">
          Login to view
        </Text>
      </div>
    )
  }

  return (
    <>
      {price.price_type === "sale" && (
        <Text
          className="line-through text-ui-fg-muted"
          data-testid="original-price"
        >
          {price.original_price}
        </Text>
      )}

      <Text
        className={clx("text-neutral-950 font-medium text-lg", {
          "text-ui-fg-interactive": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </Text>
    </>
  )
}
