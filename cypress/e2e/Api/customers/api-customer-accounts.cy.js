describe("Get Customer Accounts", () => {
  const apiUrl = Cypress.env("apiUrl");
  const headers = { Accept: "application/json" };

  context("GET/customers/:customersId/accounts", () => {
    it("should return a list of accounts for the given customer ID", () => {
      const customerId = 12212;
      cy.api({
        method: "GET",
        url: `${apiUrl}customers/${customerId}/accounts`,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array").and.not.be.empty;
        expect(response.body.length).to.be.greaterThan(0);

        response.body.forEach((account) => {
          expect(account).to.have.all.keys(
            "id",
            "customerId",
            "type",
            "balance"
          );
          expect(account.customerId).to.eq(customerId);
          expect(["CHECKING", "SAVINGS"]).to.include(account.type);
          expect(account.balance).to.be.a("number");
          cy.log(JSON.stringify(response.body));
          
        });
      });
    });
  });
});
