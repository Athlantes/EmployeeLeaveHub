import { LeaveStatus } from './leave-status.enum';

export interface LeaveRequestDTO {
    id: number;
    leaveRequestType: string;
    startDate: string;
    endDate: string;
    workingDays: number;
    status: LeaveStatus;
}


