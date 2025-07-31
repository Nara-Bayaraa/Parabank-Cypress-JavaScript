describe('Deposit API', () => {
  const apiUrl = `${Cypress.env('apiUrl')}`;
  const headers = { Accept: 'application/json' };

  context('POST /deposit', () => {
    const testData = {
      accountId: 12345,
      amount: 50,
    };

    it('should successfully deposit funds into an existing account', () => {
      cy.api({
        method: 'POST',
        url: `${apiUrl}/deposit`,
        qs: testData,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include(
          `Successfully deposited $${testData.amount} to account #${testData.accountId}`
        );
      });
    });

    it('should return 404 for invalid account', () => {
      cy.api({
        method: 'POST',
        url: `${apiUrl}/deposit`,
        qs: { accountId: 'invalid', amount: 50 },
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.be.empty;
      });
    });
  });
});
