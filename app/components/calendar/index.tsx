import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewWeek, createViewMonthGrid } from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/calendar.css";

function MyCalendar() {
  const calendarApp = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],
    events: [
      {
        id: "1",
        title: "Event 1",
        start: "2025-01-01 02:00", // Date-only format (YYYY-MM-DD)
        end: "2025-01-01 20:00" // Date-only format (YYYY-MM-DD) //24 Hour format
      }
    ]
    // selectedDate: "2025-01-01" // Ensure this is in the correct format
  });

  return (
    <div className="App">
      <ScheduleXCalendar calendarApp={calendarApp} />
    </div>
  );
}

export default MyCalendar;
