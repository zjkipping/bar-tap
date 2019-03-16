import { Injectable } from '@angular/core';
import { Drink, CartItem, Bar } from '@types';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cart {
  bar: Observable<Bar> | undefined;
  cartItems: BehaviorSubject<CartItem[]>;
  subtotal: Observable<number>;
  tax: number | undefined;
  total: number | undefined;

  constructor() {
    this.cartItems = new BehaviorSubject([] as CartItem[]);
    const sub = this.cartItems.pipe(
      map(drinks =>
        drinks
          .map(item => item.drink.price * item.quantity)
          .reduce((total, price) => total + price, 0)
      )
    );
    this.subtotal = sub;
    sub.subscribe(value => {
      this.tax = value * 0.08;
      this.total = value + this.tax;
    });
  }

  addDrink(drink: Drink, quantity?: number) {
    const cartValue = this.cartItems.value;
    const indexInCart = cartValue.findIndex(item => item.drink.uid === drink.uid);
    if (indexInCart > -1) {
      const item = cartValue[indexInCart];
      this.cartItems.next([
        ...cartValue.slice(0, indexInCart),
        { ...item, quantity: item.quantity + (quantity ? quantity : 1) },
        ...cartValue.slice(indexInCart + 1)
      ]);
    } else {
      this.cartItems.next([
        ...cartValue,
        { drink, quantity: quantity ? quantity : 1 }
      ]);
    }
  }

  addQuantity(drink: Drink) {
    const cartValue = this.cartItems.value;
    const indexInCart = cartValue.findIndex(item => item.drink.uid === drink.uid);
    if (indexInCart > -1) {
      const item = cartValue[indexInCart];
      this.cartItems.next([
        ...cartValue.slice(0, indexInCart),
        { ...item, quantity: item.quantity + 1 },
        ...cartValue.slice(indexInCart + 1)
      ]);
    }
  }

  removeQuantity(drink: Drink) {
    const cartValue = this.cartItems.value;

    const indexInCart = cartValue.findIndex(item => item.drink.uid === drink.uid);
    if (indexInCart > -1) {
      const item = cartValue[indexInCart];
      if (item.quantity - 1 === 0) {
        this.removeDrink(drink);
      } else {
        this.cartItems.next([
          ...cartValue.slice(0, indexInCart),
          { ...item, quantity: item.quantity - 1 },
          ...cartValue.slice(indexInCart + 1)
        ]);
      }
    }
  }

  removeDrink(drinkToRemove: Drink) {
    this.cartItems.next(
      this.cartItems.value.filter(item => item.drink.uid !== drinkToRemove.uid)
    );
  }

  clearCart() {
    this.cartItems.next(
      this.cartItems.value.filter(item => item.drink.uid === null)
    );
  }
}
