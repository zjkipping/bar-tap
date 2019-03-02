import { Component, Input } from '@angular/core';

import { Order } from '@types';

@Component({
  selector: 'app-order-status-list',
  templateUrl: './order-status-list.component.html',
  styleUrls: ['./order-status-list.component.scss']
})
export class OrderStatusListComponent {
  @Input() orders?: Order[];

  constructor() { }
}
