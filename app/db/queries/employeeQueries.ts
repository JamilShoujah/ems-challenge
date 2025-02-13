import { getDB } from "~/db/getDB";
import IEmployee from "~/models/interfaces/employee";

export async function getAllEmployees(): Promise<IEmployee[]> {
  try {
    const db = await getDB();
    const employees = await db.all("SELECT * FROM employees;");
    return employees as IEmployee[];
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    throw new Error(
      `Unable to load employees: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
}

export async function getEmployeeById(id: number): Promise<IEmployee | null> {
  try {
    const db = await getDB();
    const result = await db.get("SELECT * FROM employees WHERE id = ?", [id]);
    return result ? (result as IEmployee) : null;
  } catch (error) {
    console.error("Failed to fetch employee:", error);
    throw new Error(
      `Unable to load employee details for ID ${id}: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
}
