import { browser } from 'protractor';

import * as Utilities from './utilities';
import * as EmployeesPage from './employees.po';
import * as ConsumersPage from './consumers.po';

export const CARD_NUMBER = 4242424242424242;
export const EXPIRATION = '04/23';
export const CVC = '123';

export const EMAIL = 'e2e-employees@test-bar.com';
export const PASSWORD = 'e2e-employees';

export const ID = 'e2e';
export const PIN = '1234';

export const IN_PROGRESS = 'In Progress';
export const PICKUP = 'Pickup';

describe('Employees Page', () => {
  it('should create new Order', async () => {
    Utilities.navigateTo(`/bars/${Utilities.BAR_ID}`);
    await browser.wait(Utilities.EC.urlContains(`/bars/${Utilities.BAR_ID}`));
    await browser.wait(Utilities.PE.presenceOf(ConsumersPage.selectDrinkButtons));
    await ConsumersPage.selectDrinkButton.click();
    await browser.wait(Utilities.PE.presenceOf(ConsumersPage.addToCartButton));
    await ConsumersPage.addToCartButton.click();
    await browser.wait(Utilities.PE.presenceOf(Utilities.successBar));
    await ConsumersPage.openCart.click();
    await browser.wait(Utilities.PE.visibilityOf(ConsumersPage.checkoutButton));
    await browser.sleep(200);
    await ConsumersPage.checkoutButton.click();
    await browser.wait(Utilities.PE.presenceOf(ConsumersPage.cardNumberInput));
    await ConsumersPage.cardNumberInput.sendKeys(CARD_NUMBER);
    await ConsumersPage.expirationInput.sendKeys(EXPIRATION);
    await ConsumersPage.cvcInput.sendKeys(CVC);
    await ConsumersPage.submitOrderButton.click();
    await browser.wait(Utilities.EC.urlContains('tracker'));
    expect(Utilities.EC.urlContains('tracker'));
  });

  it('should login to employees dashboard', async () => {
    Utilities.navigateTo('/employees/login');
    await browser.wait(Utilities.EC.urlContains('/employees/login'));
    await browser.wait(Utilities.PE.presenceOf(EmployeesPage.emailInput));
    await EmployeesPage.emailInput.sendKeys(EMAIL);
    await EmployeesPage.passwordInput.sendKeys(PASSWORD);
    await EmployeesPage.loginButton.click();
    await browser.wait(Utilities.EC.urlContains('/employees/dashboard'));
    expect(Utilities.EC.urlContains('/employees/dashboard'));
  });

  it('should clock in employee', async () => {
    await browser.wait(Utilities.PE.presenceOf(EmployeesPage.clockInButton));
    await EmployeesPage.clockInButton.click();
    await browser.wait(Utilities.PE.presenceOf(EmployeesPage.idInput));
    await EmployeesPage.idInput.sendKeys(ID);
    await EmployeesPage.pinInput.sendKeys(PIN);
    await browser.sleep(200);
    await EmployeesPage.clockSubmitButton.click();
    await browser.wait(Utilities.PE.presenceOf(Utilities.successBar));
    expect(EmployeesPage.employeeDisplays.count()).toBe(1);
  });

  it('should display drink in queue', async () => {
    await browser.wait(Utilities.EC.not(Utilities.PE.presenceOf(Utilities.successBar)));
    await browser.wait(Utilities.PE.presenceOf(EmployeesPage.newOrder));
    expect(EmployeesPage.newOrders.count()).toBe(1);
  });

  it('should start next drink', async () => {
    await browser.wait(Utilities.EC.not(Utilities.PE.presenceOf(Utilities.successBar)));
    await browser.wait(Utilities.PE.presenceOf(EmployeesPage.startNextOrderButton));
    await EmployeesPage.startNextOrderButton.click();
    await browser.wait(Utilities.PE.presenceOf(EmployeesPage.selectEmployeeButton));
    await EmployeesPage.selectEmployeeButton.click();
    await browser.wait(Utilities.PE.presenceOf(EmployeesPage.startOrderButton));
    await EmployeesPage.startOrderButton.click();
    await browser.wait(Utilities.PE.presenceOf(Utilities.successBar));
    await browser.wait(Utilities.PE.presenceOf(EmployeesPage.orderStatusItem));
    expect(EmployeesPage.orderStatusValue.getText()).toBe(IN_PROGRESS);
  });

  it('should set drink to "pickup"', async () => {
    await browser.wait(Utilities.EC.not(Utilities.PE.presenceOf(Utilities.successBar)));
    await browser.wait(Utilities.PE.presenceOf(EmployeesPage.orderStatusItem));
    await EmployeesPage.orderStatusItem.click();
    await browser.wait(Utilities.PE.presenceOf(EmployeesPage.pickupButton));
    await EmployeesPage.pickupButton.click();
    await browser.wait(Utilities.PE.presenceOf(Utilities.successBar));
    expect(EmployeesPage.orderStatusValue.getText()).toBe(PICKUP);
  });

  it('should set drink to "complete"', async () => {
    await browser.wait(Utilities.EC.not(Utilities.PE.presenceOf(Utilities.successBar)));
    await browser.wait(Utilities.PE.presenceOf(EmployeesPage.orderStatusItem));
    await EmployeesPage.orderStatusItem.click();
    await browser.wait(Utilities.PE.presenceOf(EmployeesPage.completeOrderButton));
    await EmployeesPage.completeOrderButton.click();
    await browser.wait(Utilities.PE.presenceOf(Utilities.successBar));
    expect(EmployeesPage.orderStatusItems.count()).toBe(0);
  });

  it('should clock out employee', async () => {
    await browser.wait(Utilities.EC.not(Utilities.PE.presenceOf(Utilities.successBar)));
    await browser.wait(Utilities.PE.presenceOf(EmployeesPage.clockOutButton));
    await EmployeesPage.clockOutButton.click();
    await browser.wait(Utilities.PE.presenceOf(EmployeesPage.idInput));
    await EmployeesPage.idInput.sendKeys(ID);
    await EmployeesPage.pinInput.sendKeys(PIN);
    await browser.sleep(200);
    await EmployeesPage.clockSubmitButton.click();
    await browser.wait(Utilities.PE.presenceOf(Utilities.successBar));
    expect(EmployeesPage.employeeDisplays.count()).toBe(0);
  });

  it('should log out of employees dashboard', async () => {
    await browser.wait(Utilities.EC.not(Utilities.PE.presenceOf(Utilities.successBar)));
    await browser.wait(Utilities.PE.presenceOf(EmployeesPage.logoutButton));
    await EmployeesPage.logoutButton.click();
    await browser.wait(Utilities.EC.urlContains('/employees/login'));
    expect(Utilities.EC.urlContains('/employees/login'));
  });
});
