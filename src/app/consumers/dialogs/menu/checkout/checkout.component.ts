import { Component, Inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { StripeService } from '@services/stripe/stripe.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth.service';
import { PaymentMethod, ConsumerUser, DrinkData } from '@types';
import { BarTapApi } from '@api';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatBottomSheet
} from '@angular/material';
import { SnackBarService } from '@services/snackbar/snackbar.service';
import { ShoppingCartComponent } from 'src/app/consumers/bars/shopping-cart/shopping-cart.component';
import { Cart } from '@services/cart.service';
import * as _ from 'lodash';

interface CheckoutData {
  price: number;
  barId: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  card?: FormGroup;
  selectedCard = new FormControl('', Validators.required);
  tip: number = 0.0;
  cardNumber = new FormControl('', Validators.required);
  expiration = new FormControl('', Validators.required);
  cvc = new FormControl('', Validators.required);
  errorMessage = '';
  addCard = false;
  user: Observable<ConsumerUser>;
  cards: Observable<PaymentMethod[]>;
  drinks: DrinkData[];

  constructor(
    public route: ActivatedRoute,
    private auth: AuthService,
    private api: BarTapApi,
    private stripe: StripeService,
    @Inject(MAT_DIALOG_DATA) public data: CheckoutData,
    private fb: FormBuilder,
    private sbs: SnackBarService,
    private router: Router,
    private dialogRef: MatDialogRef<CheckoutComponent>,
    private cart: Cart
  ) {
    this.cards = this.auth
      .getUserAsConsumerAuth()
      .pipe(switchMap(user => this.api.getUserPaymentMethods(user.uid)));

    this.drinks = this.cart.cartItems.value.map(drink => {
      return {
        id: drink.drink.uid,
        quantity: drink.quantity
      };
    });

    this.user = this.auth.getUserAsConsumerAuth();
  }

  getTip(event: any) {
    this.tip = event.value / 100;
  }

  showAddCard() {
    this.addCard = true;
  }

  hideAddCard() {
    this.addCard = false;
  }

  back() {
    this.dialogRef.close();
  }

  buy() {
    this.card = this.fb.group({
      cardNumber: this.cardNumber.value,
      expiration: this.expiration.value,
      cvc: this.cvc.value
    });

    const card = this.selectedCard.value
      ? this.selectedCard.value
      : this.card.value;

    const total = this.data.price + this.tip;

    // remove this when we update our validation
    if (/^\d{2}\/\d{2}$/.test(card.expiration)) {
      this.user
        .pipe(
          switchMap(user => {
            return this.stripe.chargeUser(
              this.data.barId,
              card,
              this.drinks,
              total,
              user.billingInfo,
              user.uid
            );
          })
        )
        .subscribe(
          res => {
            this.sbs.openSuccess(
              `Order created! Your card was charged: $${total}.`,
              3000
            );
            this.cart.clearCart();
            console.log(res);
            this.dialogRef.close();
            this.router.navigate(['', 'tracker', res.barId, res.orderId]);
          },
          err => {
            console.log('err: ', err);
            this.sbs.openError(
              'Oops! Something went wrong, please check your card information.',
              3000
            );
          }
        );
    } else {
      this.errorMessage = 'Invalid expiration date, enter as MM/YY.';
    }
  }
}
