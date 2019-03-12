import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AnalyticsComponent } from '../../analytics/analytics.component';
import { Order, Log, Drink } from '@types';
import { BarTapApi } from '@api';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-order-info-dialog',
  templateUrl: './order-info-dialog.component.html',
  styleUrls: ['./order-info-dialog.component.scss']
})
export class OrderInfoDialogComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price'];
  testBarID = 'rDdQClImI6N4RtQVuGGO';
  log: Log;
  order: Observable<Order | undefined>;

  constructor(bt: BarTapApi,
    private dr: MatDialogRef<AnalyticsComponent>,
    @Inject(MAT_DIALOG_DATA) data: Log) {
      this.log = data;
      this.order = bt.getBarOrder(this.testBarID, this.log.orderId);
   }

  ngOnInit() {
  }

  close() {
    this.dr.close();
  }

}
