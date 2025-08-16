"use server"

import { revalidateTag } from "next/cache"
import { 
  getOrSetCart, 
  addToCartBulk as dataAddToCartBulk,
  updateLineItem,
  deleteLineItem,
  emptyCart,
  updateCart
} from "@/lib/data/cart"
import { getCacheTag } from "@/lib/data/cookies"
import { HttpTypes } from "@medusajs/types"

export type AddToCartActionPayload = {
  lineItems: {
    variant_id: string
    quantity: number
  }[]
  countryCode: string
}

export type CartActionResult = {
  success: boolean
  error?: string
  message?: string
}

/**
 * Server Action to add items to cart
 * This ensures cart operations happen server-side with proper cookie access
 */
export async function addToCartAction(payload: AddToCartActionPayload): Promise<CartActionResult> {
  try {
    console.log("Server action: Adding items to cart", { 
      itemCount: payload.lineItems.length,
      countryCode: payload.countryCode 
    })

    // Ensure cart exists and get/create it
    const cart = await getOrSetCart(payload.countryCode)
    
    if (!cart) {
      console.error("Failed to get or create cart")
      return {
        success: false,
        error: "Failed to create or retrieve cart"
      }
    }

    console.log("Server action: Using cart", cart.id!)

    // Add items to cart using the data layer function
    await dataAddToCartBulk({
      lineItems: payload.lineItems,
      countryCode: payload.countryCode
    })

    console.log("Server action: Successfully added items to cart")

    // Revalidate relevant cache tags
    const cartCacheTag = await getCacheTag("carts")
    const fulfillmentCacheTag = await getCacheTag("fulfillment")
    revalidateTag(cartCacheTag)
    revalidateTag(fulfillmentCacheTag)

    return {
      success: true,
      message: `Added ${payload.lineItems.length} item(s) to cart`
    }

  } catch (error: any) {
    console.error("Server action: Add to cart failed", error)
    
    // Handle specific error cases
    if (error.message === "Cart is pending approval") {
      return {
        success: false,
        error: "Cart is locked for approval"
      }
    }

    return {
      success: false,
      error: error.message || "Failed to add items to cart"
    }
  }
}

/**
 * Server Action to update cart line item quantity
 */
export async function updateCartLineItemAction(
  lineId: string, 
  quantity: number
): Promise<CartActionResult> {
  try {
    console.log("Server action: Updating line item", { lineId, quantity })

    await updateLineItem({
      lineId,
      data: { quantity }
    })

    console.log("Server action: Successfully updated line item")

    return {
      success: true,
      message: "Cart updated successfully"
    }

  } catch (error: any) {
    console.error("Server action: Update line item failed", error)
    return {
      success: false,
      error: error.message || "Failed to update cart item"
    }
  }
}

/**
 * Server Action to remove item from cart
 */
export async function removeCartLineItemAction({
  cartId,
  lineId
}: {
  cartId?: string
  lineId: string
}): Promise<CartActionResult> {
  try {
    console.log("Server action: Removing line item", { cartId, lineId })

    // Skip optimistic items (they don't exist on the server yet)
    if (lineId.startsWith("__optimistic__")) {
      console.log("Server action: Skipping optimistic item deletion")
      return {
        success: true,
        message: "Item removed from cart"
      }
    }

    await deleteLineItem(lineId, cartId)

    console.log("Server action: Successfully removed line item")

    return {
      success: true,
      message: "Item removed from cart"
    }

  } catch (error: any) {
    console.error("Server action: Remove line item failed", error)
    return {
      success: false,
      error: error.message || "Failed to remove cart item"
    }
  }
}

/**
 * Server Action to empty cart
 */
export async function emptyCartAction(): Promise<CartActionResult> {
  try {
    console.log("Server action: Emptying cart")

    await emptyCart()

    console.log("Server action: Successfully emptied cart")

    return {
      success: true,
      message: "Cart emptied successfully"
    }

  } catch (error: any) {
    console.error("Server action: Empty cart failed", error)
    return {
      success: false,
      error: error.message || "Failed to empty cart"
    }
  }
}

/**
 * Server Action to update cart details (shipping address, email, etc.)
 */
export async function updateCartAction(data: HttpTypes.StoreUpdateCart): Promise<CartActionResult> {
  try {
    console.log("Server action: Updating cart", data)

    await updateCart(data)

    console.log("Server action: Successfully updated cart")

    return {
      success: true,
      message: "Cart updated successfully"
    }

  } catch (error: any) {
    console.error("Server action: Update cart failed", error)
    return {
      success: false,
      error: error.message || "Failed to update cart"
    }
  }
}
