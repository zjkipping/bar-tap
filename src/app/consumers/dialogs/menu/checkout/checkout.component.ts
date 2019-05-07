import { Component, Inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  switchMap,
  catchError,
  shareReplay,
  tap,
  map,
  filter
} from 'rxjs/operators';

import { AuthService } from '@services/auth/auth.service';
import { BarTapApi } from '@api';
import { SnackBarService } from '@services/snackbar/snackbar.service';
import { Cart } from '@services/cart.service';
import { PaymentMethod, ConsumerUser, DrinkData, OrderPrice } from '@types';
import { UserAgreementComponent } from '../user-agreement/user-agreement.component';
import { StripeService } from '@services/stripe/stripe.service';

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
  selectedCard = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
    Validators.maxLength(19)
  ]);
  cardNumber = new FormControl('', Validators.required);
  expiration = new FormControl('', [
    Validators.required,
    Validators.pattern('/^d{2}/d{2}$/')
  ]);
  cvc = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(4)
  ]);
  errorMessage = '';
  showLoading = false;
  showAddCard = false;
  saveCard = false;
  user: Observable<ConsumerUser | undefined>;
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
    private cart: Cart,
    public dialog: MatDialog
  ) {
    this.user = this.auth.getUserAsConsumerAuth().pipe(
      catchError(error => of(undefined)),
      tap(user => {
        if (!user) {
          this.showAddCard = true;
        }
      }),
      shareReplay(1)
    );

    this.cards = this.user.pipe(
      switchMap(user => this.api.getUserPaymentMethods((user as ConsumerUser).uid))
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

  placeOrder() {
    this.errorMessage = '';
    this.showLoading = true;

    this.user
      .pipe(
        switchMap(user => {
          if (!user) {
            return this.dialog
              .open(UserAgreementComponent)
              .afterClosed()
              .pipe(
                map(data => {
                  if (!data.continue) {
                    this.showLoading = false;
                    this.errorMessage =
                      'You must agree to Bar Tap\'s User Agreement before placing an order.';
                    return false;
                  } else {
                    return true;
                  }
                })
              );
          } else {
            return of(true);
          }
        }),
        filter(res => !!res)
      )
      .subscribe(() => this.processOrder());
  }

  processOrder() {
    this.card = this.fb.group({
      cardNumber: [
        this.cardNumber.value,
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(19)
        ]
      ],
      expiration: [
        this.expiration.value,
        [Validators.required, Validators.pattern('/^d{2}/d{2}$/')]
      ],
      cvc: [
        this.cvc.value,
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)]
      ]
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
