import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DashboardData } from '../interfaces/dashboard.interface';
import { PlantViewModel } from '../../plants/interfaces/plant.interface';
import { EmployeeViewModel } from '../../../core/interfaces/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class Dashboard {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getDashboardData(): Observable<DashboardData> {
    return forkJoin({
      plants: this.http.get<PlantViewModel[]>(`${this.apiUrl}/Plants`),
      employees: this.http.get<EmployeeViewModel[]>(`${this.apiUrl}/employees`)
    }).pipe(
      map(({ plants, employees }) => ({
        totalPlants: plants.length,
        totalEmployees: employees.length,
        activeSensors: 0, 
        recentActivity: []
      }))
    );
  }
}
