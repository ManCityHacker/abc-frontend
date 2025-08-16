"use server"

import "server-only"

import { cookies as nextCookies } from "next/headers"

export const getAuthHeaders = async (): Promise<
  { authorization: string } | {}
> => {
  try {
    const cookies = await nextCookies()
    const token = cookies.get("_medusa_jwt")?.value

    if (token) {
      return { authorization: `Bearer ${token}` }
    }

    return {}
  } catch (error) {
    return {}
  }
}

export const getCacheTag = async (tag: string): Promise<string> => {
  try {
    const cookies = await nextCookies()
    const cacheId = cookies.get("_medusa_cache_id")?.value

    if (!cacheId) {
      return ""
    }

    return `${tag}-${cacheId}`
  } catch (error) {
    return ""
  }
}

export const getCacheOptions = async (
  tag: string
): Promise<{ tags: string[] } | {}> => {
  if (typeof window !== "undefined") {
    return {}
  }

  const cacheTag = await getCacheTag(tag)

  if (!cacheTag) {
    return {}
  }

  return { tags: [`${cacheTag}`] }
}

export const setAuthToken = async (token: string) => {
  const cookies = await nextCookies()

  cookies.set("_medusa_jwt", token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  })
}

export const removeAuthToken = async () => {
  const cookies = await nextCookies()

  cookies.delete("_medusa_jwt")
}

export const getCartId = async (): Promise<string | undefined> => {
  try {
    const cookies = await nextCookies()
    return cookies.get("_medusa_cart_id")?.value
  } catch (error) {
    console.error("Error getting cart ID from cookies:", error)
    return undefined
  }
}

export const setCartId = async (cartId: string): Promise<boolean> => {
  try {
    const cookies = await nextCookies()

    cookies.set("_medusa_cart_id", cartId, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "lax", // Changed from "strict" for cross-subdomain compatibility
      secure: process.env.NODE_ENV === "production",
    })

    // Verify the cookie was set
    const verifyCartId = cookies.get("_medusa_cart_id")?.value
    const success = verifyCartId === cartId

    if (!success) {
      console.error("Cart ID cookie verification failed:", {
        expected: cartId,
        actual: verifyCartId
      })
    }

    return success
  } catch (error) {
    console.error("Error setting cart ID cookie:", error)
    return false
  }
}

export const removeCartId = async (): Promise<boolean> => {
  try {
    const cookies = await nextCookies()

    cookies.set("_medusa_cart_id", "", {
      maxAge: -1,
    })

    // Verify the cookie was removed
    const verifyRemoved = !cookies.get("_medusa_cart_id")?.value
    
    if (!verifyRemoved) {
      console.error("Cart ID cookie removal verification failed")
    }

    return verifyRemoved
  } catch (error) {
    console.error("Error removing cart ID cookie:", error)
    return false
  }
}

// Additional cookies for cart management
export const getCartCreationLock = async (): Promise<string | undefined> => {
  try {
    const cookies = await nextCookies()
    return cookies.get("_medusa_cart_creation_lock")?.value
  } catch (error) {
    return undefined
  }
}

export const setCartCreationLock = async (lockId: string): Promise<boolean> => {
  try {
    const cookies = await nextCookies()
    
    cookies.set("_medusa_cart_creation_lock", lockId, {
      maxAge: 30, // 30 seconds lock
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })

    return true
  } catch (error) {
    console.error("Error setting cart creation lock:", error)
    return false
  }
}

export const removeCartCreationLock = async (): Promise<boolean> => {
  try {
    const cookies = await nextCookies()
    
    cookies.set("_medusa_cart_creation_lock", "", {
      maxAge: -1,
    })

    return true
  } catch (error) {
    console.error("Error removing cart creation lock:", error)
    return false
  }
}

export const getRegionId = async (): Promise<string | undefined> => {
  try {
    const cookies = await nextCookies()
    return cookies.get("_medusa_region_id")?.value
  } catch (error) {
    return undefined
  }
}

export const setRegionId = async (regionId: string): Promise<boolean> => {
  try {
    const cookies = await nextCookies()
    
    cookies.set("_medusa_region_id", regionId, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })

    return true
  } catch (error) {
    console.error("Error setting region ID cookie:", error)
    return false
  }
}

export const getCustomerId = async (): Promise<string | undefined> => {
  try {
    const cookies = await nextCookies()
    return cookies.get("_medusa_customer_id")?.value
  } catch (error) {
    return undefined
  }
}

export const setCustomerId = async (customerId: string): Promise<boolean> => {
  try {
    const cookies = await nextCookies()
    
    cookies.set("_medusa_customer_id", customerId, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })

    return true
  } catch (error) {
    console.error("Error setting customer ID cookie:", error)
    return false
  }
}
