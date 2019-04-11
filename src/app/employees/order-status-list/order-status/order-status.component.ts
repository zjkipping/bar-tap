import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Order } from '@types';
import {
  IN_PROGRESS_ORDER_STATUS,
  DELIVERY_ORDER_STATUS,
  PICKUP_ORDER_STATUS,
} from '@constants';
import { BarTapApi } from '@api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  @Input() order?: Order;
  @Input() barId?: string;
  employeeId?: Observable<string>;

  statusDisplay: { [key: string]: string } = {
    [IN_PROGRESS_ORDER_STATUS]: 'In Progress',
    [DELIVERY_ORDER_STATUS]: 'Delivering',
    [PICKUP_ORDER_STATUS]: 'Pickup',
  };

  constructor(private api: BarTapApi) { }

  ngOnInit() {
    if (this.order && this.barId) {
      this.employeeId = this.api.getBarEmployee(this.barId, this.order.employeeId as string).pipe(
        map(employee => employee ? employee.id : 'no_employee')
      );
    }
  }
}
