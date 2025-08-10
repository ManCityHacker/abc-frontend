import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 w-full">
        <Heading
          level="h1"
          className="text-[2.5rem] leading-10 text-abc-primary font-merriweather font-bold"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        {product.subtitle && (
          <Text
            className="text-lg text-gray-600 whitespace-pre-line font-merriweather"
            data-testid="product-description"
          >
            {product.subtitle}
          </Text>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
