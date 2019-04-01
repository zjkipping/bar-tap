import { Component, Input } from '@angular/core';

import { Order } from '@types';
import { OrderInfoDialogComponent } from '../dialogs/order-info/order-info-dialog.component';
import { MatDialog } from '@angular/material';
import { filter, switchMap, map } from 'rxjs/operators';
import { SnackBarService } from '@services/snackbar/snackbar.service';
import { OrderStatusService } from '@services/order-status/order-status.service';

@Component({
  selector: 'app-order-status-list',
  templateUrl: './order-status-list.component.html',
  styleUrls: ['./order-status-list.component.scss']
})
export class OrderStatusListComponent {
  @Input() orders?: Order[];
  @Input() barId?: string;

  constructor(private dialog: MatDialog, private sbs: SnackBarService, private orderStatusService: OrderStatusService) { }

  displayOrderStatus(order: Order) {
    if (this.barId) {
      this.dialog.open(OrderInfoDialogComponent, {
        data: { order, barID: this.barId },
        width: '600px',
        height: '500px'
      }).afterClosed()
      .pipe(
        filter(choice => !!choice),
        switchMap((choice: string) => {
          if (choice === 'delivery') {
            return this.orderStatusService.transitionOrderToDelivering(this.barId as string, order.uid).pipe(map(() => choice));
          } else if (choice === 'pickup') {
            return this.orderStatusService.transitionOrderToPickup(this.barId as string, order.uid).pipe(map(() => choice));
          } else {
            return this.orderStatusService.transitionOrderToFinished(this.barId as string, order.uid).pipe(map(() => choice));
          }
        })
      ).subscribe(
        (choice: string) => this.sbs.openSuccess(
          `Order successfully transitioned to: ${choice.charAt(0).toUpperCase() + choice.slice(1)}`,
          3000
        ),
        error => this.sbs.openError(error.message, 3000)
      );
    }
  }
}
