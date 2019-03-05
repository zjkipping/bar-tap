import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsumersDashboardComponent } from './consumers-dashboard.component';
import { HomeComponent } from './home/home.component';
import { BarsComponent } from './bars/bars.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: ConsumersDashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'bars', component: BarsComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumersRoutingModule {}
