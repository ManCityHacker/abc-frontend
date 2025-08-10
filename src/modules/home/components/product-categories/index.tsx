import Link from "next/link"
import Image from "next/image"

const ProductCategories = () => {
  const categories = [
    {
      name: "Cheese",
      image: "/category-cheese.png",
      link: "/categories/cheese",
      colorScheme: "red"
    },
    {
      name: "Charcuterie",
      image: "/category-charcuterie.png",
      link: "/categories/charcuterie",
      colorScheme: "yellow"
    },
    {
      name: "Accompaniments",
      image: "/category-accompaniments.jpg",
      link: "/categories/accompaniments",
      colorScheme: "red"
    },
    {
      name: "Other Fine Foods",
      image: "/category-specialty-foods.png",
      link: "/categories/other-fine-foods",
      colorScheme: "yellow"
    }
  ]

  const getFrameClasses = (colorScheme: string) => {
    if (colorScheme === "red") {
      return "bg-gradient-to-br from-red-50 via-red-100 to-red-50"
    }
    return "bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50"
  }

  const getDecorativeClasses = (colorScheme: string) => {
    if (colorScheme === "red") {
      return {
        primary: "bg-abc-primary",
        secondary: "bg-abc-accent"
      }
    }
    return {
      primary: "bg-abc-accent",
      secondary: "bg-abc-primary"
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="content-container max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-abc-primary mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
            Shop Our Categories
          </h2>
          <p className="text-lg text-gray-600 font-serif max-w-2xl mx-auto">
            Discover our carefully curated selection of artisanal foods from around the world
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const decorativeColors = getDecorativeClasses(category.colorScheme)
            
            return (
              <div key={category.name} className="group">
                {/* Image Frame */}
                <div className={`relative p-6 ${getFrameClasses(category.colorScheme)} rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105 mb-6`}>
                  <div className="relative overflow-hidden rounded-xl border-4 border-white shadow-lg">
                    <Image
                      src={category.image}
                      alt={`${category.name} category`}
                      width={750}
                      height={1200}
                      className="w-full h-96 object-cover transform hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Decorative elements */}
                  <div className={`absolute top-2 right-2 w-4 h-4 ${decorativeColors.primary} rounded-full opacity-60`}></div>
                  <div className={`absolute bottom-2 left-2 w-3 h-3 ${decorativeColors.secondary} rounded-full opacity-40`}></div>
                </div>

                {/* Category Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-abc-primary mb-3" style={{ fontFamily: 'Merriweather, serif' }}>
                    {category.name}
                  </h3>
                  
                  {/* Shop Now Button */}
                  <Link
                    href={category.link}
                    className="inline-block bg-abc-primary hover:bg-abc-accent text-white font-serif font-medium px-6 py-2 transition-colors duration-200 border-b-2 border-transparent hover:border-abc-accent"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProductCategories
