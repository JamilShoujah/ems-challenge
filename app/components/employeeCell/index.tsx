import { useNavigate } from "react-router-dom";
import EmployeeDetailsProps from "~/models/interfaces/employeeDetails";

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ employee }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/employees/${employee.id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      style={{
        cursor: "pointer",
        padding: "10px",
        borderRadius: "5px",
        margin: "10px",
        background: "#f5f5f5"
      }}
    >
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
          <strong>Status:</strong> {employee.isActive ? "Active" : "Inactive"}
        </li>
      </ul>
    </div>
  );
};

export default EmployeeDetails;
