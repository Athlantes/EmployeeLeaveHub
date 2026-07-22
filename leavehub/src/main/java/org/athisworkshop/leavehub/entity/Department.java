package org.athisworkshop.leavehub.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "department")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dept_id")
    private Long id;

    @Column(name = "department_name", length = 30)
    private String departmentName;

    @Column(name = "max_absent_employees")
    private Integer maxAbsentEmployees;

    @ManyToOne
    @JoinColumn(name = "manager_id", referencedColumnName = "empl_id")
    private Employee manager;

    public Department() {}

    public Department(String departmentName, Integer maxAbsentEmployees, Employee manager) {
        this.departmentName = departmentName;
        this.maxAbsentEmployees = maxAbsentEmployees;
        this.manager = manager;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Integer getMaxAbsentEmployees() {
        return maxAbsentEmployees;
    }

    public void setMaxAbsentEmployees(Integer maxAbsentEmployees) {
        this.maxAbsentEmployees = maxAbsentEmployees;
    }

    public Employee getManager() {
        return manager;
    }

    public void setManager(Employee manager) {
        this.manager = manager;
    }
}