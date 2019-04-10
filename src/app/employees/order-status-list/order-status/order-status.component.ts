import { Component, Input } from '@angular/core';

import { Order } from '@types';
import {
  IN_PROGRESS_ORDER_STATUS,
  DELIVERY_ORDER_STATUS,
  PICKUP_ORDER_STATUS,
} from '@constants';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent {
  @Input() order?: Order;

  statusDisplay: { [key: string]: string } = {
    [IN_PROGRESS_ORDER_STATUS]: 'In Progress',
    [DELIVERY_ORDER_STATUS]: 'Delivering',
    [PICKUP_ORDER_STATUS]: 'Pickup',
  };
}
