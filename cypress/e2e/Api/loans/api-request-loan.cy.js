describe('Loans API', () => {
  const apiUrl = Cypress.env('apiUrl');
  const headers = { Accept: 'application/json' };
  const loanRequestData = {
    customerId: 12212,
    amount: 50,
    downPayment: 10,
    fromAccountId: 13344,
  };

  context('POST /requestLoan', () => {
    it('should successfully request a loan and return approval details', () => {
      cy.api({
        method: 'POST',
        url: `${apiUrl}/requestLoan`,
        qs: loanRequestData,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);

        expect(response.body).to.have.all.keys(
          'responseDate',
          'loanProviderName',
          'approved',
          'accountId'
        );

        expect(response.body.responseDate).to.be.a('number');
        expect(response.body.loanProviderName).to.be.a('string').and.not.be.empty;
        expect(response.body.approved).to.be.true;
        expect(response.body.accountId).to.be.a('number');
      });
    });
  });
});
