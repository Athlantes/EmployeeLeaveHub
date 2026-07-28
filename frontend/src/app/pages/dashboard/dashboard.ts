import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DashboardLeaveDaysDTO } from '../../shared/models/DashboardLeaveDaysDTO';
import { DashboardLeaveRequestDTO } from '../../shared/models/DashboardLeaveRequestDTO';
import { LeaveRequestService } from '../../core/services/leave-request.service';
import { CardModule } from 'primeng/card';
import { DateRangePipe } from '../../shared/pipes/date-range.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule, DateRangePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  leaveStats: DashboardLeaveDaysDTO | undefined;
  recentRequests: DashboardLeaveRequestDTO | null = null;

  constructor(
    private leaveRequestService: LeaveRequestService, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const storedId = localStorage.getItem('empl_id');
      const employeeId = storedId ? parseInt(storedId, 10) : 0;
      
      if (employeeId > 0) {
        this.leaveRequestService.getDashboardStats(employeeId).subscribe({
          next: (stats: DashboardLeaveDaysDTO) => {
            setTimeout(() => {
              this.leaveStats = stats;
              this.cdr.detectChanges();
            });
          },
          error: (error) => console.error('Error fetching leave stats:', error)
        });

        this.leaveRequestService.getDashboardRequests(employeeId).subscribe({
          next: (requests: DashboardLeaveRequestDTO) => {
            setTimeout(() => {
              this.recentRequests = requests;
              this.cdr.detectChanges();
            });
          },
          error: (error) => console.error('Error fetching recent requests:', error)
        });
      } else {
        console.error('Nu s-a gasit ID-ul angajatului. Te rugam sa te reloghezi.');
      }
    }
  }
}