import { Component, Input, OnInit } from '@angular/core';

import { Order } from '@types';

@Component({
  selector: 'app-order-queue-item',
  templateUrl: './order-queue-item.component.html',
  styleUrls: ['./order-queue-item.component.scss']
})
export class OrderQueueItemComponent implements OnInit {
  @Input() order?: Order;

  drinkCount = 0;

  ngOnInit() {
    if (this.order) {
      this.drinkCount = this.order.drinks.map(drink => drink.quantity).reduce((sum, val) => sum + val);
    }
  }
}
