import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Contact Us | ABC Provisions",
  description:
    "Get in touch with ABC Provisions. Contact our team for wholesale inquiries, product information, or partnership opportunities.",
}

export default function ContactPage() {
  return (
    <div className="bg-white py-16 px-4">
      <div className="content-container mx-auto max-w-4xl">
        <Heading 
          level="h1" 
          className="text-4xl md:text-5xl font-bold text-abc-red mb-6"
        >
          Contact Us
        </Heading>
        
        <div className="mb-12">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
            <Heading 
              level="h2" 
              className="text-xl font-bold text-abc-red mb-4"
            >
              Contact Information
            </Heading>
            <div className="space-y-2 text-gray-700">
              <p><strong>Phone:</strong> (713) 856-7200</p>
              <p><strong>Email:</strong> info@abcprovisions.com</p>
              <p><strong>Hours:</strong> Monday-Friday, 8am-5pm CT</p>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <Heading 
            level="h2" 
            className="text-2xl font-bold text-abc-red mb-4"
          >
            Visit Us
          </Heading>
          <div className="text-gray-700 mb-6">
            <p className="font-bold">ABC Provisions Headquarters</p>
            <p>6529 Cunningham Rd #2201</p>
            <p>Houston, TX 77041</p>
            
            <p className="mt-4">
              Our showroom is open to wholesale customers by appointment only. Please contact us to schedule a visit.
            </p>
          </div>
          
          {/* Google Maps Location Image */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <Heading 
              level="h3" 
              className="text-lg font-bold text-abc-red mb-3"
            >
              Location
            </Heading>
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
              <Image
                src="/google-maps-location.png"
                alt="ABC Provisions location on Google Maps - 6529 Cunningham Rd #2201, Houston, TX 77041"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
