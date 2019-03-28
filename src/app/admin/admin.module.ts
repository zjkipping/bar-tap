import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Added Componenet for Modules
import { MaterialModule } from '../material.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DrinksComponent } from './drinks/drinks.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { EmployeesComponent } from './employees/employees.component'
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
// Added Components for dialogs
import { CreateEmployeeComponent } from './dialogs/employee/create-employee/create-employee.component';
import { DeleteEmployeeComponent } from './dialogs/employee/delete-employee/delete-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterDialogComponent } from './dialogs/home/register-dialog/register-dialog.component';
import { LoginDialogComponent } from './dialogs/home/login-dialog/login-dialog.component';
import { LogoutDialogComponent } from './dialogs/home/logout-dialog/logout.dialog.component';
import { EditSettingsComponent } from './dialogs/settings/edit-settings.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    DrinksComponent,
    AnalyticsComponent,
    EmployeesComponent,
    SettingsComponent,
    HomeComponent,
    CreateEmployeeComponent,
    DeleteEmployeeComponent,
    RegisterDialogComponent,
    LoginDialogComponent,
    LogoutDialogComponent,
    EditSettingsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    CreateEmployeeComponent,
    DeleteEmployeeComponent,
    RegisterDialogComponent,
    LoginDialogComponent,
    LogoutDialogComponent,
    EditSettingsComponent
  ]
})
export class AdminModule {}
