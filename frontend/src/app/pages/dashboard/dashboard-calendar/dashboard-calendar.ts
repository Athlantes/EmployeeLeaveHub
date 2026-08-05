import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { LeaveRequestService } from '../../../core/services/leave-request.service';
import { combineLatest } from 'rxjs';

interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  statusType?: 'LEGAL_HOLIDAY' | 'PENDING' | 'APPROVED_VACATION' | 'APPROVED_MEDICAL';
  tooltip?: string;
}

@Component({
  selector: 'app-dashboard-calendar',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './dashboard-calendar.html',
  styleUrl: './dashboard-calendar.css'
})
export class DashboardCalendar implements OnChanges {
  @Input() employeeId: number = 0;

  currentDate: Date = new Date();
  daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  calendarDays: CalendarDay[] = [];
  
  leaveRequests: any[] = [];
  holidays: string[] = []; 

  constructor(private leaveRequestService: LeaveRequestService, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['employeeId'] && changes['employeeId'].currentValue > 0) {
      this.loadCalendarData();
    }
  }

  loadCalendarData() {
    if (!this.employeeId) return;

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth() + 1;

    combineLatest([
      this.leaveRequestService.getCalendarRequests(this.employeeId, year, month),
      this.leaveRequestService.getHolidays(year)
    ]).subscribe({
      next: ([requests, holidays]) => {
        this.leaveRequests = requests;
        this.holidays = holidays;
        this.generateCalendar();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading calendar data:', err)
    });
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    let startingDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startingDayOfWeek === -1) startingDayOfWeek = 6;

    const days: CalendarDay[] = [];
    const todayStr = this.formatDate(new Date());

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        date: prevDate,
        dayNumber: prevDate.getDate(),
        isCurrentMonth: false,
        isToday: this.formatDate(prevDate) === todayStr
      });
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const dateObj = new Date(year, month, day);
      const formattedDate = this.formatDate(dateObj);
      
      days.push({
        date: dateObj,
        dayNumber: day,
        isCurrentMonth: true,
        isToday: formattedDate === todayStr,
        ...this.getDayStatus(formattedDate)
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        dayNumber: nextDate.getDate(),
        isCurrentMonth: false,
        isToday: this.formatDate(nextDate) === todayStr
      });
    }

    this.calendarDays = days;
  }

  private getDayStatus(dateStr: string) {
    if (this.holidays.includes(dateStr)) {
      return {
        statusType: 'LEGAL_HOLIDAY' as const,
        tooltip: 'Legal Holiday'
      };
    }

    if (Array.isArray(this.leaveRequests)) {
      for (const req of this.leaveRequests) {
        if (req && req.startDate && req.endDate) {
          if (dateStr >= req.startDate && dateStr <= req.endDate) {
            if (req.status === 'PENDING') {
              return { statusType: 'PENDING' as const, tooltip: 'Pending Request' };
            }
            if (req.status === 'APPROVED' || req.status === 'ACCEPTED') {
              const reqType = req.leaveRequestType || '';
              return reqType.toLowerCase().includes('medical')
                ? { statusType: 'APPROVED_MEDICAL' as const, tooltip: 'Medical Leave' }
                : { statusType: 'APPROVED_VACATION' as const, tooltip: 'Vacation Leave' };
            }
          }
        }
      }
    }

    return {};
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.clearAndRegenerate();
    this.loadCalendarData();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.clearAndRegenerate();
    this.loadCalendarData();
  }

  private clearAndRegenerate() {
    this.leaveRequests = [];
    this.holidays = [];
    this.generateCalendar();
  }

  private formatDate(d: Date): string {
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }

  get prevMonthName(): string {
    const d = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    return d.toLocaleDateString('ro-RO', { month: 'long' });
  }

  get nextMonthName(): string {
    const d = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    return d.toLocaleDateString('ro-RO', { month: 'long' });
  }

  get monthYearLabel(): string {
    return this.currentDate.toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' });
  }
}