import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Plants } from '../../services/plants';
import { PlantViewModel, PlantCreateViewModel } from '../../interfaces/plant.interface';
import { PlantForm } from '../plant-form/plant-form';
import { Locations } from '../../../locations/services/locations';
import { Species } from '../../../species/services/species';
import { LocationViewModel, SpeciesViewModel } from '../../../../core/interfaces';

@Component({
  selector: 'app-plants-list',
  imports: [CommonModule, FormsModule, RouterModule, PlantForm],
  templateUrl: './plants-list.html',
  styleUrl: './plants-list.scss',
})
export class PlantsList implements OnInit {
  private readonly plantsService = inject(Plants);
  private readonly locationsService = inject(Locations);
  private readonly speciesService = inject(Species);
  
  plants: PlantViewModel[] = [];
  filteredPlants: PlantViewModel[] = [];
  locations: LocationViewModel[] = [];
  species: SpeciesViewModel[] = [];
  isLoading = true;
  error: string | null = null;
  showForm = false;
  selectedPlant: PlantViewModel | null = null;

  searchTerm: string = '';
  selectedLocationId: number | null = null;

  ngOnInit(): void {
    this.loadLocations();
    this.loadSpecies();
    this.loadPlants();
  }

  loadLocations(): void {
    this.locationsService.getLocations().subscribe({
      next: (data) => {
        this.locations = data;
      },
      error: (err) => {
        console.error('Помилка завантаження локацій:', err);
      }
    });
  }

  loadSpecies(): void {
    this.speciesService.getSpecies().subscribe({
      next: (data) => {
        this.species = data;
      },
      error: (err) => {
        console.error('Помилка завантаження видів рослин:', err);
      }
    });
  }

  loadPlants(): void {
    this.isLoading = true;
    console.log('Завантаження рослин...');
    this.plantsService.getPlants().subscribe({
      next: (data) => {
        console.log('Рослини отримано:', data);
        this.plants = data;
        this.filteredPlants = data;
        this.applyFilters();
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

  applyFilters(): void {
    this.filteredPlants = this.plants.filter(plant => {
      const matchesSearch = plant.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesLocation = !this.selectedLocationId || plant.locationId === this.selectedLocationId;
      return matchesSearch && matchesLocation;
    });
  }

  getLocationName(locationId: number): string {
    const location = this.locations.find(loc => loc.id === locationId);
    return location ? location.name : `ID: ${locationId}`;
  }

  getSpeciesName(speciesId: number): string {
    const species = this.species.find(sp => sp.id === speciesId);
    return species ? species.name : `ID: ${speciesId}`;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onLocationFilterChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedLocationId = null;
    this.applyFilters();
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
