import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { IN_PROGRESS_ORDER_STATUS, DELIVERY_ORDER_STATUS, PICKUP_ORDER_STATUS, FINISHED_ORDER_STATUS } from '@constants';
import { BarTapApi } from '@api';
import { Observable, from } from 'rxjs';
import { Order } from '@types';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
  constructor(private db: AngularFirestore, private api: BarTapApi) { }

  getOrderStatus(barId: string, orderId: string): Observable<Order | undefined> {
    return this.api.getBarOrder(barId, orderId);
  }

  transitionOrderToInProgress(barId: string, orderId: string, employeeId: string): Observable<any> {
    return from(this.db.doc(`bars/${barId}/orders/${orderId}`).update({
      status: IN_PROGRESS_ORDER_STATUS,
      employeeId
    }));
  }

  transitionOrderToPickup(barId: string, orderId: string) {
    return from(this.db.doc(`bars/${barId}/orders/${orderId}`).update({
      status: PICKUP_ORDER_STATUS
    }));
  }

  transitionOrderToDelivering(barId: string, orderId: string) {
    return from(this.db.doc(`bars/${barId}/orders/${orderId}`).update({
      status: DELIVERY_ORDER_STATUS
    }));
  }

  transitionOrderToFinished(barId: string, orderId: string) {
    return from(this.db.doc(`bars/${barId}/orders/${orderId}`).update({
      status: FINISHED_ORDER_STATUS
    }));
  }
}
