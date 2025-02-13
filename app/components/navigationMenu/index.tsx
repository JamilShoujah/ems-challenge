import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./index.css";

const NavigationMenu = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-full">Employee Management System</span>
          <span className="navbar-logo-short">EMS</span>
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
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
              onClick={() => setMenuOpen(false)}
            >
              Employees
            </Link>
          </li>

          <li>
            <Link
              to="/employees/new"
              className={location.pathname === "/employees/new" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
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
              onClick={() => setMenuOpen(false)}
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
              onClick={() => setMenuOpen(false)}
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
