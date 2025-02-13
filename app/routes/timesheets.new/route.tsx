import { Form, redirect, useLoaderData } from "react-router-dom";
import Layout from "~/layout/layout";
import { getAllEmployees } from "~/db/queries/employeeQueries";
import { addTimesheet } from "~/db/queries/timesheetQueries";
import IEmployee from "~/models/interfaces/employee";
import "../timesheets.$timesheetId.edit/index.css";

type LoaderData = {
  employees: (IEmployee & { full_name: string })[];
};

export async function loader(): Promise<LoaderData> {
  const employees = await getAllEmployees();
  return {
    employees: employees.map((emp) => ({
      ...emp,
      full_name: `${emp.firstName} ${emp.lastName}`
    }))
  };
}

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const employee_id = Number(formData.get("employee_id"));
  const start_time = formData.get("start_time") as string;
  const end_time = formData.get("end_time") as string;

  await addTimesheet(employee_id, start_time, end_time);
  return redirect("/timesheets");
};

export default function NewTimesheetPage() {
  const { employees } = useLoaderData() as LoaderData;

  return (
    <Layout>
      <div className="edit-timesheet-container">
        <h1 className="title">Create New Timesheet</h1>
        <form method="post" className="form-container">
          <div className="form-group">
            <label htmlFor="employee_id">Employee</label>
            <select
              name="employee_id"
              id="employee_id"
              required
              className="dropdown"
            >
              <option value="">Select an employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.full_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="start_time">Start Time</label>
            <input
              type="datetime-local"
              name="start_time"
              id="start_time"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_time">End Time</label>
            <input
              type="datetime-local"
              name="end_time"
              id="end_time"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Create Timesheet
          </button>
        </form>
      </div>
    </Layout>
  );
}
