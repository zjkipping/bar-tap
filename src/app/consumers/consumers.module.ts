import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ConsumersRoutingModule } from "./consumers-routing.module";
import { ConsumersDashboardComponent } from "./consumers-dashboard.component";
import { MaterialModule } from "../material.module";
import { HomeComponent } from "./home/home.component";
import { BarsComponent } from "./bars/bars.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { HistoryComponent } from "./history/history.component";
import { SettingsComponent } from "./settings/settings.component";

@NgModule({
  declarations: [
    ConsumersDashboardComponent,
    HomeComponent,
    BarsComponent,
    FavoritesComponent,
    HistoryComponent,
    SettingsComponent
  ],
  imports: [CommonModule, ConsumersRoutingModule, MaterialModule]
})
export class ConsumersModule {}
