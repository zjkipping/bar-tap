import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { OrderInfoDialogComponent } from './order-info/order-info-dialog.component';
import { DrinkInfoComponent } from './drink-info/drink-info.component';
import { EmployeClockerDialogComponent } from './employee-clocker/employee-clocker-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StartOrderDialogComponent } from './start-order/start-order-dialog.component';

@NgModule({
  declarations: [
    OrderInfoDialogComponent,
    DrinkInfoComponent,
    EmployeClockerDialogComponent,
    StartOrderDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    OrderInfoDialogComponent,
    EmployeClockerDialogComponent,
    StartOrderDialogComponent
  ]
})
export class DialogsModule { }
