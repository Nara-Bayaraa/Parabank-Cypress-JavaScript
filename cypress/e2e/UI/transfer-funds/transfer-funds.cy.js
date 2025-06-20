import TransferFundsPage from "../../../page-objects/transfer-funds.page";
import AccountsOverviewPage from "../../../page-objects/accounts-overview.page";
import AccountServicesMenuPage from "../../../page-objects/account-services-menu.page";
import { parseValue } from "../../../support/helpers/data-formatters";

describe("Account and Transfer Workflow", () => {
  let amount = "50.00";
  let username, password;
  let message;
  before(() => {
    cy.registerUser();
    cy.get("@registeredUser").then((user) => {
      username = user.username;
      password = user.password;
      cy.logoutUser();
    });
  });

  beforeEach(() => {
    cy.loginUser(username, password);
    cy.fixture("messages.json").then((data) => {
      message = data;
    });
  });

  it(" [TRANSFER-001] Verify transferring money to existing account and sees a confirmation", () => {
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
        const expectedTotal = "$" + (finalDefaultBalance + finalCheckingBalance).toFixed(2);

        AccountsOverviewPage.getTotalValue().then((actualTotal) => {
          expect(actualTotal).to.equal(expectedTotal);
        });
      });
    });
  });
});
