import HomePage from "../../../page-objects/home.page";

describe("Login Functionality - Positive Test Cases", () => {
  let username;
  let password;

  before(() => {
    cy.registerUserWithRetry(5);

    cy.get("@registeredUser").then((user) => {
      username = user.username;
      password = user.password;
      cy.logoutUser();
    });
  });
  beforeEach(() => {
    cy.visit("/");
  });

  it("[LOGIN-001] Verify successful login after registration with valid credentials", () => {
    cy.log(`username ${username}`);
    cy.log(`password ${password}`);
    HomePage.typeUserName(username);
    HomePage.typePassword(password);
    HomePage.clickLoginButton();
    HomePage.verifyAccountOverviewPageUrl();
    HomePage.verifyAccountOverviewPage();
  });
});
