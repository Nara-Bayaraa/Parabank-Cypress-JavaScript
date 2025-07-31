describe('Restore Database to Default (API)', () => {
context("POST /initializeDB", () => {
  it("should initialize the database and return success", () => {
    cy.api({
      method: "POST",
      url: `${apiUrl}/initializeDB`,
      headers: {
        Accept: "application/xml"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
});
