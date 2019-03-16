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
  favorites: string[];
}

export interface AdminUser extends BaseUser {}

export interface RawDrink {
  name: string;
  price: number;
  description: string;
  type: string;
}

export interface Drink extends RawDrink {
  uid: string;
}

export interface CartItem {
  drink: Drink;
  quantity: number;
}

export interface RawEmployee {
  firstName: string;
  lastName: string;
  id: string;
  pin: number;
}

export interface Employee extends RawEmployee {
  uid: string;
}

export interface RawLog {
  orderId: string;
  employeeId: string;
  timestamp: Date;
  transitionFrom: string;
  transitionTo: string;
}

export interface Log extends RawLog {
  uid: string;
}

export interface RawOrder {
  uid: string;
  status: string;
  created: number | Date;
  employeeId?: string;
  drinkIds: string[];
  userId: string;
}

export interface Order extends RawOrder {
  uid: string;
  created: Date;
}

export interface RawFavorite {
  barId: string;
}

export interface Favorite extends RawFavorite {
  uid: string;
}

export interface RouteAuthData {
  redirect: string[];
  requiredAuthState: boolean;
}

export type FirebaseQuery = (
  ref: firebase.firestore.CollectionReference
) => firebase.firestore.Query;

export type FirebaseCloudFunction = (data: any) => Observable<any>;

export interface RawPaymentMethod {
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
  address_line2: string
  address_city: string
  address_state: string
  address_zip: string
  address_country: string;
}
