import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsListComponent } from './components/locations-list/locations-list';

const routes: Routes = [
  {
    path: '',
    component: LocationsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
