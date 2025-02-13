import { getDB } from "~/db/getDB";
import IEmployee from "~/models/interfaces/employee";

export async function getAllEmployees(): Promise<IEmployee[]> {
  try {
    const db = await getDB();
    const employees = await db.all<IEmployee[]>("SELECT * FROM employees;");
    return employees;
  } catch (error: unknown) {
    console.error("Failed to fetch employees:", error);
    throw new Error(
      `Unable to load employees: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function getEmployeeById(id: number): Promise<IEmployee | null> {
  try {
    const db = await getDB();
    const result = await db.get<IEmployee>(
      "SELECT * FROM employees WHERE id = ?",
      [id]
    );
    return result || null;
  } catch (error: unknown) {
    console.error("Failed to fetch employee:", error);
    throw new Error(
      `Unable to load employee details for ID ${id}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function updateEmployeeById(
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  position: string,
  salary: number,
  hireDate: string,
  department: string,
  isActive: boolean
): Promise<void> {
  try {
    const db = await getDB();
    await db.run(
      `UPDATE employees 
       SET firstName = ?, lastName = ?, email = ?, position = ?, salary = ?, hireDate = ?, department = ?, isActive = ?
       WHERE id = ?`,
      [
        firstName,
        lastName,
        email,
        position,
        salary,
        hireDate,
        department,
        isActive,
        id
      ]
    );
  } catch (error: unknown) {
    console.error("Failed to update employee:", error);
    throw new Error(
      `Unable to update employee with ID ${id}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function addEmployee(
  firstName: string,
  lastName: string,
  email: string,
  position: string,
  salary: number,
  hireDate: string,
  department: string,
  isActive: boolean
): Promise<void> {
  try {
    const db = await getDB();
    await db.run(
      `INSERT INTO employees (firstName, lastName, email, position, salary, hireDate, department, isActive) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName,
        lastName,
        email,
        position,
        salary,
        hireDate,
        department,
        isActive
      ]
    );
  } catch (error: unknown) {
    console.error("Failed to add employee:", error);

    if (
      error instanceof Error &&
      error.message.includes("UNIQUE constraint failed: employees.email")
    ) {
      throw new Error("The email is already taken. Please choose another one.");
    }

    throw new Error(
      `Unable to add new employee: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
