import { Metadata } from "next"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "About Us | ABC Provisions",
  description:
    "Learn about ABC Provisions, a trusted wholesale distributor of artisanal cheeses, premium charcuterie, and gourmet accompaniments based in Houston, Texas.",
}

export default function OurStoryPage() {
  return (
    <div className="bg-white py-16 px-4 font-merriweather">
      <div className="content-container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-merriweather text-abc-red mb-6">
            About Us
          </h1>
          <p className="text-lg font-merriweather text-gray-700 max-w-3xl mx-auto leading-relaxed">
            A journey of passion, quality, and dedication to bringing the world's finest artisanal foods to your table.
          </p>
        </div>

        {/* Story Content */}
        <div className="space-y-12">
          {/* About Us Section */}
          <section>
            <div className="font-merriweather text-gray-700 leading-relaxed space-y-6">
              <p className="text-lg leading-relaxed">
                At ABC Provisions, we believe food tells a story—and for over 25 years, ours has been one of authenticity, quality, and global flavor. Founded in 1999 in Houston, Texas, we are a proudly family-owned and operated wholesale distributor with deep roots in the Texas food landscape.
              </p>
              
              <p className="text-lg leading-relaxed">
                We began with a passion for Mediterranean artisan cheeses and have since grown into a trusted source for a wide range of specialty foods, including cured meats, gourmet accompaniments, and hard-to-find imported groceries. Our curated portfolio features over 85 exclusive products, many of which are kept in regular stock to ensure fast, reliable delivery across Texas.
              </p>
              
              <p className="text-lg leading-relaxed">
                As major suppliers to leading retail chains like HEB and Specs, ABC Provisions has earned a reputation for consistency, transparency, and value. Our trucks deliver daily and weekly to more than 160 locations, serving not only large retailers but also supporting independent grocers, delis, chefs, and hospitality partners throughout Houston, Austin, San Antonio, Dallas, and beyond.
              </p>
              
              <p className="text-lg leading-relaxed">
                We source with intention, distribute with precision, and partner with our customers to help them thrive. Whether you're stocking shelves, building a charcuterie program, or crafting a unique culinary experience, ABC Provisions is your behind-the-scenes partner in food excellence.
              </p>
            </div>
          </section>

          {/* Become a Customer Section */}
          <section className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold font-merriweather text-abc-red mb-4">
              Become a Customer
            </h2>
            
            <p className="text-xl font-semibold font-merriweather text-abc-red mb-6">
              Wholesale Prices. Unmatched Value. Easy Ordering.
            </p>
            
            <div className="font-merriweather text-gray-700 leading-relaxed space-y-4 mb-8">
              <p className="leading-relaxed">
                When you become a customer with ABC Provisions, you're unlocking more than just access to exceptional specialty foods—you're gaining entry to steeply discounted wholesale prices that are significantly lower than retail. This is our way of supporting your business success, whether you're a local deli, high-volume retailer, or culinary entrepreneur.
              </p>
              
              <p className="font-semibold text-abc-red">
                We make the process easy and efficient:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>No complicated onboarding—just a quick application and you're in.</li>
                <li>Instant access to our product catalog, pricing tiers, and availability.</li>
                <li>Fast turnaround and flexible order sizes to meet your exact needs.</li>
              </ul>
              
              <p className="font-semibold text-abc-red">
                Joining our network means you'll benefit from:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Consistent product availability.</li>
                <li>Personalized service from a team that knows your business.</li>
                <li>Curated collection of classics & crowd-pleasing staples all at wholesale pricing</li>
              </ul>
              
              <p className="font-semibold text-lg text-abc-red">
                Why pay more for less?
              </p>
              
              <p className="leading-relaxed">
                When you source from ABC Provisions, you're getting high-quality, globally sourced foods at a fraction of the retail price. That's the advantage of partnering with a trusted distributor with over 25 years of industry expertise.
              </p>
            </div>
            
            <div className="text-center">
              <LocalizedClientLink href="/contact">
                <button className="bg-abc-red hover:bg-abc-red/90 text-white font-merriweather font-semibold py-3 px-8 rounded-lg text-lg transition-colors inline-flex items-center">
                  🛒 Become a Customer
                </button>
              </LocalizedClientLink>
              <p className="text-sm font-merriweather text-gray-600 mt-3">
                Start saving today. Create an account now to get access to our wholesale catalog and start ordering with ease.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
