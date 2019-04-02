import { Component, Input } from '@angular/core';

import { Order } from '@types';
import { STATUS_DISPLAY } from '@constants';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent {
  @Input() order?: Order;

  statusDisplay = STATUS_DISPLAY;
}
