import { Component, Inject } from '@angular/core';
import { Cart } from '../../../services/cart.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { Bar } from '@types';
import { Observable } from 'rxjs';

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
