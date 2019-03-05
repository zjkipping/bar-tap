import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { LoginDialogComponent } from './home/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './home/register-dialog/register-dialog.component';
import { LogoutDialogComponent } from './home/logout-dialog/logout-dialog.component';
import { AddToCartComponent } from './menu/add-to-cart/add-to-cart.component';
import { SuccessNotificationComponent } from './menu/success-notification/success-notification.component';

@NgModule({
  declarations: [
    LoginDialogComponent,
    RegisterDialogComponent,
    LogoutDialogComponent,
    AddToCartComponent,
    SuccessNotificationComponent
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  entryComponents: [
    LoginDialogComponent,
    RegisterDialogComponent,
    LogoutDialogComponent,
    AddToCartComponent,
    SuccessNotificationComponent
  ]
})
export class DialogsModule {}
