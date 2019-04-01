import { Component } from '@angular/core';
import { EmployeesService } from './employees.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Order, Employee } from '@types';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-employees-dashboard',
  templateUrl: './employees-dashboard.component.html',
  styleUrls: ['./employees-dashboard.component.scss']
})
export class EmployeesDashboardComponent {
  newOrders: Observable<Order[]>;
  ordersInProgress: Observable<Order[]>;
  employees: Observable<Employee[]>;
  barId: Observable<string>;

  constructor(
    employeesService: EmployeesService,
    private auth: AuthService,
    private router: Router
  ) {
    this.barId = this.auth.getUserAsEmployeeAuth().pipe(
      map(user => user.barId)
    );
    this.newOrders = employeesService.newOrders;
    this.employees = employeesService.employees;
    this.ordersInProgress = employeesService.ordersInProgress;
  }

  logout() {
    this.auth.logout().subscribe(() => this.router.navigate(['employees', 'login']));
  }
}
