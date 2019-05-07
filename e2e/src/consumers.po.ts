import { $, $$ } from 'protractor';

export const selectDrinkButtons = $('[e2e="openAddToCart"]');
export const selectDrinkButton = $$('[e2e="openAddToCart"]').first();
export const addToCartButton = $('[e2e="addToCartButton"]');
export const openCart = $('[e2e="openCart"]');
export const checkoutButton = $('[e2e="checkoutButton"]');
export const cardNumberInput = $('[e2e="cardNumberInput"]');
export const expirationInput = $('[e2e="expirationInput"]');
export const cvcInput = $('[e2e="cvcInput"]');
export const submitOrderButton = $('[e2e="submitOrderButton"]');
export const acceptUAButton = $('[e2e="acceptUA"]');
