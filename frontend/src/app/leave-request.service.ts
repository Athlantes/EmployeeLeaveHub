import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardLeaveRequestDTO } from '../models/DashboardLeaveRequestDTO';
import { DashboardLeaveDaysDTO } from '../models/DashboardLeaveDaysDTO';    

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

}
