export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number | null;
  rsvp_count: number;
  image_url: string | null;
}

// Define the backend URL directly
const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

export async function getEvents(): Promise<Event[]> {
  try {
    console.log(`[DEBUG] Fetching all events`);
    console.log(`[DEBUG] Backend URL: ${MEDUSA_BACKEND_URL}`);
    
    const headers: HeadersInit = {};
    if (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY) {
      headers['x-publishable-api-key'] = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    }
    
    console.log(`[DEBUG] Request headers:`, headers);
    
    const url = `${MEDUSA_BACKEND_URL}/store/events`;
    console.log(`[DEBUG] Making GET request to: ${url}`);
    
    const response = await fetch(url, {
      headers,
      cache: 'no-store'
    });
    
    console.log(`[DEBUG] Response status:`, response.status);
    console.log(`[DEBUG] Response status text:`, response.statusText);
    
    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`[DEBUG] Found ${data.events.length} events`);
    
    return data.events;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

// Fetch a single event by ID
export async function getEvent(id: string): Promise<Event | null> {
  try {
    console.log(`[DEBUG] Fetching event with ID: ${id}`);
    console.log(`[DEBUG] Backend URL: ${MEDUSA_BACKEND_URL}`);
    
    const headers: HeadersInit = {};
    if (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY) {
      headers['x-publishable-api-key'] = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    }
    
    console.log(`[DEBUG] Request headers:`, headers);
    
    const url = `${MEDUSA_BACKEND_URL}/store/events/${id}`;
    console.log(`[DEBUG] Making GET request to: ${url}`);
    
    const response = await fetch(url, {
      headers,
      cache: 'no-store'
    });
    
    console.log(`[DEBUG] Response status:`, response.status);
    console.log(`[DEBUG] Response status text:`, response.statusText);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log(`[DEBUG] Event not found with ID: ${id}`);
        return null;
      }
      throw new Error(`Error fetching event: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`[DEBUG] Response data:`, JSON.stringify(data, null, 2));
    
    return data.event;
  } catch (error) {
    console.error(`Failed to fetch event with ID ${id}:`, error);
    return null;
  }
}

// Submit an RSVP for an event
export async function submitRSVP(eventId: string, name: string, email: string, phone?: string): Promise<any> {
  try {
    console.log(`[DEBUG] Submitting RSVP for event ID: ${eventId}`);
    console.log(`[DEBUG] RSVP data:`, { name, email, phone });
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    if (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY) {
      headers['x-publishable-api-key'] = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    }
    
    const url = `${MEDUSA_BACKEND_URL}/store/events/${eventId}/rsvp`;
    console.log(`[DEBUG] Making POST request to: ${url}`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, email, phone }),
      cache: 'no-store'
    });
    
    console.log(`[DEBUG] Response status:`, response.status);
    console.log(`[DEBUG] Response status text:`, response.statusText);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error submitting RSVP: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`[DEBUG] RSVP submission successful:`, data);
    
    return data;
  } catch (error) {
    console.error(`Failed to submit RSVP for event ${eventId}:`, error);
    throw error;
  }
}
