import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import {
  Employee,
  Order,
  FirebaseQuery,
  Drink,
  Log,
  Bar,
  History,
  PaymentMethod,
  Tracking
} from '@types';
import { BarTapApi } from '../bar-tap-api';

@Injectable()
export class TestApi extends BarTapApi {
  getBar(barId: string): Observable<Bar | undefined> {
    return throwError('Not Yet Implemented');
  }

  getBars(): Observable<Bar[]> {
    return throwError('Not Yet Implemented');
  }

  getBarEmployee(
    barId: string,
    employeeId: string
  ): Observable<Employee | undefined> {
    return throwError('Not Yet Implemented');
  }

  getBarEmployees(barId: string): Observable<Employee[]> {
    return throwError('Not Yet Implemented');
  }

  getBarOrder(barId: string, orderId: string): Observable<Order | undefined> {
    return throwError('Not Yet Implemented');
  }

  getBarOrders(barId: string): Observable<Order[]> {
    return throwError('Not Yet Implemented');
  }

  getBarOrdersByQuery(
    barId: string,
    query: FirebaseQuery
  ): Observable<Order[]> {
    return throwError('Not Yet Implemented');
  }

  getBarOrdersByType(barId: string, type: string): Observable<Order[]> {
    return throwError('Not Yet Implemented');
  }

  getBarOrdersByTypes(barId: string, types: string[]): Observable<Order[]> {
    return throwError('Not Yet Implemented');
  }

  getBarDrink(barId: string, drinkId: string): Observable<Drink | undefined> {
    return throwError('Not Yet Implemented');
  }

  getBarDrinks(barId: string): Observable<Drink[]> {
    return throwError('Not Yet Implemented');
  }

  getBarDrinksByQuery(
    barId: string,
    query: FirebaseQuery
  ): Observable<Drink[]> {
    return throwError('Not Yet Implemented');
  }

  getBarDrinksByType(barId: string, type: string): Observable<Drink[]> {
    return throwError('Not Yet Implemented');
  }

  getBarDrinksByTypes(barId: string, types: string[]): Observable<Drink[]> {
    return throwError('Not Yet Implemented');
  }

  getBarLog(barId: string, logId: string): Observable<Log | undefined> {
    return throwError('Not Yet Implemented');
  }

  getBarLogs(barId: string): Observable<Log[]> {
    return throwError('Not Yet Implemented');
  }

  getConsumersFavoriteBars(userId: string): Observable<Bar[]> {
    return throwError('Not Yet Implemented');
  }

  checkIfFavorited(userId: string, barId: string): Observable<boolean> {
    return throwError('Not Yet Implemented');
  }

  getBarApiKey(barId: string): Observable<string | undefined> {
    return throwError('Not Yet Implemented');
  }

  getConsumersHistory(userId: string): Observable<History[]> {
    return throwError('Not Yet Implemented');
  }

  getUserPaymentMethods(userID: string): Observable<PaymentMethod[]> {
    return throwError('Not Yet Implemented');
  }

  getUserTracking(userID: string): Observable<Tracking[]> {
    return throwError('Not Yet Implemented');
  }

  getCheckedInEmployees(userID: string, barID: string): Observable<Employee[]> {
    return throwError('Not Yet Implemented');
  }
}
