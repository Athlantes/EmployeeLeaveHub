package org.athisworkshop.leavehub.dto;

import java.time.LocalDate;

public class LeaveRequestDTO {
    private Long id;
    private String leaveRequestType;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long workingDays;
    private Status status;

    public enum Status{
        PENDING, APPROVED, REJECTED, DRAFT
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLeaveRequestType() {
        return leaveRequestType;
    }

    public void setLeaveRequestType(String leaveRequestType) {
        this.leaveRequestType = leaveRequestType;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Long getWorkingDays() {
        return workingDays;
    }

    public void setWorkingDays(Long workingDays) {
        this.workingDays = workingDays;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
