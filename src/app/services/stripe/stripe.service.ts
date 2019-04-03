import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PaymentMethod, BillingInfo, FirebaseCloudFunction, DrinkData, StripePaymentData, OrderPrice } from '@types';
import { BarTapApi } from '@api';
import { StripeInstance } from '@stripe/stripe-instance';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private chargeFunction: FirebaseCloudFunction<StripePaymentData>;

  constructor(private api: BarTapApi, fns: AngularFireFunctions) {
    this.chargeFunction = fns.httpsCallable('stripePayment');
  }

  chargeUser(barId: string, method: PaymentMethod, drinks: DrinkData[], price: OrderPrice, billing?: BillingInfo, userId?: string) {
    return this.api.getBarApiKey(barId).pipe(
      switchMap(apiKey => {
        if (apiKey) {
          const stripe = new StripeInstance(apiKey);
          return stripe.createToken(method, billing);
        } else {
          return throwError({ message: 'No bar with that ID exists' });
        }
      }),
      switchMap(token => {
        return this.chargeFunction({ barId, token, drinks, price, userId });
      })
    );
  }
}
