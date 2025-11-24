import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SpeciesViewModel } from '../interfaces/species.interface';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/species`;

  getSpecies(): Observable<SpeciesViewModel[]> {
    return this.http.get<SpeciesViewModel[]>(this.apiUrl);
  }

  getSpeciesById(id: number): Observable<SpeciesViewModel> {
    return this.http.get<SpeciesViewModel>(`${this.apiUrl}/${id}`);
  }
}
