class AccountOpenedConfirmationPage {
  get accountOpenedTitle() {
    return cy.get("div[id='openAccountResult'] h1[class='title']");
  }
  get congratulationsText() {
    return cy.xpath(
      "//p[normalize-space()='Congratulations, your account is now open.']"
    );
  }
  get newAccountLabel() {
    return cy.contains("Your new account number:");
  }
  get accountNumberLink() {
    return cy.contains("Your new account number:").next("a");
  }

  verifyAccountOpenedPageTitle() {
    this.accountOpenedTitle
      .should("be.visible")
      .and("have.text", "Account Opened!");
  }

  verifyAccountOpenMessage(expectedMessage) {
    this.congratulationsText.should("be.visible", expectedMessage);
  }

  verifyAccountNumberLink() {
    this.accountNumberLink
      .should("be.visible")
      .and("have.attr", "href")
      .and("match", /activity\.htm\?id=\d+/);
  }

  verifyAccountOpenedConfirmation(successMessage) {
    this.verifyAccountOpenedPageTitle();
    this.verifyAccountOpenMessage(successMessage);
    this.accountNumberLink.should("be.visible");
  }
  
  clickAccountNumberLink() {
    this.accountNumberLink.click();
  }
}

export default new AccountOpenedConfirmationPage();
