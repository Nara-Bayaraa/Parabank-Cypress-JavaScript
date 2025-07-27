import RegisterPage from "../../page-objects/register.page";
import { generateUserRegistrationData } from "../helpers/generate-data";


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