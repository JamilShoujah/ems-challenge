import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { fileURLToPath } from "url";
import IEmployee from "~/models/interfaces/employee";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfigPath = path.join(__dirname, "../database.yaml");
const dbConfig = yaml.load(fs.readFileSync(dbConfigPath, "utf8")) as {
  sqlite_path: string;
};

const { sqlite_path: sqlitePath } = dbConfig;

const db = new sqlite3.Database(sqlitePath);

// interface IEmployee {
//   id?: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   position: string;
//   salary: number;
//   hireDate: string;
//   department: string;
//   isActive: boolean;
// }

// move this when done
interface ITimesheet {
  id?: number;
  start_time: string;
  end_time: string;
  employee_id: number;
}

const employees: IEmployee[] = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    position: "Software Engineer",
    salary: 60000,
    hireDate: "2020-01-15",
    department: "Engineering",
    isActive: true
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    position: "Project Manager",
    salary: 75000,
    hireDate: "2018-05-22",
    department: "Management",
    isActive: true
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    position: "HR Specialist",
    salary: 50000,
    hireDate: "2019-08-30",
    department: "Human Resources",
    isActive: true
  }
];

const timesheets: ITimesheet[] = [
  {
    employee_id: 1,
    start_time: "2025-02-10 08:00:00",
    end_time: "2025-02-10 17:00:00"
  },
  {
    employee_id: 2,
    start_time: "2025-02-11 12:00:00",
    end_time: "2025-02-11 17:00:00"
  },
  {
    employee_id: 3,
    start_time: "2025-02-12 07:00:00",
    end_time: "2025-02-12 16:00:00"
  }
];

// Helper function to insert data into a table
const insertData = (table: string, data: any[]) => {
  const columns = Object.keys(data[0]).join(", ");
  const placeholders = Object.keys(data[0])
    .map(() => "?")
    .join(", ");

  const insertStmt = db.prepare(
    `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`
  );

  data.forEach((row) => {
    insertStmt.run(Object.values(row));
  });

  insertStmt.finalize();
};

// Run the insertion inside a transaction
db.serialize(() => {
  insertData("employees", employees);
  insertData("timesheets", timesheets);
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Database seeded successfully.");
  }
});
