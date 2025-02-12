import { Link, useLocation } from "react-router-dom";
import "./index.css";

const NavigationMenu = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Employee Management System
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/employees"
              className={
                location.pathname.startsWith("/employees") &&
                !location.pathname.startsWith("/employees/new")
                  ? "active"
                  : ""
              }
            >
              Employees
            </Link>
          </li>

          <li>
            <Link
              to="/employees/new"
              className={location.pathname === "/employees/new" ? "active" : ""}
            >
              New Employee
            </Link>
          </li>

          <li>
            <Link
              to="/timesheets"
              className={
                location.pathname.startsWith("/timesheets") &&
                !location.pathname.startsWith("/timesheets/new")
                  ? "active"
                  : ""
              }
            >
              Timesheets
            </Link>
          </li>

          <li>
            <Link
              to="/timesheets/new"
              className={
                location.pathname === "/timesheets/new" ? "active" : ""
              }
            >
              New Timesheet
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationMenu;
