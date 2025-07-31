describe('Reset Database State (API)', () => {
    context("POST /cleanDB", () => {
  it("should clean the database and return success", () => {
    cy.api({
      method: "POST",
      url: `${apiUrl}/cleanDB`,
      headers: {
        Accept: "application/xml"
      }
    }).then((response) => {
      expect(response.status).to.eq(200); 
    });
  });
});
});