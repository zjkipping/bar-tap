import { Drink } from '@types';
import { Cart } from './cart.service';

const drink1: Drink = {
  name: 'water',
  price: 5,
  description: '',
  type: 'non-alcholic',
  uid: 'abc'
};
const drink2: Drink = {
  name: 'coke',
  price: 5,
  description: '',
  type: 'soda',
  uid: '123'
};

describe('Cart', () => {
  let service: Cart;
  beforeAll(() => service = new Cart());

  it('should add new drink1', () => {
    service.addDrink(drink1);
    expect(service.cartItems.value).toEqual([{ drink: drink1, quantity: 1 }]);
  });

  it('should add different type of drink2', () => {
    service.addDrink(drink2);
    expect(service.cartItems.value).toEqual([{ drink: drink1, quantity: 1 },{ drink: drink2, quantity: 1 }]);
  });

  it('should increase quanity of drink1 to 2', () => {
    service.addQuantity(drink1);
    expect(service.cartItems.value).toEqual([{ drink: drink1, quantity: 2 },{ drink: drink2, quantity: 1 }]);
  });

  it('should increase quanity of drink1 to 3', () => {
    service.addQuantity(drink1);
    expect(service.cartItems.value).toEqual([{ drink: drink1, quantity: 3 },{ drink: drink2, quantity: 1 }]);
  });

  it('should remove one drink1 quanity to 2', () => {
    service.removeQuantity(drink1);
    expect(service.cartItems.value).toEqual([{ drink: drink1, quantity: 2 },{ drink: drink2, quantity: 1 }]);
  });

  it('should remove one drink2 quanity to 0', () => {
    service.removeQuantity(drink2);
    expect(service.cartItems.value).toEqual([{ drink: drink1, quantity: 2 }]);
  });

  it('should remove drink1 and all of its quanity from the cart', () => {
    service.removeDrink(drink1);
    expect(service.cartItems.value).toEqual([ ]);
  });

  it('should add different type of drink2', () => {
    service.addDrink(drink2);
    expect(service.cartItems.value).toEqual([{ drink: drink2, quantity: 1 }]);
  });

  it('should clear the cart of all drinks', () => {
    service.clearCart();
    expect(service.cartItems.value).toEqual([]);
  });
});
