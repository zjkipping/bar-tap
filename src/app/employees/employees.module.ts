import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesDashboardComponent } from './employees-dashboard.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    EmployeesDashboardComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MaterialModule
  ],
})
export class EmployeesModule {}
