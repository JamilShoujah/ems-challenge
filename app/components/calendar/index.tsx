import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewWeek, createViewMonthGrid } from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/calendar.css";
import ITimesheet from "~/models/interfaces/timesheet";
import "./index.css";

interface MyCalendarProps {
  timesheets: ITimesheet[];
}

function MyCalendar({ timesheets }: MyCalendarProps) {
  const events = timesheets.map(({ id, full_name, start_time, end_time }) => ({
    id: id?.toString() || "",
    title: full_name,
    start: start_time,
    end: end_time
  }));

  const calendarApp = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],
    events
  });

  return (
    <div className="sx-react-calendar-wrapper">
      <ScheduleXCalendar calendarApp={calendarApp} />
    </div>
  );
}

export default MyCalendar;
