import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { DrinksComponent } from './drinks/drinks.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { RouteAuthData } from '@types';
import { OWNER_USER_TYPE } from '@constants';
import { AuthGuardService } from '@services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'drinks',
        component: DrinksComponent,
        data: {
          userType: OWNER_USER_TYPE
        } as RouteAuthData,
        canActivate: [AuthGuardService]
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
        data: {
          userType: OWNER_USER_TYPE
        } as RouteAuthData,
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
