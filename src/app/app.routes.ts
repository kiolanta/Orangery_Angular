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

  {
    path: 'locations',
    loadChildren: () => import('./features/locations/locations-module')
      .then(m => m.LocationsModule)
  },

  {
    path: 'species',
    loadChildren: () => import('./features/species/species-module')
      .then(m => m.SpeciesModule)
  },
  
  { path: '**', redirectTo: 'dashboard' }
];