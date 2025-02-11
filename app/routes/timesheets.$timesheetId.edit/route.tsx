import {
  Form,
  redirect,
  type ActionFunction,
  useLoaderData,
  useNavigate
} from "react-router-dom";
import { getDB } from "~/db/getDB";
import { useState } from "react";
import ITimesheet from "~/models/interfaces/timesheet";

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

  const db = await getDB();
  await db.run(
    `UPDATE timesheets 
     SET start_time = ?, end_time = ? 
     WHERE id = ?`,
    [start_time, end_time, params.timesheetId]
  );

  return redirect(`/timesheets/${params.timesheetId}`);
};

export default function EditTimesheetPage() {
  const { timesheet } = useLoaderData() as { timesheet: ITimesheet };
  const [isStartTimeValid, setIsStartTimeValid] = useState(true);
  const [isEndTimeValid, setIsEndTimeValid] = useState(true);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Edit Timesheet #{timesheet.id}</h1>
      <Form method="post">
        <div>
          <label htmlFor="start_time">Start Time</label>
          <input
            type="datetime-local"
            name="start_time"
            id="start_time"
            defaultValue={new Date(timesheet.start_time)
              .toISOString()
              .slice(0, 16)}
            required
            onChange={(e) => setIsStartTimeValid(e.target.value !== "")}
          />
        </div>
        <div>
          <label htmlFor="end_time">End Time</label>
          <input
            type="datetime-local"
            name="end_time"
            id="end_time"
            defaultValue={new Date(timesheet.end_time)
              .toISOString()
              .slice(0, 16)}
            required
            onChange={(e) => setIsEndTimeValid(e.target.value !== "")}
          />
        </div>
        <button type="submit" disabled={!isStartTimeValid || !isEndTimeValid}>
          Save Changes
        </button>
      </Form>
      <hr />
      <ul>
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
  );
}
