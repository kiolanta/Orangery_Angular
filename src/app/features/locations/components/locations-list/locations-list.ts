import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Locations, LocationCreateViewModel } from '../../services/locations';
import { LocationViewModel } from '../../../../core/interfaces';
import { LocationFormComponent } from '../location-form/location-form';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [CommonModule, LocationFormComponent],
  templateUrl: './locations-list.html',
  styleUrl: './locations-list.scss'
})
export class LocationsListComponent implements OnInit {
  private locationsService = inject(Locations);
  
  locations: LocationViewModel[] = [];
  loading = false;
  error: string | null = null;
  showForm = false;
  editingLocation: LocationViewModel | null = null;

  ngOnInit() {
    this.loadLocations();
  }

  loadLocations() {
    this.loading = true;
    this.error = null;
    
    this.locationsService.getLocations().subscribe({
      next: (data) => {
        this.locations = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Помилка завантаження локацій';
        this.loading = false;
        console.error(err);
      }
    });
  }

  openAddForm() {
    this.editingLocation = null;
    this.showForm = true;
  }

  openEditForm(location: LocationViewModel) {
    this.editingLocation = location;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editingLocation = null;
  }

  onSubmit(data: LocationCreateViewModel) {
    if (this.editingLocation) {
      // Видаляємо ID з даних, якщо він там є
      const updateData = { ...data };
      if ('id' in updateData) {
        delete (updateData as any).id;
      }
      this.locationsService.updateLocation(this.editingLocation.id, updateData).subscribe({
        next: () => {
          this.loadLocations();
          this.closeForm();
        },
        error: (err) => {
          console.error('Помилка оновлення:', err);
          alert('Не вдалося оновити локацію');
        }
      });
    } else {
      this.locationsService.createLocation(data).subscribe({
        next: () => {
          this.loadLocations();
          this.closeForm();
        },
        error: (err) => {
          console.error('Помилка створення:', err);
          alert('Не вдалося створити локацію');
        }
      });
    }
  }

  deleteLocation(id: number) {
    if (confirm('Ви впевнені, що хочете видалити цю локацію?')) {
      this.locationsService.deleteLocation(id).subscribe({
        next: () => {
          this.loadLocations();
        },
        error: (err) => {
          console.error('Помилка видалення:', err);
          alert('Не вдалося видалити локацію');
        }
      });
    }
  }
}
