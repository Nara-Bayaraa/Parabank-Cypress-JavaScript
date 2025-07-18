import RegisterPage from "../page-objects/register.page";
import HomePage from "../page-objects/home.page";
import { generateUserRegistrationData } from "../support/helpers/generate-data";
import AccountOpenedConfirmationPage from "../page-objects/account-opened-confirmation.page";
import AccountServicesMenuPage from "../page-objects/account-services-menu.page";
import OpenNewAccountPage from "../page-objects/open-new-account.page";
import AccountDetailsPage from "../page-objects/account-details.page";


Cypress.Commands.add("registerUser", (overrides = {}) => {
    cy.visit("/register.htm");
  const registerData = { ...generateUserRegistrationData(), ...overrides };
  RegisterPage.typeFirstName(registerData.firstName);
  RegisterPage.typeLastName(registerData.lastName);
  RegisterPage.typeAddress(registerData.address);
  RegisterPage.typeCity(registerData.city);
  RegisterPage.typeState(registerData.state);
  RegisterPage.typeZipCode(registerData.zipCode);
  RegisterPage.typePhoneNumber(registerData.phone);
  RegisterPage.typeSSN(registerData.ssn);
  RegisterPage.typeUserName(registerData.username);
  RegisterPage.typePassword(registerData.password);
  RegisterPage.typeConfirmPassword(registerData.confirmPassword);
  RegisterPage.clickRegisterButton();
  cy.wrap(registerData).as("registeredUser");
   
});

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

Cypress.Commands.add('getAccountBalances', () => {
  let balances = {};
  cy.contains("Balance:").next().invoke("text").then(text => balances.balance = text.trim());
  cy.contains("Available:").next().invoke("text").then(text => balances.available = text.trim());
  cy.wrap(balances);
});


Cypress.Commands.add("selectAccountType", (accountType) => {
  AccountServicesMenuPage.clickOpenNewAccountLink();
  OpenNewAccountPage.selectAccountType(accountType);
  AccountOpenedConfirmationPage.clickAccountNumberLink();
cy.wait(1000)
return AccountDetailsPage.getAccountNumber();
});



// retries logic on username conflict.
Cypress.Commands.add('registerUserWithRetry', (maxRetries = 5) => {
  let tries = 0;
  function tryRegister() {
    const userData = generateUserRegistrationData();
    cy.registerUser(userData);

    cy.get('body', { timeout: 5000 }).then($body => {
      const text = $body.text();
      if (text.includes('Your account was created successfully. You are now logged in.')) {
        cy.wrap(userData).as('registeredUser');
      } else if (text.includes('This username already exists') && tries < maxRetries) {
        tries++;
        cy.log(`Retrying registration with new user. Attempt #${tries + 1}`);
        tryRegister(); 
      }
    });
  }
  tryRegister();
});

import "./commands";

