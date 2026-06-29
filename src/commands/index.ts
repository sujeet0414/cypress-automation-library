/// <reference types="cypress" />

import { buildSelector, byTestId, byRole } from '../utils/selectors';
import { inputByLabel, byPlaceholder, modalSelector } from '../utils/selectors-extended';
import { waitForStable } from '../utils/wait';
import { apiRequest } from '../utils/api';
import { tableRow, tableCell } from '../utils/table';
import { iframeByTestId } from '../utils/iframe';
import { mockApiResponse } from '../utils/network';

declare global {
  namespace Cypress {
    interface Chainable {
      safeClick(selector: string, options?: Partial<Cypress.ClickOptions>): Chainable<JQuery<HTMLElement>>;
      fillField(selector: string, value: string, options?: Partial<Cypress.TypeOptions>): Chainable<JQuery<HTMLElement>>;
      waitForVisible(selector: string, timeout?: number): Chainable<JQuery<HTMLElement>>;
      waitForHidden(selector: string, timeout?: number): Chainable<JQuery<HTMLElement>>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      getByRole(role: string, name?: string): Chainable<JQuery<HTMLElement>>;
      getByLabel(label: string): Chainable<JQuery<HTMLElement>>;
      getByPlaceholder(placeholder: string): Chainable<JQuery<HTMLElement>>;
      apiRequest<T = unknown>(
        method: string,
        url: string,
        body?: object,
        options?: Partial<Cypress.RequestOptions>
      ): Chainable<Cypress.Response<T>>;
      login(username: string, password: string, options?: LoginOptions): Chainable<void>;
      clearAndType(selector: string, text: string): Chainable<JQuery<HTMLElement>>;
      uploadFile(selector: string, filePath: string): Chainable<JQuery<HTMLElement>>;
      selectDropdown(selector: string, value: string): Chainable<JQuery<HTMLElement>>;
      scrollToElement(selector: string): Chainable<JQuery<HTMLElement>>;
      getTableRow(row: number): Chainable<JQuery<HTMLElement>>;
      getTableCell(row: number, col: number): Chainable<JQuery<HTMLElement>>;
      withinIframe(iframeSelector: string, callback: () => void): Chainable<void>;
      hoverElement(selector: string): Chainable<JQuery<HTMLElement>>;
      checkCheckbox(selector: string): Chainable<JQuery<HTMLElement>>;
      uncheckCheckbox(selector: string): Chainable<JQuery<HTMLElement>>;
      assertText(selector: string, text: string): Chainable<JQuery<HTMLElement>>;
      assertUrl(path: string): Chainable<string>;
      screenshotNamed(name: string): Chainable<undefined>;
      setLocalStorage(key: string, value: string): Chainable<Cypress.AUTWindow>;
      clearLocalStorage(): Chainable<Cypress.AUTWindow>;
      waitForPageLoad(): Chainable<Cypress.AUTWindow>;
      interceptApi(method: string, url: string, alias: string): Chainable<null>;
      mockApi(method: string, url: string, alias: string, response: object, statusCode?: number): Chainable<null>;
      waitForApi(alias: string, timeout?: number): Chainable<JQuery<HTMLElement>>;
      dragAndDrop(source: string, target: string): Chainable<JQuery<HTMLElement>>;
      closeModal(closeSelector?: string): Chainable<JQuery<HTMLElement>>;
      typeSlow(selector: string, text: string, delay?: number): Chainable<JQuery<HTMLElement>>;
      doubleClickElement(selector: string): Chainable<JQuery<HTMLElement>>;
      forceClick(selector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export interface LoginOptions {
  usernameSelector?: string;
  passwordSelector?: string;
  submitSelector?: string;
  successUrl?: string;
}

const DEFAULT_LOGIN: Required<LoginOptions> = {
  usernameSelector: '[data-testid="username"]',
  passwordSelector: '[data-testid="password"]',
  submitSelector: '[data-testid="login-submit"]',
  successUrl: '/dashboard',
};

export function registerCommands(): void {
  Cypress.Commands.add('safeClick', (selector: string, options = {}) => {
    return cy.get(selector, { timeout: 10000 }).should('be.visible').click(options);
  });

  Cypress.Commands.add('fillField', (selector: string, value: string, options = {}) => {
    return cy.get(selector).should('be.visible').clear().type(value, options);
  });

  Cypress.Commands.add('waitForVisible', (selector: string, timeout = 10000) => {
    return cy.get(selector, { timeout }).should('be.visible');
  });

  Cypress.Commands.add('waitForHidden', (selector: string, timeout = 10000) => {
    return cy.get(selector, { timeout }).should('not.be.visible');
  });

  Cypress.Commands.add('getByTestId', (testId: string) => {
    return cy.get(byTestId(testId));
  });

  Cypress.Commands.add('getByRole', (role: string, name?: string) => {
    return cy.get(byRole(role, name));
  });

  Cypress.Commands.add('getByLabel', (label: string) => {
    return cy.get(inputByLabel(label));
  });

  Cypress.Commands.add('getByPlaceholder', (placeholder: string) => {
    return cy.get(byPlaceholder(placeholder));
  });

  Cypress.Commands.add('apiRequest', (method: string, url: string, body?: object, options = {}) => {
    return apiRequest(method, url, body, options);
  });

  Cypress.Commands.add('login', (username: string, password: string, options: LoginOptions = {}) => {
    const config = { ...DEFAULT_LOGIN, ...options };

    cy.visit('/login');
    cy.fillField(config.usernameSelector, username);
    cy.fillField(config.passwordSelector, password);
    cy.safeClick(config.submitSelector);
    cy.url().should('include', config.successUrl);
  });

  Cypress.Commands.add('clearAndType', (selector: string, text: string) => {
    return cy.get(selector).clear().type(text);
  });

  Cypress.Commands.add('uploadFile', (selector: string, filePath: string) => {
    return cy.get(selector).selectFile(filePath, { force: true });
  });

  Cypress.Commands.add('selectDropdown', (selector: string, value: string) => {
    return cy.get(selector).should('be.visible').select(value);
  });

  Cypress.Commands.add('scrollToElement', (selector: string) => {
    return cy.get(selector).scrollIntoView().should('be.visible');
  });

  Cypress.Commands.add('getTableRow', (row: number) => {
    return cy.get(tableRow(row));
  });

  Cypress.Commands.add('getTableCell', (row: number, col: number) => {
    return cy.get(tableCell(row, col));
  });

  Cypress.Commands.add('withinIframe', (iframeSelector: string, callback: () => void) => {
    cy.get(iframeSelector).its('0.contentDocument.body').should('not.be.empty').then(cy.wrap).within(callback);
  });

  Cypress.Commands.add('hoverElement', (selector: string) => {
    return cy.get(selector).should('be.visible').trigger('mouseover');
  });

  Cypress.Commands.add('checkCheckbox', (selector: string) => {
    return cy.get(selector).check({ force: true });
  });

  Cypress.Commands.add('uncheckCheckbox', (selector: string) => {
    return cy.get(selector).uncheck({ force: true });
  });

  Cypress.Commands.add('assertText', (selector: string, text: string) => {
    return cy.get(selector).should('contain.text', text);
  });

  Cypress.Commands.add('assertUrl', (path: string) => {
    return cy.url().should('include', path);
  });

  Cypress.Commands.add('screenshotNamed', (name: string) => {
    return cy.screenshot(name);
  });

  Cypress.Commands.add('setLocalStorage', (key: string, value: string) => {
    return cy.window().then((win) => {
      win.localStorage.setItem(key, value);
    });
  });

  Cypress.Commands.add('clearLocalStorage', () => {
    return cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  Cypress.Commands.add('waitForPageLoad', () => {
    return cy.window().its('document.readyState').should('eq', 'complete');
  });

  Cypress.Commands.add('interceptApi', (method: string, url: string, alias: string) => {
    cy.intercept(method as Cypress.HttpMethod, url).as(alias);
  });

  Cypress.Commands.add('mockApi', (method: string, url: string, alias: string, response: object, statusCode = 200) => {
    mockApiResponse(method, url, alias, response, statusCode);
  });

  Cypress.Commands.add('waitForApi', (alias: string, timeout = 10000) => {
    cy.wait(`@${alias}`, { timeout });
  });

  Cypress.Commands.add('dragAndDrop', (source: string, target: string) => {
    cy.get(source).should('be.visible').trigger('dragstart');
    cy.get(target).should('be.visible').trigger('drop');
  });

  Cypress.Commands.add('closeModal', (closeSelector = `${modalSelector()} [aria-label="Close"], ${modalSelector()} .close`) => {
    return cy.get(closeSelector).first().click();
  });

  Cypress.Commands.add('typeSlow', (selector: string, text: string, delay = 100) => {
    return cy.get(selector).should('be.visible').clear().type(text, { delay });
  });

  Cypress.Commands.add('doubleClickElement', (selector: string) => {
    return cy.get(selector).should('be.visible').dblclick();
  });

  Cypress.Commands.add('forceClick', (selector: string) => {
    return cy.get(selector).click({ force: true });
  });
}

export { buildSelector, byTestId, byRole, waitForStable, iframeByTestId };
