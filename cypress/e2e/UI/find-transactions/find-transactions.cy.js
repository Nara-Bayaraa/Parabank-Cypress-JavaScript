import TransferFundsPage from "../../../page-objects/transfer-funds.page";
import AccountServicesMenuPage from "../../../page-objects/account-services-menu.page";
import FindTransactionsPage from "../../../page-objects/find-transactions.page";

describe("Find Transactions Functionality", () => {
  let amount = "50.00";
  let rows = "2";

  beforeEach(() => {
  cy.uiLogin();
      AccountServicesMenuPage.clickTransferFundsLink();
      TransferFundsPage.transferFunds({ amount, fromIndex: 0, toIndex: 0 });
    
  });

  it("[TRANSACTIONS-001] Verify that searching by amount displays specified amount", () => {
    AccountServicesMenuPage.clickFindTransactionsLink();
    FindTransactionsPage.verifyFindTransactionTitleIsVisible();
    FindTransactionsPage.enterAmount(amount);
    FindTransactionsPage.clickFindTransactionByAmountButton();
    FindTransactionsPage.verifyTranscactionRows(rows);

    FindTransactionsPage.verifyDebitAmountForDescription(
      "Funds Transfer Sent",
      amount
    );
    FindTransactionsPage.verifyCreditAmountForDescription(
      "Funds Transfer Received",
      amount
    );
  });
});
