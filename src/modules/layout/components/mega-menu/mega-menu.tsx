"use client"

import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import ChevronRight from "@/modules/common/icons/chevron-right"
import { usePathname } from "next/navigation"
import { useEffect, useState, useRef } from "react"

const MegaMenu = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [hoveredSubCategory, setHoveredSubCategory] = useState<string | null>(null)
  const pathname = usePathname()
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const subMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const subSubMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const mainCategories = categories.filter(
    (category) => !category.parent_category_id
  )

  const getSubCategories = (categoryId: string) => {
    return categories.filter(
      (category) => category.parent_category_id === categoryId
    )
  }

  const hasSubCategories = (categoryId: string) => {
    return getSubCategories(categoryId).length > 0
  }

  const clearAllTimeouts = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current)
      menuTimeoutRef.current = null
    }
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current)
      subMenuTimeoutRef.current = null
    }
    if (subSubMenuTimeoutRef.current) {
      clearTimeout(subSubMenuTimeoutRef.current)
      subSubMenuTimeoutRef.current = null
    }
  }

  const handleMenuHover = () => {
    clearAllTimeouts()
    setIsHovered(true)
  }

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setIsHovered(false)
      setHoveredCategory(null)
      setHoveredSubCategory(null)
    }, 200)
  }

  const handleCategoryHover = (categoryId: string) => {
    clearAllTimeouts()
    setHoveredCategory(categoryId)
    setHoveredSubCategory(null)
  }

  const handleCategoryLeave = () => {
    subMenuTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null)
      setHoveredSubCategory(null)
    }, 150)
  }

  const handleSubCategoryHover = (subCategoryId: string) => {
    clearAllTimeouts()
    setHoveredSubCategory(subCategoryId)
  }

  const handleSubCategoryLeave = () => {
    subSubMenuTimeoutRef.current = setTimeout(() => {
      setHoveredSubCategory(null)
    }, 150)
  }

  useEffect(() => {
    setIsHovered(false)
    setHoveredCategory(null)
    setHoveredSubCategory(null)
  }, [pathname])

  useEffect(() => {
    return () => {
      clearAllTimeouts()
    }
  }, [])

  return (
    <>
      <div
        onMouseEnter={handleMenuHover}
        onMouseLeave={handleMenuLeave}
        className="relative z-50"
      >
        <LocalizedClientLink
          href="/store"
          className="hover:text-abc-red-dark transition-colors font-merriweather text-abc-red"
        >
          Our Products
        </LocalizedClientLink>
        
        {/* Main Dropdown */}
        <div className={clx(
          "absolute left-0 top-full mt-2 w-64 bg-white border border-neutral-200 rounded-lg shadow-lg overflow-visible transition-all duration-300 transform origin-top",
          isHovered 
            ? "opacity-100 scale-y-100 translate-y-0" 
            : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
        )}>
          <div className="py-2">
            {mainCategories.map((category) => (
              <div 
                key={category.id} 
                className="relative"
                onMouseEnter={() => handleCategoryHover(category.id)}
                onMouseLeave={handleCategoryLeave}
              >
                <LocalizedClientLink
                  href={`/categories/${category.handle}`}
                  className={clx(
                    "flex items-center justify-between px-4 py-3 text-sm font-medium transition-all duration-200",
                    "hover:bg-abc-accent hover:text-white rounded-md mx-2",
                    hoveredCategory === category.id && "bg-abc-accent text-white"
                  )}
                >
                  <span>{category.name}</span>
                  {hasSubCategories(category.id) && (
                    <ChevronRight size="16" className={clx(
                      "transition-colors",
                      hoveredCategory === category.id ? "text-white" : "text-neutral-400"
                    )} />
                  )}
                </LocalizedClientLink>
                
                {/* Sub Categories Dropdown */}
                {hasSubCategories(category.id) && (
                  <div className={clx(
                    "absolute left-full top-0 ml-1 w-64 bg-white border border-neutral-200 rounded-lg shadow-lg overflow-visible transition-all duration-200 transform origin-top-left",
                    hoveredCategory === category.id
                      ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 scale-95 translate-x-2 pointer-events-none"
                  )}>
                    {/* Hover bridge */}
                    <div className="absolute -left-1 top-0 w-1 h-full bg-transparent" />
                    
                    <div className="py-2">
                      {getSubCategories(category.id).map((subCategory) => (
                        <div 
                          key={subCategory.id} 
                          className="relative"
                          onMouseEnter={() => handleSubCategoryHover(subCategory.id)}
                          onMouseLeave={handleSubCategoryLeave}
                        >
                          <LocalizedClientLink
                            href={`/categories/${subCategory.handle}`}
                            className={clx(
                              "flex items-center justify-between px-4 py-3 text-sm font-medium transition-all duration-200",
                              "hover:bg-abc-accent hover:text-white rounded-md mx-2",
                              hoveredSubCategory === subCategory.id && "bg-abc-accent text-white"
                            )}
                          >
                            <span>{subCategory.name}</span>
                            {hasSubCategories(subCategory.id) && (
                              <ChevronRight size="16" className={clx(
                                "transition-colors",
                                hoveredSubCategory === subCategory.id ? "text-white" : "text-neutral-400"
                              )} />
                            )}
                          </LocalizedClientLink>
                          
                          {/* Sub-Sub Categories Dropdown */}
                          {hasSubCategories(subCategory.id) && (
                            <div className={clx(
                              "absolute left-full top-0 ml-1 w-64 bg-white border border-neutral-200 rounded-lg shadow-lg overflow-visible transition-all duration-200 transform origin-top-left",
                              hoveredSubCategory === subCategory.id
                                ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                                : "opacity-0 scale-95 translate-x-2 pointer-events-none"
                            )}>
                              {/* Hover bridge */}
                              <div className="absolute -left-1 top-0 w-1 h-full bg-transparent" />
                              
                              <div className="py-2">
                                {getSubCategories(subCategory.id).map((subSubCategory) => (
                                  <LocalizedClientLink
                                    key={subSubCategory.id}
                                    href={`/categories/${subSubCategory.handle}`}
                                    className={clx(
                                      "block px-4 py-3 text-sm font-medium transition-all duration-200",
                                      "hover:bg-abc-accent hover:text-white rounded-md mx-2"
                                    )}
                                  >
                                    {subSubCategory.name}
                                  </LocalizedClientLink>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Backdrop blur */}
      {isHovered && (
        <div className="fixed inset-0 mt-[60px] bg-black/5 backdrop-blur-sm z-40" />
      )}
    </>
  )
}

export default MegaMenu
