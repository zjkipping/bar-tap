import { $, $$ } from 'protractor';

export const emailInput = $('[e2e="emailInput"]');
export const passwordInput = $('[e2e="passwordInput"]');
export const loginButton = $('[e2e="loginButton"]');

export const clockInButton = $('[e2e="clockInButton"]');
export const clockOutButton = $('[e2e="clockOutButton"]');
export const idInput = $('[e2e="idInput"]');
export const pinInput = $('[e2e="pinInput"]');
export const clockSubmitButton = $('[e2e="clockSubmitButton"]');
export const employeeDisplays = $$('[e2e="employeeDisplay"]');

export const logoutButton = $('[e2e="logoutButton"]');

export const newOrder = $('[e2e="newOrder"]');
export const newOrders = $$('[e2e="newOrder"]');

export const startNextOrderButton = $('[e2e="startNextOrderButton"]');
export const selectEmployeeButton = $('[e2e="selectEmployeeButton"]');
export const startOrderButton = $('[e2e="startOrderButton"]');
export const orderStatusItem = $$('[e2e="orderStatusItem"]').first();
export const orderStatusItems = $$('[e2e="orderStatusItem"]');
export const orderStatusValue = $('[e2e="orderStatusValue"]');

export const pickupButton = $('[e2e="pickupButton"]');

export const completeOrderButton = $('[e2e="completeOrderButton"]');
