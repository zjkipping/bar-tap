import { Component, Inject } from '@angular/core';
import { Cart } from '../../../services/cart.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
  MatDialog
} from '@angular/material';
import { CheckoutComponent } from '../../dialogs/menu/checkout/checkout.component';
import { SnackBarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-shopping-cart',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms', style({ opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  trackByIndex = (index: number) => index;
  quantity = new FormControl(1, Validators.required);
  editCart: boolean;

  constructor(
    public cart: Cart,
    private cartRef: MatBottomSheetRef<ShoppingCartComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public barID: string,
    private dialog: MatDialog,
    private sbs: SnackBarService
  ) {
    this.editCart = false;
    this.cartRef.afterDismissed().subscribe(() => {
      this.editCart = false;
    });
  }

  checkout() {
    if (this.editCart == true) {
      this.sbs.openError(
        'You need to save your cart before checking out.',
        2000
      );
      return;
    } else if (!this.cart.total) {
      this.sbs.openError('You have no items in your cart.', 2000);
      return;
    }

    this.cartRef.dismiss({
      openCheckout: true
    });
  }

  editCartButton() {
    this.editCart = !this.editCart;
  }
}
