import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpeciesViewModel } from '../../../../core/interfaces';
import { SpeciesCreateViewModel } from '../../services/species';

@Component({
  selector: 'app-species-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './species-form.html',
  styleUrl: './species-form.scss'
})
export class SpeciesFormComponent implements OnInit {
  @Input() species: SpeciesViewModel | null = null;
  @Output() formSubmit = new EventEmitter<SpeciesCreateViewModel>();
  @Output() formCancel = new EventEmitter<void>();

  speciesForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.speciesForm = this.fb.group({
      name: [this.species?.name || '', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    if (this.speciesForm.valid) {
      this.formSubmit.emit(this.speciesForm.value);
    }
  }

  onCancel() {
    this.formCancel.emit();
  }

  get name() {
    return this.speciesForm.get('name');
  }
}
