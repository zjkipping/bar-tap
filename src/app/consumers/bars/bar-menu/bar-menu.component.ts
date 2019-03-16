import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { Observable, of, combineLatest } from 'rxjs';
import { map, switchMap, tap, filter } from 'rxjs/operators';

import { AddToCartComponent } from '../../dialogs/menu/add-to-cart/add-to-cart.component';
import { AuthService } from '@services/auth/auth.service';
import { Bar, Drink } from '@types';
import { BarTapApi } from '@api';
import { Cart } from '@services/cart.service';
import { ConsumersService } from '../../consumers.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-bar-menu',
  templateUrl: './bar-menu.component.html',
  styleUrls: ['./bar-menu.component.scss']
})
export class BarMenuComponent {
  bar: Observable<Bar>;
  drinks: Observable<Drink[]>;
  favorite: Observable<boolean>;

  constructor(
    route: ActivatedRoute,
    router: Router,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    public auth: AuthService,
    private api: BarTapApi,
    private cart: Cart,
    private cs: ConsumersService
  ) {
    this.cart.clearCart();
    const barId = route.params.pipe(
      map<Params, string>(params => params['uid'])
    );
    const barDetails = barId.pipe(
      switchMap(uid => {
        if (uid) {
          return combineLatest(
            this.api.getBar(uid),
            this.api.getBarDrinks(uid)
          );
        } else {
          return of(undefined);
        }
      }),
      tap(bar => {
        if (!bar) {
          router.navigate(['', 'bars']);
        }
      }),
      filter((bar): bar is [Bar, Drink[]] => !!bar)
    );

    this.favorite = combineLatest(
      this.auth.getUserAsConsumerAuth(),
      barId
    ).pipe(
      switchMap(([user, uid]) => this.api.checkIfFavorited(user.uid, uid))
    );

    this.bar = barDetails.pipe(map(([bar, _drinks]) => bar));
    this.drinks = barDetails.pipe(map(([_bar, drinks]) => drinks));
    this.cart.bar = barDetails.pipe(map(([bar, _drinks]) => bar));
  }

  openAddToCartDialog(drink: Drink) {
    this.dialog.open(AddToCartComponent, {
      data: drink
    });
  }

  openCart() {
    this.bottomSheet.open(ShoppingCartComponent, {});
  }

  addFavorite(barId: string) {
    this.cs.addFavorite(barId);
  }

  removeFavorite(barId: string) {
    this.cs.removeFavorite(barId);
  }
}
