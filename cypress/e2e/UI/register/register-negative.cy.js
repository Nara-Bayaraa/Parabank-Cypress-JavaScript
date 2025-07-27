import HomePage from "../../../page-objects/home.page";
import RegisterPage from "../../../page-objects/register.page";
import { generateUserRegistrationData } from "../../../support/helpers/generate-data";

describe("User Registration - Negative Test Cases", () => {
  let errorMessage;
  let userData;

  before(() => {
    cy.fixture("ui-test-data/error-messages.json").then((data) => {
      errorMessage = data;
    });
    cy.fixture("ui-test-data/user-credentials.json").then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.visit("/register.htm");
  });

  it("[REG-NEG-001] Verify registration is not allowed with an existing username", function () {
    cy.registerUser().then(() => {
      cy.get("@registeredUser").then((user) => {
        cy.wrap(user.username).as("username");
        cy.logoutUser();

        HomePage.clickRegisterLink();
        cy.get("@username").then((username) => {
          const registerData = generateUserRegistrationData();
          RegisterPage.typeFirstName(registerData.firstName);
          RegisterPage.typeLastName(registerData.lastName);
          RegisterPage.typeAddress(registerData.address);
          RegisterPage.typeCity(registerData.city);
          RegisterPage.typeState(registerData.state);
          RegisterPage.typeZipCode(registerData.zipCode);
          RegisterPage.typePhoneNumber(registerData.phone);
          RegisterPage.typeSSN(registerData.ssn);
          RegisterPage.typeUserName(username); // existing username
          RegisterPage.typePassword(registerData.password);
          RegisterPage.typeConfirmPassword(registerData.confirmPassword);
          RegisterPage.clickRegisterButton();

          RegisterPage.verifyUserAlreadyExistMessageIsVisible(
            errorMessage.USERNAME_ALREADY_EXIST_MSG
          );
        });
      });
    });
  });

  it("[REG--NEG-002 Verify that submitting the registration form with all fields empty displays error messages for each required field", () => {
    RegisterPage.clickRegisterButton();
    RegisterPage.verifyErrorMessages(errorMessage.REGISTER_FORM_FIELDS);
  });

  it("[REG--NEG-003] Verify registration is not allowed when first name is missing", () => {
    const registerData = generateUserRegistrationData();
    RegisterPage.typeFirstName(userData.invalid_emptyInput); // empty first name
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

    RegisterPage.verifyFirstNameRequiredMessageIsVisible(
      errorMessage.FIRST_NAME_REQUIRED_MSG
    );
  });

  it("[REG--NEG-004] Verify registration is not allowed when last name is missing", () => {
    const registerData = generateUserRegistrationData();
    RegisterPage.typeFirstName(registerData.firstName);
    RegisterPage.typeLastName(userData.invalid_emptyInput); // empty last name
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

    RegisterPage.verifyLastNameRequiredMessageIsVisible(
      errorMessage.LAST_NAME_REQUIRED_MSG
    );
  });
});
