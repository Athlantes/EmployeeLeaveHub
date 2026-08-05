import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LeaveRequestService } from '../../../core/services/leave-request.service';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { LeaveRequestDTO } from '../../models/LeaveRequestDTO';

@Component({
  selector: 'app-new-request-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    SelectModule,
    DatePickerModule,
    TextareaModule,
    ButtonModule
  ],
  templateUrl: './new-request-form.html',
  styleUrl: './new-request-form.css'
})
export class NewRequestForm implements OnInit {
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  requestForm!: FormGroup;
  leaveTypes: any[] = [];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private leaveRequestService: LeaveRequestService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.requestForm = this.fb.group({
      leaveType: [null, Validators.required],
      dateRange: [null, Validators.required],
      reason: ['']
    });

    this.leaveRequestService.getLeaveTypes().subscribe({
      next: (types: string[]) => {
        this.leaveTypes = types.map(type => ({ label: type, value: type }));
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Eroare la încărcarea tipurilor de concediu:', err)
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
    }
  }

  submitForm() {
    if (this.requestForm.valid) {
      const formValues = this.requestForm.value;
      const dateRange = formValues.dateRange;
      const startDate = dateRange[0];
      const endDate = dateRange[1] ? dateRange[1] : startDate;
      const storedId = localStorage.getItem('empl_id');
      const employeeId = storedId ? parseInt(storedId, 10) : null;

      if (!employeeId) {
        console.error("Nu s-a găsit ID-ul angajatului. Te rog reloghează-te.");
        return;
      }

      const dto: LeaveRequestDTO = {
        employeeId: employeeId,
        leaveRequestType: formValues.leaveType,
        startDate: this.formatDate(startDate),
        endDate: this.formatDate(endDate),
        workingDays: this.calculateWorkingDays(startDate, endDate),
        status: 'PENDING'
      };

      this.leaveRequestService.createLeaveRequest(dto, this.selectedFile || undefined)
        .subscribe({
          next: (res) => {
            console.log('Request trimis cu succes:', res);
            this.onSubmit.emit(res);
            this.requestForm.reset();
            this.selectedFile = null;
          },
          error: (err) => {
            console.error('Eroare la crearea cererii:', err);
          }
        });
    } else {
      this.requestForm.markAllAsTouched();
    }
  }

  cancel() {
    this.requestForm.reset();
    this.selectedFile = null;
    this.onCancel.emit();
  }

  private calculateWorkingDays(startDate: Date, endDate: Date): number {
    let count = 0;
    let curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
        const dayOfWeek = curDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            count++;
        }
        curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}