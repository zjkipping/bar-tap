import { Observable } from 'rxjs';

import { Employee, Order, FirebaseQuery, Drink, Log, Bar } from '@types';

export abstract class BarTapApi {
  abstract getBar(barID: string): Observable<Bar | undefined>;

  abstract getBars(): Observable<Bar[]>;

  abstract getBarEmployee(barID: string, employeeID: string): Observable<Employee | undefined>;

  abstract getBarEmployees(barID: string): Observable<Employee[]>;
  
  abstract getBarOrder(barID: string, orderID: string): Observable<Order | undefined>;

  abstract getBarOrders(barID: string): Observable<Order[]>;

  abstract getBarOrdersByQuery(barID: string, query: FirebaseQuery): Observable<Order[]>

  abstract getBarOrdersByType(barID: string, type: string): Observable<Order[]>;

  abstract getBarOrdersByTypes(barID: string, types: string[]): Observable<Order[]>;

  abstract getBarDrink(barID: string, drinkID: string): Observable<Drink | undefined>;

  abstract getBarDrinks(barID: string): Observable<Drink[]>;

  abstract getBarDrinksByQuery(barID: string, query: FirebaseQuery): Observable<Drink[]>

  abstract getBarDrinksByType(barID: string, type: string): Observable<Drink[]>;

  abstract getBarDrinksByTypes(barID: string, types: string[]): Observable<Drink[]>;

  abstract getBarLog(barID: string, logID: string): Observable<Log | undefined>;

  abstract getBarLogs(barID: string): Observable<Log[]>;

  abstract getBarApiKey(barID: string): Observable<string | undefined>;
}
