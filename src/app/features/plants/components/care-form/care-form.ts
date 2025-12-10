import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Care } from '../../interfaces/care.interface';
import { PlantViewModel } from '../../interfaces/plant.interface';
import { EmployeeViewModel } from '../../../../core/interfaces';

@Component({
  selector: 'app-care-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './care-form.html',
  styleUrls: ['./care-form.scss']
})
export class CareFormComponent {
  @Input() plantId: number | null = null;
  @Input() plants: PlantViewModel[] = [];
  @Input() employees: EmployeeViewModel[] = [];
  @Output() formSubmit = new EventEmitter<Omit<Care, 'id'>>();
  @Output() formCancel = new EventEmitter<void>();

  // Типи догляду (відповідають enum у БД: care_type_enum)
  careTypes = ['watering', 'fertilizing', 'pruning', 'repotting', 'treatment', 'other'];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      type: ['', [Validators.required, Validators.maxLength(50)]],
      date: ['', Validators.required],
      plantId: [{ value: null, disabled: false }, Validators.required],
      employeeId: [null, Validators.required]
    });
  }

  ngOnChanges() {
    if (this.plantId) {
      this.form.patchValue({ plantId: this.plantId });
      this.form.get('plantId')?.disable();
    } else {
      this.form.get('plantId')?.enable();
    }
  }

  submit() {
    if (this.form.valid) {
      // Отримуємо значення з урахуванням disabled полів
      const formValue = {
        ...this.form.value,
        plantId: this.form.get('plantId')?.value
      };
      this.formSubmit.emit(formValue);
      this.form.reset();
      this.form.get('plantId')?.enable();
    }
  }

  cancel() {
    this.formCancel.emit();
    this.form.reset();
  }
}
