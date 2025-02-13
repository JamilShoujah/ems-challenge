import { useLoaderData } from "react-router";
import TimesheetDetails from "~/components/timesheetCell";
import ITimesheet from "~/models/interfaces/timesheet";
import MyCalendar from "~/components/calendar";
import Layout from "~/layout/layout";
import { getAllTimesheetsWithEmployees } from "~/db/queries/timesheetQueries";
import { useState } from "react";
import "./index.css";

export async function loader() {
  const timesheetsAndEmployees = await getAllTimesheetsWithEmployees();
  return { timesheetsAndEmployees };
}

export default function TimesheetsPage() {
  const { timesheetsAndEmployees } = useLoaderData();
  const [isTableView, setIsTableView] = useState(true);

  const handleViewChange = () => {
    setIsTableView(!isTableView);
  };

  return (
    <Layout>
      <div>
        <div className="view-toggle">
          <button onClick={handleViewChange} className="view-toggle-button">
            {isTableView ? "Switch to Calendar View" : "Switch to Table View"}
          </button>
        </div>

        {isTableView ? (
          <div className="timesheet-grid">
            {timesheetsAndEmployees.map((timesheet: ITimesheet) => (
              <TimesheetDetails key={timesheet.id} timesheet={timesheet} />
            ))}
          </div>
        ) : (
          <div className="timesheet-cal">
            <MyCalendar timesheets={timesheetsAndEmployees} />
          </div>
        )}
      </div>
    </Layout>
  );
}
