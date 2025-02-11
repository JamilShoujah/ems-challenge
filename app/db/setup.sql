DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS timesheets;

CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    position TEXT NOT NULL,
    salary INTEGER NOT NULL,
    hireDate TEXT NOT NULL,
    department TEXT NOT NULL,
    isActive BOOLEAN NOT NULL
);


CREATE TABLE timesheets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    employee_id INTEGER NOT NULL,
    full_name TEXT NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

