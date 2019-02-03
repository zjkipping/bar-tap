import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' }, // owner
  { path: 'employees', loadChildren: './employees/employees.module#EmployeesModule' }, // employees
  { path: '', loadChildren: './consumers/consumers.module#ConsumersModule' }, // consumer
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
