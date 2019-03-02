import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { OrderInfoDialogComponent } from './order-info/order-info-dialog.component';
import { DrinkInfoComponent } from './order-info/drink-info/drink-info.component';

@NgModule({
  declarations: [
    OrderInfoDialogComponent,
    DrinkInfoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [
    OrderInfoDialogComponent
  ]
})
export class DialogsModule { }
