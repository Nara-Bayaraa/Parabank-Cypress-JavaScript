import HomePage from "../../page-objects/home.page";

Cypress.Commands.add("loginUser", (username, password) => {
  //cy.visit("/index.htm");
  cy.wait(1500);
  HomePage.typeUserName(username);
  HomePage.typePassword(password);
  HomePage.clickLoginButton();
  cy.log(`The logged username is: ${username}`);
  cy.log(`The logged password is: ${password}`);
});

Cypress.Commands.add("logoutUser", () => {
  cy.contains("Log Out").click();
});


Cypress.Commands.add("apiLogin", (username = "john", password = "demo") => {
  cy.request({
    method: "POST",
    url: "https://parabank.parasoft.com/parabank/login.htm",
    form: true,
    body: {
      username,
      password,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.log(`Logged in as ${username}`);
  });
});


Cypress.Commands.add("uiLogin", (username = "john", password = "demo") => {
  cy.visit("/index.htm");
  cy.get('input[name="username"]').clear().type(username);
  cy.get('input[name="password"]').clear().type(password);
  cy.get('input[type="submit"]').click();
});
