import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Using useNavigate instead of useHistory
import IEmployee from "~/models/interfaces/employee";

// Mock function to fetch employee details (same as before)
async function getEmployeeById(employeeId: number): Promise<IEmployee | null> {
  return {
    id: employeeId,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    position: "Software Engineer",
    salary: 75000,
    hireDate: "2022-05-15",
    department: "Engineering",
    isActive: true
  };
}

function EmployeePage() {
  const [employee, setEmployee] = useState<IEmployee | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { employeeId } = useParams<{ employeeId: string }>(); // Assumes employeeId is in the URL
  const navigate = useNavigate(); // Replaced useHistory with useNavigate

  useEffect(() => {
    const fetchEmployee = async () => {
      const id = Number(employeeId);
      if (isNaN(id)) {
        setError("Invalid Employee ID");
        return;
      }
      const employeeData = await getEmployeeById(id);
      if (!employeeData) {
        setError("Employee not found");
      } else {
        setEmployee(employeeData);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!employee) {
    return <div>Loading...</div>;
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
            <a href="/employees">Employees</a>
          </li>
          <li>
            <a href="/employees/new">New Employee</a>
          </li>
          <li>
            <a href="/timesheets/">Timesheets</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default EmployeePage;
