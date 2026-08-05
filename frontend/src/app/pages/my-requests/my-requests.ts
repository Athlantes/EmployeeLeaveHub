import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LeaveRequestService } from '../../core/services/leave-request.service';
import { LeaveRequestDTO } from '../../shared/models/LeaveRequestDTO';

import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TagModule,
    DialogModule,
    CardModule,
    DividerModule,
    SelectModule,
    DatePickerModule
  ],
  templateUrl: './my-requests.html',
  styleUrls: ['./my-requests.css']
})
export class MyRequestsComponent implements OnInit {
  filteredRequests: LeaveRequestDTO[] = [];

  selectedStatus: string | null = null;
  selectedType: string | null = null;
  selectedDate: Date | null = null;

  statusOptions: any[] = [];
  typeOptions: any[] = [];

  selectedRequest: LeaveRequestDTO | null = null;
  displayDialog: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leaveRequestService: LeaveRequestService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.statusOptions = [
      { label: 'All', value: null },
      { label: 'Draft', value: 'DRAFT' },
      { label: 'Pending', value: 'PENDING' },
      { label: 'Accepted', value: 'ACCEPTED' },
      { label: 'Rejected', value: 'REJECTED' }
    ];

    if (isPlatformBrowser(this.platformId)) {
      const emplIdStr = localStorage.getItem('empl_id');
      if (emplIdStr) {
        const emplId = Number(emplIdStr);
        this.leaveRequestService.getLeaveTypes().subscribe({
          next: (types) => {
            this.typeOptions = [
              { label: 'All', value: null },
              ...types.map(t => ({ label: t, value: t }))
            ];
          },
          error: (err) => console.error('Error loading leave types', err)
        });

        this.route.queryParams.subscribe(params => {
          this.selectedStatus = params['status'] ? params['status'].toUpperCase() : null;
          this.selectedType = params['type'] ? params['type'] : null;
          
          if (params['date']) {
            const parts = params['date'].split('-');
            if(parts.length === 3) {
               this.selectedDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
            } else {
               this.selectedDate = new Date(params['date']);
            }
          } else {
            this.selectedDate = null;
          }

          const dateString = params['date'] ? params['date'] : null;

          this.leaveRequestService.getFilteredMyRequests(emplId, this.selectedStatus, this.selectedType, dateString)
            .subscribe({
              next: (filteredData) => {
                this.filteredRequests = filteredData;
                
                if (params['requestId']) {
                  const reqId = Number(params['requestId']);
                  const requestToOpen = this.filteredRequests.find(r => r.id === reqId);
                  if (requestToOpen) {
                    this.selectedRequest = requestToOpen;
                    this.displayDialog = true;
                  }
                } else {
                  this.selectedRequest = null;
                  this.displayDialog = false;
                }
                
                this.cdr.detectChanges();
              },
              error: (err) => console.error('Error loading filtered requests', err)
            });
        });
      }
    }
  }

  onFilterChange(): void {
    const queryParams: any = {};
    
    if (this.selectedStatus) queryParams.status = this.selectedStatus;
    else queryParams.status = null;

    if (this.selectedType) queryParams.type = this.selectedType;
    else queryParams.type = null;

    if (this.selectedDate) {
      const year = this.selectedDate.getFullYear();
      const month = String(this.selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(this.selectedDate.getDate()).padStart(2, '0');
      queryParams.date = `${year}-${month}-${day}`;
    } else {
      queryParams.date = null;
    }

    this.router.navigate([], { queryParams: queryParams, queryParamsHandling: 'merge' });
  }

  clearFilters(): void {
    this.router.navigate([], { 
      queryParams: { status: null, type: null, date: null }, 
      queryParamsHandling: 'merge' 
    });
  }

  openRequestOverlay(request: LeaveRequestDTO): void {
    this.router.navigate([], { queryParams: { requestId: request.id }, queryParamsHandling: 'merge' });
  }

  closeOverlay(): void {
    this.router.navigate([], { queryParams: { requestId: null }, queryParamsHandling: 'merge' });
  }

  getSeverity(status: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
    switch (status.toUpperCase()) {
      case 'ACCEPTED': return 'success';
      case 'PENDING': return 'warn';
      case 'REJECTED': return 'danger';
      case 'DRAFT': return 'secondary';
      default: return 'info';
    }
  }
}