import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';

// Added imports to the admin side
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { DeleteEmployeeComponent } from './employee/delete-employee/delete-employee.component';
import { RegisterDialogComponent } from './home/register-dialog/register-dialog.component';
import { LoginDialogComponent } from './home/login-dialog/login-dialog.component';
import { LogoutDialogComponent } from './home/logout-dialog/logout.dialog.component';
import { EditSettingsComponent } from './settings/edit-settings.component';
import { EditHoursComponent } from './hours/edit-hours.component';
import { EditDrinkDialogComponent } from './edit-drink-dialog/edit-drink-dialog.component';
import { DeleteDrinkDialogComponent } from './delete-drink-dialog/delete-drink-dialog.component';
import { OrderDrinkInfoComponent } from './order-drink-info/order-drink-info.component';
import { MaterialModule } from 'src/app/material.module';
import { OrderEmployeeNameComponent } from './order-employee-name/order-employee-name.component';
import { OrderInfoDialogComponent } from './order-info-dialog/order-info-dialog.component';

@NgModule({
    imports: [
        MatDialogModule, CommonModule, FormsModule, ReactiveFormsModule, MaterialModule
    ],
    declarations: [
        CreateEmployeeComponent,
        DeleteEmployeeComponent,
        RegisterDialogComponent,
        LoginDialogComponent,
        LogoutDialogComponent,
        EditSettingsComponent,
        EditHoursComponent,
        EditDrinkDialogComponent,
        DeleteDrinkDialogComponent,
        OrderDrinkInfoComponent,
        OrderEmployeeNameComponent,
        OrderInfoDialogComponent,
    ],
    entryComponents: [
        CreateEmployeeComponent,
        DeleteEmployeeComponent,
        RegisterDialogComponent,
        LoginDialogComponent,
        LogoutDialogComponent,
        EditSettingsComponent,
        EditHoursComponent,
        EditDrinkDialogComponent,
        DeleteDrinkDialogComponent,
        OrderDrinkInfoComponent,
        OrderInfoDialogComponent
    ],
    exports: [
        OrderEmployeeNameComponent
    ]
})
export class DialogsModule {}
