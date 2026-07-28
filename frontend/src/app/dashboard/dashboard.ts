import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DashboardLeaveDaysDTO } from '../../models/DashboardLeaveDaysDTO';
import { DashboardLeaveRequestDTO } from '../../models/DashboardLeaveRequestDTO';
import { LeaveRequestService } from '../leave-request.service';
import { CardModule } from 'primeng/card';
import { DateRangePipe } from '../pipes/date-range.pipe';

@Component({
  selector: 'app-dashboard',
  imports: [CardModule, DateRangePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  leaveStats: DashboardLeaveDaysDTO | undefined;
  recentRequests: DashboardLeaveRequestDTO | null = null;

  constructor(private leaveRequestService: LeaveRequestService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const employeeId = 1;

      this.leaveRequestService.getDashboardStats(employeeId).subscribe(
        (stats: DashboardLeaveDaysDTO) => {
          this.leaveStats = stats;
        },
        (error) => {
          console.error('Error fetching leave stats:', error);
        }
      );

      this.leaveRequestService.getDashboardRequests(employeeId).subscribe(
        (requests: DashboardLeaveRequestDTO) => {
          this.recentRequests = requests;
        },
        (error) => {
          console.error('Error fetching recent requests:', error);
        }
      );
    }
  }
}