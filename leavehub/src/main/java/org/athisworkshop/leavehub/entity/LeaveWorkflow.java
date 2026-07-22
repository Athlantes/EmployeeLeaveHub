package org.athisworkshop.leavehub.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "leave_workflow")
public class LeaveWorkflow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workflow_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "leave_request_id", referencedColumnName = "leave_request_id")
    private LeaveRequest leaveRequest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empl_id", referencedColumnName = "empl_id")
    private Employee employee;

    @Column(name = "old_status")
    private String oldStatus;

    @Column(name = "current_status")
    private String currentStatus;

    @Column(name = "changed_at")
    private LocalDateTime changedAt;

    public LeaveWorkflow() {}

    public LeaveWorkflow(LeaveRequest leaveRequest, Employee employee, String oldStatus, String currentStatus, LocalDateTime changedAt) {
        this.leaveRequest = leaveRequest;
        this.employee = employee;
        this.oldStatus = oldStatus;
        this.currentStatus = currentStatus;
        this.changedAt = changedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LeaveRequest getLeaveRequest() {
        return leaveRequest;
    }

    public void setLeaveRequest(LeaveRequest leaveRequest) {
        this.leaveRequest = leaveRequest;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public String getOldStatus() {
        return oldStatus;
    }

    public void setOldStatus(String oldStatus) {
        this.oldStatus = oldStatus;
    }

    public String getCurrentStatus() {
        return currentStatus;
    }

    public void setCurrentStatus(String currentStatus) {
        this.currentStatus = currentStatus;
    }

    public LocalDateTime getChangedAt() {
        return changedAt;
    }

    public void setChangedAt(LocalDateTime changedAt) {
        this.changedAt = changedAt;
    }
}
