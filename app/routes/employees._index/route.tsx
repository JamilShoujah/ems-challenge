import { useLoaderData } from "react-router";
import EmployeeCell from "~/components/employeeCell";
import { getAllEmployees } from "~/db/queries/employeeQueries";
import IEmployee from "~/models/interfaces/employee";
import Layout from "~/layout/layout";
import "./index.css";

export async function loader() {
  try {
    const employees = await getAllEmployees();
    return { employees };
  } catch (error) {
    return { employees: [], error: "Failed to load employees." };
  }
}

const EmployeesPage = () => {
  const { employees, error } = useLoaderData() as {
    employees: IEmployee[];
    error?: string;
  };

  return (
    <Layout>
      <div className="employees-container">
        <h1 className="employees-title">Employee List</h1>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="employee-grid">
            {employees.map((employee) => (
              <EmployeeCell key={employee.id} employee={employee} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EmployeesPage;
