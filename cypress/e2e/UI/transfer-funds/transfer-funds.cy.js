import TransferFundsPage from "../../../page-objects/transfer-funds.page";
import AccountsOverviewPage from "../../../page-objects/accounts-overview.page";
import AccountServicesMenuPage from "../../../page-objects/account-services-menu.page";
import { parseValue } from "../../../support/helpers/data-formatters";

describe("Account and Transfer Workflow", () => {
  let amount = "50.00";
  let decimalAmount = "10.45";
  let fractionalAmount = "0.10"
  let message;
  let fromIndex = 0;
  let toIndex = 1;

  before(() => {
    cy.fixture("ui-test-data/messages.json").then((data) => {
      message = data;
    });
  });

  it.only("[TRANSFER-001] Verify transferring money to existing account and sees a confirmation", () => {
    cy.registerUserWithRetry(5);
    cy.get("@registeredUser").then((user) => {});
    cy.selectAccountType("CHECKING");
    AccountServicesMenuPage.clickAccountOverviewLink();
    // Get initial balances for both accounts
    AccountsOverviewPage.getAllAccounts().then((accountsBefore) => {
      const defaultAccount = accountsBefore[0];
      const checkingAccount = accountsBefore[1];
      const defaultAccountNum = defaultAccount.accountNumber;
      const checkingAccountNum = checkingAccount.accountNumber;

      const initialDefaultBalance = parseValue(defaultAccount.balance);
      const initialCheckingBalance = parseValue(checkingAccount.balance);

      // Transfer $50 from default to checking
      AccountServicesMenuPage.clickTransferFundsLink();
      TransferFundsPage.verifyTransferFundsTitleIsVisible();
      TransferFundsPage.enterAmount(amount);
      TransferFundsPage.selectFromAccount(defaultAccountNum);
      TransferFundsPage.selectToAccount(checkingAccountNum);
      TransferFundsPage.clickTransferButton();
      TransferFundsPage.verifyTransferConfirmation({
        expectedMessage: message.TRANSFER_COMFIRMATION,
        enteringAmount: amount,
        fromAccount: defaultAccountNum,
        toAccount: checkingAccountNum,
      });
      // After transfer, check balances
      AccountServicesMenuPage.clickAccountOverviewLink();
      AccountsOverviewPage.getAllAccounts().then((accountsAfter) => {
        const updatedDefault = AccountsOverviewPage.findAccountByNumber(
          accountsAfter,
          defaultAccountNum
        );
        const updatedChecking = AccountsOverviewPage.findAccountByNumber(
          accountsAfter,
          checkingAccountNum
        );

        expect(parseValue(updatedDefault.balance)).to.eq(
          initialDefaultBalance - Number(amount)
        );
        expect(parseValue(updatedChecking.balance)).to.eq(
          initialCheckingBalance + Number(amount)
        );

        //check total
        const finalDefaultBalance = parseValue(updatedDefault.balance);
        const finalCheckingBalance = parseValue(updatedChecking.balance);
        const expectedTotal =
          "$" + (finalDefaultBalance + finalCheckingBalance).toFixed(2);

        AccountsOverviewPage.getTotalValue().then((actualTotal) => {
          expect(actualTotal).to.equal(expectedTotal);
        });
      });
    });
  });

  it('[TRANSFER-002] Verify transferring decimal amount to existing account and sees a confirmation"', () => {
    cy.uiLogin();
    AccountServicesMenuPage.clickTransferFundsLink();
    TransferFundsPage.transferFunds({
      amount: decimalAmount,
      fromIndex: fromIndex,
      toIndex: toIndex,
    });
    TransferFundsPage.verifyTransferConfirmation({
      expectedMessage: message.TRANSFER_COMFIRMATION,
      enteringAmount: decimalAmount,
      fromAccount: fromIndex,
      toAccount: toIndex,
    });
  });

  it('[TRANSFER-003] Verify transferring fractional amount to existing account and sees a confirmation"', () => {
    cy.uiLogin();
    AccountServicesMenuPage.clickTransferFundsLink();
    TransferFundsPage.transferFunds({
      amount: fractionalAmount,
      fromIndex: fromIndex,
      toIndex: toIndex,
    });
    TransferFundsPage.verifyTransferConfirmation({
      expectedMessage: message.TRANSFER_COMFIRMATION,
      enteringAmount: decimalAmount,
      fromAccount: fromIndex,
      toAccount: toIndex,
    });
  });
});
