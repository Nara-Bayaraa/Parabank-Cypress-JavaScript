class TransferFundsPage {

  get transferFundsTitle() {
   return cy.get("div[id='showForm'] h1[class='title']")
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

  get confirmationMessageTitle() {return cy.contains('Transfer Complete!')}
  get amountResult() { return cy.get('#amountResult'); }
  get fromAccountIdResult() { return cy.get('#fromAccountIdResult'); }
  get toAccountIdResult() { return cy.get('#toAccountIdResult'); }


verifyTransferFundsTitleIsVisible(){
  this.transferFundsTitle.should('be.visible')
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

 verifyTransferConfirmation({ expectedMessage, enteringAmount, fromAccount, toAccount }) {
    this.confirmationMessageTitle.should('have.text', expectedMessage);
    this.amountResult.should('have.text', `$${enteringAmount}`);
    this.fromAccountIdResult.should('have.text', fromAccount);
    this.toAccountIdResult.should('have.text', toAccount);
    cy.contains('See Account Activity for more details.').should('be.visible');
  }
}
  
export default new TransferFundsPage();
