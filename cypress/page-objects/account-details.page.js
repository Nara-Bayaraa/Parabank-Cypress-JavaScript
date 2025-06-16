class AccountDetailsPage {
  get accountDetailsTitle() {
    return cy.xpath("//h1[text()='Account Details']");
  }
  get accountNumber() {
    return cy.get("#accountId");
  }
  get accountType() {
    return cy.contains("Account Type:").next();
  }
  get accountBalance() {
    return cy.contains("Balance:").next();
  }
  get availableBalance() {
    return cy.contains("Available:").next();
  }
  get accountActivityTitle() {
    return cy.xpath("//h1[text()='Account Activity']");
  }
  get activityPeriodDropdown() {
    return cy.get('[id="month"]');
  }
  get accountTypeDropdown() {
    return cy.get('[id="transactionType"]');
  }

  get fundsTransferReceivedLink() {
    return cy.xpath("//a[text()='Funds Transfer Received']");
  }

  get goButton() {
    return cy.get('[type="submit"]');
  }
  get transactionTable() {
    return cy.get('[id="transactionTable"]');
  }

  get noTransactionsFoundText() {
    return cy.get('[id="noTransactions"]');
  }
  getAccountNumber() {
    this.accountNumber.invoke("text").then((text) => text.trim());
  }

  getBalancesAndAvailableAmount() {
    return cy
      .contains("Balance:")
      .next()
      .invoke("text")
      .then((balanceText) => {
        return cy
          .contains("Available:")
          .next()
          .invoke("text")
          .then((availableText) => {
            return {
              balance: balanceText.trim(),
              available: availableText.trim(),
            };
          });
      });
  }

  verifyAccountDetails(
    expectedAccountNumber,
    expectedAccountType,
    expectedBalance = null,
    expectedAvailable = null
  ) {
    this.accountDetailsTitle.should("be.visible");
    this.accountNumber.should("contain.text", expectedAccountNumber);
    this.accountType.should("contain.text", expectedAccountType);
    //balance
    if (expectedBalance !== null) {
      this.accountBalance.should("contain.text", expectedBalance);
    } else {
      this.accountBalance.invoke("text").should("match", /^\$\d+(\.\d{2})?$/);
    }
    //available
    if (expectedAvailable !== null) {
      this.availableBalance.should("contain.text", expectedAvailable);
    } else {
      this.availableBalance.invoke("text").should("match", /^\$\d+(\.\d{2})?$/);
    }
  }

  getTransactionRow = (rowIndex = 0) => {
    return cy.get('[id="transactionTable"] tbody tr').eq(rowIndex);
  };

  getTransactionTableValues(rowIndex = 0) {
    return this.getTransactionRow(rowIndex)
      .find("td")
      .then(($tds) => {
        const date = $tds.eq(0).text().trim();
        const description = $tds.eq(1).text().trim();
        const debitAmount = $tds.eq(2).text().trim();
        const creditAmount = $tds.eq(3).text().trim();
        return { date, description, debitAmount, creditAmount };
      });
  }

  selectFilters(month, type) {
    this.activityPeriodDropdown.select(month);
    this.accountTypeDropdown.select(type);
  }

  clickGoButton() {
    this.goButton.click();
  }

  verifyFilteredResults({
    shouldExist = true,
    expectedDescription = " ",
    expectedAmount = " ",
  }) {
    if (shouldExist) {
      this.transactionTable.contains(expectedDescription).should("exist");
      if (amount)
        this.transactionTable.contains(expectedAmount).should("exist");
    } else {
      this.noTransactionsFoundText.should("be.visible");
    }
  }

  verifyTransaction({
    shouldExist = true,
    rowIndex = 0,
    expectedDate,
    expectedDescription,
    expectedDebitAmount = "",
    expectedCreditAmount = "",
  }) {
    if (shouldExist) {
      cy.get("#transactionTable tbody tr")
        .eq(rowIndex)
        .within(() => {
          // Date
          if (expectedDate)
            cy.get("td").eq(0).should("contain.text", expectedDate);
          // Description
          if (expectedDescription)
            cy.get("td").eq(1).should("contain.text", expectedDescription);
          // Debit Amount
          if (expectedCreditAmount || expectedDebitAmount.trim() !== "") {
            cy.get("td").eq(2).should("contain.text", expectedDebitAmount);
          } else {
            cy.get("td").eq(2).should("be.empty");
          }
          // Credit Amount
          if (expectedDebitAmount || expectedCreditAmount.trim() !== "") {
            cy.get("td").eq(3).should("contain.text", expectedCreditAmount);
          } else {
            cy.get("td").eq(3).should("be.empty");
          }
        });
    } else {
      this.noTransactionsFoundText.should("be.visible");
    }
  }

  verifyNoTransactionsFoundTextIsDisplayed() {
    this.noTransactionsFoundText.should("have.text", "No transactions found.");
  }

  verifyAccountNumberUrl(expectedAccountNumber) {
    cy.url().should("include", `/activity.htm?id=${expectedAccountNumber}`);
  }
}
export default new AccountDetailsPage();
