package org.athisworkshop.leavehub.dto;

import org.athisworkshop.leavehub.entity.Attachment;

import java.time.LocalDate;
import java.util.List;

public class LeaveRequestDTO {
    private Long id;
    private Long employeeId;
    private String leaveRequestType;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long workingDays;
    private Status status;
    private List<Long> attachmentIds;
    private List<String> attachmentFileNames;
    private String reason;

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

    public List<Long> getAttachmentIds() {
        return attachmentIds;
    }

    public void setAttachmentIds(List<Long> attachmentIds) {
        this.attachmentIds = attachmentIds;
    }

    public List<String> getAttachmentFileNames() {
        return attachmentFileNames;
    }

    public void setAttachmentFileNames(List<String> attachmentFileNames) {
        this.attachmentFileNames = attachmentFileNames;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
