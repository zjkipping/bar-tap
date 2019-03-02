import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from 'time-ago-pipe';

import { MaterialModule } from '../material.module';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesDashboardComponent } from './employees-dashboard.component';
import { OrderQueueComponent } from './order-queue/order-queue.component';
import { OrderQueueItemComponent } from './order-queue/order-queue-item/order-queue-item.component';
import { OrderStatusListComponent } from './order-status-list/order-status-list.component';
import { EmployeeLoginComponent } from './login/employee-login.component';
import { EmployeeStatusListComponent } from './employee-status-list/employe-status-list.component';
import { OrderStatusComponent } from './order-status-list/order-status/order-status.component';

@NgModule({
  declarations: [
    EmployeesDashboardComponent,
    OrderQueueComponent,
    OrderQueueItemComponent,
    OrderStatusListComponent,
    OrderStatusComponent,
    EmployeeLoginComponent,
    EmployeeStatusListComponent,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
})
export class EmployeesModule {}
