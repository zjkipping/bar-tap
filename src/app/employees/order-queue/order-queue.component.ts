import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { filter, switchMap } from 'rxjs/operators';

import { Order, Employee } from '@types';
import { StartOrderDialogComponent } from '../dialogs/start-order/start-order-dialog.component';
import { OrderStatusService } from '@services/order-status/order-status.service';
import { SnackBarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-order-queue',
  templateUrl: './order-queue.component.html',
  styleUrls: ['./order-queue.component.scss']
})
export class OrderQueueComponent {
  @Input() orders?: Order[];
  @Input() barId?: string;

  constructor(private dialog: MatDialog, private orderStatusService: OrderStatusService, private sbs: SnackBarService) { }

  startNextDrink() {
    if (this.orders && this.orders.length > 0 && this.barId) {
      const order = this.orders[0];
      this.dialog.open(StartOrderDialogComponent, {
        data: { order, barID: this.barId },
        width: '600px',
        height: '500px'
      }).afterClosed().pipe(
        filter(employee => !!employee),
        switchMap(employee => this.orderStatusService.transitionOrderToInProgress(this.barId as string, order.uid, employee.uid))
      ).subscribe(
        () => this.sbs.openSuccess('Order started successfully', 3000),
        error => this.sbs.openError(error.message, 3000)
      );
    }
  }
}
