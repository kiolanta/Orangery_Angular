import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareService } from '../../services/care.service';
import { Care } from '../../interfaces/care.interface';
import { CareFormComponent } from '../care-form/care-form';
import { Plants } from '../../services/plants';
import { PlantViewModel } from '../../interfaces/plant.interface';
import { EmployeeService } from '../../../../core/services/employee.service';
import { EmployeeViewModel } from '../../../../core/interfaces';

@Component({
  selector: 'app-care-journal-page',
  standalone: true,
  imports: [CommonModule, CareFormComponent],
  templateUrl: './care-journal-page.html',
  styleUrls: ['./care-journal-page.scss']
})
export class CareJournalPageComponent implements OnInit {
  private readonly careService = inject(CareService);
  private readonly plantsService = inject(Plants);
  private readonly employeesService = inject(EmployeeService);

  cares: Care[] = [];
  plants: PlantViewModel[] = [];
  employees: EmployeeViewModel[] = [];
  loading = false;
  error: string | null = null;
  showForm = false;

  ngOnInit() {
    this.loadPlants();
    this.loadEmployees();
    this.fetchCares();
  }

  loadPlants(): void {
    this.plantsService.getPlants().subscribe({
      next: (data) => {
        this.plants = data;
      },
      error: (err) => {
        console.error('Помилка завантаження рослин:', err);
      }
    });
  }

  loadEmployees(): void {
    this.employeesService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Помилка завантаження працівників:', err);
      }
    });
  }

  getPlantName(plantId: number): string {
    const plant = this.plants.find(p => p.id === plantId);
    return plant ? plant.name : `ID: ${plantId}`;
  }

  getEmployeeName(employeeId: number): string {
    const employee = this.employees.find(e => e.id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : `ID: ${employeeId}`;
  }

  fetchCares() {
    this.loading = true;
    console.log('Завантаження доглядів...');
    this.careService.getCares().subscribe({
      next: cares => {
        console.log('Дані отримані:', cares);
        console.log('Тип дати:', typeof cares);
        console.log('Довжина:', cares.length);
        this.cares = cares;
        this.loading = false;
      },
      error: err => {
        console.error('Помилка API повна:', err);
        console.error('Status:', err.status);
        console.error('Message:', err.message);
        console.error('Error body:', err.error);
        this.error = `Помилка: ${err.status} - Перевірте консоль API сервера (.NET)`;
        this.loading = false;
      }
    });
  }

  onAddCare(care: Omit<Care, 'id'>) {
    this.loading = true;
    this.careService.addCare(care).subscribe({
      next: () => {
        this.fetchCares();
        this.showForm = false;
      },
      error: () => {
        this.error = 'Помилка додавання';
        this.loading = false;
      }
    });
  }

  onCancelForm() {
    this.showForm = false;
  }
}
