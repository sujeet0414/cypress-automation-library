/// <reference types="cypress" />

export function waitForStable(selector: string, stableMs = 500, timeout = 10000): Cypress.Chainable {
  const start = Date.now();

  const check = (): Cypress.Chainable => {
    return cy.get(selector).then(($el) => {
      const initialRect = $el[0].getBoundingClientRect();

      return cy.wait(stableMs).then(() => {
        return cy.get(selector).then(($el2) => {
          const newRect = $el2[0].getBoundingClientRect();
          const isStable =
            initialRect.top === newRect.top &&
            initialRect.left === newRect.left &&
            initialRect.width === newRect.width &&
            initialRect.height === newRect.height;

          if (isStable) {
            return cy.wrap($el2);
          }

          if (Date.now() - start > timeout) {
            throw new Error(`Element "${selector}" did not stabilize within ${timeout}ms`);
          }

          return check();
        });
      });
    });
  };

  return check();
}

export function retryAction(action: () => Cypress.Chainable): Cypress.Chainable {
  return action();
}
