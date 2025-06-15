class OpenNewAccountPage {

  get openNewAccountTitle() {
    return cy.contains("h1", "Open New Account");
  }
  get accountType() {
    return cy.get('[id="type"]');
  }
  get fundingAccountDropdown() {
    return cy.get("#fromAccountId");
  }
  get openNewAccountButton() {
    return cy.get('[type="button"]');
  }
  get defaultAccountNumber() {
    return cy.get("#fromAccountId option");
  }

  get selectDefaultAccountNumber() {
    return cy.get('[id="fromAccountId"]');
  }
  verifyOpenNewAccountPageUrl() {
  cy.url().should('include', '/openaccount.htm');
}

  verifyOpenNewAccountPageTitle() {
    this.openNewAccountTitle.should("be.visible").and("have.text", "Open New Account");
  }

  getDefaultAccountNumber() {
    return this.defaultAccountNumber.first().then(($option) => {
      const accountNumber = $option.val();
      return this.selectDefaultAccountNumber
        .select(accountNumber)
        .then(() => accountNumber);
    });
  }
  
selectAccountType(type) {
    this.accountType.select(type);
    this.fundingAccountDropdown
      .find("option")
      .should("have.length.greaterThan", 0)
      .then(($options) => {
        const accountNumber = Array.from($options).find((opt) => opt.value);
        this.fundingAccountDropdown.select(accountNumber.value);
      });
    this.openNewAccountButton.click();
  }
}
export default new OpenNewAccountPage();
