import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConsumersRoutingModule } from './consumers-routing.module';
import { ConsumersDashboardComponent } from './consumers-dashboard.component';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './home/home.component';
import { BarsComponent } from './bars/bars.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { DialogsModule } from './dialogs/dialogs.module';
import { BarMenuComponent } from './bars/bar-menu/bar-menu.component';
import { ShoppingCartComponent } from './bars/shopping-cart/shopping-cart.component';
import { DrinksPanelComponent } from './bars/bar-menu/drinks-panel/drinks-panel.component';
import { BarsListComponent } from './bars/bars-list/bars-list.component';

@NgModule({
  declarations: [
    ConsumersDashboardComponent,
    HomeComponent,
    BarsComponent,
    FavoritesComponent,
    HistoryComponent,
    SettingsComponent,
    BarMenuComponent,
    ShoppingCartComponent,
    DrinksPanelComponent,
    BarsListComponent,
  ],
  imports: [
    CommonModule,
    ConsumersRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DialogsModule
  ],
  entryComponents: [ShoppingCartComponent]
})
export class ConsumersModule {
  constructor() {}
}
