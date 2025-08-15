"use client"

import AccountButton from "@/modules/account/components/account-button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { MegaMenuWrapper } from "@/modules/layout/components/mega-menu"
import SkeletonAccountButton from "@/modules/skeletons/components/skeleton-account-button"
import SkeletonCartButton from "@/modules/skeletons/components/skeleton-cart-button"
import SkeletonMegaMenu from "@/modules/skeletons/components/skeleton-mega-menu"
import { Suspense, useState, useEffect, ReactNode } from "react"
import Image from "next/image"
import { Button } from "@medusajs/ui"
import { X, Menu } from "lucide-react"

export default function NavigationContent({ customer, cartButton }: { customer: any; cartButton: ReactNode }) {
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
                    {cartButton}
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

      {/* Mobile Navigation Menu - Full screen overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="small:hidden fixed inset-0 bg-black bg-opacity-25 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="small:hidden fixed top-[72px] left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-50 max-h-[calc(100vh-72px)] overflow-y-auto">
            <nav className="px-4 py-6">
              {/* Mobile Search Bar */}
              <div className="mb-6">
                <input
                  disabled
                  type="text"
                  placeholder="Search for products"
                  className="w-full bg-gray-100 text-zinc-900 px-4 py-3 rounded-lg shadow-sm hover:cursor-not-allowed text-base"
                  title="Install a search provider to enable product search"
                />
              </div>

              <ul className="flex flex-col space-y-2 text-abc-red font-merriweather">
                <li onClick={() => setMobileMenuOpen(false)} className="border-b border-gray-100 pb-2 mb-2">
                  <Suspense fallback={<div className="px-4 py-3 text-lg">Loading...</div>}>
                    <MegaMenuWrapper />
                  </Suspense>
                </li>
                <li>
                  <LocalizedClientLink
                    className="block hover:text-abc-primary-red hover:bg-abc-accent-light active:bg-abc-accent transition-colors px-4 py-4 rounded-lg text-lg font-medium touch-manipulation"
                    href="/our-story"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Story
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="block hover:text-abc-primary-red hover:bg-abc-accent-light active:bg-abc-accent transition-colors px-4 py-4 rounded-lg text-lg font-medium touch-manipulation"
                    href="/our-partners"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Partners
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="block hover:text-abc-primary-red hover:bg-abc-accent-light active:bg-abc-accent transition-colors px-4 py-4 rounded-lg text-lg font-medium touch-manipulation"
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="block hover:text-abc-primary-red hover:bg-abc-accent-light active:bg-abc-accent transition-colors px-4 py-4 rounded-lg text-lg font-medium touch-manipulation"
                    href="/events"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Events
                  </LocalizedClientLink>
                </li>
              </ul>

              {/* Mobile Account Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-3 font-medium">Account</div>
                <div className="flex flex-col gap-2">
                  {!customer ? (
                    <div className="flex flex-col gap-2">
                      <LocalizedClientLink
                        href="/account/login"
                        className="bg-abc-primary text-white px-4 py-3 rounded-lg text-center font-medium hover:bg-abc-primary-dark transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign In
                      </LocalizedClientLink>
                      <LocalizedClientLink
                        href="/account/register"
                        className="border border-abc-primary text-abc-primary px-4 py-3 rounded-lg text-center font-medium hover:bg-abc-primary hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Create Account
                      </LocalizedClientLink>
                    </div>
                  ) : (
                    <LocalizedClientLink
                      href="/account"
                      className="bg-abc-accent text-abc-primary px-4 py-3 rounded-lg text-center font-medium hover:bg-abc-accent-dark transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Account
                    </LocalizedClientLink>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
