import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesDashboardComponent } from './employees-dashboard.component';
import { MaterialModule } from '../material.module';
import { NameComponent } from './name.component';

@NgModule({
  declarations: [
    EmployeesDashboardComponent,
    NameComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MaterialModule
  ],
})
export class EmployeesModule {}
