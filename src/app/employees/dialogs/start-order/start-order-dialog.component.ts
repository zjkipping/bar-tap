import { Component, Inject } from '@angular/core';
import { Order, Employee, ExpandedDrinkData } from '@types';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { EmployeesService } from '../../employees.service';

@Component({
  selector: 'app-start-order-dialog',
  templateUrl: './start-order-dialog.component.html',
  styleUrls: ['./start-order-dialog.component.scss']
})
export class StartOrderDialogComponent {
  drinks: Observable<ExpandedDrinkData[]>;
  employees: Observable<Employee[]>;
  selectedEmployee?: Employee;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { order: Order; barID: string },
    employeesService: EmployeesService
  ) {
    this.employees = employeesService.employees;
    this.drinks = employeesService.getDrinksFromIDs(data.order.drinks, data.barID);
  }

  selectEmployee(employee: Employee) {
    this.selectedEmployee = employee;
  }
}
