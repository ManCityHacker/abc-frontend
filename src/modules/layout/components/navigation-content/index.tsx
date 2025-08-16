"use client"

import AccountButton from "@/modules/account/components/account-button"
import CartButton from "@/modules/cart/components/cart-button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { MegaMenuWrapper } from "@/modules/layout/components/mega-menu"
import MobileNavigationMenu from "@/modules/layout/components/mobile-navigation-menu"
import SkeletonAccountButton from "@/modules/skeletons/components/skeleton-account-button"
import SkeletonCartButton from "@/modules/skeletons/components/skeleton-cart-button"
import SkeletonMegaMenu from "@/modules/skeletons/components/skeleton-mega-menu"
import { B2BCustomer } from "@/types/global"
import { Suspense, useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@medusajs/ui"
import { X, Menu } from "lucide-react"

interface NavigationContentProps {
  customer: B2BCustomer | null
}

export default function NavigationContent({ customer }: NavigationContentProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu on window resize to larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <div className="sticky top-0 inset-x-0 group bg-white text-zinc-900 small:p-4 p-3 text-sm border-b-8 duration-200 border-abc-green z-50">
        <header className="flex w-full content-container relative small:mx-auto justify-between">
          <div className="small:mx-auto flex justify-between items-center min-w-full">
            <div className="flex items-center">
              {/* Mobile ABC Provisions Logo */}
              <LocalizedClientLink
                href="/"
                className="small:hidden mr-2 hover:opacity-80 transition-opacity cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Image
                  src="/abc provisions logo.png"
                  alt="ABC Provisions"
                  width={100}
                  height={35}
                  className="h-8 w-auto"
                />
              </LocalizedClientLink>

              {/* Red Sheep Icon - Desktop */}
              <LocalizedClientLink
                href="/"
                className="hidden small:block mr-4 self-end translate-y-[20px] hover:opacity-80 transition-opacity cursor-pointer"
              >
                <Image
                  src="/red sheep.png"
                  alt="Green Sheep"
                  width={90}
                  height={45}
                  style={{ 
                    width: 'auto', 
                    height: 'auto',
                    filter: 'hue-rotate(90deg) saturate(1.2)'
                  }}
                />
              </LocalizedClientLink>
              
              {/* Desktop Navigation Links */}
              <nav className="hidden small:flex ml-4">
                <ul className="flex space-x-8 text-abc-red font-merriweather text-lg">
                  <li>
                    <Suspense fallback={<SkeletonMegaMenu />}>
                      <MegaMenuWrapper />
                    </Suspense>
                  </li>
                  <li>
                    <LocalizedClientLink
                      className="hover:text-abc-primary-red hover:bg-abc-accent-light transition-colors px-3 py-2 rounded-lg"
                      href="/our-story"
                    >
                      Our Story
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      className="hover:text-abc-primary-red hover:bg-abc-accent-light transition-colors px-3 py-2 rounded-lg"
                      href="/our-partners"
                    >
                      Our Partners
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      className="hover:text-abc-primary-red hover:bg-abc-accent-light transition-colors px-3 py-2 rounded-lg"
                      href="/contact"
                    >
                      Contact
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      className="hover:text-abc-primary-red hover:bg-abc-accent-light transition-colors px-3 py-2 rounded-lg"
                      href="/events"
                    >
                      Events
                    </LocalizedClientLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex justify-end items-center gap-2 small:gap-4">
              {/* Search Bar - Desktop */}
              <div className="relative mr-2 hidden small:inline-flex">
                <input
                  disabled
                  type="text"
                  placeholder="Search for products"
                  className="bg-gray-100 text-zinc-900 px-4 py-2 rounded-full pr-10 shadow-borders-base hover:cursor-not-allowed"
                  title="Install a search provider to enable product search"
                />
              </div>

              {/* ABC Provisions Logo - Desktop */}
              <LocalizedClientLink
                href="/"
                className="hidden small:block hover:opacity-80 transition-opacity cursor-pointer"
              >
                <Image
                  src="/abc provisions logo.png"
                  alt="ABC Provisions"
                  width={120}
                  height={40}
                />
              </LocalizedClientLink>

              {/* Log in and Cart */}
              <div className="flex items-center gap-1 small:gap-2">
                <Suspense fallback={<SkeletonAccountButton />}>
                  <div className="text-abc-red">
                    <AccountButton customer={customer} />
                  </div>
                </Suspense>

                <Suspense fallback={<SkeletonCartButton />}>
                  <div className="text-abc-red">
                    <CartButton />
                  </div>
                </Suspense>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="transparent"
                size="small"
                className="small:hidden p-2 text-abc-red hover:bg-abc-accent-light rounded-lg transition-all duration-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Navigation Menu */}
      <MobileNavigationMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        customer={customer}
      />
    </>
  )
}
