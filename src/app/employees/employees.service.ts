import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';

import { BarTapApi } from '@api';
import { Order, Employee, Drink } from '@types';
import { NEW_ORDER_STATUS, IN_PROGRESS_ORDER_STATUS, DELIVERY_ORDER_STATUS, PICKUP_ORDER_STATUS } from '@constants';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  newOrders: Observable<Order[]>;
  ordersInProgress: Observable<Order[]>;
  employees: Observable<Employee[]>;

  constructor(auth: AuthService, private api: BarTapApi) {
    this.newOrders = auth.getUserAsEmployeeAuth().pipe(
      switchMap(user => api.getBarOrdersByType(user.barId, NEW_ORDER_STATUS))
    );

    this.ordersInProgress = auth.getUserAsEmployeeAuth().pipe(
      switchMap(user => api.getBarOrdersByTypes(user.barId, [IN_PROGRESS_ORDER_STATUS, PICKUP_ORDER_STATUS, DELIVERY_ORDER_STATUS]))
    );

    this.employees = auth.getUserAsEmployeeAuth().pipe(
      switchMap(user => api.getCheckedInEmployees(user.uid, user.barId))
    );
  }

  getDrinksFromIDs(ids: string[], barID: string) {
    return combineLatest(...ids.map(id => this.api.getBarDrink(barID, id))).pipe(
      filter((drinks): drinks is Drink[] => !!drinks)
    );
  }
}
