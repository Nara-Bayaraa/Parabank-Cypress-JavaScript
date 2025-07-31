describe('Accounts API', () => {
  const apiUrl = `${Cypress.env('apiUrl')}`;
  const headers = { Accept: 'application/json' };

  context('GET /accounts/:accountId', () => {
    it('should retrieve account details by ID', () => {
      const accountId = 13344;
      cy.api({
        method: 'GET',
        url: `${apiUrl}accounts/${accountId}`,
        headers,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', accountId);
        cy.log('Account Details:', JSON.stringify(response.body));
      });
    });
});
     context('Negative Test Cases', () => {
    it('should return an error for invalid account ID', () => {
      const invalidAccountId = 999999;

      cy.api({
        method: 'GET',
        url: `${apiUrl}accounts/${invalidAccountId}`,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.include(`Could not find account #${invalidAccountId}`);
      });
    });
  });
});

