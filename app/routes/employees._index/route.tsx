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
    throw new Response("Failed to load employees.", { status: 500 });
  }
}

const EmployeesPage = () => {
  const { employees } = useLoaderData() as { employees: IEmployee[] };
  return (
    <Layout>
      <div className="employee-grid">
        {employees.map((employee) => (
          <EmployeeCell key={employee.id} employee={employee} />
        ))}
      </div>
      <hr />
    </Layout>
  );
};

export default EmployeesPage;
