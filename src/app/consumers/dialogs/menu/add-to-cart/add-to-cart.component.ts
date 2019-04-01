import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatSnackBar,
  MatDialogRef
} from '@angular/material';

import { FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Drink } from '@types';
import { Cart } from '@services/cart.service';
import { SnackBarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent {
  quantity = new FormControl(1, Validators.required);
  total: Observable<number>;

  constructor(
    private cart: Cart,
    private sbs: SnackBarService,
    private dialogRef: MatDialogRef<AddToCartComponent>,
    @Inject(MAT_DIALOG_DATA) public drink: Drink
  ) {
    this.total = this.quantity.valueChanges.pipe(
      startWith(this.quantity.value),
      map(value => value * this.drink.price)
    );
  }

  addToCart() {
    this.cart.addDrink(this.drink, this.quantity.value);
    this.sbs.openSuccess('Drink added to cart successfully', 3000);
    this.dialogRef.close();
  }
}
