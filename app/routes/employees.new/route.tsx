import {
  Form,
  redirect,
  type ActionFunction,
  useLoaderData,
  useParams
} from "react-router";
import EmailInput from "~/components/emailInput";
import { getDB } from "~/db/getDB";
import { useState } from "react";
import IEmployee from "~/models/interfaces/employee";
import Layout from "~/layout/layout";

export const loader = async ({
  params
}: {
  params: { employeeId: string };
}) => {
  const db = await getDB();
  const employee: IEmployee | undefined = await db.get(
    "SELECT * FROM employees WHERE id = ?",
    [params.employeeId]
  );
  return { employee };
};

export const action: ActionFunction = async ({ request, params }) => {
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

  if (params.employeeId) {
    await db.run(
      `UPDATE employees SET firstName = ?, lastName = ?, email = ?, position = ?, salary = ?, hireDate = ?, department = ?, isActive = ? WHERE id = ?`,
      [
        firstName,
        lastName,
        email,
        position,
        salary,
        hireDate,
        department,
        isActive,
        params.employeeId
      ]
    );
  } else {
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
  }

  return redirect("/employees");
};

export default function EmployeeFormPage() {
  const { employee } = useLoaderData() as { employee: IEmployee | undefined };
  const { employeeId } = useParams<{ employeeId: string }>();
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
    <Layout>
      <div>
        <h1>
          {employeeId
            ? `Edit Employee #${employee?.id}`
            : "Create New Employee"}
        </h1>
        <Form method="post" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              required
              defaultValue={employee?.firstName || ""}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              required
              defaultValue={employee?.lastName || ""}
            />
          </div>
          <EmailInput
            onValidation={handleEmailValidation}
            initialEmail={employee?.email}
          />
          <div>
            <label htmlFor="position">Position</label>
            <input
              type="text"
              name="position"
              id="position"
              required
              defaultValue={employee?.position || ""}
            />
          </div>
          <div>
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              name="salary"
              id="salary"
              required
              defaultValue={employee?.salary || 0}
            />
          </div>
          <div>
            <label htmlFor="hireDate">Hire Date</label>
            <input
              type="date"
              name="hireDate"
              id="hireDate"
              required
              defaultValue={employee?.hireDate || ""}
            />
          </div>
          <div>
            <label htmlFor="department">Department</label>
            <input
              type="text"
              name="department"
              id="department"
              required
              defaultValue={employee?.department || ""}
            />
          </div>
          <div>
            <label htmlFor="isActive">Active</label>
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              defaultChecked={employee?.isActive}
            />
          </div>
          <button type="submit" disabled={!isEmailValid}>
            {employeeId ? "Update Employee" : "Create Employee"}
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
    </Layout>
  );
}
