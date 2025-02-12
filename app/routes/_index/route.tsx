import Layout from "~/layout/layout";

export default function RootPage() {
  return (
    <Layout>
      <div>
        <h1>Welcome to the Employee Management System</h1>
        <p>This is the home page.</p>
        <ul>
          <li>
            <a href="/employees">Go to Employees</a>
          </li>
          <li>
            <a href="/timesheets">Go to Timesheets</a>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
