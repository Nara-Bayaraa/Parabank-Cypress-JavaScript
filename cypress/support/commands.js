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
cy.contains('Your account was created successfully. You are now logged in.').should('be.visible')
  cy.wrap(registerData).as("registeredUser");
   
});

Cypress.Commands.add("loginUser", (username, password) => {
      cy.visit("/index.htm");
    cy.wait(1000);
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

Cypress.Commands.add("parseValue", (valueStr) => {
  return parseFloat(valueStr.replace(/[^0-9.-]+/g, ""));
});

Cypress.Commands.add('buildExpectedAccount', (account, balance, availableAmount) => {
  return [
    {
      accountNumber: account.accountNumber,
      balance: `$${balance.toFixed(2)}`,
      availableAmount: `$${availableAmount.toFixed(2)}`,
    },
  ];
});

// username retry
Cypress.Commands.add('registerUserWithRetry', (maxRetries = 5) => {
  let tries = 0;

  function tryRegister() {
    const userData = generateUserRegistrationData();
    cy.registerUser(userData);

    // Check if error message appears
    cy.get('body').then($body => {
      if ($body.text().includes('This username already exists') && tries < maxRetries) {
        tries++;
        tryRegister(); // Try again with a new user
      } else {
        cy.wrap(userData).as('registeredUser');
      }
    });
  }
  tryRegister();
});

import "./commands";

