import HomePage from "../../page-objects/home.page";

// UI login with session caching
Cypress.Commands.add('uiLogin', (username = 'john', password = 'demo') => {
  cy.session([username, password], () => {
      cy.visit("/index.htm");
    HomePage.typeUserName(username);
    HomePage.typePassword(password); 
    HomePage.clickLoginButton();
});
});


Cypress.Commands.add("loginUser", (username, password) => {
  cy.visit("/index.htm");
  cy.wait(1500);
  HomePage.typeUserName(username);
  HomePage.typePassword(password);
  HomePage.clickLoginButton();
  cy.log(`The logged username is: ${username}`);
  cy.log(`The logged password is: ${password}`);
});

Cypress.Commands.add('logoutUser', () => {
  cy.contains('Log Out').should('be.visible').click();
});

// API login 
Cypress.Commands.add('apiLogin', (username = 'john', password = 'demo') => {
  cy.api({
    method: 'POST',
    url: '/login.htm',
    form: true,
    body: { username, password },
  }).then(({ status }) => {
    expect(status).to.eq(200);
  });
});

