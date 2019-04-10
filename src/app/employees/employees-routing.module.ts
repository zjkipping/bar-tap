import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { EmployeesDashboardComponent } from './employees-dashboard.component';
import { EmployeeLoginComponent } from './login/employee-login.component';
import { AuthGuardService } from '@services/auth/auth-guard.service';
import { EMPLOYEES_USER_TYPE } from '@constants';
import { RouteAuthData } from '@types';

const routes: Routes = [
  {
    path: 'login',
    component: EmployeeLoginComponent,
    data: {
      redirect: ['employees', 'dashboard'],
      requireAuthCheck: true,
      authState: false,
      userType: EMPLOYEES_USER_TYPE
    } as RouteAuthData,
    canActivate: [AuthGuardService]
  },
  {
    path: 'dashboard',
    component: EmployeesDashboardComponent,
    data: {
      redirect: ['employees', 'login'],
      requireAuthCheck: true,
      authState: true,
      userType: EMPLOYEES_USER_TYPE
    } as RouteAuthData,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
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