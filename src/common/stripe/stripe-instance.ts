import { PaymentMethod, BillingInfo } from '@types';
import { Card, Stripe } from './stripe-types';
import { Observable } from 'rxjs';

export class StripeInstance {
  stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = (window as any).Stripe;
    this.stripe.setPublishableKey(apiKey);
  }

  createToken(method: PaymentMethod, billingInfo?: BillingInfo): Observable<string> {
    const expiration = method.expiration.split('/');
    const month = expiration[0];
    const year = expiration[1];

    const card: Card = {
      number: method.cardNumber,
      exp_month: Number(month),
      exp_year: Number(year),
      cvc: method.cvc
    };

    return new Observable(observer => {
      this.stripe.card.createToken(card, billingInfo, (_status, response) => {
        if (response.error) {
          observer.error(response.error);
        } else {
          observer.next(response.id);
        }
        observer.complete();
      });
    })
  }
}
