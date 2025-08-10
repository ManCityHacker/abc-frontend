import { retrieveCart } from "@/lib/data/cart"
import { retrieveCustomer } from "@/lib/data/customer"
import AccountButton from "@/modules/account/components/account-button"
import CartButton from "@/modules/cart/components/cart-button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { MegaMenuWrapper } from "@/modules/layout/components/mega-menu"
import SkeletonAccountButton from "@/modules/skeletons/components/skeleton-account-button"
import SkeletonCartButton from "@/modules/skeletons/components/skeleton-cart-button"
import SkeletonMegaMenu from "@/modules/skeletons/components/skeleton-mega-menu"
import { Suspense } from "react"
import Image from "next/image"

export async function NavigationHeader() {
  const customer = await retrieveCustomer().catch(() => null)

  return (
    <div className="sticky top-0 inset-x-0 group bg-white text-zinc-900 small:p-4 p-2 text-sm border-b-8 duration-200 border-abc-green z-50">
      <header className="flex w-full content-container relative small:mx-auto justify-between">
        <div className="small:mx-auto flex justify-between items-center min-w-full">
          <div className="flex items-center">
            {/* Red Sheep Icon */}
            <LocalizedClientLink
              href="/"
              className="mr-4 self-end translate-y-[20px] hover:opacity-80 transition-opacity cursor-pointer"
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
            
            {/* Navigation Links */}
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

          <div className="flex justify-end items-center gap-4">
            {/* Search Bar */}
            <div className="relative mr-2 hidden small:inline-flex">
              <input
                disabled
                type="text"
                placeholder="Search for products"
                className="bg-gray-100 text-zinc-900 px-4 py-2 rounded-full pr-10 shadow-borders-base hover:cursor-not-allowed"
                title="Install a search provider to enable product search"
              />
            </div>

            {/* ABC Provisions Logo */}
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
            <div className="flex items-center gap-2">
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
          </div>
        </div>
      </header>
    </div>
  )
}
