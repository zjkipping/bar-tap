import { browser, protractor, $ } from 'protractor';

export async function navigateTo(path: string) {
  browser.waitForAngularEnabled(false);
  return browser.get(path);
}

export const PE = protractor.ExpectedConditions;
export const EC = browser.ExpectedConditions;

export const BAR_ID = 'WW8y2ZA47vCEdsURleCJ';

export const successBar = $('.success-snackbar');
