import {
  Form,
  redirect,
  type ActionFunction,
  useLoaderData,
  useNavigate
} from "react-router-dom";
import { getDB } from "~/db/getDB";
import { useState } from "react";
import EmailInput from "~/components/emailInput";
import IEmployee from "~/models/interfaces/employee";

export async function loader({ params }: { params: { employeeId: string } }) {
  const db = await getDB();
  const employee = await db.get(
    "SELECT * FROM employees WHERE id = ?",
    params.employeeId
  );
  if (!employee) {
    throw new Response("Employee not found", { status: 404 });
  }
  return { employee };
}

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
  await db.run(
    `UPDATE employees 
     SET firstName = ?, lastName = ?, email = ?, position = ?, salary = ?, hireDate = ?, department = ?, isActive = ?
     WHERE id = ?`,
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

  return redirect(`/employees/${params.employeeId}`);
};

export default function EditEmployeePage() {
  const { employee } = useLoaderData() as { employee: IEmployee };
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailError, setEmailError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailValidation = (isValid: boolean) => {
    setIsEmailValid(isValid);
    setEmailError(isValid ? null : "Invalid email format");
  };

  return (
    <div>
      <h1>Edit Employee #{employee.id}</h1>
      <Form method="post">
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            defaultValue={employee.firstName}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            defaultValue={employee.lastName}
            required
          />
        </div>
        <EmailInput
          onValidation={handleEmailValidation}
          initialEmail={employee.email}
        />
        <div>
          <label htmlFor="position">Position</label>
          <input
            type="text"
            name="position"
            id="position"
            defaultValue={employee.position}
            required
          />
        </div>
        <div>
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            name="salary"
            id="salary"
            defaultValue={employee.salary}
            required
          />
        </div>
        <div>
          <label htmlFor="hireDate">Hire Date</label>
          <input
            type="date"
            name="hireDate"
            id="hireDate"
            defaultValue={employee.hireDate}
            required
          />
        </div>
        <div>
          <label htmlFor="department">Department</label>
          <input
            type="text"
            name="department"
            id="department"
            defaultValue={employee.department}
            required
          />
        </div>
        <div>
          <label htmlFor="isActive">Active</label>
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            defaultChecked={employee.isActive}
          />
        </div>
        <button type="submit" disabled={!isEmailValid}>
          Save Changes
        </button>
      </Form>
      <hr />
      <ul>
        <li>
          <a href={`/employees/${employee.id}`}>Back to Employee</a>
        </li>
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
