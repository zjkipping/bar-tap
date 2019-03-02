export interface Bar {
  uid: string;
  ownerId: string;
  name: string;
  description: string;
  location: string;
  hours: string;
  apiKey: string;
  drinks: Drink[];
  employees: Employee[];
  logs: Log[];
  orders: Order[];
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

export interface Drink {
  uid: string;
  name: string;
  price: number;
  description: string;
}

export interface Employee {
  uid: string;
  firstName: string;
  lastName: string;
  id: string;
  pin: number;
}

export interface Log {
  uid: string;
  orderId: string;
  employeeId: string;
  timestamp: Date;
  transitionFrom: string;
  transitionTo: string;
}

export interface RawOrder {
  uid: string;
  status: string;
  created: number;
  employeeId?: string;
  drinkIds: string[];
  userId: string;
}

export interface Order {
  uid: string;
  status: string;
  created: Date;
  employeeId?: string;
  drinkIds: string[];
  userId: string;
}

export interface RouteAuthData {
  redirect: string[];
  requiredAuthState: boolean;
}
