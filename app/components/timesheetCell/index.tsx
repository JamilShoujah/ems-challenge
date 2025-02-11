import { useNavigate } from "react-router-dom";
import ITimesheet from "~/models/interfaces/timesheet";

const TimesheetDetails: React.FC<{ timesheet: ITimesheet }> = ({
  timesheet
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/timesheets/${timesheet.id}`);
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
          <strong>Timesheet ID:</strong> {timesheet.id}
        </li>
        <li>
          <strong>Employee:</strong> {timesheet.full_name} (ID:{" "}
          {timesheet.employee_id})
        </li>
        <li>
          <strong>Start Time:</strong> {timesheet.start_time}
        </li>
        <li>
          <strong>End Time:</strong> {timesheet.end_time}
        </li>
      </ul>
    </div>
  );
};

export default TimesheetDetails;
