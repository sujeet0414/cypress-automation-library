/// <reference types="cypress" />

import { buildSelector, byTestId, byRole } from '../utils/selectors';
import { waitForStable } from '../utils/wait';
import { apiRequest } from '../utils/api';

declare global {
  namespace Cypress {
    interface Chainable {
      safeClick(selector: string, options?: Partial<Cypress.ClickOptions>): Chainable<JQuery<HTMLElement>>;
      fillField(selector: string, value: string, options?: Partial<Cypress.TypeOptions>): Chainable<JQuery<HTMLElement>>;
      waitForVisible(selector: string, timeout?: number): Chainable<JQuery<HTMLElement>>;
      waitForHidden(selector: string, timeout?: number): Chainable<JQuery<HTMLElement>>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      getByRole(role: string, name?: string): Chainable<JQuery<HTMLElement>>;
      apiRequest<T = unknown>(
        method: string,
        url: string,
        body?: object,
        options?: Partial<Cypress.RequestOptions>
      ): Chainable<Cypress.Response<T>>;
      login(username: string, password: string, options?: LoginOptions): Chainable<void>;
      clearAndType(selector: string, text: string): Chainable<JQuery<HTMLElement>>;
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
}

export { buildSelector, byTestId, byRole, waitForStable };
