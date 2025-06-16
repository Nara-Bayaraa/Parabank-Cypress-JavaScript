import AccountsOverviewPage from "../../page-objects/accounts-overview.page";
import AccountServicesMenuPage from "../../page-objects/account-services-menu.page";
import AccountDetailsPage from "../../page-objects/account-details.page";

describe('Account Overview & New Account Funding', () => {
  let username, password;
  let defaultAccountBefore;

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

  it("[OVERVIEW-001] Verify default account values before opening new account", () => {
    AccountsOverviewPage.getAllAccountOverviewTableValues().then((accounts) => {
      defaultAccountBefore = accounts[0];
      AccountsOverviewPage.getTotalValue().then((expectedTotal) => {
        AccountsOverviewPage.getDisclaimer().then((expectedDisclaimer) => {
          const expectedAccounts = [
            {
              accountNumber: defaultAccountBefore.accountNumber,
              balance: defaultAccountBefore.balance,
              availableAmount: defaultAccountBefore.availableAmount,
            },
          ];
          AccountsOverviewPage.verifyAccountOverviewDetails(
            expectedAccounts,
            expectedTotal,
            expectedDisclaimer
          );
        });
      });
    });
  });

  it("[OVERVIEW-002] Verify correct balances after opening and funding a checking account", () => {
    AccountsOverviewPage.getAllAccountOverviewTableValues().then(
      (accountsBefore) => {
        // default account
        const defaultAccountBefore = accountsBefore[0];
      
        //defaultAccount initial balance
       cy.parseBalance(defaultAccountBefore.balance).then((initialDefaultBalance) => {

        // open new checking account 
        cy.selectAccountType("CHECKING").then((newCheckingAccountNum) => {
          AccountDetailsPage.verifyAccountNumberUrl(newCheckingAccountNum);
          AccountServicesMenuPage.clickAccountOverviewLink();

          // capture the account overview table's values after creating new checking account
          AccountsOverviewPage.getAllAccountOverviewTableValues().then(
            (accountsAfter) => {
              const defaultAccountAfter = AccountsOverviewPage.findAccountByNumber(accountsAfter, defaultAccountBefore.accountNumber);
              const checkingAccount = AccountsOverviewPage.findAccountByNumber(accountsAfter, newCheckingAccountNum );

              cy.parseBalance(defaultAccountAfter.balance).then((finalDefaultBalance)=>{
              cy.parseBalance(checkingAccount.balance).then((checkingBalance) => {
       
            
              const fundedAmount = +(initialDefaultBalance - finalDefaultBalance).toFixed(2);
              expect(checkingBalance).to.eq(fundedAmount);

              const expectedAccounts = [
                {
                  accountNumber: defaultAccountAfter.accountNumber,
                  balance: `$${finalDefaultBalance.toFixed(2)}`,
                  availableAmount: `$${finalDefaultBalance.toFixed(2)}`,
                },
                {
                  accountNumber: checkingAccount.accountNumber,
                  balance: `$${checkingBalance.toFixed(2)}`,
                  availableAmount: `$${checkingBalance.toFixed(2)}`,
                },
              ];

              AccountsOverviewPage.getTotalValue().then((expectedTotal) => {
                AccountsOverviewPage.getDisclaimer().then(
                  (expectedDisclaimer) => {
                    AccountsOverviewPage.verifyAccountOverviewDetails(
                      expectedAccounts,
                      expectedTotal,
                      expectedDisclaimer
                    );
                  }
                );
              });
            }
          );
        });
      }
    );
  });
});
})      
})
})