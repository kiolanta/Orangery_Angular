import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Care } from '../interfaces/care.interface';

@Injectable({ providedIn: 'root' })
export class CareService {
  private apiUrl = '/api/cares';

  constructor(private http: HttpClient) {}

  getCares(): Observable<Care[]> {
    console.log('Запит на:', this.apiUrl);
    return this.http.get<Care[]>(this.apiUrl).pipe(
      tap(data => console.log('Сирові дані від API:', data))
    );
  }

  getCare(id: number): Observable<Care> {
    return this.http.get<Care>(`${this.apiUrl}/${id}`);
  }

  addCare(care: Omit<Care, 'id'>): Observable<Care> {
    return this.http.post<Care>(this.apiUrl, care);
  }

  updateCare(care: Care): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${care.id}`, care);
  }

  deleteCare(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
