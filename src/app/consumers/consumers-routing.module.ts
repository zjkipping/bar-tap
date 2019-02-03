import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ConsumersDashboardComponent } from './consumers-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ConsumersDashboardComponent,
    // children: [

    // ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ],
})
export class ConsumersRoutingModule {}
