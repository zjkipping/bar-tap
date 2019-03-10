export interface RawBar {
  ownerId: string;
  name: string;
  description: string;
  location: string;
  hours: string;
  apiKey: string;
}

export interface Bar extends RawBar {
  uid: string;
}

export interface BaseUser {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
}

export interface EmployeesUser extends BaseUser {
  barId: string;
}

export interface NormalUser extends BaseUser {

}

export interface AdminUser extends BaseUser {

}

export interface RawDrink {
  name: string;
  price: number;
  description: string;
}

export interface Drink extends RawDrink {
  uid: string;
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

export interface RouteAuthData {
  redirect: string[];
  requiredAuthState: boolean;
}

export type FirebaseQuery = (ref: firebase.firestore.CollectionReference) => firebase.firestore.Query;
