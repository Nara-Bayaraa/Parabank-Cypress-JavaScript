import AccountsOverviewPage from "../../../page-objects/accounts-overview.page";

describe("Open New Default Account Functionality", () => {

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

  it("[DEFAULT-001] Verify user login displays the correct default account information, total value, and disclaimer message", () => {
    AccountsOverviewPage.verifyAccountOverviewPageTitle();
    AccountsOverviewPage.verifyOverviewTableHeadersDisplayed();

    AccountsOverviewPage.getAllAccountOverviewTableValues().then((account) => {
    const defaultAccount = account[0]

      AccountsOverviewPage.getTotalValue().then((expectedTotal) => {
        AccountsOverviewPage.getDisclaimer().then((expectedDisclaimer) => {

          const expectedAccounts = [ {
            accountNumber: defaultAccount.accountNumber,
            balance: defaultAccount.balance,
            availableAmount: defaultAccount.availableAmount,
          } ]

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
