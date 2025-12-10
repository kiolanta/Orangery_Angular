import { Component, inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PlantCreateViewModel, PlantViewModel } from '../../interfaces/plant.interface';
import { LocationViewModel, SpeciesViewModel } from '../../../../core/interfaces';

@Component({
  selector: 'app-plant-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './plant-form.html',
  styleUrl: './plant-form.scss',
})
export class PlantForm implements OnInit {
  private fb = inject(FormBuilder);
  
  @Input() plant: PlantViewModel | null = null;
  @Input() locations: LocationViewModel[] = [];
  @Input() species: SpeciesViewModel[] = [];
  @Output() formSubmit = new EventEmitter<PlantCreateViewModel | PlantViewModel>();
  @Output() formCancel = new EventEmitter<void>();

  plantForm!: FormGroup;
  isEditMode = false;

  ngOnInit(): void {
    this.isEditMode = !!this.plant;
    this.initForm();
  }

  initForm(): void {
    this.plantForm = this.fb.group({
      name: [this.plant?.name || '', [Validators.required, Validators.maxLength(100)]],
      plantingDate: [this.plant?.plantingDate || '', Validators.required],
      locationId: [this.plant?.locationId || '', [Validators.required, Validators.min(1)]],
      speciesId: [this.plant?.speciesId || '', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.plantForm.valid) {
      const formValue = this.plantForm.value;
      
      if (this.isEditMode && this.plant) {
        const updatedPlant: PlantViewModel = {
          id: this.plant.id,
          ...formValue
        };
        this.formSubmit.emit(updatedPlant);
      } else {
        this.formSubmit.emit(formValue);
      }
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  get name() { return this.plantForm.get('name'); }
  get plantingDate() { return this.plantForm.get('plantingDate'); }
  get locationId() { return this.plantForm.get('locationId'); }
  get speciesId() { return this.plantForm.get('speciesId'); }
}
