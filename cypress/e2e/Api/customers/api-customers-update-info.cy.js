import { faker } from '@faker-js/faker';
describe("Customer Update API", () => {
  const apiUrl = Cypress.env("apiUrl");
  const headers = { Accept: "application/json" };
  const customerId = 12212;
  
  context("POST /customers/update/{customerId}", () => {
    const updateData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: 'TX',
      zipCode: faker.location.zipCode('#####'),
      phoneNumber: '123-456-7890',
      ssn: '123-45-6789',
      username: `qa_${faker.string.alphanumeric(8)}`,
      password: 'newpass123',
    };
    
    it("should update all fields by customer ID and return success", () => {
      cy.api({
        method: "POST",
        url: `${apiUrl}/customers/update/${customerId}`,
        qs: updateData,
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

  context("Negative cases", () => {
  it('should returns error for unknown customer', () => {
    cy.api({
      method: 'POST',
      url: `${apiUrl}/customers/update/99999999`,
      qs: { firstName: 'X' },
      headers,
      failOnStatusCode: false,
    }).then(({ status }) => {
      expect([400, 404, 500]).to.include(status);
    });
  });
  });
});
