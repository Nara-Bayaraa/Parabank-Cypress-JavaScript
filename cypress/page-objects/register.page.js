class RegisterPage {
  get firstNameInputField() {
    return cy.get('[id="customer.firstName"]');
  }
  get lastNameInputField() {
    return cy.get('[id="customer.lastName"]');
  }
  get addressInputField() {
    return cy.get('[id="customer.address.street"]');
  }
  get cityInputField() {
    return cy.get('[id="customer.address.city"]');
  }
  get stateInputField() {
    return cy.get('[id="customer.address.state"]');
  }
  get zipCodeInputField() {
    return cy.get('[id="customer.address.zipCode"]');
  }
  get phoneNumberInputField() {
    return cy.get('[id="customer.phoneNumber"]');
  }
  get ssnInputField() {
    return cy.get('[id="customer.ssn"]');
  }

  get userNameInputField() {
    return cy.get('[id="customer.username"]');
  }
  get passwordInputField() {
    return cy.get('[id="customer.password"]');
  }
  get confirmPasswordInputField() {
    return cy.get('[id="repeatedPassword"]');
  }
  get registerButton() {
    return cy.get("input[value='Register']");
  }
  get usernameExistErrorText() {
    return cy.get('[id="customer.username.errors"]');
  }
  get firstNameRequiredText() {
    return cy.get('[id="customer.firstName.errors"]');
  }
  get lastNameRequiredText() {
    return cy.get('[id="customer.lastName.errors"]');
  }
// after register
  get welcomeText() {
    return cy.get('[class="title"]');
  }
  get successfullyRegisterText() {
    return cy.get("div#rightPanel p");
  }
  
  get welcomeMessageText() {
   return cy.get('div#leftPanel b')
  }
  
  typeFirstName(firstName) {
    if (firstName && firstName.length > 0) {
      this.firstNameInputField.type(firstName);
    } else {
      this.firstNameInputField.clear();
    }
  }

  typeLastName(lastName) {
    if (lastName && lastName.length > 0) {
      this.lastNameInputField.type(lastName);
    } else {
      this.lastNameInputField.clear();
    }
  }

  typeAddress(address) {
    if (address && address.length > 0) {
      this.addressInputField.type(address);
    } else {
      this.addressInputField.clear();
    }
  }

  typeCity(city) {
    if (city && city.length > 0) {
      this.cityInputField.type(city);
    } else {
      this.cityInputField.clear();
    }
  }

  typeState(state) {
    if (state && state.length > 0) {
      this.stateInputField.type(state);
    } else {
      this.stateInputField.clear();
    }
  }

  typeZipCode(zipCode) {
    if (zipCode && zipCode.length > 0) {
      this.zipCodeInputField.type(zipCode);
    } else {
      this.zipCodeInputField.clear();
    }
  }
  typePhoneNumber(phoneNumber) {
    if (phoneNumber && phoneNumber.length > 0) {
      this.phoneNumberInputField.type(phoneNumber);
    } else {
      this.phoneNumberInputField.clear();
    }
  }

  typeSSN(ssn) {
    if (ssn && ssn.length > 0) {
      this.ssnInputField.type(ssn);
    } else {
      this.ssnInputField.clear();
    }
  }

  typeUserName(username) {
    if (username && username.length > 0) {
      this.userNameInputField.type(username);
    } else {
      this.userNameInputField.clear();
    }
  }

  typePassword(password) {
    if (password && password.length > 0) {
      this.passwordInputField.type(password);
    } else {
      this.passwordInputField.clear();
    }
  }

  typeConfirmPassword(confirmPassword) {
    if (confirmPassword && confirmPassword.length > 0) {
      this.confirmPasswordInputField.type(confirmPassword);
    } else {
      this.confirmPasswordInputField.clear();
    }
  }

  clickRegisterButton() {
    this.registerButton.click();
  }

  verifyUserAlreadyExistMessageIsVisible(expectedMessage) {
    this.usernameExistErrorText.should("be.visible", expectedMessage);
  }

  verifyFirstNameRequiredMessageIsVisible() {
    this.firstNameRequiredText.should("be.visible");
  }

  verifyLastNameRequiredMessageIsVisible() {
    this.lastNameRequiredText.should("be.visible");
  }

    verifyWelcomeMessageIsVisible(expectedText) {
    this.welcomeText.should("be.visible", expectedText);
  }

  verifyAccountSuccessfullyCreatedMessageIsVisible(expectedText) {
    this.successfullyRegisterText.should("be.visible", expectedText);
  }
  
}
export default new RegisterPage();
