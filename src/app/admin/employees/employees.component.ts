import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator } from '@angular/material';

import { CreateEmployeeComponent } from '../dialogs/employee/create-employee/create-employee.component';
import { DeleteEmployeeComponent } from '../dialogs/employee/delete-employee/delete-employee.component';
import { filter, tap, switchMap } from 'rxjs/operators';
import { AdminService } from '../admin-service.service';
import { Observable } from 'rxjs';
import { Employee } from '@types';
import { AuthService } from '@services/auth/auth.service';
import { SnackBarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent {
  show = {};
  displayedColumns: string[] = ['firstName', 'lastName', 'id', 'pin', 'edit', 'delete'];
  employeesData: Observable<Employee[]>;

  constructor(private dialog: MatDialog, 
              private as: AdminService, 
              private sbs: SnackBarService,
              private auth: AuthService
              ) 
  {

  this.employeesData = this.auth.getUserAsAdminAuth().pipe(
      switchMap(bar => this.as.getEmployees(bar.barId)),
      tap(result => console.log(result))
    );
  }

  // Create employee dialog here
  openCreateEmployeeDialog(): void {
    this.dialog.open(CreateEmployeeComponent).afterClosed().pipe(
      filter(result => !!result),
      tap(result => console.log(result))
    ).subscribe(bar => this.as.createEmployee(bar, bar.barId));
  }
  
  // Edit employee dialog here
  openEditEmployeeDialog(employee: Employee): void {
    this.dialog.open(CreateEmployeeComponent, {data: employee}).afterClosed().pipe(
      filter(result => !!result),
      tap(result => console.log(result))
    ).subscribe(bar => this.as.updateEmployee(bar, bar.barId, employee.uid));
  }

  // Delete employee dialog here
  openDeleteEmployeeDialog(employee: Employee): void {
    this.dialog.open(DeleteEmployeeComponent).afterClosed().pipe(
      filter(result => !!result),
      switchMap(result => {
        return this.auth.getUserAsAdminAuth();
      }),
      switchMap(bar => this.as.deleteEmployee(bar.barId, employee.uid)),
      tap(result => console.log(result))
    ).subscribe(
      () => 
        this.sbs.openSuccess("Employee deleted successfully!", 3000),
        error => this.sbs.openError(error.message, 3000)
    );
  }
}