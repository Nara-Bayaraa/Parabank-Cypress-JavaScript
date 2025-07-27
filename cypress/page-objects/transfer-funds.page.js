class TransferFundsPage {
  get transferFundsTitle() {
    return cy.get("div[id='showForm'] h1[class='title']");
  }

  get amountLabel() {
    return cy.get("// form[id='transferForm'] p b");
  }

  get amountInput() {
    return cy.get('[id="amount"]');
  }

  get fromAccountDropdown() {
    return cy.get('[id="fromAccountId"]');
  }

  get toAccountDropdown() {
    return cy.get('[id="toAccountId"]');
  }

  get transferButton() {
    return cy.get("input[value='Transfer']");
  }

  get transferredAmount() {
    return cy.get('[id="amountResult"]');
  }

  get confirmationMessageTitle() {
    return cy.contains("Transfer Complete!");
  }
  get amountResult() {
    return cy.get("#amountResult");
  }
  get fromAccountIdResult() {
    return cy.get("#fromAccountIdResult");
  }
  get toAccountIdResult() {
    return cy.get("#toAccountIdResult");
  }

  verifyTransferFundsTitleIsVisible() {
    this.transferFundsTitle.should("be.visible");
  }
  enterAmount(amount) {
    this.amountInput.clear().type(amount);
  }

  selectFromAccount(accountNumber) {
    this.fromAccountDropdown.select(accountNumber);
  }

  selectToAccount(accountNumber) {
    this.toAccountDropdown.select(accountNumber);
  }

  clickTransferButton() {
    this.transferButton.click();
  }

  verifyTransferConfirmation({
    expectedMessage,
    enteringAmount,
    fromAccount,
    toAccount,
  }) {
    this.confirmationMessageTitle.should("have.text", expectedMessage);
    this.amountResult.should("have.text", `$${enteringAmount}`);
    this.fromAccountIdResult.should("be.visible", fromAccount);
    this.toAccountIdResult.should('be.visible', toAccount);
    cy.contains("See Account Activity for more details.").should("be.visible");
  }

  selectFromAccountByIndex(index = 0) {
    return this.fromAccountDropdown
      .find("option")
      .eq(index)
      .invoke("val")
      .then((accountNumber) => {
        this.selectFromAccount(accountNumber);
        return cy.wrap(accountNumber);
      });
  }

  selectToAccountByIndex(index = 0) {
    return this.toAccountDropdown
      .find("option")
      .eq(index)
      .invoke("val")
      .then((accountNumber) => {
        this.selectToAccount(accountNumber);
        return cy.wrap(accountNumber);
      });
  }

  transferFunds({ amount, fromIndex = 0, toIndex = 0 }) {
    this.verifyTransferFundsTitleIsVisible();
    this.enterAmount(amount);

    return this.selectFromAccountByIndex(fromIndex).then(
      (fromAccountNumber) => {
        return this.selectToAccountByIndex(toIndex).then((toAccountNumber) => {
          this.clickTransferButton();
          return cy.wrap({
            fromAccount: fromAccountNumber,
            toAccount: toAccountNumber,
            amount,
          });
        });
      }
    );
  }
}

export default new TransferFundsPage();
