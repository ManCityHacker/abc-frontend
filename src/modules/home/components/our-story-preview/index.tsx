import Link from "next/link"
import Image from "next/image"

const OurStoryPreview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="content-container max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative p-6 bg-gradient-to-br from-red-50 via-yellow-50 to-red-100 rounded-2xl shadow-xl">
              <div className="relative overflow-hidden rounded-xl border-4 border-white shadow-lg">
                <Image
                  src="/cheese-board.webp"
                  alt="Artisanal cheese board with various cheeses and accompaniments"
                  width={600}
                  height={400}
                  className="w-full h-auto transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-2 right-2 w-4 h-4 bg-abc-accent rounded-full opacity-60"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 bg-abc-primary rounded-full opacity-40"></div>
            </div>
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2">
            {/* Heading */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-abc-primary mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
                Discover ABC Provisions
              </h2>
              <p className="text-lg text-abc-accent font-medium" style={{ fontFamily: 'Merriweather, serif' }}>
                A World Of Flavor
              </p>
            </div>
            
            {/* Main Content */}
            <div className="space-y-4 mb-8">
              <p className="text-base font-serif text-gray-700 leading-relaxed">
                Founded in 1999, ABC Provisions began as a small family business with a simple mission: to source and distribute the finest artisanal foods from around the world. What started as a passion project has grown into a trusted wholesale distributor serving retailers and foodservice professionals across the country.
              </p>
              
              <p className="text-base font-serif text-gray-700 leading-relaxed">
                ABC brings an array of unique products for the cured meat and cheese board including fig and cranberry cakes, Italian mostardas, local honey and speciality nuts. The list continues to grow...
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/our-story"
                className="inline-block bg-abc-primary hover:bg-abc-accent text-white font-serif font-medium px-6 py-2 transition-colors duration-200 border-b-2 border-transparent hover:border-abc-accent"
              >
                Read More About Our Story
              </Link>
              
              <Link
                href="/partners"
                className="inline-block bg-abc-primary hover:bg-abc-accent text-white font-serif font-medium px-6 py-2 transition-colors duration-200 border-b-2 border-transparent hover:border-abc-accent"
              >
                Read More About Our Partners
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurStoryPreview
