import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocationViewModel } from '../interfaces/location.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/locations`;

  getLocations(): Observable<LocationViewModel[]> {
    return this.http.get<LocationViewModel[]>(this.apiUrl);
  }

  getLocation(id: number): Observable<LocationViewModel> {
    return this.http.get<LocationViewModel>(`${this.apiUrl}/${id}`);
  }
}
