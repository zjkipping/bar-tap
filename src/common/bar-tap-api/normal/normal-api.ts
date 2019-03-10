import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { flatten } from 'lodash';

import { BarTapApi } from '../bar-tap-api';
import { Employee, Order, RawEmployee, FirebaseQuery, RawOrder, Drink, Log, RawDrink, RawLog, Bar, RawBar } from '@types';

@Injectable()
export class NormalApi extends BarTapApi {
  constructor(private db: AngularFirestore) {
    super();
  }

  getBar(barID: string): Observable<Bar | undefined> {
    return this.db.doc<RawBar>(`bars/${barID}}`).snapshotChanges().pipe(
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
    return this.db.collection<RawBar>(`bars`).snapshotChanges().pipe(
      map(result => result.map(obj => ({ ...obj.payload.doc.data(), uid: obj.payload.doc.id })))
    );
  }

  getBarEmployee(barID: string, employeeID: string): Observable<Employee | undefined> {
    return this.db.doc<RawEmployee>(`bars/${barID}/employees/${employeeID}`).snapshotChanges().pipe(
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

  getBarEmployees(barID: string): Observable<Employee[]> {
    return this.db.collection<RawEmployee>(`bars/${barID}/employees`).snapshotChanges().pipe(
      map(result => result.map(obj => ({ ...obj.payload.doc.data(), uid: obj.payload.doc.id })))
    );
  }

  getBarOrder(barID: string, orderID: string): Observable<Order | undefined> {
    return this.db.doc<RawOrder>(`bars/${barID}/orders/${orderID}`).snapshotChanges().pipe(
      map(result => {
        const data = result.payload.data();
        if (data) {
          return { ...data, uid: result.payload.id, created: new Date(data.created) };
        } else {
          return undefined;
        }
      })
    );
  }

  getBarOrders(barID: string): Observable<Order[]> {
    return this.db.collection<RawOrder>(`bars/${barID}/orders`).snapshotChanges().pipe(
      map(result => result.map(obj => {
        const uid = obj.payload.doc.id;
        const data = obj.payload.doc.data();
        return { ...data, uid, created: new Date(data.created) };
      }))
    );
  }

  getBarOrdersByQuery(barID: string, query: FirebaseQuery): Observable<Order[]> {
    return this.db.collection<RawOrder>(`bars/${barID}/orders`, ref => query(ref)).snapshotChanges().pipe(
      map(result => result
        .map(obj => ({ ...obj.payload.doc.data(), uid: obj.payload.doc.id }))
        .map(order => ({ ...order, created: new Date(order.created) } as Order))
      )
    );
  }

  getBarOrdersByType(barID: string, type: string): Observable<Order[]> {
    return this.getBarOrdersByQuery(barID, ref => ref.where('status', '==', type));
  }

  getBarOrdersByTypes(barID: string, types: string[]): Observable<Order[]> {
    return combineLatest(
      ...types.map(type => this.getBarOrdersByType(barID, type))
    ).pipe(map(ordersByType => flatten(ordersByType)));
  }

  getBarDrink(barID: string, drinkID: string): Observable<Drink | undefined> {
    return this.db.doc<RawDrink>(`bars/${barID}/drinks/${drinkID}`).snapshotChanges().pipe(
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

  getBarDrinks(barID: string): Observable<Drink[]> {
    return this.db.collection<RawDrink>(`bars/${barID}/drinks`).snapshotChanges().pipe(
      map(result => result.map(obj => ({ ...obj.payload.doc.data(), uid: obj.payload.doc.id })))
    );
  }

  getBarLog(barID: string, logID: string): Observable<Log | undefined> {
    return this.db.doc<RawLog>(`bars/${barID}/logs/${logID}`).snapshotChanges().pipe(
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

  getBarLogs(barID: string): Observable<Log[]> {
    return this.db.collection<RawLog>(`bars/${barID}/logs`).snapshotChanges().pipe(
      map(result => result.map(obj => ({ ...obj.payload.doc.data(), uid: obj.payload.doc.id })))
    );
  }
}
