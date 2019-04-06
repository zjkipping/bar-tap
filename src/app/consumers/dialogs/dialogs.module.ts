import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { LoginDialogComponent } from './home/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './home/register-dialog/register-dialog.component';
import { LogoutDialogComponent } from './home/logout-dialog/logout-dialog.component';
import { AddToCartComponent } from './menu/add-to-cart/add-to-cart.component';
import { PersonalDialogComponent } from './settings/personal-dialog/personal-dialog.component';
import { BillingDialogComponent } from './settings/billing-dialog/billing-dialog.component';
import { EditCardDialogComponent } from './settings/card-dialog/edit-card-dialog.component';
import { AddCardDialogComponent } from './settings/add-card-dialog/add-card-dialog.component';
import { CheckoutComponent } from './menu/checkout/checkout.component';
import { UserAgreementComponent } from './menu/user-agreement/user-agreement.component';

@NgModule({
  declarations: [
    LoginDialogComponent,
    RegisterDialogComponent,
    LogoutDialogComponent,
    AddToCartComponent,
    PersonalDialogComponent,
    BillingDialogComponent,
    EditCardDialogComponent,
    AddCardDialogComponent,
    UserAgreementComponent
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  entryComponents: [
    LoginDialogComponent,
    RegisterDialogComponent,
    LogoutDialogComponent,
    AddToCartComponent,
    PersonalDialogComponent,
    BillingDialogComponent,
    EditCardDialogComponent,
    AddCardDialogComponent,
    CheckoutComponent,
    UserAgreementComponent
  ]
})
export class DialogsModule {}
