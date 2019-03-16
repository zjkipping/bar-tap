import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

import { Cart } from '@services/cart.service';

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
  showRemove: boolean;

  constructor(
    public cart: Cart,
    private cartRef: MatBottomSheetRef<ShoppingCartComponent>
  ) {
    this.showRemove = false;
    this.cartRef.afterDismissed().subscribe(() => {
      this.showRemove = false;
    });
  }

  showRemoveButton() {
    this.showRemove = !this.showRemove;
  }
}
