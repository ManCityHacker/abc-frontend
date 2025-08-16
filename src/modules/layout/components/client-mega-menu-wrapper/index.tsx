"use client"

import { listCategories } from "@/lib/data/categories"
import { MegaMenuWrapper } from "@/modules/layout/components/mega-menu"
import { useEffect, useState } from "react"

export default function ClientMegaMenuWrapper() {
  const [categories, setCategories] = useState<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await listCategories()
        setCategories(categoriesData || [])
      } catch (error) {
        console.error("Error loading categories:", error)
        setCategories([])
      } finally {
        setIsLoaded(true)
      }
    }

    loadCategories()
  }, [])

  return <MegaMenuWrapper categories={categories} />
}
