import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', 
    redirectTo: 'dashboard', 
    pathMatch: 'full' },

  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard-module')
      .then(m => m.DashboardModule)
  },

  {
    path: 'plants',
    loadChildren: () => import('./features/plants/plants-module')
      .then(m => m.PlantsModule)
  },

  {
    path: 'employees',
    loadChildren: () => import('./features/employees/employees-module')
      .then(m => m.EmployeesModule)
  },
  
  { path: '**', redirectTo: 'dashboard' }
];