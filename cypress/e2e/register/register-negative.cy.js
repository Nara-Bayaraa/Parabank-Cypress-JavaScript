import RegisterPage from "../../page-objects/register.page";
import { generateUserRegistrationData } from "../../support/helpers/generate-data";

describe("User Registration - Negative Test Cases", () => {
  
  let errorMessage;
  let userData;

  before(() => {
    cy.fixture("messages.json").then((data) => {
      errorMessage = data;
    });
    cy.fixture("user-credentials.json").then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.visit("/register.htm");
    cy.registerUser().then(() => {
      cy.get("@registeredUser").then((user) => {
        cy.wrap(user.username).as("username");
      });
    });
    cy.visit("/register.htm");
  });

  it("[REG-001] Verify registration is not allowed with an existing username", function () {
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

  it("[REG-002] Verify registration is not allowed when first name is missing", () => {
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

  it("[REG-003] Verify registration is not allowed when last name is missing", () => {
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

