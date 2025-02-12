import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import ITimesheet from "~/models/interfaces/timesheet";
import { getDB } from "~/db/getDB";
import Layout from "~/layout/layout";

export async function loader() {
  const db = await getDB();
  const timesheets: ITimesheet[] = await db.all("SELECT * FROM timesheets;");
  return { timesheets };
}

function TimesheetPage() {
  const { timesheets } = useLoaderData() as { timesheets: ITimesheet[] };
  const { timesheetId } = useParams<{ timesheetId: string }>();
  const navigate = useNavigate();

  const id = Number(timesheetId);
  if (isNaN(id)) {
    return <div style={{ color: "red" }}>Invalid Timesheet ID</div>;
  }

  const timesheet = timesheets.find((ts) => ts.id === id);
  if (!timesheet) {
    return <div style={{ color: "red" }}>Timesheet not found</div>;
  }

  return (
    <Layout>
      <div>
        <h1>Timesheet #{timesheet.id}</h1>
        <ul>
          <li>
            <strong>Full Name:</strong> {timesheet.full_name}
          </li>
          <li>
            <strong>Start Time:</strong>{" "}
            {new Date(timesheet.start_time).toLocaleString()}
          </li>
          <li>
            <strong>End Time:</strong>{" "}
            {new Date(timesheet.end_time).toLocaleString()}
          </li>
          <li>
            <strong>Employee ID:</strong> {timesheet.employee_id}
          </li>
        </ul>

        <button onClick={() => navigate(`/timesheets/${timesheet.id}/edit`)}>
          Edit
        </button>

        <nav>
          <ul>
            <li>
              <button onClick={() => navigate("/timesheets")}>
                Timesheets
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/timesheets/new")}>
                New Timesheet
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/employees")}>Employees</button>
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  );
}

export default TimesheetPage;
