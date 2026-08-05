import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DashboardLeaveDaysDTO } from '../../shared/models/DashboardLeaveDaysDTO';
import { DashboardLeaveRequestDTO } from '../../shared/models/DashboardLeaveRequestDTO';
import { LeaveRequestService } from '../../core/services/leave-request.service';
import { DateRangePipe } from '../../shared/pipes/date-range.pipe';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { DashboardCalendar } from './dashboard-calendar/dashboard-calendar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule, TagModule, ButtonModule, DividerModule, DateRangePipe, AvatarModule, DashboardCalendar, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard implements OnInit {
  leaveStats: DashboardLeaveDaysDTO | undefined;
  recentRequests: DashboardLeaveRequestDTO | null = null;
  userRole: string = '';
  userInitials: string = '';
  employeeId: number = 0;

  constructor(
    private leaveRequestService: LeaveRequestService, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const fullName = localStorage.getItem('employee_name') || 'User';
      this.userRole = localStorage.getItem('employee_role') || 'Angajat';

      this.userInitials = this.getInitials(fullName);
      const storedId = localStorage.getItem('empl_id');
      this.employeeId = storedId ? parseInt(storedId, 10) : 0;
      
      if (this.employeeId > 0) {
        this.leaveRequestService.getDashboardStats(this.employeeId).subscribe({
          next: (stats: DashboardLeaveDaysDTO) => {
            setTimeout(() => {
              this.leaveStats = stats;
              this.cdr.detectChanges();
            });
          },
          error: (error) => console.error('Error fetching leave stats:', error)
        });

        this.leaveRequestService.getDashboardRequests(this.employeeId).subscribe({
          next: (requests: DashboardLeaveRequestDTO) => {
            setTimeout(() => {
              this.recentRequests = requests;
              this.cdr.detectChanges();
            });
          },
          error: (error) => console.error('Error fetching recent requests:', error)
        });
      } else {
        console.error('An error occurred: Please log in again.');
      }
    }
  }

  private getInitials(name: string): string {
    if (!name) return '';
    const nameParts = name.trim().split(' ');
    
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }
}