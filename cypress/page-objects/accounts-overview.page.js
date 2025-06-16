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
  get accountNumber() {
    return cy.get("td a ").eq(0);
  }

  verifyDefaultAccountNumber(expectedDefaultNumber) {
    this.accountNumber
      .should("be.visible", expectedDefaultNumber)
      .and("have.attr", "href")
      .and("match", /activity\.htm\?id=\d+/);
  }

  verifyAccountOverviewPageTitle() {
    this.accountOverviewTitle.should("be.visible");
  }

  // check column headers
  verifyOverviewTableHeadersDisplayed() {
    this.accountOverviewTable.should("be.visible");
    this.accountHeader.should("be.visible");
    this.balanceHeader.should("be.visible");
    this.availableAmountHeader.should("be.visible");
    this.totalRow.should("be.visible");
    this.balanceDisclaimerFootnote.should("be.visible");
  }

  getAccountNumber() {
    return this.accountNumber.should("be.visible");
  }

  clickAccountNumber() {
    this.accountNumber.click();
  }

  getAllAccountOverviewTableValues() {
    return cy.get('[id="accountTable"] tbody tr').then(($rows) => {
      const accounts = [];
      $rows.each((index, row) => {
        const $tds = Cypress.$(row).find("td");
        const accountNumber = $tds.eq(0).find("a").text().trim();
        const balance = $tds.eq(1).text().trim();
        const availableAmount = $tds.eq(2).text().trim();
        if (accountNumber) {
          accounts.push({
            accountNumber,
            balance,
            availableAmount,
          });
        }
      });
      return accounts;
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
    expectedAccounts,
    expectedTotal,
    expectedDisclaimer
  ) {
    this.getAllAccountOverviewTableValues().then((actualAccounts) => {
      // for each expected account, find the match and verify
      expectedAccounts.forEach((expected, index) => {
        const actual = actualAccounts.find(
          (acc) => acc.accountNumber === expected.accountNumber
        );
        expect(actual, `Account #${expected.accountNumber} should exist`).to.not
          .be.undefined;

        if (expected.balance) {
          expect(
            actual.balance,
            `Balance for #${expected.accountNumber}`
          ).to.equal(expected.balance);
        }
        if (expected.availableAmount) {
          expect(
            actual.availableAmount,
            `Available amount for #${expected.accountNumber}`
          ).to.equal(expected.availableAmount);
        }
        // validate format
        expect(
          actual.accountNumber,
          `Account number format for #${expected.accountNumber}`
        ).to.match(/^\d+$/);
        expect(
          actual.balance,
          `Balance format for #${expected.accountNumber}`
        ).to.match(/^\$\d+(\.\d{2})?$/);
        expect(
          actual.availableAmount,
          `Available amount format for #${expected.accountNumber}`
        ).to.match(/^\$\d+(\.\d{2})?$/);
      });

      this.getTotalValue().then((total) => {
        expect(total, "Account total value").to.equal(expectedTotal);

        this.getDisclaimer().then((disclaimer) => {
          expect(disclaimer, "Account table disclaimer").to.equal(
            expectedDisclaimer
          );
          // check the total count of account
          expect(
            actualAccounts.length,
            "Number of displayed accounts"
          ).to.equal(expectedAccounts.length);
        });
      });
    });
  }

  findAccountByNumber(accounts, accountNumber) {
    return accounts.find((a) => a.accountNumber === accountNumber);
  }

  getAllAccounts() {
    return this.getAllAccountOverviewTableValues();
  }
}

export default new AccountsOverviewPage();
