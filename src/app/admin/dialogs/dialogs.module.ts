import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogModule } from '@angular/material';
// Added imports to the admin side
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { DeleteEmployeeComponent } from './employee/delete-employee/delete-employee.component';
import { EmployeesComponent } from '../employees/employees.component';
import { RegisterDialogComponent } from './home/register-dialog/register-dialog.component';
import { LoginDialogComponent } from './home/login-dialog/login-dialog.component';
import { LogoutDialogComponent } from './home/logout-dialog/logout.dialog.component';
import { EditSettingsComponent } from './settings/edit-settings.component';

@NgModule({
    imports: [
        MatDialogModule, CommonModule, FormsModule, ReactiveFormsModule, MaterialModule
    ],
    declarations: [
        CreateEmployeeComponent,
        DeleteEmployeeComponent,
        EmployeesComponent,
        RegisterDialogComponent,
        LoginDialogComponent,
        LogoutDialogComponent,
        EditSettingsComponent
    ],
    entryComponents: [
        CreateEmployeeComponent,
        DeleteEmployeeComponent,
        EmployeesComponent,
        RegisterDialogComponent,
        LoginDialogComponent,
        LogoutDialogComponent,
        EditSettingsComponent
    ]
})
export class DialogsModule {}