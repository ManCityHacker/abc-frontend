import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Our Partners | ABC Provisions",
  description:
    "Meet the artisanal producers and family farms that partner with ABC Provisions to bring you the finest cheeses and gourmet foods.",
}

export default function OurPartnersPage() {
  return (
    <div className="content-container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-abc-red">Our Partners</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl mb-6 text-gray-700">
            At ABC Provisions, we're proud to work with some of the finest artisanal producers 
            and family farms across the country and around the world.
          </p>
          
          {/* Partner Logos Section */}
          <div className="my-12 text-center">
            <h2 className="text-2xl font-semibold mb-8 text-abc-red">Our Trusted Partners</h2>
            <div className="bg-gray-50 p-8 rounded-lg">
              <Image
                src="/ABC Partners Logos all on one page.png"
                alt="ABC Provisions Partner Logos"
                width={800}
                height={600}
                className="w-full h-auto max-w-4xl mx-auto"
                priority
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-abc-red">Our Producer Network</h2>
          <p className="mb-6 text-gray-600">
            We've spent decades building relationships with small-batch producers who share our 
            commitment to quality, sustainability, and traditional methods. Many of our partners 
            are multi-generational family businesses with deep roots in their local communities 
            and time-honored production techniques.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-abc-red">Selection Criteria</h2>
          <p className="mb-6 text-gray-600">
            When selecting partners, we look for producers who:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Prioritize quality over quantity</li>
            <li>Use sustainable and ethical farming practices</li>
            <li>Maintain traditional production methods</li>
            <li>Create products with distinctive character and exceptional taste</li>
            <li>Share our passion for artisanal food</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-abc-red">Partner With Us</h2>
          <p className="mb-6 text-gray-600">
            If you're an artisanal producer interested in partnering with ABC Provisions, 
            we'd love to hear from you. We're always looking to expand our network with 
            like-minded producers who share our values and commitment to excellence.
          </p>
          
          <p className="mb-6 text-gray-600">
            Contact our sourcing team to learn more about becoming a partner.
          </p>
        </div>
      </div>
    </div>
  )
}
