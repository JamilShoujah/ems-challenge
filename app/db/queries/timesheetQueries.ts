import { getDB } from "~/db/getDB";

export async function getAllTimesheetsWithEmployees(): Promise<any[]> {
  try {
    const db = await getDB();
    const timesheetsAndEmployees = await db.all(
      "SELECT timesheets.*, employees.firstName, employees.lastName, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id"
    );
    return timesheetsAndEmployees;
  } catch (error: unknown) {
    console.error("Failed to fetch timesheets and employees:", error);
    throw new Error(
      `Unable to load timesheets and employees: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
