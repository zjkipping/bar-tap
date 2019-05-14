import { Query, CollectionReference } from '@angular/fire/firestore/interfaces';
import { Observable } from 'rxjs';

export interface RawBar {
  ownerId: string;
  name: string;
  description: string;
  location: string;
  hours: string;
}

export interface Bar extends RawBar {
  uid: string;
}

export interface RawUser {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
}

export interface BaseUser extends RawUser {
  uid: string;
}

export interface EmployeesUser extends BaseUser {
  barId: string;
}

export interface ConsumerUser extends BaseUser {
  dob: string;
  billingInfo: BillingInfo;
}

export interface AdminUser extends BaseUser {
  barId: string;
}

export interface RawDrink {
  name: string;
  price: number;
  description: string;
  type: string;
  popular: boolean;
}

export interface Drink extends RawDrink {
  uid: string;
}

export interface CartItem {
  drink: Drink;
  quantity: number;
}

export interface DrinkData {
  id: string;
  quantity: number;
}

export interface ExpandedDrinkData {
  quantity: number;
  drink: Drink;
}

export interface RawEmployee {
  firstName: string;
  lastName: string;
  id: string;
  pin: string;
}

export interface Employee extends RawEmployee {
  uid: string;
}

export interface RawLog {
  orderId: string;
  employeeId: string;
  timestamp: number;
  transitionFrom: string;
  transitionTo: string;
}

export interface Log extends RawLog {
  uid: string;
}

export interface RawOrder {
  status: string;
  created: number;
  drinks: DrinkData[];
  price: OrderPrice;
  number: number;
  employeeId?: string;
  userId?: string;
}

export interface Order extends RawOrder {
  uid: string;
}

export interface RawFavorite {
  barId: string;
}

export interface Favorite extends RawFavorite {
  uid: string;
}

export interface RawTracking {
  barId: string;
  orderId: string;
}

export interface Tracking extends RawTracking {
  uid: string;
}

export interface RouteAuthData {
  // these top three are basically lumped together (if you have 1 you should have all 3)
  redirect?: string[];
  requireAuthCheck?: boolean;
  authState?: boolean;
  userType?: string;
}

export type FirebaseQuery = (ref: CollectionReference) => Query;

export type FirebaseCloudFunction<T> = (data: T) => Observable<any>;

export interface RawPaymentMethod {
  fullName: string;
  cardNumber: string;
  cvc: number;
  expiration: string;
}

export interface PaymentMethod extends RawPaymentMethod {
  uid: string;
}

export interface BillingInfo {
  name: string;
  address_line1: string;
  address_line2: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  address_country: string;
}

export interface RawHistory {
  barId: string;
  timestamp: number;
  total: number;
}

export interface History {
  uid: string;
  total: number;
  timestamp: number;
  barName: string;
}

export interface EmployeeLogin {
  id: string;
  pin: string;
}

export interface EmployeeCheckInOutData {
  barId: string;
  id: string;
  pin: string;
}

export interface OrderPrice {
  total: number;
  tip: number;
  tax: number;
}

export interface StripePaymentData {
  barId: string;
  token: string;
  price: OrderPrice;
  drinks: DrinkData[];
  userId?: string;
}

export interface SettingsFormData {
  meta: {
    name: string,
    description: string,
    location: string
  };
  apiKey: string;
  secret: string;
}
