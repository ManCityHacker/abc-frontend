"use client"

import { useState } from "react"
import { Event } from "@/lib/data/events"
import { Heading } from "@medusajs/ui"

interface CalendarDay {
  day: number | null;
  events: Event[];
}

interface ClientCalendarWrapperProps {
  initialEvents: Event[];
  initialMonth: number;
  initialYear: number;
}

export default function ClientCalendarWrapper({
  initialEvents,
  initialMonth,
  initialYear
}: ClientCalendarWrapperProps) {
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentYear, setCurrentYear] = useState(initialYear);
  const [events] = useState(initialEvents);
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const getDaysInMonth = (year: number, month: number): CalendarDay[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: CalendarDay[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: null, events: [] });
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ 
        day: i, 
        events: events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.getDate() === i && 
                 eventDate.getMonth() === month && 
                 eventDate.getFullYear() === year;
        })
      });
    }
    
    return days;
  }
  
  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }
  
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }
  
  const days = getDaysInMonth(currentYear, currentMonth);
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-12 shadow-sm">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={previousMonth}
          className="px-4 py-2 text-abc-red border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Previous Month
        </button>
        <Heading level="h3" className="text-2xl font-bold text-abc-red">
          {monthNames[currentMonth]} {currentYear}
        </Heading>
        <button
          onClick={nextMonth}
          className="px-4 py-2 text-abc-red border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Next Month
        </button>
      </div>
      
      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-medium text-abc-red py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            className={`min-h-12 p-1 flex flex-col ${
              day.day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
            } rounded transition-colors ${
              day.events.length > 0 ? 'border-2 border-abc-red/20' : 'border border-gray-200'
            }`}
          >
            {day.day && (
              <>
                <span className="text-sm font-medium mb-1">{day.day}</span>
                {day.events.length > 0 && (
                  <div className="flex-grow flex flex-col gap-1">
                    {day.events.map((event) => (
                      <div 
                        key={event.id}
                        className="text-xs p-1 bg-abc-red/10 text-abc-red rounded truncate"
                        title={event.title}
                      >
                        {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {event.title}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
