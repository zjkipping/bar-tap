import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Order, Bar, CartItem } from '@types';
import { BarTapApi } from '@api';

@Component({
  selector: 'app-tracker-details',
  templateUrl: './tracker-details.component.html',
  styleUrls: ['./tracker-details.component.scss']
})
export class TrackerDetailsComponent {
  order: Observable<Order | undefined>;
  bar: Observable<Bar | undefined>;

  constructor(route: ActivatedRoute, private api: BarTapApi) {
    this.order = route.params.pipe(
      switchMap(params => this.api.getBarOrder(params['barid'], params['oid']))
    );

    this.bar = route.params.pipe(
      switchMap(params => this.api.getBar(params['barid']))
    );
  }
}

/* 
  What we need to display:
  - Bar name
  - Order number, status, total price, tip ,tax
  - Drink information from order: drink names, quantity, price
*/
