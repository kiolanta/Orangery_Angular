import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantsList } from './components/plants-list/plants-list';
import { CareJournalPageComponent } from './components/care-journal-page/care-journal-page';

const routes: Routes = [
  { path: '', component: PlantsList },
  { path: 'care-journal', component: CareJournalPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantsRoutingModule { }

