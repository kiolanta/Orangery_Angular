import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing-module';
import { EmployeesList } from './components/employees-list/employees-list';

@NgModule({
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    EmployeesList
  ]
})
export class EmployeesModule { }
