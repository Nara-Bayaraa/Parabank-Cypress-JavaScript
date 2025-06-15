class AccountsOverviewPage {
  get accountOverviewTitle() {
    return cy.contains("Accounts Overview");
  }
  get accountOverviewTable() {
    return cy.get('[id="accountTable"]');
  }
  get accountHeader() {
    return cy.get("#accountTable tbody tr").first().find("td").eq(0).find("a");
  }
  get balanceHeader() {
    return cy.get("#accountTable tbody tr").first().find("td").eq(1);
  }
  get availableAmountHeader() {
    return cy.get("#accountTable tbody tr").first().find("td").eq(2);
  }

  get totalRow() {
    return cy.get("#accountTable tbody tr").last().find("td").eq(1);
  }

  get balanceDisclaimerFootnote() {
    return cy.get('[id="accountTable"] tfoot tr').first().find("td").eq(0);
  }
  get accountNumberLink() {
    return cy.get("td a ");
  }

  verifyAccountOverviewPageTitle() {
    this.accountOverviewTitle.should("be.visible");
  }

  // Check column headers
  verifyOverviewTableHeadersDisplayed() {
    this.accountOverviewTable.should("be.visible");
    this.accountHeader.should("be.visible");
    this.balanceHeader.should("be.visible");
    this.availableAmountHeader.should("be.visible");
    this.totalRow.should("be.visible");
    this.balanceDisclaimerFootnote.should("be.visible");
  }

  getAccountNumber() {
    return this.accountNumberLink.should("be.visible");
  }

  clickAccountNumber() {
    this.accountNumberLink.click();
  }

  getAccountOverviewTableRow(rowIndex = 0) {
    return cy.get('[id="accountTable"] tbody tr').eq(rowIndex);
  }

  getAccountOverviewTableValues(rowIndex = 0) {
    return this.getAccountOverviewTableRow(rowIndex)
      .find("td")
      .then(($tds) => {
        const account = $tds.eq(0).find("a").text().trim();
        const balance = $tds.eq(1).text().trim();
        const availableAmount = $tds.eq(2).text().trim();
        return { account, balance, availableAmount };
      });
  }

  getTotalValue() {
    return this.totalRow.invoke("text").then((text) => text.trim());
  }

  getDisclaimer() {
    return cy
      .get('[id="accountTable"] tfoot td')
      .invoke("text")
      .then((text) => text.trim());
  }

  verifyAccountOverviewDetails(
    expectedAccountNumber,
    expectedBalance,
    expectedAvailableAmount,
    expectedTotal,
    expectedDisclaimer
  ) {
    this.accountHeader.should("contain.text", expectedAccountNumber);
    if (expectedBalance) {
      this.balanceHeader.should("contain.text", expectedBalance);
    } else {
      this.balanceHeader.invoke("text").should("match", /^\$\d+(\.\d{2})?$/);
    }
    if (expectedAvailableAmount) {
      this.availableAmountHeader.should(
        "contain.text",
        expectedAvailableAmount
      );
    } else {
      this.availableAmountHeader
        .invoke("text")
        .should("match", /^\$\d+(\.\d{2})?$/);
    }
    if (expectedTotal) {
      this.totalRow.should("contain.text", expectedTotal);
    } else {
      this.totalRow.invoke("text").should("match", /^\$\d+(\.\d{2})?$/);
    }
    if (expectedDisclaimer) {
      this.balanceDisclaimerFootnote.should("contain.text", expectedDisclaimer);
    }
  }
}

export default new AccountsOverviewPage();
