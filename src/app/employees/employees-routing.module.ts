import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { EmployeesDashboardComponent } from './employees-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesDashboardComponent,
    // children: [

    // ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class EmployeesRoutingModule {}