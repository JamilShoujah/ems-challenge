import {
  Form,
  redirect,
  type ActionFunction,
  useLoaderData
} from "react-router-dom";
import {
  getEmployeeById,
  updateEmployeeById
} from "~/db/queries/employeeQueries";
import { useState } from "react";
import IEmployee from "~/models/interfaces/employee";
import Layout from "~/layout/layout";
import { isValidEmail } from "~/functions/emailValidation";
import "./index.css";

export async function loader({ params }: { params: { employeeId: string } }) {
  const employee = await getEmployeeById(Number(params.employeeId));
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

  // Call the new function from employeeQueries.ts
  await updateEmployeeById(
    Number(params.employeeId),
    firstName as string,
    lastName as string,
    email as string,
    position as string,
    salary,
    hireDate as string,
    department as string,
    isActive
  );

  return redirect(`/employees/${params.employeeId}`);
};

export default function EditEmployeePage() {
  const { employee } = useLoaderData() as { employee: IEmployee };
  const [email, setEmail] = useState(employee.email);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailError, setEmailError] = useState<string | null>(null);

  const validateEmail = (value: string) => {
    setEmail(value);
    const isValid = isValidEmail(value); // Use the imported function here
    setIsEmailValid(isValid);
    setEmailError(isValid ? null : "Invalid email format");
  };

  return (
    <Layout>
      <div className="edit-employee-container">
        <h1 className="title">Edit Employee #{employee.id}</h1>
        <Form method="post" className="form-container">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              defaultValue={employee.firstName}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              defaultValue={employee.lastName}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => validateEmail(e.target.value)}
              required
            />
            {emailError && <p className="error-text">{emailError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              name="position"
              id="position"
              defaultValue={employee.position}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              name="salary"
              id="salary"
              defaultValue={employee.salary}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hireDate">Hire Date</label>
            <input
              type="date"
              name="hireDate"
              id="hireDate"
              defaultValue={employee.hireDate}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              name="department"
              id="department"
              defaultValue={employee.department}
              required
            />
          </div>
          <div className="form-group checkbox-group">
            <label htmlFor="isActive">Active</label>
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              defaultChecked={employee.isActive}
            />
          </div>
          <button type="submit" className="submit-btn" disabled={!isEmailValid}>
            Save Changes
          </button>
        </Form>
      </div>
    </Layout>
  );
}
