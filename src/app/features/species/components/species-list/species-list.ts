import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Species, SpeciesCreateViewModel } from '../../services/species';
import { CareGuides } from '../../services/care-guides';
import { SpeciesViewModel, CareGuideViewModel } from '../../../../core/interfaces';
import { SpeciesFormComponent } from '../species-form/species-form';

@Component({
  selector: 'app-species-list',
  standalone: true,
  imports: [CommonModule, SpeciesFormComponent],
  templateUrl: './species-list.html',
  styleUrl: './species-list.scss'
})
export class SpeciesListComponent implements OnInit {
  private speciesService = inject(Species);
  private careGuidesService = inject(CareGuides);
  private cdr = inject(ChangeDetectorRef);
  
  species: SpeciesViewModel[] = [];
  careGuides: Record<number, CareGuideViewModel> = {};
  loading = false;
  careGuidesLoading = false;
  error: string | null = null;
  careGuidesError: string | null = null;
  showForm = false;
  editingSpecies: SpeciesViewModel | null = null;
  showModal = false;
  selectedSpeciesForDetail: SpeciesViewModel | null = null;

  ngOnInit() {
    this.loadSpecies();
    this.loadCareGuides();
  }

  loadCareGuides() {
    this.careGuidesLoading = true;
    this.careGuidesError = null;
    this.careGuidesService.getCareGuides().subscribe({
      next: (data) => {
        this.careGuides = data.reduce((acc, item) => {
          acc[item.speciesId] = item;
          return acc;
        }, {} as Record<number, CareGuideViewModel>);
        this.careGuidesLoading = false;
      },
      error: (err) => {
        console.error('Помилка завантаження гідів догляду:', err);
        this.careGuidesError = 'Не вдалося завантажити дані догляду';
        this.careGuidesLoading = false;
      }
    });
  }

  loadSpecies() {
    this.loading = true;
    this.error = null;
    
    this.speciesService.getSpecies().subscribe({
      next: (data) => {
        this.species = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Помилка завантаження видів рослин';
        this.loading = false;
        console.error(err);
      }
    });
  }

  openAddForm() {
    this.editingSpecies = null;
    this.showForm = true;
  }

  openEditForm(species: SpeciesViewModel) {
    this.editingSpecies = species;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editingSpecies = null;
  }

  onSubmit(data: SpeciesCreateViewModel) {
    if (this.editingSpecies) {
      this.speciesService.updateSpecies(this.editingSpecies.id, data).subscribe({
        next: () => {
          this.loadSpecies();
          this.closeForm();
        },
        error: (err) => {
          console.error('Помилка оновлення:', err);
          alert('Не вдалося оновити вид рослини');
        }
      });
    } else {
      this.speciesService.createSpecies(data).subscribe({
        next: () => {
          this.loadSpecies();
          this.closeForm();
        },
        error: (err) => {
          console.error('Помилка створення:', err);
          alert('Не вдалося створити вид рослини');
        }
      });
    }
  }

  deleteSpecies(id: number) {
    if (confirm('Ви впевнені, що хочете видалити цей вид рослини?')) {
      this.speciesService.deleteSpecies(id).subscribe({
        next: () => {
          this.loadSpecies();
        },
        error: (err) => {
          console.error('Помилка видалення:', err);
          alert('Не вдалося видалити вид рослини');
        }
      });
    }
  }

  openCareModal(species: SpeciesViewModel) {
    console.log('openCareModal called with:', species);
    this.selectedSpeciesForDetail = species;
    this.showModal = true;
    this.cdr.markForCheck();
    console.log('showModal set to:', this.showModal);
  }

  closeModal() {
    this.showModal = false;
    this.selectedSpeciesForDetail = null;
    this.cdr.markForCheck();
  }

  getCareGuideBySpecies(speciesId: number): CareGuideViewModel | null {
    return this.careGuides[speciesId] || null;
  }
}
