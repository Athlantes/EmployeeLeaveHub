package org.athisworkshop.leavehub.dto;

import org.athisworkshop.leavehub.entity.Attachment;

import java.time.LocalDate;

public class LeaveRequestDTO {
    private Long id;
    private Long employeeId;
    private String leaveRequestType;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long workingDays;
    private Status status;
    private Long attachmentId;
    private String attachmentFileName;

    public enum Status{
        PENDING, ACCEPTED, REJECTED, DRAFT
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() { return employeeId; }

    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

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

    public void setStatus(Status status) {this.status = status; }

    public Long getAttachmentId() { return attachmentId; }

    public void setAttachmentId(Long attachmentId) { this.attachmentId = attachmentId; }

    public String getAttachmentFileName() { return attachmentFileName; }

    public void setAttachmentFileName(String attachmentFileName) { this.attachmentFileName = attachmentFileName; }
}
