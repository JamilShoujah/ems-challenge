import {
  Form,
  redirect,
  type ActionFunction,
  useActionData
} from "react-router-dom";
import { addEmployee } from "~/db/queries/employeeQueries";
import { isValidEmail } from "~/functions/emailValidation";
import { useState, useEffect } from "react";
import Layout from "~/layout/layout";
import "../employees.$employeeId.edit/index.css";

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

  try {
    await addEmployee(
      firstName as string,
      lastName as string,
      email as string,
      position as string,
      salary,
      hireDate as string,
      department as string,
      isActive
    );
    return redirect("/employees");
  } catch (error: unknown) {
    // Type the error as Error
    if (error instanceof Error) {
      if (
        error.message ===
        "The email is already taken. Please choose another one."
      ) {
        return new Response(JSON.stringify({ emailError: error.message }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      return new Response(
        JSON.stringify({
          emailError: "An unexpected error occurred. Please try again."
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({
        emailError: "An unexpected error occurred. Please try again."
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export default function NewEmployeePage() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailError, setEmailError] = useState<string | null>(null);
  const actionData = useActionData<{ emailError: string }>();

  // Set the email error from action data on component mount or action completion
  useEffect(() => {
    if (actionData?.emailError) {
      setEmailError(actionData.emailError);
    }
  }, [actionData]);

  const validateEmail = (value: string) => {
    setEmail(value);
    const isValid = isValidEmail(value);
    setIsEmailValid(isValid);
    setEmailError(isValid ? null : "Invalid email format");
  };

  return (
    <Layout>
      <div className="edit-employee-container">
        <h1 className="title">Add New Employee</h1>
        <Form method="post" className="form-container">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" required />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" required />
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
            <input type="text" name="position" id="position" required />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input type="number" name="salary" id="salary" required />
          </div>
          <div className="form-group">
            <label htmlFor="hireDate">Hire Date</label>
            <input type="date" name="hireDate" id="hireDate" required />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input type="text" name="department" id="department" required />
          </div>
          <div className="form-group checkbox-group">
            <label htmlFor="isActive">Active</label>
            <input type="checkbox" name="isActive" id="isActive" />
          </div>
          <button type="submit" className="submit-btn" disabled={!isEmailValid}>
            Add Employee
          </button>
        </Form>
      </div>
    </Layout>
  );
}
