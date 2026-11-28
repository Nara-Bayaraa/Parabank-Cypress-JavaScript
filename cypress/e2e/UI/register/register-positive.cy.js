import HomePage from '../../../page-objects/home.page';
import RegisterPage from '../../../page-objects/register.page';
import { generateUserRegistrationData } from '../../../support/helpers/generate-data';

describe('User Registration -Positive Test Cases', () => {
  let successMessage;

  before(() => {
    cy.fixture('ui-test-data/messages.json').then((data) => {
      successMessage = data;
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('[REG-001] should register a new user', () => {
    const registerData = generateUserRegistrationData();
    HomePage.clickRegisterLink();
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
    RegisterPage.verifyWelcomeMessageIsVisible(successMessage.WELCOME_MSG.replace('{username}', registerData.username));
    RegisterPage.verifyAccountSuccessfullyCreatedMessageIsVisible(
      successMessage.ACCOUNT_SUCCESSFULLY_CREATED_MSG
    );
    cy.log(`username ${registerData.username}`);
    cy.log(`password ${registerData.password}`);
  });
});
