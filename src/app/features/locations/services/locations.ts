import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LocationViewModel } from '../../../core/interfaces';

export interface LocationCreateViewModel {
  name: string;
  area: number;
  temperature: number;
  humidity: number;
}

@Injectable({
  providedIn: 'root'
})
export class Locations {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/locations`;

  getLocations(): Observable<LocationViewModel[]> {
    return this.http.get<LocationViewModel[]>(this.apiUrl);
  }

  getLocation(id: number): Observable<LocationViewModel> {
    return this.http.get<LocationViewModel>(`${this.apiUrl}/${id}`);
  }

  createLocation(location: LocationCreateViewModel): Observable<LocationViewModel> {
    return this.http.post<LocationViewModel>(this.apiUrl, location);
  }

  updateLocation(id: number, location: LocationCreateViewModel): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, location);
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
