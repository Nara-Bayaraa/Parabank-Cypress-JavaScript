import HomePage from "../../page-objects/home.page";

describe("Login Functionality - Negative Test Cases", () => {
  
  let errorMessage;
  let validEmail;
  let validPassword;
  let userData;

  before(() => {
    cy.fixture("user-credentials.json").then((data) => {
      userData = data;
      validEmail = data.valid.username;
      validPassword = data.valid.password;
    });
    cy.fixture("messages.json").then((data) => {
      errorMessage = data;
    });
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("[LOGIN-001] Verify an error message is displayed when logging in with an empty username", () => {
    HomePage.loginUser(userData.invalid_emptyUsername, validPassword);
    HomePage.verifyCredentialsErrorMessageIsVisible(
      errorMessage.CREDENTIALS_REQUIRED_ERR_MSG
    );
  });

  it("[LOGIN-002] Verify an error message is displayed when logging in with an empty password", () => {
    cy.loginUser(validEmail, userData.invalidUser_emptyPassword);
    HomePage.verifyCredentialsErrorMessageIsVisible(
      errorMessage.CREDENTIALS_REQUIRED_ERR_MSG
    );
  });

  it("[LOGIN-003] Verify an error message is displayed when both username and password fields are empty", () => {
    cy.loginUser(
      userData.invalid_emptyUsername,
      userData.invalid_emptyPassword
    );
    HomePage.verifyCredentialsErrorMessageIsVisible(
      errorMessage.CREDENTIALS_REQUIRED_ERR_MSG
    );
  });

  it("[LOGIN-004] Verify an error message is displayed when logging in with an incorrect password", () => {
    cy.loginUser(validEmail, userData.invalid_wrongPassword.password);
    HomePage.verifyCredentialsErrorMessageIsVisible(
      errorMessage.USERNAME_AND_PASSWORD_VERIFICATION_ERR_MSG
    );
  });
});


