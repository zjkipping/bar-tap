import { Component, Inject } from '@angular/core';
import { Order, Drink } from '@types';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { EmployeesService } from '../../employees.service';

@Component({
  selector: 'app-order-info-dialog',
  templateUrl: './order-info-dialog.component.html',
  styleUrls: ['./order-info-dialog.component.scss']
})
export class OrderInfoDialogComponent {
  // drinks: Observable<Drink[]>;
  status: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { order: Order; barID: string },
    employeesService: EmployeesService
  ) {
    this.status = data.order.status;
    // this.drinks = employeesService.getDrinksFromIDs(data.order.drinks.map(drink => drink.id), data.barID);
  }
}
