import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Dashboard } from '../../services/dashboard';
import { DashboardData } from '../../interfaces/dashboard.interface';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {
  private readonly dashboardService = inject(Dashboard);
  
  dashboardData: DashboardData | null = null;
  isLoading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    console.log('Завантаження даних дашборду...');
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        console.log('Дані отримано:', data);
        this.dashboardData = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Детальна помилка:', err);
        console.error('Статус:', err.status);
        console.error('Повідомлення:', err.message);
        console.error('URL:', err.url);
        this.error = `Помилка завантаження даних: ${err.status || 'Немає звязку'} - ${err.message}`;
        this.isLoading = false;
      }
    });
  }
}
