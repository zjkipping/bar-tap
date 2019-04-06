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

const routes: Routes = [
  {
    path: '',
    component: ConsumersDashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'bars', component: BarsComponent },
      { path: 'bars/:uid', component: BarMenuComponent },
      {
        path: 'favorites',
        component: FavoritesComponent,
        data: {
          redirect: ['', ''],
          requiredAuthState: true,
          userType: CONSUMER_USER_TYPE
        },
        canActivate: [AuthGuardService]
      },
      {
        path: 'history',
        component: HistoryComponent,
        data: {
          redirect: ['', ''],
          requiredAuthState: true,
          userType: CONSUMER_USER_TYPE
        },
        canActivate: [AuthGuardService]
      },
      {
        path: 'tracker',
        component: TrackerComponent,
        data: {
          redirect: ['', ''],
          requiredAuthState: true,
          userType: CONSUMER_USER_TYPE
        },
        canActivate: [AuthGuardService]
      },
      {
        path: 'tracker/:barid/:oid',
        component: TrackerDetailsComponent,
        data: {
          redirect: ['', ''],
          requiredAuthState: true
        },
        canActivate: [AuthGuardService]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {
          redirect: ['', ''],
          requiredAuthState: true,
          userType: CONSUMER_USER_TYPE
        },
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
