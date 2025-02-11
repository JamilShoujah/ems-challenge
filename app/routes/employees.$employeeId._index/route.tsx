import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import IEmployee from "~/models/interfaces/employee";
import { getDB } from "~/db/getDB";

export async function loader() {
  const db = await getDB();
  const employees: IEmployee[] = await db.all("SELECT * FROM employees;");
  return { employees };
}

function EmployeePage() {
  const { employees } = useLoaderData() as { employees: IEmployee[] };
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();

  const id = Number(employeeId);
  if (isNaN(id)) {
    return <div style={{ color: "red" }}>Invalid Employee ID</div>;
  }

  const employee = employees.find((emp) => emp.id === id);
  if (!employee) {
    return <div style={{ color: "red" }}>Employee not found</div>;
  }

  return (
    <div>
      <h1>Employee #{employee.id}</h1>
      <ul>
        <li>
          <strong>Full Name:</strong> {employee.firstName} {employee.lastName}
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
          <strong>Status:</strong> {employee.isActive ? "Active" : "Inactive"}
        </li>
      </ul>

      <nav>
        <ul>
          <li>
            <button onClick={() => navigate("/employees")}>Employees</button>
          </li>
          <li>
            <button onClick={() => navigate("/employees/new")}>
              New Employee
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/timesheets")}>Timesheets</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default EmployeePage;
