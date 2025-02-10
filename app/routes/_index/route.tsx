import { redirect } from "react-router";


export default function RootPage() {
  return (
    <div>
      <h1>Welcome to the Employee Management System</h1>
      <p>This is the home page.</p>
      <a href="/employees">Go to Employees</a>
    </div>
  );
}
