import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationViewModel } from '../../../../core/interfaces';
import { LocationCreateViewModel } from '../../services/locations';

@Component({
  selector: 'app-location-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './location-form.html',
  styleUrl: './location-form.scss'
})
export class LocationFormComponent implements OnInit {
  @Input() location: LocationViewModel | null = null;
  @Output() formSubmit = new EventEmitter<LocationCreateViewModel>();
  @Output() formCancel = new EventEmitter<void>();

  locationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.locationForm = this.fb.group({
      name: [this.location?.name || '', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      area: [this.location?.area || '', [Validators.required, Validators.min(0.1)]],
      temperature: [this.location?.temperature || '', [Validators.required, Validators.min(-50), Validators.max(80)]],
      humidity: [this.location?.humidity || '', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  onSubmit() {
    if (this.locationForm.valid) {
      const formValue = {
        ...this.locationForm.value,
        area: Number(this.locationForm.value.area),
        temperature: Number(this.locationForm.value.temperature),
        humidity: Number(this.locationForm.value.humidity)
      };
      this.formSubmit.emit(formValue);
    }
  }

  onCancel() {
    this.formCancel.emit();
  }

  get name() {
    return this.locationForm.get('name');
  }
  get area() {
    return this.locationForm.get('area');
  }
  get temperature() {
    return this.locationForm.get('temperature');
  }
  get humidity() {
    return this.locationForm.get('humidity');
  }
}
