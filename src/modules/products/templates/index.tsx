import { HttpTypes } from "@medusajs/types"
import ImageGallery from "@/modules/products/components/image-gallery"
import ProductActions from "@/modules/products/components/product-actions"
import ProductTabs from "@/modules/products/components/product-tabs"
import RelatedProducts from "@/modules/products/components/related-products"
import ProductInfo from "@/modules/products/templates/product-info"
import SkeletonRelatedProducts from "@/modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import React, { Suspense } from "react"
import ProductActionsWrapper from "./product-actions-wrapper"
import ProductFacts from "../components/product-facts"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  // Detect if it's a cheese product
  const metadata = product.metadata || {}
  const isCheeseProduct = metadata.texture || metadata.aging || metadata.milk_type

  return (
    <div className="flex flex-col gap-y-2 my-2">
      <div
        className="content-container w-full h-fit"
        data-testid="product-container"
      >
        {isCheeseProduct ? (
          // Cheese product layout - 2 columns: image | sidebar+content+actions
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            {/* Left Column: Image Only */}
            <div className="flex flex-col gap-4">
              <ImageGallery product={product} />
            </div>
            
            {/* Right Column: Product Facts Sidebar + Content */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Product Facts Sidebar - Full width on mobile, sidebar on desktop */}
              <div className="flex-shrink-0 flex lg:items-start lg:pt-4">
                <ProductFacts product={product} />
              </div>
              
              {/* Main Content Area */}
              <div className="flex flex-col gap-4 flex-1">
                <ProductInfo product={product} />
                <ProductTabs product={product} />
                {/* Product Actions - matches width of history card */}
                <div className="bg-neutral-100 p-4 rounded-lg">
                  <Suspense
                    fallback={<ProductActions product={product} region={region} />}
                  >
                    <ProductActionsWrapper id={product.id} region={region} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Non-cheese product layout - 2 columns: image | title+usage+pairings+history+facts+actions
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            {/* Left Column: Image Only */}
            <div className="flex flex-col gap-4">
              <ImageGallery product={product} />
            </div>
            
            {/* Right Column: Title + Usage + Pairings + History + Facts + Actions */}
            <div className="flex flex-col gap-4">
              <ProductInfo product={product} />
              <ProductTabs product={product} />
              <ProductFacts product={product} />
              {/* Product Actions - underneath the two cards */}
              <div className="bg-neutral-100 p-4 rounded-lg">
                <Suspense
                  fallback={<ProductActions product={product} region={region} />}
                >
                  <ProductActionsWrapper id={product.id} region={region} />
                </Suspense>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div
        className="content-container"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductTemplate
