import { Component, Input } from '@angular/core';

import { Order } from '@types';

@Component({
  selector: 'app-order-queue-item',
  templateUrl: './order-queue-item.component.html',
  styleUrls: ['./order-queue-item.component.scss']
})
export class OrderQueueItemComponent {
  @Input() order?: Order;

  constructor() { }
}
