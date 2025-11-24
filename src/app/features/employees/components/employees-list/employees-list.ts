import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../../core/services/employee.service';
import { EmployeeViewModel, EmployeeCreateViewModel } from '../../../../core/interfaces/employee.interface';
import { EmployeeForm } from '../employee-form/employee-form';

@Component({
  selector: 'app-employees-list',
  imports: [CommonModule, EmployeeForm],
  templateUrl: './employees-list.html',
  styleUrl: './employees-list.scss',
})
export class EmployeesList implements OnInit {
  private readonly employeeService = inject(EmployeeService);
  
  employees: EmployeeViewModel[] = [];
  isLoading = true;
  error: string | null = null;
  showForm = false;
  selectedEmployee: EmployeeViewModel | null = null;

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    console.log('Завантаження працівників...');
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        console.log('Працівники отримано:', data);
        this.employees = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Детальна помилка:', err);
        console.error('Статус:', err.status);
        console.error('Повідомлення:', err.message);
        console.error('URL:', err.url);
        this.error = `Помилка завантаження працівників: ${err.status || 'Немає звязку'} - ${err.message}`;
        this.isLoading = false;
      }
    });
  }

  openAddForm(): void {
    this.selectedEmployee = null;
    this.showForm = true;
  }

  openEditForm(employee: EmployeeViewModel): void {
    this.selectedEmployee = employee;
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.selectedEmployee = null;
  }

  onFormSubmit(employee: EmployeeCreateViewModel | EmployeeViewModel): void {
    if ('id' in employee) {
      // Update existing employee
      this.employeeService.updateEmployee(employee.id, employee).subscribe({
        next: () => {
          this.loadEmployees();
          this.closeForm();
        },
        error: (err) => {
          alert('Помилка оновлення');
          console.error('Помилка:', err);
        }
      });
    } else {
      // Create new employee
      this.employeeService.createEmployee(employee).subscribe({
        next: () => {
          this.loadEmployees();
          this.closeForm();
        },
        error: (err) => {
          alert('Помилка створення');
          console.error('Помилка:', err);
        }
      });
    }
  }

  deleteEmployee(id: number): void {
    if (confirm('Ви впевнені, що хочете видалити цього працівника?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees();
        },
        error: (err) => {
          alert('Помилка видалення');
          console.error('Помилка:', err);
        }
      });
    }
  }
}
