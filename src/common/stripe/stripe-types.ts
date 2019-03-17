import { BillingInfo } from '@types';

export interface Stripe {
  setPublishableKey: (key: string) => void,
  card: {
    createToken: (card: Card, billing: BillingInfo | undefined, cb: (status: any, response: TokenResponse) => void) => void
  }
}

export interface TokenResponse {
  error: {
    message: string;
  },
  id: string;
}

export interface Card {
  number: string;
  cvc: number;
  exp_month: number;
  exp_year: number
}
