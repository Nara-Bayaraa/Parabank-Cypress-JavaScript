import AccountsOverviewPage from "../../page-objects/accounts-overview.page";

describe("Open New Default Account Functionality", () => {

  let username;
  let password;

  before(() => {
    cy.registerUser();
    cy.get("@registeredUser").then((user) => {
      username = user.username;
      password = user.password;
      cy.logoutUser();
    });
  });

  it("[DEFAULT-001] Verify that, upon user login, the default account displays the correct account information, total value, and disclaimer message.", () => {
    cy.loginUser(username, password);
    AccountsOverviewPage.verifyAccountOverviewPageTitle();
    AccountsOverviewPage.verifyOverviewTableHeadersDisplayed();
    AccountsOverviewPage.getAccountOverviewTableValues(0).then(
      ({ defaultAccountNumber, accountBalance, availableAmount }) => {
       accountTotal = "$515.00";
        AccountsOverviewPage.getTotalValue().then((accountTotal) => {
          AccountsOverviewPage.getDisclaimer().then((disclaimer) => {
            AccountsOverviewPage.verifyAccountOverviewDetails(
              defaultAccountNumber,
              accountBalance,
              availableAmount,
              accountTotal,
              disclaimer
            );
          });
        });
      }
    );
  });
});
