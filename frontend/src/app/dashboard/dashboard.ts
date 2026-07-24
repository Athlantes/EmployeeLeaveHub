import { Component, OnInit } from '@angular/core';
import { DashboardLeaveDaysDTO } from '../../models/DashboardLeaveDaysDTO';
import { DashboardLeaveRequestDTO } from '../../models/DashboardLeaveRequestDTO';
import { LeaveRequestService } from '../leave-request.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dashboard',
  imports: [CardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  leaveStats: DashboardLeaveDaysDTO | undefined;
  recentRequests: DashboardLeaveRequestDTO | undefined;

  constructor(private leaveRequestService: LeaveRequestService) {}

  ngOnInit() {
      const employeeId = 1; // Replace with the actual employee ID

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
