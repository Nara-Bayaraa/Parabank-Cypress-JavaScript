describe("Create Account API", () => {
  
  context("POST /createAccount", () => {
    const apiUrl = `${Cypress.env("apiUrl")}`;
    const headers = { Accept: "application/json" };
    const customerId = 12212;
    const fromAccountId = 13344;

    it("should create a CHECKING account successfully", () => {
      cy.api({
        method: "POST",
        url: `${apiUrl}/createAccount`,
        qs: {
          customerId,
          newAccountType: 0, // CHECKING
          fromAccountId,
        },
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("customerId", customerId);
        expect(response.body).to.have.property("type").and.to.be.a("string");
        expect(response.body).to.have.property("balance");
        expect(response.body).to.include({ customerId });
        cy.log("CHECKING account created:", JSON.stringify(response.body));
      });
    });

    it("should create a SAVINGS account successfully", () => {
      cy.api({
        method: "POST",
        url: `${apiUrl}/createAccount`,
        qs: {
          customerId,
          newAccountType: 1, // SAVINGS
          fromAccountId,
        },
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("customerId", customerId);
        expect(response.body).to.have.property("type").and.to.be.a("string");
        expect(response.body).to.have.property("balance");

        expect(response.body).to.include({ customerId });
        cy.log("SAVINGS account created:", JSON.stringify(response.body));
      });
    });

    it("should create a LOAN account successfully", () => {
      cy.api({
        method: "POST",
        url: `${apiUrl}/createAccount`,
        qs: {
          customerId,
          newAccountType: 2, //LOAN
          fromAccountId,
        },
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("customerId", customerId);
        expect(response.body).to.have.property("type").and.to.be.a("string");
        expect(response.body).to.have.property("balance");

        expect(response.body).to.include({ customerId });
        cy.log("LOAN account created:", JSON.stringify(response.body));
      });
    });

    it("should not create account with invalid customerId", () => {
      cy.api({
        method: "POST",
        url: `${apiUrl}/createAccount`,
        qs: {
          customerId: "invalid",
          newAccountType: 0,
          fromAccountId,
        },
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.satisfy(
          (body) => body === "" || body.includes?.("error")
        );
      });
    });
  });
});
