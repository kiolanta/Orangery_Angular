import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CareGuideViewModel, CareGuideCreateViewModel } from '../../../core/interfaces';

@Injectable({ providedIn: 'root' })
export class CareGuides {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/careguides`;

  getCareGuides(): Observable<CareGuideViewModel[]> {
    return this.http.get<CareGuideViewModel[]>(this.apiUrl);
  }

  getCareGuide(id: number): Observable<CareGuideViewModel> {
    return this.http.get<CareGuideViewModel>(`${this.apiUrl}/${id}`);
  }

  createCareGuide(payload: CareGuideCreateViewModel): Observable<CareGuideViewModel> {
    return this.http.post<CareGuideViewModel>(this.apiUrl, payload);
  }

  updateCareGuide(id: number, payload: CareGuideViewModel): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, payload);
  }

  deleteCareGuide(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
