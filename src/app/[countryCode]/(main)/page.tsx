import { listRegions } from "@/lib/data/regions"
import Hero from "@/modules/home/components/hero"
import OurStoryPreview from "@/modules/home/components/our-story-preview"
import ProductCategories from "@/modules/home/components/product-categories"
import { Metadata } from "next"

export const dynamicParams = true

export const metadata: Metadata = {
  title: "ABC Provisions - Premium Wholesale Distributor of Artisanal Foods",
  description:
    "Trusted wholesale distributor of artisanal cheeses, premium charcuterie, and gourmet accompaniments. Serving retailers and foodservice professionals since 1999.",
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then(
    (regions) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )
  return countryCodes.map((countryCode) => ({ countryCode }))
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  return (
    <div className="flex flex-col">
      <Hero />
      <OurStoryPreview />
      <ProductCategories />
    </div>
  )
}
