import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumersRoutingModule } from './consumers-routing.module';
import { ConsumersDashboardComponent } from './consumers-dashboard.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    ConsumersDashboardComponent
  ],
  imports: [
    CommonModule,
    ConsumersRoutingModule,
    MaterialModule
  ],
})
export class ConsumersModule {}
