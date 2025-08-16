"use client"

import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { MegaMenuWrapper } from "@/modules/layout/components/mega-menu"
import { B2BCustomer } from "@/types/global"
import { Suspense } from "react"

interface MobileNavigationMenuProps {
  isOpen: boolean
  onClose: () => void
  customer: B2BCustomer | null
}

export default function MobileNavigationMenu({ 
  isOpen, 
  onClose, 
  customer 
}: MobileNavigationMenuProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="small:hidden fixed inset-0 bg-black bg-opacity-25 z-40"
        onClick={onClose}
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
            <li onClick={onClose} className="border-b border-gray-100 pb-2 mb-2">
              <Suspense fallback={<div className="px-4 py-3 text-lg">Loading...</div>}>
                <MegaMenuWrapper />
              </Suspense>
            </li>
            <li>
              <LocalizedClientLink
                className="block hover:text-abc-primary-red hover:bg-abc-accent-light active:bg-abc-accent transition-colors px-4 py-4 rounded-lg text-lg font-medium touch-manipulation"
                href="/our-story"
                onClick={onClose}
              >
                Our Story
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                className="block hover:text-abc-primary-red hover:bg-abc-accent-light active:bg-abc-accent transition-colors px-4 py-4 rounded-lg text-lg font-medium touch-manipulation"
                href="/our-partners"
                onClick={onClose}
              >
                Our Partners
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                className="block hover:text-abc-primary-red hover:bg-abc-accent-light active:bg-abc-accent transition-colors px-4 py-4 rounded-lg text-lg font-medium touch-manipulation"
                href="/contact"
                onClick={onClose}
              >
                Contact
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                className="block hover:text-abc-primary-red hover:bg-abc-accent-light active:bg-abc-accent transition-colors px-4 py-4 rounded-lg text-lg font-medium touch-manipulation"
                href="/events"
                onClick={onClose}
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
                    onClick={onClose}
                  >
                    Sign In
                  </LocalizedClientLink>
                  <LocalizedClientLink
                    href="/account/register"
                    className="border border-abc-primary text-abc-primary px-4 py-3 rounded-lg text-center font-medium hover:bg-abc-primary hover:text-white transition-colors"
                    onClick={onClose}
                  >
                    Create Account
                  </LocalizedClientLink>
                </div>
              ) : (
                <LocalizedClientLink
                  href="/account"
                  className="bg-abc-accent text-abc-primary px-4 py-3 rounded-lg text-center font-medium hover:bg-abc-accent-dark transition-colors"
                  onClick={onClose}
                >
                  My Account
                </LocalizedClientLink>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
