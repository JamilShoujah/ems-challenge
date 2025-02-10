import { useLoaderData } from "react-router";
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
      <p>Hello world</p>
      <div>
        {employees.map((employee: IEmployee) => (
          <div>
            <ul>
              <li>Employee #{employee.id}</li>
              <ul>
                <li>
                  Full Name: {employee.firstName + " " + employee.lastName}
                </li>
                <li>Email: {employee.email}</li>
              </ul>
            </ul>
          </div>
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
