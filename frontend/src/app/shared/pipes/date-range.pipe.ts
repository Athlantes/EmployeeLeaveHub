import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRange',
  standalone: true
})
export class DateRangePipe implements PipeTransform {
  private readonly months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  transform(startDateStr: string | null | undefined, endDateStr: string | null | undefined): string {
    if (!startDateStr || !endDateStr) return '';

    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    const startDay = start.getDate();
    const startMonth = this.months[start.getMonth()];
    const startYear = start.getFullYear();

    const endDay = end.getDate();
    const endMonth = this.months[end.getMonth()];
    const endYear = end.getFullYear();

    if (startYear === endYear) {
      if (startMonth === endMonth) {
        return `${startDay} - ${endDay} ${startMonth} ${startYear}`;
      } else {
        return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${startYear}`;
      }
    } else {
      return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`; 
    }
  }
}