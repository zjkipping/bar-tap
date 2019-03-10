import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { BarTapApi } from '@api';
import { Order, Employee } from '@types';
import { NEW_ORDER_TYPE, IN_PROGRESS_ORDER_TYPE, DELIVERY_ORDER_TYPE } from '@constants';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  newOrders: Observable<Order[]>;
  ordersInProgress: Observable<Order[]>;
  employees: Observable<Employee[]>;

  constructor(auth: AuthService, api: BarTapApi) {
    this.newOrders = auth.getUserAsEmployeeAuth().pipe(
      switchMap(user => api.getBarOrdersByType(user.barId, NEW_ORDER_TYPE))
    );

    this.ordersInProgress = auth.getUserAsEmployeeAuth().pipe(
      switchMap(user => api.getBarOrdersByTypes(user.barId, [IN_PROGRESS_ORDER_TYPE, DELIVERY_ORDER_TYPE]))
    );

    this.employees = auth.getUserAsEmployeeAuth().pipe(
      switchMap(user => api.getBarEmployees(user.barId))
    );
  }
}
