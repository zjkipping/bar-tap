import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { DrinksComponent } from './drinks/drinks.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { EmployeesComponent } from './employees/employees.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from '@services/auth/auth-guard.service';
import { RouteAuthData } from '@types';
import { OWNER_USER_TYPE } from '@constants';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { 
        path: '', 
        component: HomeComponent,
        data: {
          redirect: ['admin', 'analytics'],
          requireAuthCheck: true,
          authState: false,
          userType: OWNER_USER_TYPE
        } as RouteAuthData,
        canActivate: [AuthGuardService]
      },
      { 
        path: 'analytics',
        component: AnalyticsComponent,
        data: {
          redirect: ['admin', ''],
          requireAuthCheck: true,
          authState: true,
          userType: OWNER_USER_TYPE
        } as RouteAuthData,
        canActivate: [AuthGuardService]
       },
      { 
        path: 'drinks',
        component: DrinksComponent,
        data: {
          redirect: ['admin', ''],
          requireAuthCheck: true,
          authState: true,
          userType: OWNER_USER_TYPE
        } as RouteAuthData,
        canActivate: [AuthGuardService]
      },
      { 
        path: 'employees',
        component: EmployeesComponent,
        data: {
          redirect: ['admin', ''],
          requireAuthCheck: true,
          authState: true,
          userType: OWNER_USER_TYPE
        } as RouteAuthData,
        canActivate: [AuthGuardService]
      },
      { 
        path: 'settings',
        component: SettingsComponent,
        data: {
          redirect: ['admin', ''],
          requireAuthCheck: true,
          authState: true,
          userType: OWNER_USER_TYPE
        } as RouteAuthData,
        canActivate: [AuthGuardService]
      },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
