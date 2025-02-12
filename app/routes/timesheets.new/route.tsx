import { useLoaderData, Form, redirect } from "react-router";
import { getDB } from "~/db/getDB";

export async function loader() {
  const db = await getDB();
  const employees = await db.all(
    "SELECT id, firstName, lastName FROM employees"
  );

  employees.forEach((employee) => {
    employee.full_name = `${employee.firstName} ${employee.lastName}`;
  });

  return { employees };
}

import type { ActionFunction } from "react-router";
import Layout from "~/layout/layout";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const employee_id = formData.get("employee_id");
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");

  const db = await getDB();

  // Fetch the employee's full name
  const employee = await db.get(
    "SELECT firstName, lastName FROM employees WHERE id = ?",
    [employee_id]
  );

  const full_name = `${employee.firstName} ${employee.lastName}`;

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toISOString().replace("T", " ").slice(0, 16);
  };

  const formattedStartTime = formatDateTime(start_time as string);
  const formattedEndTime = formatDateTime(end_time as string);

  await db.run(
    "INSERT INTO timesheets (employee_id, start_time, end_time, full_name) VALUES (?, ?, ?, ?)",
    [employee_id, formattedStartTime, formattedEndTime, full_name]
  );

  return redirect("/timesheets");
};

export default function NewTimesheetPage() {
  const { employees } = useLoaderData();
  return (
    <Layout>
      <div>
        <h1>Create New Timesheet</h1>
        <Form method="post">
          <div>
            <label htmlFor="employee_id">Employee</label>
            <select name="employee_id" id="employee_id" required>
              <option value="">Select an employee</option>
              {employees.map((employee: any) => (
                <option key={employee.id} value={employee.id}>
                  {employee.full_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="start_time">Start Time</label>
            <input
              type="datetime-local"
              name="start_time"
              id="start_time"
              required
            />
          </div>
          <div>
            <label htmlFor="end_time">End Time</label>
            <input
              type="datetime-local"
              name="end_time"
              id="end_time"
              required
            />
          </div>
          <button type="submit">Create Timesheet</button>
        </Form>
        <hr />
        <ul>
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
