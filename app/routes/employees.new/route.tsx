import { Form, redirect, type ActionFunction } from "react-router";
import EmailInput from "~/components/emailInput";
import { getDB } from "~/db/getDB";
import { useState } from "react";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const position = formData.get("position");
  const salary = parseInt(formData.get("salary") as string, 10);
  const hireDate = formData.get("hireDate");
  const department = formData.get("department");
  const isActive = formData.get("isActive") === "on";

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
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleEmailValidation = (isValid: boolean) => {
    setIsEmailValid(isValid);
    setEmailError(isValid ? null : "Invalid email format");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmailValid) {
      return;
    }
    e.currentTarget.submit();
  };

  return (
    <div>
      <h1>Create New Employee</h1>
      <Form method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" id="firstName" required />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName" required />
        </div>
        <EmailInput onValidation={handleEmailValidation} />
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
        <button type="submit" disabled={!isEmailValid}>
          Create Employee
        </button>
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
