import { LeaveStatus } from './leave-status.enum';

export interface LeaveRequestDTO {
    id?: number;
    employeeId?: number;
    leaveRequestType: string;
    startDate: string;
    endDate: string;
    workingDays: number;
    status: LeaveStatus;
    attachmentId?: number;
    attachmentFileName?: string;
}