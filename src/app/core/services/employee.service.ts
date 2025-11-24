import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Employee, EmployeeViewModel, EmployeeCreateViewModel } from '../interfaces/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/employees`;

  getEmployees(): Observable<EmployeeViewModel[]> {
    return this.http.get<EmployeeViewModel[]>(this.apiUrl);
  }

  getEmployee(id: number): Observable<EmployeeViewModel> {
    return this.http.get<EmployeeViewModel>(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: EmployeeCreateViewModel): Observable<EmployeeViewModel> {
    return this.http.post<EmployeeViewModel>(this.apiUrl, employee);
  }

  updateEmployee(id: number, employee: EmployeeViewModel): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
