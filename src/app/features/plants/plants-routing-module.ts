import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantsList } from './components/plants-list/plants-list';

const routes: Routes = [
  { path: '', 
    component: PlantsList }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantsRoutingModule { }

