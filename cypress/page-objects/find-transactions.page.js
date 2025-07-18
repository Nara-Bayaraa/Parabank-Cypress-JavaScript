class FindTransactionsPage {
  get findTransactionsTitle() {
    return cy.contains("Find Transactions");
  }

  get findTransactionByDate() {
    return cy.get('[id="transactionDate"]');
  }
  get findByAmountField() {
    return cy.get("#amount");
  }
  get findTransactionByDateButton() {
    return cy.get('[id="findByDate"]');
  }
  get findTransactionByAmountButton() {
    return cy.get('[id="findByAmount"]');
  }
  get transactionResultsAmount() {
    return cy.get("#transactionTable tbody tr td:nth-child(4)");
  }

  get transactionRows() {
  return cy.get('#transactionTable tbody tr');
}

  verifyFindTransactionTitleIsVisible() {
    this.findTransactionsTitle.should("be.visible");
  }
  enterDate(expectedDate) {
    this.findTransactionByDate.type(expectedDate);
  }
  clickFindTransactionByDateButton() {
    this.findTransactionByDateButton.click();
  }
  enterAmount(expectedAmount) {
    this.findByAmountField.type(expectedAmount);
  }
  clickFindTransactionByAmountButton() {
    this.findTransactionByAmountButton.click();
  }

  // Check for "Funds Transfer Sent" in Debit column
  verifyDebitAmountForDescription(description, expectedAmount) {
    cy.get("#transactionTable tbody tr")
      .eq(0)
      .within(() => {
        cy.contains(description);
        cy.get("td").eq(2).should("contain", expectedAmount); // Debit column
      });
  }
  // Check for "Funds Transfer Received" in Credit column
  verifyCreditAmountForDescription(description, expectedAmount) {
    cy.get("#transactionTable tbody tr")
      .eq(1)
      .within(() => {
        cy.contains(description);
        cy.get("td").eq(3).should("contain", expectedAmount); // Credit column
      });
  }

  verifyTranscactionRows(expectedRows){
    this.transactionRows.should('have.length',expectedRows)
  }
}

export default new FindTransactionsPage();
