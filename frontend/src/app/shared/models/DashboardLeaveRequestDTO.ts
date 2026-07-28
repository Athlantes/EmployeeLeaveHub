import { LeaveRequestDTO } from "./LeaveRequestDTO";

export interface DashboardLeaveRequestDTO {
    latestDraft : LeaveRequestDTO | null;
    latestPending : LeaveRequestDTO | null;
    latestAccepted : LeaveRequestDTO | null;
    latestRejected : LeaveRequestDTO | null;
}