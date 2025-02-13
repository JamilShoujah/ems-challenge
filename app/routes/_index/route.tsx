import Layout from "~/layout/layout";
import "./index.css";

export default function RootPage() {
  return (
    <Layout>
      <div className="root-container">
        <h1 className="root-title">
          Welcome to the Employee Management System
        </h1>
        <p className="root-description">
          Manage employees, track timesheets, and stay organized effortlessly.
        </p>
      </div>
    </Layout>
  );
}
