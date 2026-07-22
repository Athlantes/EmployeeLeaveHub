SET FOREIGN_KEY_CHECKS = 1;

CREATE DATABASE EmployeeLeaveHub;

USE EmployeeLeaveHub;

CREATE TABLE department (
    dept_id int primary key,
    department_name varchar(30),
    max_absent_employees int
);

ALTER TABLE department MODIFY COLUMN dept_id int AUTO_INCREMENT;
ALTER TABLE department ADD COLUMN manager_id int;
ALTER TABLE department ADD FOREIGN KEY (manager_id) REFERENCES employee(empl_id);

CREATE TABLE employee (
    empl_id int primary key,
    name varchar(120),
    email varchar(120),
    role varchar(15),
    annual_leave_days int,
    available_leave_days int
);

ALTER TABLE employee MODIFY COLUMN empl_id int AUTO_INCREMENT;
ALTER TABLE employee ADD COLUMN dept_id int;
ALTER TABLE employee ADD FOREIGN KEY (dept_id) REFERENCES department(dept_id);

CREATE TABLE leave_request (
   leave_request_id int primary key,
   start_date date,
   end_date date,
   working_days int,
   status varchar(30),
   created_at datetime
);

ALTER TABLE leave_request MODIFY COLUMN leave_request_id int AUTO_INCREMENT;
ALTER TABLE leave_request ADD COLUMN empl_id int;
ALTER TABLE leave_request ADD COLUMN leave_type_id int;
ALTER TABLE leave_request ADD FOREIGN KEY (empl_id) REFERENCES employee(empl_id);
ALTER TABLE leave_request ADD FOREIGN KEY (leave_type_id) REFERENCES leave_type(leave_type_id);

CREATE TABLE leave_type (
    leave_type_id int primary key ,
    name varchar(120),
    code varchar(7),
    requires_attachment bool,
    paid bool
);

ALTER TABLE leave_type MODIFY COLUMN leave_type_id int AUTO_INCREMENT;

CREATE TABLE leave_workflow (
    workflow_id int primary key,
    old_status varchar(30),
    current_status varchar(30),
    changed_at datetime
);

ALTER TABLE leave_workflow MODIFY COLUMN workflow_id int AUTO_INCREMENT;
ALTER TABLE leave_workflow ADD COLUMN leave_request_id int;
ALTER TABLE leave_workflow ADD COLUMN empl_id int;
ALTER TABLE leave_workflow ADD FOREIGN KEY (leave_request_id) REFERENCES leave_request(leave_request_id);
ALTER TABLE leave_workflow ADD FOREIGN KEY (empl_id) REFERENCES employee(empl_id);

CREATE TABLE attachment (
    attachment_id int primary key,
    file_name varchar(120),
    file_path varchar(240),
    uploaded_at datetime
);

ALTER TABLE attachment MODIFY COLUMN attachment_id int AUTO_INCREMENT;
ALTER TABLE attachment ADD COLUMN leave_request_id int;
ALTER TABLE attachment ADD FOREIGN KEY (leave_request_id) REFERENCES leave_request(leave_request_id);