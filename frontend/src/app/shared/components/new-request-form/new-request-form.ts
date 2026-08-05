import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LeaveRequestService } from '../../../core/services/leave-request.service';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

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

  constructor(private fb: FormBuilder, private leaveRequestService: LeaveRequestService) {}

  ngOnInit() {
    this.requestForm = this.fb.group({
      leaveType: [null, Validators.required],
      dateRange: [null, Validators.required],
      reason: ['']
    });

    this.leaveRequestService.getLeaveTypes().subscribe({
      next: (types: string[]) => {
        this.leaveTypes = types.map(type => ({ label: type, value: type }));
      },
      error: (err) => console.error('Eroare la încărcarea tipurilor de concediu:', err)
    });
  }

  submitForm() {
    if (this.requestForm.valid) {
      this.onSubmit.emit(this.requestForm.value);
    } else {
      this.requestForm.markAllAsTouched();
    }
  }

  cancel() {
    this.onCancel.emit();
  }
}