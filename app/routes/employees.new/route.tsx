import { Form, redirect, type ActionFunction } from "react-router";
import { getDB } from "~/db/getDB";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const position = formData.get("position");
  const salary = parseInt(formData.get("salary") as string, 10);
  const hireDate = formData.get("hireDate");
  const department = formData.get("department");
  const isActive = formData.get("isActive") === "on"; // assuming a checkbox for active status

  const db = await getDB();
  await db.run(
    `INSERT INTO employees (firstName, lastName, email, position, salary, hireDate, department, isActive) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      firstName,
      lastName,
      email,
      position,
      salary,
      hireDate,
      department,
      isActive
    ]
  );

  return redirect("/employees");
};

export default function NewEmployeePage() {
  return (
    <div>
      <h1>Create New Employee</h1>
      <Form method="post">
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" id="firstName" required />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="position">Position</label>
          <input type="text" name="position" id="position" required />
        </div>
        <div>
          <label htmlFor="salary">Salary</label>
          <input type="number" name="salary" id="salary" required />
        </div>
        <div>
          <label htmlFor="hireDate">Hire Date</label>
          <input type="date" name="hireDate" id="hireDate" required />
        </div>
        <div>
          <label htmlFor="department">Department</label>
          <input type="text" name="department" id="department" required />
        </div>
        <div>
          <label htmlFor="isActive">Active</label>
          <input type="checkbox" name="isActive" id="isActive" />
        </div>
        <button type="submit">Create Employee</button>
      </Form>
      <hr />
      <ul>
        <li>
          <a href="/employees">Employees</a>
        </li>
        <li>
          <a href="/timesheets">Timesheets</a>
        </li>
      </ul>
    </div>
  );
}
