import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Order } from '@types';
import { OrderInfoDialogComponent } from '../dialogs/order-info/order-info-dialog.component';

@Component({
  selector: 'app-order-queue',
  templateUrl: './order-queue.component.html',
  styleUrls: ['./order-queue.component.scss']
})
export class OrderQueueComponent {
  @Input() orders?: Order[];

  constructor(private dialog: MatDialog) { }

  startNextDrink() {
    if (this.orders && this.orders.length > 0) {
      this.dialog.open(OrderInfoDialogComponent, {
        data: this.orders[0],
        width: '600px',
        height: '500px'
      }).afterClosed().subscribe(choice => {
        console.log(choice);
      });
    }
  }
}
