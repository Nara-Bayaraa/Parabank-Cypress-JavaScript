import AccountsOverviewPage from "../../../page-objects/accounts-overview.page";
import AccountServicesMenuPage from "../../../page-objects/account-services-menu.page";
import AccountDetailsPage from "../../../page-objects/account-details.page";
import { buildExpectedAccounts, parseValue  } from '../../../support/helpers/data-formatters';

describe('Account Overview & New Account Funding', () => {
  let username, password;

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
  });

it(" [IN-TRANSFER-001] Verify default account values before opening new account", () => {
  AccountsOverviewPage.getAllAccounts().then((accounts) => {
    const defaultAccountBefore = accounts[0];

      AccountsOverviewPage.getTotalValue().then((expectedTotal) => {
      AccountsOverviewPage.getDisclaimer().then((expectedDisclaimer) => {
        const defaultAccountBeforeBalance = parseValue(defaultAccountBefore.balance);
        const defaultAccountBeforeAvailableAmount = parseValue(defaultAccountBefore.availableAmount);

        const expectedAccounts = buildExpectedAccounts([
          {
            accountNumber: defaultAccountBefore,
            balance: defaultAccountBeforeBalance,
            availableAmount: defaultAccountBeforeAvailableAmount,
          }
        ]);

        AccountsOverviewPage.verifyAccountOverviewDetails(
          expectedAccounts,
          expectedTotal,
          expectedDisclaimer
        );
      });
    });
  });
});


it(" [IN-TRANSFER-002] Verify correct balances after opening and funding a checking account", () => {
  AccountsOverviewPage.getAllAccounts().then((accountsBefore) => {
    // Default account before
    const defaultAccountBefore = accountsBefore[0];
    // Parse the initial default balance 
    const initialDefaultBalance = parseValue(defaultAccountBefore.balance);

    // Open new checking account
    cy.selectAccountType("CHECKING").then((newCheckingAccountNum) => {
      AccountDetailsPage.verifyAccountNumberUrl(newCheckingAccountNum);
      AccountServicesMenuPage.clickAccountOverviewLink();

      // Capture accounts after opening new checking account
      AccountsOverviewPage.getAllAccounts().then((accountsAfter) => {
        const defaultAccountAfter = AccountsOverviewPage.findAccountByNumber(
          accountsAfter,
          defaultAccountBefore.accountNumber
        );
        const checkingAccount = AccountsOverviewPage.findAccountByNumber(
          accountsAfter,
          newCheckingAccountNum
        );

        // Parse balances after
        const finalDefaultBalance = parseValue(defaultAccountAfter.balance);
        const checkingBalance = parseValue(checkingAccount.balance);

        // Calculate funded amount and assert
        const fundedAmount =  +(initialDefaultBalance - finalDefaultBalance).toFixed(2);
        expect(checkingBalance).to.eq(fundedAmount);

      //  Build expected accounts using helper
        const expectedAccounts = buildExpectedAccounts([
          {
            accountNumber: defaultAccountAfter,
            balance: finalDefaultBalance,
            availableAmount: finalDefaultBalance,
          },
          {
            accountNumber: checkingAccount,
            balance: checkingBalance,
            availableAmount: checkingBalance,
          },
        ]);

        // Get totals/disclaimer and verify details
        AccountsOverviewPage.getTotalValue().then((expectedTotal) => {
          AccountsOverviewPage.getDisclaimer().then((expectedDisclaimer) => {
            AccountsOverviewPage.verifyAccountOverviewDetails(
              expectedAccounts,
              expectedTotal,
              expectedDisclaimer
            );
          });
        });
      });
    });
  });
});
})