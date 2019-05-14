import { Observable } from 'rxjs';

import {
  Employee,
  Order,
  FirebaseQuery,
  Drink,
  Log,
  Bar,
  PaymentMethod,
  History,
  Tracking
} from '@types';

export abstract class BarTapApi {
  abstract getBar(barId: string): Observable<Bar | undefined>;

  abstract getBars(): Observable<Bar[]>;

  abstract getBarEmployee(
    barId: string,
    employeeId: string
  ): Observable<Employee | undefined>;

  abstract getBarEmployees(barId: string): Observable<Employee[]>;

  abstract getBarOrder(
    barId: string,
    orderId: string
  ): Observable<Order | undefined>;

  abstract getBarOrders(barID: string): Observable<Order[]>;

  abstract getBarOrdersByQuery(
    barID: string,
    query: FirebaseQuery
  ): Observable<Order[]>;

  abstract getBarOrdersByType(barId: string, type: string): Observable<Order[]>;

  abstract getBarOrdersByTypes(
    barId: string,
    types: string[]
  ): Observable<Order[]>;

  abstract getBarDrink(
    barId: string,
    drinkId: string
  ): Observable<Drink | undefined>;

  abstract getBarDrinks(barId: string): Observable<Drink[]>;

  abstract getBarDrinksByQuery(
    barId: string,
    query: FirebaseQuery
  ): Observable<Drink[]>;

  abstract getBarDrinksByType(barId: string, type: string): Observable<Drink[]>;

  abstract getBarDrinksByTypes(
    barId: string,
    types: string[]
  ): Observable<Drink[]>;

  abstract getBarLog(barId: string, logId: string): Observable<Log | undefined>;

  abstract getBarLogs(barId: string): Observable<Log[]>;

  abstract getBarApiKey(barID: string): Observable<string | undefined>;

  abstract getBarStripeSecret(barID: string): Observable<string | undefined>;

  abstract getConsumersFavoriteBars(userID: string): Observable<Bar[]>;

  abstract getConsumersFavoriteBars(userId: string): Observable<Bar[]>;

  abstract getCheckedInEmployees(barID: string): Observable<Employee[]>;

  abstract checkIfFavorited(userId: string, barId: string): Observable<boolean>;

  abstract getConsumersHistory(userId: string): Observable<History[]>;

  abstract getUserPaymentMethods(userID: string): Observable<PaymentMethod[]>;

  abstract getUserTracking(userID: string): Observable<Tracking[]>;
}
