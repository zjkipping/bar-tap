import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import {
  Order,
  Bar,
  CartItem,
  ExpandedDrinkData,
  EmployeesUser,
  Employee
} from '@types';
import { BarTapApi } from '@api';
import { EmployeesService } from 'src/app/employees/employees.service';
import { STATUS_MESSAGE } from '@constants';

@Component({
  selector: 'app-tracker-details',
  templateUrl: './tracker-details.component.html',
  styleUrls: ['./tracker-details.component.scss']
})
export class TrackerDetailsComponent {
  order: Observable<Order | undefined>;
  bar: Observable<Bar | undefined>;
  employee?: Observable<Employee | undefined>;
  message: Observable<string | undefined>;
  // drinks: Observable<ExpandedDrinkData[]>;

  constructor(
    private route: ActivatedRoute,
    private api: BarTapApi,
    employeesService: EmployeesService
  ) {
    this.order = route.params.pipe(
      switchMap(params => this.api.getBarOrder(params['barid'], params['oid']))
    );

    this.bar = route.params.pipe(
      switchMap(params => this.api.getBar(params['barid']))
    );

    this.message = this.order.pipe(
      map(order => {
        if (order) {
          return this.getStatusMessage(order);
        }
      })
    );
  }

  getStatusMessage(order: Order): string {
    // if (order.employeeId) {
    //   this.employee = this.bar.pipe(
    //     switchMap(bar => {
    //       if (bar && order.employeeId) {
    //         return this.api.getBarEmployee(bar.uid, order.employeeId);
    //       } else {
    //         return of(undefined);
    //       }
    //     })
    //   );
    // }
    // if (this.employee) {
    //   this.employee.subscribe(employee => {
    //   });
    // }
    // if (this.employee && order.status == IN_PROGRESS_ORDER_STATUS) {
    //   const message = this.employee.pipe(
    //     map(employee => {
    //       if (employee) {
    //         return STATUS_MESSAGE[order.status] + employee.firstName;
    //       }

    //     })
    //   );
    // }
    return STATUS_MESSAGE[order.status]
      ? STATUS_MESSAGE[order.status]
      : 'Unavailable';
  }
}
