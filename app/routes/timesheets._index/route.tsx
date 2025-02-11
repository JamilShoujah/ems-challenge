import { useLoaderData } from "react-router";
import { useState } from "react";
import { getDB } from "~/db/getDB";
import TimesheetDetails from "~/components/timesheetCell";
import ITimesheet from "~/models/interfaces/timesheet";

export async function loader() {
  const db = await getDB();
  const timesheetsAndEmployees = await db.all(
    "SELECT timesheets.*, employees.firstName, employees.lastName, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id"
  );

  return { timesheetsAndEmployees };
}

export default function TimesheetsPage() {
  const { timesheetsAndEmployees } = useLoaderData();
  const [isTableView, setIsTableView] = useState(true);

  const handleViewChange = () => {
    setIsTableView(!isTableView);
  };

  return (
    <div>
      <div>
        <button onClick={handleViewChange}>Table View</button>
        <button onClick={handleViewChange}>Calendar View</button>
      </div>

      {isTableView ? (
        <div>
          {timesheetsAndEmployees.map((timesheet: ITimesheet) => (
            <TimesheetDetails timesheet={timesheet} />
          ))}
        </div>
      ) : (
        <div>
          <p>
            To implement, see{" "}
            <a href="https://schedule-x.dev/docs/frameworks/react">
              Schedule X React documentation
            </a>
            .
          </p>
        </div>
      )}

      <hr />
      <ul>
        <li>
          <a href="/timesheets/new">New Timesheet</a>
        </li>
        <li>
          <a href="/employees">Employees</a>
        </li>
        <li>
          <a href="/">Home</a>
        </li>
      </ul>
    </div>
  );
}
