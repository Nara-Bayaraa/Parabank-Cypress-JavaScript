describe("Customer Update API", () => {
  const apiUrl = Cypress.env("apiUrl");
  const headers = { Accept: "application/json" };
  const customerId = 12212;
  context("POST /customers/update/{customerId}", () => {
    const updateData = {
      firstName: "Jen",
      lastName: "Doe",
      street: "555 Cypress Ave",
      city: "Testville",
      state: "TX",
      zipCode: "75001",
      phoneNumber: "123-456-7890",
      ssn: "123-45-6789",
      username: "jendoe",
      password: "newpass123",
    };
    
    it("should update all fields by customer ID and return success", () => {
      cy.api({
        method: "POST",
        url: `${apiUrl}/customers/update/${customerId}`,
        qs: { ...updateData },
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("should reflect updates when fetched by customer ID", () => {
      cy.api({
        method: "GET",
        url: `${apiUrl}/customers/${customerId}`,
        headers,
      }).then((getResp) => {
        expect(getResp.status).to.eq(200);
        expect(getResp.body.firstName).to.eq(updateData.firstName);
        expect(getResp.body.lastName).to.eq(updateData.lastName);
        expect(getResp.body.address.street).to.eq(updateData.street);
        expect(getResp.body.phoneNumber).to.eq(updateData.phoneNumber);
      });
    });
  });

  context("Negative cases", () => {});
});
