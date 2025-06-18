describe("Logout Functionality", () => {
  
  let username;
  let password;

  it("[LOGOUT-001] Verify successful logout after registration and redirection to login page", () => {
    cy.visit("/register.htm");
    cy.registerUser().then(() => {
      cy.get("@registeredUser").then((user) => {
        username = user.username;
        password = user.password;
        cy.logoutUser();
      });
    });
  });

  it("[LOGOUT-002] Verify successful logout and redirection to login page", () => {
    cy.visit("/index.htm");
    cy.loginUser(username, password);
    cy.logoutUser();
    cy.url().should("include", "/index.htm");
  });
});
