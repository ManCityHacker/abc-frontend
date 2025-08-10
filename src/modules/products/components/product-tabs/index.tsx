"use client"

import { HttpTypes } from "@medusajs/types"
import { Utensils, Wine, ScrollText } from "lucide-react"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const metadata = product.metadata || {}

  return (
    <div className="w-full">
      {/* Usage and Pairings side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Usage Section */}
        <div className="bg-white border-2 border-abc-gold rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-abc-gold rounded-full flex items-center justify-center">
              <Utensils className="w-4 h-4 text-abc-primary" />
            </div>
            <h3 className="text-base font-semibold text-abc-primary font-merriweather">Usage</h3>
          </div>
          <div className="text-sm text-gray-600 font-merriweather leading-relaxed">
            {(metadata.usage ? String(metadata.usage) : product.description) || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
          </div>
        </div>

        {/* Pairings Section */}
        <div className="bg-white border-2 border-abc-gold rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-abc-gold rounded-full flex items-center justify-center">
              <Wine className="w-4 h-4 text-abc-primary" />
            </div>
            <h3 className="text-base font-semibold text-abc-primary font-merriweather">Pairings</h3>
          </div>
          <div className="text-sm text-gray-600 font-merriweather">
            {metadata.pairings ? (
              <div>
                {String(metadata.pairings).split('.').map((pairing, index) => (
                  pairing.trim() && (
                    <div key={index} className="mb-2">
                      <span>• {pairing.trim()}</span>
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div>
                <div className="mb-2">• Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <div className="mb-2">• Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                <div className="mb-2">• Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
                <div className="mb-2">• Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History Section - Full width below Usage and Pairings */}
      <div className="bg-white border-2 border-abc-gold rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-abc-gold rounded-full flex items-center justify-center">
            <ScrollText className="w-4 h-4 text-abc-primary" />
          </div>
          <h3 className="text-base font-semibold text-abc-primary font-merriweather">History</h3>
        </div>
        <div className="text-sm text-gray-600 font-merriweather leading-relaxed">
          {product.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
