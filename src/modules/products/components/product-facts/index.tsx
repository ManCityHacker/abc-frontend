import { HttpTypes } from "@medusajs/types"
import { Package, MapPin, Clock, Droplets, Beef, Wheat } from "lucide-react"
import { ReactNode } from "react"

interface Badge {
  icon: ReactNode
  label: string
  title: string
}

const ProductFacts = ({ product }: { product: HttpTypes.StoreProduct }) => {
  const metadata = product.metadata || {}
  
  // Detect category - check if product has cheese-specific metadata
  const isCheeseProduct = metadata.texture || metadata.aging || metadata.milk_type
  
  // Define attribute badges based on category
  const getAttributeBadges = (): Badge[] => {
    const badges: Badge[] = []
    
    if (isCheeseProduct) {
      // Cheese-specific badges in vertical layout
      
      // Case Pack
      if (metadata.case_pack) {
        badges.push({
          icon: <Package className="w-5 h-5 text-abc-accent" />,
          label: String(metadata.case_pack),
          title: "Case Pack"
        })
      }
      
      // Origin
      if (metadata.origin) {
        badges.push({
          icon: <MapPin className="w-5 h-5 text-abc-accent" />,
          label: String(metadata.origin),
          title: "Origin"
        })
      }
      
      // Texture (for cheese)
      if (metadata.texture) {
        badges.push({
          icon: <Beef className="w-5 h-5 text-abc-accent" />,
          label: String(metadata.texture),
          title: "Texture"
        })
      }
      
      // Aging (for cheese)
      if (metadata.aging) {
        badges.push({
          icon: <Clock className="w-5 h-5 text-abc-accent" />,
          label: String(metadata.aging),
          title: "Aging"
        })
      }
      
      // Milk Type (for cheese)
      if (metadata.milk_type) {
        badges.push({
          icon: <Droplets className="w-5 h-5 text-abc-accent" />,
          label: String(metadata.milk_type),
          title: "Milk Type"
        })
      }
      
    } else {
      // Accompaniments, charcuterie, etc. - horizontal layout
      
      // Case Pack
      if (metadata.case_pack) {
        badges.push({
          icon: <Package className="w-5 h-5 text-abc-accent" />,
          label: String(metadata.case_pack),
          title: "Case Pack"
        })
      }
      
      // Origin
      if (metadata.origin) {
        badges.push({
          icon: <MapPin className="w-5 h-5 text-abc-accent" />,
          label: String(metadata.origin),
          title: "Origin"
        })
      }
    }
    
    return badges
  }

  const badges = getAttributeBadges()

  return (
    <div className="flex flex-col gap-y-4 w-full">
      {isCheeseProduct ? (
        // Cheese products - vertical layout in center column
        <div className="flex flex-col gap-3 w-full max-w-[140px]">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white border-2 border-abc-gold rounded-xl p-4 shadow-lg min-h-[90px] justify-center hover:shadow-xl transition-shadow"
            >
              <div className="mb-2">{badge.icon}</div>
              <div className="text-sm font-medium text-abc-primary text-center font-merriweather">
                {badge.label}
              </div>
              <div className="text-xs text-gray-500 text-center mt-1 font-merriweather">
                {badge.title}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Accompaniments - horizontal layout in right column under history
        <div className="flex gap-3 w-full">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white border-2 border-abc-gold rounded-xl p-4 shadow-lg flex-1 hover:shadow-xl transition-shadow min-h-[80px]"
            >
              <div>{badge.icon}</div>
              <div className="flex flex-col">
                <div className="text-sm text-gray-500 font-merriweather">
                  {badge.title}
                </div>
                <div className="text-base font-medium text-abc-primary font-merriweather">
                  {badge.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductFacts
