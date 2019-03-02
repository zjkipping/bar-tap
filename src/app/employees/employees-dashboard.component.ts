import { Component } from '@angular/core';
import { EmployeesService } from './employees.service';
import { Order, Employee } from '@types';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-dashboard',
  templateUrl: './employees-dashboard.component.html',
  styleUrls: ['./employees-dashboard.component.scss']
})
export class EmployeesDashboardComponent {
  newOrders: Observable<Order[]>;
  ordersInProgress: Observable<Order[]>;
  employees: Observable<Employee[]>;

  constructor(
    employeesService: EmployeesService,
    private auth: AuthService,
    private router: Router
  ) {
    this.newOrders = employeesService.newOrders;
    this.employees = employeesService.employees;
    this.ordersInProgress = employeesService.ordersInProgress;
  }

  logout() {
    this.auth.logout().subscribe(() => this.router.navigate(['employees', 'login']));
  }
}
