import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PaymentMethod, BillingInfo, FirebaseCloudFunction } from '@types';
import { BarTapApi } from '@api';
import { StripeInstance } from '@stripe/stripe-instance';

// Might convert this to be entirely in the cloud as a trigger to the transitions change of an order?
// Depends if we can force a charge when they order or if we need to charge them after the drink is picked up/delivered.
// This is all depends on how age verification will work with our application.

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private chargeFunction: FirebaseCloudFunction;
  
  constructor(private api: BarTapApi, fns: AngularFireFunctions) {
    this.chargeFunction = fns.httpsCallable('stripePayment');
  }

  chargeUser(barID: string, price: number, method: PaymentMethod, billing?: BillingInfo) {
    return this.api.getBarApiKey(barID).pipe(
      switchMap(apiKey => {
        if (apiKey) {
          const stripe = new StripeInstance(apiKey);
          return stripe.createToken(method, billing);
        } else {
          return throwError({ message: 'No bar with that ID exists' });
        }
      }),
      switchMap(token => {
        return this.chargeFunction({ barID, token, price });
      })
    );
  }
}
