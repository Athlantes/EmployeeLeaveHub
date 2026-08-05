import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardLeaveRequestDTO } from '../../shared/models/DashboardLeaveRequestDTO';
import { DashboardLeaveDaysDTO } from '../../shared/models/DashboardLeaveDaysDTO';
import { LeaveRequestDTO } from '../../shared/models/LeaveRequestDTO';
import { Observable } from 'rxjs';

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

  getLeaveTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/types`);
  }

  getFilteredMyRequests(employeeId: number, status?: string | null, type?: string | null, date?: string | null): Observable<LeaveRequestDTO[]> {
    let params = new HttpParams().set('emplId', employeeId.toString());
    
    if (status) params = params.set('status', status);
    if (type) params = params.set('type', type);
    if (date) params = params.set('date', date);

    return this.http.get<LeaveRequestDTO[]>(`${this.apiUrl}/my`, { params });
  }

  getCalendarRequests(employeeId: number, year: number, month: number) {
    let params = new HttpParams()
      .set('employeeId', employeeId.toString())
      .set('year', year.toString())
      .set('month', month.toString());
    return this.http.get<LeaveRequestDTO[]>(`${this.apiUrl}/calendar`, { params });
  }

  getHolidays(year: number) {
    let params = new HttpParams().set('year', year.toString());
    return this.http.get<string[]>(`${this.apiUrl}/holidays`, { params });
  }

  createLeaveRequest(requestData: LeaveRequestDTO, file?: File): Observable<LeaveRequestDTO> {
    const formData: FormData = new FormData();
    
    const jsonBlob = new Blob([JSON.stringify(requestData)], { type: 'application/json' });
    formData.append('request', jsonBlob);

    if (file) {
      formData.append('file', file, file.name);
    }

    return this.http.post<LeaveRequestDTO>(this.apiUrl, formData);
  }
}