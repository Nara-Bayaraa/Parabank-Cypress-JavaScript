describe('Get Customer Accounts', () => {
  const apiUrl = Cypress.env('apiUrl');
  const headers = { Accept: 'application/json' };
  const customerId = 12212;
  context('GET/customers/:customersId/accounts', () => {
    it('should return a list of accounts for the given customer ID', () => {
      cy.api({
        method: 'GET',
        url: `${apiUrl}/customers/${customerId}/accounts`,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array').and.not.be.empty;
        expect(response.body.length).to.be.greaterThan(0);

        response.body.forEach((account) => {
          expect(account).to.have.all.keys('id', 'customerId', 'type', 'balance');
          expect(account.customerId).to.eq(customerId);
          expect(['CHECKING', 'SAVINGS']).to.include(account.type);
          expect(account.balance).to.be.a('number');
          cy.log(JSON.stringify(response.body));
        });
      });
    });
  });

  context('GET /customers/{customerId}', () => {
    it("should successfully retrieve specific customer's account details given customer ID", () => {
      const customerId = 12212;
      const firstName = 'John';
      const lastName = 'Smith';
      const phoneNumber = '310-447-4121';
      const ssn = '622-11-9999';
      const expectedAddress = {
        street: '1431 Main St',
        city: 'Beverly Hills',
        state: 'CA',
        zipCode: '90210',
      };

      cy.api({
        method: 'GET',
        url: `${apiUrl}/customers/${customerId}`,
        headers,
      }).then((response) => {
        expect(response.status).to.eq(200);

        expect(response.body).to.have.all.keys(
          'id',
          'firstName',
          'lastName',
          'address',
          'phoneNumber',
          'ssn'
        );
        expect(response.body.address).to.have.all.keys('street', 'city', 'state', 'zipCode');

        expect(response.body).to.include({
          id: customerId,
          firstName,
          lastName,
          phoneNumber,
          ssn,
        });
        expect(response.body.address).to.deep.equal(expectedAddress);

        expect(response.body.id).to.be.a('number');
        expect(response.body.firstName).to.be.a('string').and.not.be.empty;
        expect(response.body.phoneNumber).to.match(/^\d{3}-\d{3}-\d{4}$/);
        expect(response.body.ssn).to.match(/^\d{3}-\d{2}-\d{4}$/);
        expect(response.body.address.zipCode).to.match(/^\d{5}$/);
      });
    });
  });
});
