import { getDB } from "~/db/getDB";
import { formatDateTime } from "~/functions/dateFormating";
import ITimesheet from "~/models/interfaces/timesheet";

export async function getAllTimesheetsWithEmployees(): Promise<any[]> {
  try {
    const db = await getDB();
    const timesheetsAndEmployees = await db.all(
      `SELECT timesheets.*, 
              employees.firstName, 
              employees.lastName, 
              employees.id AS employee_id 
       FROM timesheets 
       JOIN employees ON timesheets.employee_id = employees.id`
    );

    return timesheetsAndEmployees.map((ts) => ({
      ...ts,
      start_time: formatDateTime(ts.start_time),
      end_time: formatDateTime(ts.end_time)
    }));
  } catch (error: unknown) {
    console.error("Failed to fetch timesheets and employees:", error);
    throw new Error(
      `Unable to load timesheets and employees: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function getAllTimesheets(): Promise<ITimesheet[]> {
  try {
    const db = await getDB();
    return await db.all<ITimesheet[]>("SELECT * FROM timesheets;");
  } catch (error: unknown) {
    console.error("Failed to fetch timesheets:", error);
    throw new Error(
      `Unable to load timesheets: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function addTimesheet(
  employee_id: number,
  start_time: string,
  end_time: string
): Promise<void> {
  try {
    const db = await getDB();
    const employee = await db.get<{ firstName: string; lastName: string }>(
      "SELECT firstName, lastName FROM employees WHERE id = ?",
      [employee_id]
    );

    if (!employee) {
      throw new Error(`Employee with ID ${employee_id} not found.`);
    }

    const full_name = `${employee.firstName} ${employee.lastName}`;

    await db.run(
      `INSERT INTO timesheets (employee_id, start_time, end_time, full_name) 
       VALUES (?, ?, ?, ?)`,
      [employee_id, start_time, end_time, full_name]
    );
  } catch (error: unknown) {
    console.error("Failed to add timesheet:", error);
    throw new Error(
      `Unable to add new timesheet: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
