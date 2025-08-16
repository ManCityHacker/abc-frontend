"use client"
import { Event } from "@/lib/data/events"
import { Button, Heading, Text } from "@medusajs/ui"
import Link from "next/link"
import { useState } from "react"
import { submitRSVP } from "@/lib/data/events"

interface EventCardProps {
  event: Event;
  countryCode: string;
}

export default function EventCard({ event, countryCode }: EventCardProps) {
  const [isRsvpFormOpen, setIsRsvpFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpError, setRsvpError] = useState<string | null>(null);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  }

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRsvpError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    try {
      await submitRSVP(event.id, name, email, phone);
      setRsvpSuccess(true);
      setIsRsvpFormOpen(false);
    } catch (error) {
      setRsvpError(error instanceof Error ? error.message : 'Failed to submit RSVP');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <Heading level="h3" className="text-xl font-bold text-abc-red mb-2">
          {event.title}
        </Heading>
        
        <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mb-4 gap-2 sm:gap-4">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="mr-2 h-5 w-5" />
            <span>{formatTime(event.date)}</span>
          </div>
          {event.location && (
            <div className="flex items-center">
              <MapPinIcon className="mr-2 h-5 w-5" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
        
        <Text className="text-gray-700 mb-6 line-clamp-3">
          {event.description}
        </Text>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {event.capacity ? (
              <span>{event.rsvp_count} / {event.capacity} spots filled</span>
            ) : (
              <span>{event.rsvp_count} attending</span>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              onClick={() => setIsRsvpFormOpen(true)}
              disabled={rsvpSuccess || (event.capacity !== null && event.rsvp_count >= event.capacity)}
            >
              {rsvpSuccess ? 'RSVP Confirmed' : 'RSVP'}
            </Button>
          </div>
        </div>

        {rsvpError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
            {rsvpError}
          </div>
        )}

        {rsvpSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
            RSVP confirmed! We'll send you a confirmation email.
          </div>
        )}
      </div>

      {/* RSVP Modal */}
      {isRsvpFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold mb-4">RSVP for {event.title}</h3>
            
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-abc-red"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-abc-red"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-abc-red"
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsRsvpFormOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-abc-red hover:bg-abc-red/90"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// Simple icon components
function CalendarIcon({ className = "h-6 w-6" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className={className}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" 
      />
    </svg>
  )
}

function ClockIcon({ className = "h-6 w-6" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className={className}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" 
      />
    </svg>
  )
}

function MapPinIcon({ className = "h-6 w-6" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className={className}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" 
      />
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" 
      />
    </svg>
  )
}
