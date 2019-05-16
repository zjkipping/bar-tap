import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Added Componenet for Modules
import { MaterialModule } from '../material.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DrinksComponent } from './drinks/drinks.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { EmployeesComponent } from './employees/employees.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { DialogsModule } from './dialogs/dialogs.module';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    DrinksComponent,
    AnalyticsComponent,
    EmployeesComponent,
    SettingsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DialogsModule
  ]
})
export class AdminModule {}
