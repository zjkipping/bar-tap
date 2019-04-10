import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsumersDashboardComponent } from './consumers-dashboard.component';
import { HomeComponent } from './home/home.component';
import { BarsComponent } from './bars/bars.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuardService } from '@services/auth/auth-guard.service';
import { BarMenuComponent } from './bars/bar-menu/bar-menu.component';
import { TrackerComponent } from './tracker/tracker.component';
import { TrackerDetailsComponent } from './tracker/tracker-details/tracker-details.component';
import { CONSUMER_USER_TYPE } from '@constants';
import { RouteAuthData } from '@types';

const routes: Routes = [
  {
    path: '',
    component: ConsumersDashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          redirect: ['', 'bars'],
          requireAuthCheck: true,
          authState: false,
          userType: CONSUMER_USER_TYPE
        } as RouteAuthData,
        canActivate: [AuthGuardService]
      },
      {
        path: 'bars',
        component: BarsComponent,
        data: {
          userType: CONSUMER_USER_TYPE
        } as RouteAuthData,
        canActivate: [AuthGuardService]
      },
      {
        path: 'bars/:uid',
        component: BarMenuComponent,
        data: {
          userType: CONSUMER_USER_TYPE
        } as RouteAuthData,
        canActivate: [AuthGuardService]
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
        data: {
          redirect: ['', ''],
          requireAuthCheck: true,
          authState: true,
          userType: CONSUMER_USER_TYPE
        } as RouteAuthData,
        canActivate: [AuthGuardService]
      },
      {
        path: 'history',
        component: HistoryComponent,
        data: {
          redirect: ['', ''],
          requireAuthCheck: true,
          authState: true,
          userType: CONSUMER_USER_TYPE
        } as RouteAuthData,
        canActivate: [AuthGuardService]
      },
      {
        path: 'tracker',
        component: TrackerComponent,
        data: {
          redirect: ['', ''],
          requireAuthCheck: true,
          authState: true,
          userType: CONSUMER_USER_TYPE
        } as RouteAuthData,
        canActivate: [AuthGuardService]
      },
      {
        path: 'tracker/:barid/:oid',
        component: TrackerDetailsComponent,
        data: {
          userType: CONSUMER_USER_TYPE
        } as RouteAuthData,
        canActivate: [AuthGuardService]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {
          redirect: ['', ''],
          requireAuthCheck: true,
          authState: true,
          userType: CONSUMER_USER_TYPE
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
export class ConsumersRoutingModule {}
