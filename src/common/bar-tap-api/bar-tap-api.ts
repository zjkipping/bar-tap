import { Observable } from 'rxjs';

import { Employee, Order, FirebaseQuery, Drink, Log, Bar, History } from '@types';

export abstract class BarTapApi {
  abstract getBar(barId: string): Observable<Bar | undefined>;

  abstract getBars(): Observable<Bar[]>;

  abstract getBarEmployee(barId: string, employeeId: string): Observable<Employee | undefined>;

  abstract getBarEmployees(barId: string): Observable<Employee[]>;

  abstract getBarOrder(barId: string, orderId: string): Observable<Order | undefined>;

  abstract getBarOrders(barId: string): Observable<Order[]>;

  abstract getBarOrdersByQuery(barId: string, query: FirebaseQuery): Observable<Order[]>;

  abstract getBarOrdersByType(barId: string, type: string): Observable<Order[]>;

  abstract getBarOrdersByTypes(barId: string, types: string[]): Observable<Order[]>;

  abstract getBarDrink(barId: string, drinkId: string): Observable<Drink | undefined>;

  abstract getBarDrinks(barId: string): Observable<Drink[]>;

  abstract getBarDrinksByQuery(barId: string, query: FirebaseQuery): Observable<Drink[]>;

  abstract getBarDrinksByType(barId: string, type: string): Observable<Drink[]>;

  abstract getBarDrinksByTypes(barId: string, types: string[]): Observable<Drink[]>;

  abstract getBarLog(barId: string, logId: string): Observable<Log | undefined>;

  abstract getBarLogs(barId: string): Observable<Log[]>;

  abstract getBarApiKey(barId: string): Observable<string | undefined>;

  abstract getConsumersFavoriteBars(userId: string): Observable<Bar[]>;

  abstract checkIfFavorited(userId: string, barId: string): Observable<boolean>;

  abstract getConsumersHistory(userId: string): Observable<History[]>;

}
