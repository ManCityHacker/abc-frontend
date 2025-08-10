import { listCollections } from "@/lib/data/collections"
import { getRegion } from "@/lib/data/regions"
import ProductRail from "@/modules/home/components/featured-products/product-rail"
import { B2BCustomer } from "@/types"

export default async function FeaturedProducts({
  countryCode,
  customer,
}: {
  countryCode: string
  customer?: B2BCustomer | null
}) {
  const { collections } = await listCollections({
    limit: "3",
    fields: "*products",
  })
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <ul className="flex flex-col gap-x-6 bg-neutral-100">
      {collections.map((collection) => (
        <li key={collection.id}>
          <ProductRail collection={collection} region={region} customer={customer} />
        </li>
      ))}
    </ul>
  )
}
