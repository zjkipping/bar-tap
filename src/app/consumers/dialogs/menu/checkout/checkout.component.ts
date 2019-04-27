import { Component, Inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { StripeService } from '@services/stripe/stripe.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth.service';
import { PaymentMethod, ConsumerUser, DrinkData, OrderPrice } from '@types';
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
  total: number;
  tax: number;
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
  cardNumber = new FormControl('', Validators.required);
  expiration = new FormControl('', Validators.required);
  cvc = new FormControl('', Validators.required);
  errorMessage = '';
  showLoading: boolean = false;
  showAddCard: boolean = false;
  saveCard: boolean = false;
  user: Observable<ConsumerUser>;
  cards: Observable<PaymentMethod[]>;
  drinks: DrinkData[];
  orderPrice: OrderPrice;

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
    this.user = this.auth.getUserAsConsumerAuth();
    this.auth.currentAuth.subscribe(user => {
      if (user === null) {
        this.showAddCard = true;
      }
    });

    this.cards = this.user.pipe(
      switchMap(user => this.api.getUserPaymentMethods(user.uid))
    );

    this.drinks = this.cart.cartItems.value.map(drink => {
      return {
        id: drink.drink.uid,
        quantity: drink.quantity
      };
    });

    this.orderPrice = {
      total: this.data.total,
      tip: 0,
      tax: this.data.tax
    };
  }

  getTip(event: any) {
    this.orderPrice.tip = event.value / 100;
  }

  toggleSaveCard() {
    this.saveCard = !this.saveCard;
  }

  addCard(show: boolean) {
    this.showAddCard = show;
  }

  back() {
    this.dialogRef.close({
      openCart: true
    });
  }

  buy() {
    this.showLoading = true;
    this.card = this.fb.group({
      cardNumber: this.cardNumber.value,
      expiration: this.expiration.value,
      cvc: this.cvc.value
    });

    const card = this.selectedCard.value
      ? this.selectedCard.value
      : this.card.value;

    // remove this when we update our validation
    if (/^\d{2}\/\d{2}$/.test(card.expiration)) {
      this.user
        .pipe(
          catchError(() => of(undefined)),
          switchMap(user => {
            if (user) {
              return this.stripe.chargeUser(
                this.data.barId,
                card,
                this.drinks,
                this.orderPrice,
                user.billingInfo,
                user.uid
              );
            } else {
              return this.stripe.chargeUser(
                this.data.barId,
                card,
                this.drinks,
                this.orderPrice
              );
            }
          })
        )
        .subscribe(
          res => {
            this.showLoading = false;
            this.sbs.openSuccess(
              `Order created! Your card was charged: $${(
                this.orderPrice.total +
                this.orderPrice.tax +
                this.orderPrice.tip
              ).toFixed(2)}`,
              3000
            );
            this.cart.clearCart();
            if (this.saveCard) {
              this.dialogRef.close({
                card: {
                  cardNumber: card.cardNumber.toString(),
                  expiration: card.expiration,
                  cvc: card.cvc
                }
              });
            } else {
              this.dialogRef.close();
            }

            this.router.navigate(['', 'tracker', res.barId, res.orderId]);
          },
          () => {
            this.sbs.openError(
              'Oops! Something went wrong, please check your card information.',
              3000
            );
          }
        );
    } else {
      this.showLoading = false;
      this.errorMessage = 'Invalid expiration date, enter as MM/YY.';
    }
  }
}
