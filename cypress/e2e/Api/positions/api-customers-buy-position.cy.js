describe('Buy Position API', () => {
  const apiUrl = Cypress.env('apiUrl');
  const headers = { Accept: 'application/json' };

  context('POST /customers/{customerId}/buyPosition', () => {
    it('should successfully buy a new position for the customer', () => {
      const buyData = {
        customerId: 12212,
        accountId: 13344,
        name: 'AMR Corporation',
        symbol: 'AMR',
        shares: 10,
        pricePerShare: 50.25,
      };

      cy.api({
        method: 'POST',
        url: `${apiUrl}/customers/${buyData.customerId}/buyPosition`,
        qs: buyData,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array').and.not.be.empty;

        response.body.forEach((pos) => {
          expect(pos).to.have.all.keys(
            'positionId',
            'customerId',
            'name',
            'symbol',
            'shares',
            'purchasePrice'
          );
          expect(Number(pos.customerId)).to.eq(buyData.customerId);
          expect(pos.name).to.be.a('string').and.not.be.empty;
          expect(pos.symbol).to.be.a('string').and.not.be.empty;
          expect(pos.purchasePrice).to.be.a('number').and.to.be.at.least(0);
        });
      });
    });
  });
});
