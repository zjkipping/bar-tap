import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { flatten } from 'lodash';

import { BarTapApi } from '../bar-tap-api';
import {
  Employee,
  Order,
  RawEmployee,
  FirebaseQuery,
  RawOrder,
  Drink,
  Log,
  RawDrink,
  RawLog,
  Bar,
  RawBar,
  RawFavorite,
  History,
  RawHistory,
  Favorite,
  PaymentMethod,
  Tracking
} from '@types';

@Injectable()
export class NormalApi extends BarTapApi {
  constructor(private db: AngularFirestore) {
    super();
  }

  getBar(barId: string): Observable<Bar | undefined> {
    return this.db
      .doc<RawBar>(`bars/${barId}`)
      .snapshotChanges()
      .pipe(
        map(result => {
          const data = result.payload.data();
          if (data) {
            return { ...data, uid: result.payload.id };
          } else {
            return undefined;
          }
        })
      );
  }

  getBars(): Observable<Bar[]> {
    return this.db
      .collection<RawBar>(`bars`)
      .snapshotChanges()
      .pipe(
        map(result =>
          result.map(obj => ({
            ...obj.payload.doc.data(),
            uid: obj.payload.doc.id
          }))
        )
      );
  }

  getBarEmployee(
    barId: string,
    employeeId: string
  ): Observable<Employee | undefined> {
    return this.db
      .doc<RawEmployee>(`bars/${barId}/employees/${employeeId}`)
      .snapshotChanges()
      .pipe(
        map(result => {
          const data = result.payload.data();
          if (data) {
            return { ...data, uid: result.payload.id };
          } else {
            return undefined;
          }
        })
      );
  }

  getBarEmployees(barId: string): Observable<Employee[]> {
    return this.db
      .collection<RawEmployee>(`bars/${barId}/employees`)
      .snapshotChanges()
      .pipe(
        map(result =>
          result.map(obj => ({
            ...obj.payload.doc.data(),
            uid: obj.payload.doc.id
          }))
        )
      );
  }

  getBarOrder(barId: string, orderId: string): Observable<Order | undefined> {
    return this.db
      .doc<RawOrder>(`bars/${barId}/orders/${orderId}`)
      .snapshotChanges()
      .pipe(
        map(result => {
          const data = result.payload.data();
          if (data) {
            return { ...data, uid: result.payload.id };
          } else {
            return undefined;
          }
        })
      );
  }

  getBarOrders(barId: string): Observable<Order[]> {
    return this.db
      .collection<RawOrder>(`bars/${barId}/orders`)
      .snapshotChanges()
      .pipe(
        map(result =>
          result.map(obj => ({
            ...obj.payload.doc.data(),
            uid: obj.payload.doc.id
          }))
        )
      );
  }

  getBarOrdersByQuery(
    barId: string,
    query: FirebaseQuery
  ): Observable<Order[]> {
    return this.db
      .collection<RawOrder>(`bars/${barId}/orders`, ref => query(ref))
      .snapshotChanges()
      .pipe(
        map(result =>
          result.map(obj => ({
            ...obj.payload.doc.data(),
            uid: obj.payload.doc.id
          }))
        ),
        map(orders => orders.sort((o1, o2) => o1.created - o2.created))
      );
  }

  getBarOrdersByType(barId: string, type: string): Observable<Order[]> {
    return this.getBarOrdersByQuery(barId, ref =>
      ref.where('status', '==', type)
    );
  }

  getBarOrdersByTypes(barId: string, types: string[]): Observable<Order[]> {
    return combineLatest(
      ...types.map(type => this.getBarOrdersByType(barId, type))
    ).pipe(map(ordersByType => flatten(ordersByType)));
  }

  getBarDrink(barId: string, drinkId: string): Observable<Drink | undefined> {
    return this.db
      .doc<RawDrink>(`bars/${barId}/drinks/${drinkId}`)
      .snapshotChanges()
      .pipe(
        map(result => {
          const data = result.payload.data();
          if (data) {
            return { ...data, uid: result.payload.id };
          } else {
            return undefined;
          }
        })
      );
  }

  getBarDrinks(barId: string): Observable<Drink[]> {
    return this.db
      .collection<RawDrink>(`bars/${barId}/drinks`)
      .snapshotChanges()
      .pipe(
        map(result =>
          result.map(obj => ({
            ...obj.payload.doc.data(),
            uid: obj.payload.doc.id
          }))
        )
      );
  }

  getBarDrinksByQuery(
    barId: string,
    query: FirebaseQuery
  ): Observable<Drink[]> {
    return this.db
      .collection<Drink>(`bars/${barId}/drinks`, ref => query(ref))
      .snapshotChanges()
      .pipe(
        map(result =>
          result.map(obj => ({
            ...obj.payload.doc.data(),
            uid: obj.payload.doc.id
          }))
        )
      );
  }

  getBarDrinksByType(barId: string, type: string): Observable<Drink[]> {
    return this.getBarDrinksByQuery(barId, ref =>
      ref.where('type', '==', type)
    );
  }

  getBarDrinksByTypes(barId: string, types: string[]): Observable<Drink[]> {
    return combineLatest(
      ...types.map(type => this.getBarDrinksByType(barId, type))
    ).pipe(map(DrinksByType => flatten(DrinksByType)));
  }

  getBarLog(barId: string, logId: string): Observable<Log | undefined> {
    return this.db
      .doc<RawLog>(`bars/${barId}/logs/${logId}`)
      .snapshotChanges()
      .pipe(
        map(result => {
          const data = result.payload.data();
          if (data) {
            return { ...data, uid: result.payload.id };
          } else {
            return undefined;
          }
        })
      );
  }

  getBarLogs(barId: string): Observable<Log[]> {
    return this.db
      .collection<RawLog>(`bars/${barId}/logs`)
      .snapshotChanges()
      .pipe(
        map(result =>
          result.map(obj => ({
            ...obj.payload.doc.data(),
            uid: obj.payload.doc.id
          }))
        )
      );
  }

  getConsumersFavoriteBars(userId: string): Observable<Bar[]> {
    return this.db
      .collection<RawFavorite>(`users/${userId}/favorites`)
      .snapshotChanges()
      .pipe(
        map(result => result.map(obj => obj.payload.doc.data().barId)),
        switchMap(favorites => {
          if (favorites) {
            return combineLatest(
              ...favorites.map(favorite => this.getBar(favorite))
            );
          } else {
            return of([]);
          }
        }),
        map(bars => bars.filter(bar => !!bar) as Bar[])
      );
  }

  checkIfFavorited(userId: string, barId: string): Observable<boolean> {
    return this.db
      .collection<RawFavorite>(`users/${userId}/favorites`, ref =>
        ref.where('barId', '==', barId)
      )
      .valueChanges()
      .pipe(map(favorites => favorites.length > 0));
  }

  getBarApiKey(barId: string): Observable<string | undefined> {
    return this.db
      .doc<{ apiKey: string }>(`stripe_api_keys/${barId}`)
      .valueChanges()
      .pipe(
        map((result: { apiKey: string } | undefined) => {
          if (result) {
            return result.apiKey;
          } else {
            return undefined;
          }
        })
      );
  }

  getConsumersHistory(userId: string): Observable<History[]> {
    return this.db
      .collection<RawHistory>(`users/${userId}/history`)
      .snapshotChanges()
      .pipe(
        map(result =>
          result.map(obj => ({
            ...obj.payload.doc.data(),
            uid: obj.payload.doc.id
          }))
        ),
        switchMap(charges => {
          return combineLatest(
            ...charges.map(charge => {
              return this.getBar(charge.barId).pipe(
                map(
                  bar =>
                    ({
                      barName: bar ? bar.name : '<Bar Redacted>',
                      total: charge.total,
                      timestamp: charge.timestamp,
                      uid: charge.uid
                    } as History)
                )
              );
            })
          );
        })
      );
  }

  getUserPaymentMethods(userID: string): Observable<PaymentMethod[]> {
    return this.db
      .collection<PaymentMethod>(`users/${userID}/paymentMethods`)
      .snapshotChanges()
      .pipe(
        map(result =>
          result.map(obj => ({
            ...obj.payload.doc.data(),
            uid: obj.payload.doc.id
          }))
        )
      );
  }

  getUserTracking(userID: string): Observable<Tracking[]> {
    return this.db
      .collection<Tracking>(`users/${userID}/tracking`)
      .snapshotChanges()
      .pipe(
        map(result =>
          result.map(obj => ({
            ...obj.payload.doc.data(),
            uid: obj.payload.doc.id
          }))
        )
      );
  }

  getCheckedInEmployees(userID: string, barID: string): Observable<Employee[]> {
    return this.db
      .collection<{ employeeUID: string }>(`users/${userID}/clockedIn`)
      .valueChanges()
      .pipe(
        switchMap(employeesUIDs => {
          if (employeesUIDs.length > 0) {
            return combineLatest(
              ...employeesUIDs.map(employee =>
                this.getBarEmployee(barID, employee.employeeUID)
              )
            ).pipe(
              map(
                employees =>
                  employees.filter(employee => !!employee) as Employee[]
              )
            );
          } else {
            return of([]);
          }
        })
      );
  }
}
