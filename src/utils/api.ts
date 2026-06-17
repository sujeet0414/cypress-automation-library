/// <reference types="cypress" />

let authToken: string | null = null;

export function setAuthToken(token: string): void {
  authToken = token;
}

export function getAuthToken(): string | null {
  return authToken;
}

export function apiRequest<T = unknown>(
  method: string,
  url: string,
  body?: object,
  options: Partial<Cypress.RequestOptions> = {}
): Cypress.Chainable<Cypress.Response<T>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  return cy.request<T>({
    method,
    url,
    body,
    failOnStatusCode: false,
    ...options,
    headers,
  });
}
