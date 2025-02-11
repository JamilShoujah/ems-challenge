import React from "react";
import { useNavigate } from "react-router-dom";
import IEmployee from "~/models/interfaces/employee";

interface EmployeeDetailsProps {
  employee: IEmployee;
}

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
        background: "#f5f5f5"
      }}
    >
      <ul>
        <li>Employee #{employee.id}</li>
        <ul>
          <li>
            Full Name: {employee.firstName} {employee.lastName}
          </li>
          <li>Email: {employee.email}</li>
        </ul>
      </ul>
    </div>
  );
};

export default EmployeeDetails;
