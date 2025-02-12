import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewWeek, createViewMonthGrid } from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/calendar.css";
import ITimesheet from "~/models/interfaces/timesheet";

interface MyCalendarProps {
  timesheets: ITimesheet[]; // Accepts timesheets as a prop
}

function MyCalendar({ timesheets }: MyCalendarProps) {
  const events = timesheets.map((timesheet) => ({
    id: timesheet.id?.toString() || "",
    title: timesheet.full_name,
    start: timesheet.start_time, // Ensure correct format YYYY-MM-DD HH:mm
    end: timesheet.end_time // Ensure correct format YYYY-MM-DD HH:mm
  }));

  const calendarApp = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],
    events
  });

  return (
    <div className="App">
      <ScheduleXCalendar calendarApp={calendarApp} />
    </div>
  );
}

export default MyCalendar;
