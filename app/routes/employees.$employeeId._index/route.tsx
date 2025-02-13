import { useLoaderData, useNavigate, LoaderFunction } from "react-router-dom";
import IEmployee from "~/models/interfaces/employee";
import { getEmployeeById } from "~/db/queries/employeeQueries";
import Layout from "~/layout/layout";
import "./index.css";

export const loader: LoaderFunction = async ({ params }) => {
  const { employeeId } = params;
  try {
    const employee = await getEmployeeById(Number(employeeId));
    if (!employee) {
      return { error: "Employee not found" };
    }
    return { employee };
  } catch (error) {
    console.error(error);
    return { error: "Failed to load employee" };
  }
};

const EmployeePage = () => {
  const { employee, error } = useLoaderData() as {
    employee?: IEmployee | null;
    error?: string;
  };
  const navigate = useNavigate();

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!employee) {
    return <div className="error-message">Employee not found</div>;
  }

  return (
    <Layout>
      <div className="employee-details">
        <h1 className="employee-title">Employee #{employee.id}</h1>
        <div className="employee-info">
          <ul>
            <li>
              <strong>Full Name:</strong> {employee.firstName}{" "}
              {employee.lastName}
            </li>
            <li>
              <strong>Email:</strong> {employee.email}
            </li>
            <li>
              <strong>Position:</strong> {employee.position}
            </li>
            <li>
              <strong>Salary:</strong> ${employee.salary.toLocaleString()}
            </li>
            <li>
              <strong>Hire Date:</strong>{" "}
              {new Date(employee.hireDate).toDateString()}
            </li>
            <li>
              <strong>Department:</strong> {employee.department}
            </li>
            <li>
              <strong>Status:</strong>{" "}
              {employee.isActive ? "Active" : "Inactive"}
            </li>
          </ul>
        </div>

        <div className="employee-actions">
          <button
            className="btn btn-edit"
            onClick={() => navigate(`/employees/${employee.id}/edit`)}
          >
            Edit
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeePage;
