import { Component, Inject } from '@angular/core';
import { Order } from '@types';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-order-info-dialog',
  templateUrl: './order-info-dialog.component.html',
  styleUrls: ['./order-info-dialog.component.scss']
})
export class OrderInfoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public order: Order) {

  }
}
