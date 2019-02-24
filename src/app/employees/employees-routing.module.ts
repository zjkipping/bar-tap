import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { EmployeesDashboardComponent } from './employees-dashboard.component';
import { NameComponent } from './name.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesDashboardComponent,
    children: [
      { path: ':name', component: NameComponent }
    ]
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