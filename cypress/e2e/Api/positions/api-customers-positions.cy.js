describe('Customer Positions - API', () => {
  const apiUrl = Cypress.env('apiUrl');
  const headers = { Accept: 'application/json' };
  const customerId = 12212;

  context('GET/ customers/{customerId}/positions', () => {
    it('should successfully retrieve positions for customers by customer ID', () => {
      cy.api({
        method: 'GET',
        url: `${apiUrl}/customers/${customerId}/positions`,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        response.body.forEach((pos) => {
          expect(pos).to.have.all.keys(
            'positionId',
            'customerId',
            'name',
            'symbol',
            'shares',
            'purchasePrice'
          );
          expect(pos.customerId).to.eq(customerId);
          expect(Number(pos.shares)).to.be.a('number').and.to.be.at.least(0);
          expect(Number(pos.purchasePrice)).to.be.a('number').and.to.be.at.least(0);
          expect(pos.name).to.be.a('string').and.not.be.empty;
          expect(pos.symbol).to.be.a('string').and.not.be.empty;
        });
      });
    });
  });
});
