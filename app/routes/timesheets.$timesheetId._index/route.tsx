import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import ITimesheet from "~/models/interfaces/timesheet";
import Layout from "~/layout/layout";
import "./index.css";
import { getAllTimesheets } from "~/db/queries/timesheetQueries";

export async function loader() {
  const timesheets: ITimesheet[] = await getAllTimesheets();
  return { timesheets };
}
function TimesheetPage() {
  const { timesheets } = useLoaderData() as { timesheets: ITimesheet[] };
  const { timesheetId } = useParams<{ timesheetId: string }>();
  const navigate = useNavigate();

  const id = Number(timesheetId);
  if (isNaN(id)) {
    return <div className="error-message">Invalid Timesheet ID</div>;
  }

  const timesheet = timesheets.find((ts) => ts.id === id);
  if (!timesheet) {
    return <div className="error-message">Timesheet not found</div>;
  }

  const formatDate = (date: string) => new Date(date).toLocaleString();

  return (
    <Layout>
      <div className="timesheet-container">
        <h1 className="timesheet-title">Timesheet #{timesheet.id}</h1>
        <p className="description">Click on the button to edit the timesheet</p>
        <div className="timesheet-details">
          <ul>
            <li>
              <strong>Full Name:</strong> {timesheet.full_name}
            </li>
            <li>
              <strong>Start Time:</strong> {formatDate(timesheet.start_time)}
            </li>
            <li>
              <strong>End Time:</strong> {formatDate(timesheet.end_time)}
            </li>
            <li>
              <strong>Employee ID:</strong> {timesheet.employee_id}
            </li>
          </ul>
          <button
            className="edit-button"
            onClick={() => navigate(`/timesheets/${timesheet.id}/edit`)}
          >
            Edit
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default TimesheetPage;
