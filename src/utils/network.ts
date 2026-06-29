/// <reference types="cypress" />

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export function interceptApi(method: string, url: string, alias: string): void {
  cy.intercept(method as HttpMethod, url).as(alias);
}

export function mockApiResponse(
  method: string,
  url: string,
  alias: string,
  response: object,
  statusCode = 200
): void {
  cy.intercept(method as HttpMethod, url, { statusCode, body: response }).as(alias);
}

export function waitForApi(alias: string, timeout = 10000): Cypress.Chainable {
  return cy.wait(`@${alias}`, { timeout });
}
