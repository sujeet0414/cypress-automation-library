describe('Example: cypress-automation-library', () => {
  it('uses custom commands and utilities', () => {
    cy.visit('/');

    cy.getByTestId('welcome').should('be.visible');
    cy.safeClick('[data-testid="get-started"]');
    cy.waitForVisible('h1');
  });

  it('can make API requests', () => {
    cy.apiRequest('GET', '/api/health').then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
