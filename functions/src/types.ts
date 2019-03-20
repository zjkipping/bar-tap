export interface StripePaymentData {
  barId: string;
  token: string;
  price: number;
  drinks: DrinkData[];
  userId?: string;
}

export interface DrinkData {
  drinkId: string;
  quantity: number;
}

export interface EmployeeCheckInOutData {
  barId: string;
  id: string;
  pin: string;
}
