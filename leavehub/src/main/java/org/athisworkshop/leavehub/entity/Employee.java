package org.athisworkshop.leavehub.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "empl_id")
    private Long id;

    @Column(name = "name", length = 120)
    private String name;

    @Column(name = "email", length = 120)
    private String email;

    @Column(name = "role", length = 15)
    private String role;

    @Column(name = "annual_leave_days")
    private Long annualLeaveDays;

    @Column(name = "available_leave_days")
    private Long availableLeaveDays;

    @ManyToOne
    @JoinColumn(name = "dept_id")
    private Department department;

    public Employee() {}

    public Employee(String name, String email, String role, Long annualLeaveDays, Long availableLeaveDays, Department department) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.annualLeaveDays = annualLeaveDays;
        this.availableLeaveDays = availableLeaveDays;
        this.department = department;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getAvailableLeaveDays() {
        return availableLeaveDays;
    }

    public void setAvailableLeaveDays(Long availableLeaveDays) {
        this.availableLeaveDays = availableLeaveDays;
    }

    public Long getAnnualLeaveDays() {
        return annualLeaveDays;
    }

    public void setAnnualLeaveDays(Long annualLeaveDays) {
        this.annualLeaveDays = annualLeaveDays;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }
}
