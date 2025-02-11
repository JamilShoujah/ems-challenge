import { useLoaderData } from "react-router";
import EmployeeCell from "~/components/employeeCell";
import { getDB } from "~/db/getDB";
import IEmployee from "~/models/interfaces/employee";

export async function loader() {
  const db = await getDB();
  const employees = await db.all("SELECT * FROM employees;");

  return { employees };
}

export default function EmployeesPage() {
  const { employees } = useLoaderData();
  return (
    <div>
      <div>
        {employees.map((employee: IEmployee) => (
          <EmployeeCell employee={employee} />
        ))}
      </div>
      <hr />
      <ul>
        <li>
          <a href="/employees/new">New Employee</a>
        </li>
        <li>
          <a href="/timesheets/">Timesheets</a>
        </li>
        <li>
          <a href="/">home</a>
        </li>
      </ul>
    </div>
  );
}
