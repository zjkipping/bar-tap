import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';

import { Employee, Order, FirebaseQuery, Drink, Log, Bar } from '@types';
import { BarTapApi } from '../bar-tap-api';

@Injectable()
export class TestApi extends BarTapApi {
  getBar(barID: string): Observable<Bar | undefined> {
    return throwError('Not Yet Implemented');
  }

  getBars(): Observable<Bar[]> {
    return throwError('Not Yet Implemented');
  }

  getBarEmployee(barID: string, employeeID: string): Observable<Employee | undefined> {
    return throwError('Not Yet Implemented');
  }

  getBarEmployees(barID: string): Observable<Employee[]> {
    return throwError('Not Yet Implemented');
  }
  
  getBarOrder(barID: string, orderID: string): Observable<Order | undefined> {
    return throwError('Not Yet Implemented');
  }

  getBarOrders(barID: string): Observable<Order[]> {
    return throwError('Not Yet Implemented');
  }

  getBarOrdersByQuery(barID: string, query: FirebaseQuery): Observable<Order[]> {
    return throwError('Not Yet Implemented');
  }

  getBarOrdersByType(barID: string, type: string): Observable<Order[]> {
    return throwError('Not Yet Implemented');
  }

  getBarOrdersByTypes(barID: string, types: string[]): Observable<Order[]> {
    return throwError('Not Yet Implemented');
  }

  getBarDrink(barID: string, drinkID: string): Observable<Drink | undefined> {
    return throwError('Not Yet Implemented');
  }

  getBarDrinks(barID: string): Observable<Drink[]> {
    return throwError('Not Yet Implemented');
  }
  getBarLog(barID: string, logID: string): Observable<Log | undefined> {
    return throwError('Not Yet Implemented');
  }

  getBarLogs(barID: string): Observable<Log[]> {
    return throwError('Not Yet Implemented');
  }
}
