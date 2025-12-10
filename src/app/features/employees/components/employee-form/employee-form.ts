import { Component, inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeCreateViewModel, EmployeeViewModel } from '../../../../core/interfaces/employee.interface';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss',
})
export class EmployeeForm implements OnInit {
  private fb = inject(FormBuilder);
  
  @Input() employee: EmployeeViewModel | null = null;
  @Output() formSubmit = new EventEmitter<EmployeeCreateViewModel | EmployeeViewModel>();
  @Output() formCancel = new EventEmitter<void>();

  employeeForm!: FormGroup;
  isEditMode = false;

  ngOnInit(): void {
    this.isEditMode = !!this.employee;
    this.initForm();
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      firstName: [this.employee?.firstName || '', [Validators.required, Validators.maxLength(100)]],
      lastName: [this.employee?.lastName || '', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: [this.employee?.phoneNumber || '', Validators.required],
      position: [this.employee?.position || '', Validators.required],
      salary: [this.employee?.salary || '', [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formValue = {
        ...this.employeeForm.value,
        salary: Number(this.employeeForm.value.salary) || 0
      };
      
      if (this.isEditMode && this.employee) {
        const updatedEmployee: EmployeeViewModel = {
          id: this.employee.id,
          ...formValue
        };
        this.formSubmit.emit(updatedEmployee);
      } else {
        this.formSubmit.emit(formValue);
      }
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  get firstName() { return this.employeeForm.get('firstName'); }
  get lastName() { return this.employeeForm.get('lastName'); }
  get phoneNumber() { return this.employeeForm.get('phoneNumber'); }
  get position() { return this.employeeForm.get('position'); }
  get salary() { return this.employeeForm.get('salary'); }
}
