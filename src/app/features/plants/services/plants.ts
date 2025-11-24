import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Plant, PlantViewModel, PlantCreateViewModel } from '../interfaces/plant.interface';

@Injectable({
  providedIn: 'root',
})
export class Plants {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/plants`;

  getPlants(): Observable<PlantViewModel[]> {
    return this.http.get<PlantViewModel[]>(this.apiUrl);
  }

  getPlant(id: number): Observable<PlantViewModel> {
    return this.http.get<PlantViewModel>(`${this.apiUrl}/${id}`);
  }

  createPlant(plant: PlantCreateViewModel): Observable<PlantViewModel> {
    return this.http.post<PlantViewModel>(this.apiUrl, plant);
  }

  updatePlant(id: number, plant: PlantViewModel): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, plant);
  }

  deletePlant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

