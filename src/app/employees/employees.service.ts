import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, combineLatest } from 'rxjs';

import { Order, RawOrder, Employee } from '@types';
import { AuthService } from '@services/auth/auth.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { isEmployeesUser } from '../types-guards';
import { NEW_ORDER_TYPE, IN_PROGRESS_ORDER_TYPE, DELIVERY_ORDER_TYPE } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  newOrders: Observable<Order[]>;
  ordersInProgress: Observable<Order[]>;
  employees: Observable<Employee[]>;

  constructor(private db: AngularFirestore, private auth: AuthService) {
    this.newOrders = this.getOrdersByQuery(ref => ref.where('status', '==', NEW_ORDER_TYPE));
    this.ordersInProgress = combineLatest(
      this.getOrdersByQuery(ref => ref.where('status', '==', IN_PROGRESS_ORDER_TYPE)),
      this.getOrdersByQuery(ref => ref.where('status', '==', DELIVERY_ORDER_TYPE))
    ).pipe(
      map(([in_progress, delivering]) => [...in_progress, ...delivering]),
      map(orders => orders.sort((o1, o2) => +o1.created - +o2.created))
    );
    this.employees = this.getBarEmployees();
  }

  private getBarEmployees() {
    return this.auth.user.pipe(
      switchMap(user => {
        if (isEmployeesUser(user)) {
          return this.db.collection<Employee>(`bars/${user.barId}/employees`).snapshotChanges().pipe(
            map(result => result.map(obj => ({ ...obj.payload.doc.data(), uid: obj.payload.doc.id })))
          );
        } else {
          return of([]);
        }
      })
    );
  }

  private getOrdersByQuery(query: (ref: firebase.firestore.CollectionReference) => firebase.firestore.Query): Observable<Order[]> {
    return this.auth.user.pipe(
      switchMap(user => {
        if (isEmployeesUser(user)) {
          return this.db.collection<RawOrder>(`bars/${user.barId}/orders`, ref => query(ref)).snapshotChanges().pipe(
            map(result => result
              .map(obj => ({ ...obj.payload.doc.data(), uid: obj.payload.doc.id }))
              .map(order => ({ ...order, created: new Date(order.created) } as Order))
            )
          );
        } else {
          return of([]);
        }
      })
    );
  }
}
