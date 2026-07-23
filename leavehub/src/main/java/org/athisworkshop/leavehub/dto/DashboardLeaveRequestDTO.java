package org.athisworkshop.leavehub.dto;

public class DashboardLeaveRequestDTO {
    private LeaveRequestDTO latestDraft;
    private LeaveRequestDTO latestPending;
    private LeaveRequestDTO latestAccepted;
    private LeaveRequestDTO latestRejected;

    public LeaveRequestDTO getLatestDraft() {
        return latestDraft;
    }

    public void setLatestDraft(LeaveRequestDTO latestDraft) {
        this.latestDraft = latestDraft;
    }

    public LeaveRequestDTO getLatestPending() {
        return latestPending;
    }

    public void setLatestPending(LeaveRequestDTO latestPending) {
        this.latestPending = latestPending;
    }

    public LeaveRequestDTO getLatestAccepted() {
        return latestAccepted;
    }

    public void setLatestAccepted(LeaveRequestDTO latestAccepted) {
        this.latestAccepted = latestAccepted;
    }

    public LeaveRequestDTO getLatestRejected() {
        return latestRejected;
    }

    public void setLatestRejected(LeaveRequestDTO latestRejected) {
        this.latestRejected = latestRejected;
    }
}
