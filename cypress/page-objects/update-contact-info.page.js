class UpdateContactInfoPage {
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

  get updateProfileButton() {
    return cy.get('[value="Update Profile"]');
  }

  get profileUpdatedText() {
    return cy.get("div[id='updateProfileResult'] h1[class='title']");
  }

  typeAddress(expectedAddress) {
    this.addressInputField.clear().type(expectedAddress);
  }
  typeCity(expectedCity) {
    this.cityInputField.clear().type(expectedCity);
  }

  typeState(expectedState) {
    this.stateInputField.clear().type(expectedState);
  }

  typeZipCode(expectedZipCode) {
    this.zipCodeInputField.clear().type(expectedZipCode);
  }

  typePhoneNumber(expectedPhoneNumber) {
    this.phoneNumberInputField.clear().type(expectedPhoneNumber);
  }

  clickUpdateProfileButton() {
    this.updateProfileButton.click();
  }

  verifyProfileUpdatedTextIsVisible(expectedText) {
    this.profileUpdatedText.should("be.visible", expectedText);
  }
}
export default new UpdateContactInfoPage();
