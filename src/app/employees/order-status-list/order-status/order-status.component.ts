import { Component, Input } from '@angular/core';
import { Order } from '@types';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent {
  @Input() order?: Order;

  constructor() { }

  openOrderInfo() {
    
  }
}
