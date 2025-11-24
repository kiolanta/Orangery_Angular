import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Plants } from '../../services/plants';
import { PlantViewModel, PlantCreateViewModel } from '../../interfaces/plant.interface';
import { PlantForm } from '../plant-form/plant-form';

@Component({
  selector: 'app-plants-list',
  imports: [CommonModule, PlantForm],
  templateUrl: './plants-list.html',
  styleUrl: './plants-list.scss',
})
export class PlantsList implements OnInit {
  private readonly plantsService = inject(Plants);
  
  plants: PlantViewModel[] = [];
  isLoading = true;
  error: string | null = null;
  showForm = false;
  selectedPlant: PlantViewModel | null = null;

  ngOnInit(): void {
    this.loadPlants();
  }

  loadPlants(): void {
    this.isLoading = true;
    console.log('Завантаження рослин...');
    this.plantsService.getPlants().subscribe({
      next: (data) => {
        console.log('Рослини отримано:', data);
        this.plants = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Детальна помилка:', err);
        console.error('Статус:', err.status);
        console.error('Повідомлення:', err.message);
        console.error('URL:', err.url);
        this.error = `Помилка завантаження рослин: ${err.status || 'Немає звязку'} - ${err.message}`;
        this.isLoading = false;
      }
    });
  }

  openAddForm(): void {
    this.selectedPlant = null;
    this.showForm = true;
  }

  openEditForm(plant: PlantViewModel): void {
    this.selectedPlant = plant;
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.selectedPlant = null;
  }

  onFormSubmit(plant: PlantCreateViewModel | PlantViewModel): void {
    if ('id' in plant) {
      // Update existing plant
      this.plantsService.updatePlant(plant.id, plant).subscribe({
        next: () => {
          this.loadPlants();
          this.closeForm();
        },
        error: (err) => {
          alert('Помилка оновлення');
          console.error('Помилка:', err);
        }
      });
    } else {
      // Create new plant
      this.plantsService.createPlant(plant).subscribe({
        next: () => {
          this.loadPlants();
          this.closeForm();
        },
        error: (err) => {
          alert('Помилка створення');
          console.error('Помилка:', err);
        }
      });
    }
  }

  deletePlant(id: number): void {
    if (confirm('Ви впевнені, що хочете видалити цю рослину?')) {
      this.plantsService.deletePlant(id).subscribe({
        next: () => {
          this.loadPlants();
        },
        error: (err) => {
          alert('Помилка видалення');
          console.error('Помилка:', err);
        }
      });
    }
  }
}
