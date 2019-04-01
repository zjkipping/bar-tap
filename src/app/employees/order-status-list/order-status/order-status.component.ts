import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '@types';
import { MatDialog } from '@angular/material';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent {
  @Input() order?: Order;
  @Output() openOrderInfo = new EventEmitter();
}
