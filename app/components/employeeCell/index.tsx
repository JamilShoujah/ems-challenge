import { useNavigate } from "react-router-dom";
import EmployeeDetailsProps from "~/models/interfaces/employeeDetails";
import "./index.css";

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ employee }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/employees/${employee.id}`);
  };

  return (
    <div className="employee-details" onClick={handleNavigate}>
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
          <strong>Department:</strong> {employee.department}
        </li>
        <li>
          <strong>Status:</strong>{" "}
          <span
            className={employee.isActive ? "status-active" : "status-inactive"}
          >
            {employee.isActive ? "Active" : "Inactive"}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeDetails;
