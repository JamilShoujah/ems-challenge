import { getDB } from "~/db/getDB";
import IEmployee from "~/models/interfaces/employee";

export async function getAllEmployees() {
  try {
    const db = await getDB();
    const employees = await db.all("SELECT * FROM employees;");
    return employees as IEmployee[];
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    throw new Error("Unable to load employees.");
  }
}
