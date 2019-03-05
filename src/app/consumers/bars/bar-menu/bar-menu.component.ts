import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, combineLatest, pipe, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap, filter } from 'rxjs/operators';
import { Bar, Drink, BaseUser } from '@types';
import {
  MatDialog,
  MatBottomSheet,
  MatSnackBar,
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef
} from '@angular/material';
import { AddToCartComponent } from '../../dialogs/menu/add-to-cart/add-to-cart.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { AuthService } from '@services/auth/auth.service';
import { BarTapApi } from '@api';
import { Cart } from '@services/cart.service';

@Component({
  selector: 'app-bar-menu',
  templateUrl: './bar-menu.component.html',
  styleUrls: ['./bar-menu.component.scss']
})
export class BarMenuComponent {
  bar: Observable<Bar>;
  drinks: Observable<Drink[]>;
  favorite: boolean;

  constructor(
    route: ActivatedRoute,
    router: Router,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    public auth: AuthService,
    private api: BarTapApi,
    private cart: Cart
  ) {
    this.favorite = false;
    this.cart.clearCart();
    const barDetails = route.params.pipe(
      map<Params, string>(params => params['uid']),
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

  toggleFavorite() {}
}
