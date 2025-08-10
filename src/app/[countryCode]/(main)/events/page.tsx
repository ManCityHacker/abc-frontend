import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"
import ClientCalendarWrapper from "@/modules/events/components/client-calendar-wrapper"
import EventCard from "@/modules/events/components/event-card"
import { getEvents, Event } from "@/lib/data/events"

export const metadata: Metadata = {
  title: "Events & RSVP | ABC Provisions",
  description:
    "Join ABC Provisions for tastings, workshops, and industry events. RSVP to our upcoming events and connect with artisanal food enthusiasts.",
}

export default async function EventsPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params;
  const { countryCode } = params;

  // Fetch events from the API
  let events: Event[] = []
  let fetchError = false
  
  try {
    events = await getEvents()
  } catch (error) {
    console.error("Error fetching events:", error)
    fetchError = true
  }
  
  // Get current date for the calendar
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  return (
    <div className="bg-white py-16 px-4">
      <div className="content-container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Heading 
            level="h1" 
            className="text-4xl md:text-5xl font-bold text-abc-red mb-6"
          >
            Events & RSVP
          </Heading>
          <Text className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Join us for tastings, workshops, and industry events. Connect with artisanal food enthusiasts and learn from our experts.
          </Text>
        </div>

        {/* Calendar Section */}
        {fetchError ? (
          <div className="bg-red-50 rounded-xl shadow-lg p-6 mb-12 text-center">
            <Heading level="h3" className="text-xl font-bold mb-3 text-red-700">Calendar Unavailable</Heading>
            <Text className="text-red-700/80">
              We're having trouble loading the event calendar. Please check back later.
            </Text>
          </div>
        ) : (
          <ClientCalendarWrapper 
            initialEvents={events} 
            initialMonth={currentMonth} 
            initialYear={currentYear} 
          />
        )}
        
        {/* Events List Section */}
        <div className="mt-16">
          <Heading level="h2" className="text-2xl font-bold text-abc-red mb-8">
            Upcoming Events
          </Heading>
          
          {fetchError ? (
            <div className="bg-red-50 rounded-xl shadow-lg p-8 text-center">
              <Heading level="h3" className="text-xl font-bold mb-3 text-red-700">Unable to Load Events</Heading>
              <Text className="text-red-700/80 mb-6">
                We're having trouble connecting to our events database. Please try again later or contact us for information about upcoming events.
              </Text>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event) => (
                <EventCard key={event.id} event={event} countryCode={countryCode} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200">
              <Heading level="h3" className="text-xl font-bold mb-3 text-abc-red">No Events Currently Scheduled</Heading>
              <Text className="text-gray-700">
                Check back soon for upcoming events.
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
