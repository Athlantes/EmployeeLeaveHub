import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import Holidays from 'date-holidays';

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
export class DashboardCalendar implements OnInit, OnChanges {
  @Input() leaveRequests: any[] = [];

  currentDate: Date = new Date();
  daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  calendarDays: CalendarDay[] = [];
  
  private hd = new Holidays('RO');

  ngOnInit() {
    this.generateCalendar();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['leaveRequests']) {
      this.generateCalendar();
    }
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
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        dayNumber: prevMonthLastDay - i,
        isCurrentMonth: false,
        isToday: false
      });
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const dateObj = new Date(year, month, day);
      const formattedDate = this.formatDate(dateObj);
      
      const dayData: CalendarDay = {
        date: dateObj,
        dayNumber: day,
        isCurrentMonth: true,
        isToday: formattedDate === todayStr,
        ...this.getDayStatus(dateObj, formattedDate)
      };

      days.push(dayData);
    }

    this.calendarDays = days;
  }

  private getDayStatus(dateObj: Date, dateStr: string) {
    const holiday: any = this.hd.isHoliday(dateObj);
    if (holiday) {
      const holidayName = Array.isArray(holiday) ? holiday[0]?.name : holiday.name;
      return {
        statusType: 'LEGAL_HOLIDAY' as const,
        tooltip: holidayName || 'Legal Holiday'
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
                ? { statusType: 'APPROVED_MEDICAL' as const, tooltip: 'Medical Request' }
                : { statusType: 'APPROVED_VACATION' as const, tooltip: 'Vacation Request' };
            }
          }
        }
      }
    }

    return {};
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  private formatDate(d: Date): string {
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }

  get monthYearLabel(): string {
    return this.currentDate.toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' });
  }
}