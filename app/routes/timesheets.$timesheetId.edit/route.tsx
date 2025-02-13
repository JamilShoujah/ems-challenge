import {
  Form,
  redirect,
  type ActionFunction,
  useLoaderData
} from "react-router-dom";
import { getDB } from "~/db/getDB";
import { useState } from "react";
import ITimesheet from "~/models/interfaces/timesheet";
import Layout from "~/layout/layout";
import "./index.css";

export async function loader({ params }: { params: { timesheetId: string } }) {
  const db = await getDB();
  const timesheet = await db.get(
    "SELECT * FROM timesheets WHERE id = ?",
    params.timesheetId
  );

  if (!timesheet) {
    throw new Response("Timesheet not found", { status: 404 });
  }

  return { timesheet };
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");

  const formattedStartTime = start_time as string;
  const formattedEndTime = end_time as string;

  const db = await getDB();
  await db.run(
    `UPDATE timesheets 
     SET start_time = ?, end_time = ? 
     WHERE id = ?`,
    [formattedStartTime, formattedEndTime, params.timesheetId]
  );

  return redirect(`/timesheets/${params.timesheetId}`);
};

export default function EditTimesheetPage() {
  const { timesheet } = useLoaderData() as { timesheet: ITimesheet };
  const [isStartTimeValid, setIsStartTimeValid] = useState(true);
  const [isEndTimeValid, setIsEndTimeValid] = useState(true);

  return (
    <Layout>
      <div className="edit-timesheet-container">
        <h1 className="title">Edit Timesheet #{timesheet.id}</h1>
        <Form method="post" className="form-container">
          <div className="form-group">
            <label htmlFor="start_time">Start Time</label>
            <input
              type="datetime-local"
              name="start_time"
              id="start_time"
              defaultValue={timesheet.start_time}
              required
              onChange={(e) => setIsStartTimeValid(e.target.value !== "")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_time">End Time</label>
            <input
              type="datetime-local"
              name="end_time"
              id="end_time"
              defaultValue={timesheet.end_time}
              required
              onChange={(e) => setIsEndTimeValid(e.target.value !== "")}
            />
          </div>
          <button
            type="submit"
            className="submit-btn"
            disabled={!isStartTimeValid || !isEndTimeValid}
          >
            Save Changes
          </button>
        </Form>
        <hr />
        <ul className="back-links">
          <li>
            <a href={`/timesheets/${timesheet.id}`}>Back to Timesheet</a>
          </li>
          <li>
            <a href="/timesheets">Timesheets</a>
          </li>
          <li>
            <a href="/employees">Employees</a>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
