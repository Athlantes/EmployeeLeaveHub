import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardLeaveRequestDTO } from '../../shared/models/DashboardLeaveRequestDTO';
import { DashboardLeaveDaysDTO } from '../../shared/models/DashboardLeaveDaysDTO';
import { LeaveRequestDTO } from '../../shared/models/LeaveRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class LeaveRequestService {
  apiUrl = 'http://localhost:8080/api/leaverequest';
  
  constructor(private http: HttpClient) {}

  getDashboardRequests(employeeId: number) {
    return this.http.get<DashboardLeaveRequestDTO>(`${this.apiUrl}/dashboard/${employeeId}`);
  }

  getDashboardStats(employeeId: number) {
    return this.http.get<DashboardLeaveDaysDTO>(`${this.apiUrl}/stats/${employeeId}`);
  }

  getMyRequests(employeeId: number) {
    return this.http.get<LeaveRequestDTO[]>(`${this.apiUrl}/employee/${employeeId}`);
  }
}