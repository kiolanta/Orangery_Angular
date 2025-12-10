import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SpeciesViewModel } from '../../../core/interfaces';

export interface SpeciesCreateViewModel {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class Species {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/species`;

  getSpecies(): Observable<SpeciesViewModel[]> {
    return this.http.get<SpeciesViewModel[]>(this.apiUrl);
  }

  getSingleSpecies(id: number): Observable<SpeciesViewModel> {
    return this.http.get<SpeciesViewModel>(`${this.apiUrl}/${id}`);
  }

  createSpecies(species: SpeciesCreateViewModel): Observable<SpeciesViewModel> {
    return this.http.post<SpeciesViewModel>(this.apiUrl, species);
  }

  updateSpecies(id: number, species: SpeciesCreateViewModel): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, species);
  }

  deleteSpecies(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
