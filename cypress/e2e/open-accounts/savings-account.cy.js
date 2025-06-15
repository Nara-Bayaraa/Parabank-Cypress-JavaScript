import AccountOpenedConfirmationPage from "../../page-objects/account-opened-confirmation.page";
import AccountServicesMenuPage from "../../page-objects/account-services-menu.page";
import AccountDetailsPage from "../../page-objects/account-details.page";
import OpenNewAccountPage from "../../page-objects/open-new-account.page";

describe("Open New Savings Account Functionality", () => {

  let username;
  let password;
  let message;

  before(() => {
    cy.registerUser();
    cy.get("@registeredUser").then((user) => {
      username = user.username;
      password = user.password;
      cy.logoutUser();
    });

    cy.fixture("messages.json").then((data) => {
      message = data;
    });
  });

  beforeEach(() => {
    cy.loginUser(username, password);
  });

  it("[SAVINGS-001] Verify opening of new savings account and confirmation view", () => {
    AccountServicesMenuPage.clickOpenNewAccountLink();
    OpenNewAccountPage.verifyOpenNewAccountPageUrl();
    OpenNewAccountPage.verifyOpenNewAccountPageTitle();
    OpenNewAccountPage.selectAccountType("SAVINGS");
    AccountOpenedConfirmationPage.verifyAccountOpenedConfirmation(
      message.ACCOUNT_OPENED_SUCCESS_MSG
    );
  });

  it("[SAVINGS-002] Verify correct account details and initial transaction are displayed", () => {
    cy.selectAccountType("SAVINGS").then((accountNumber) => {
      AccountDetailsPage.verifyAccountNumberUrl(accountNumber);
      cy.getAccountBalances().then(({ balance, available }) => {
        AccountDetailsPage.verifyAccountDetails(
          accountNumber,
          "SAVINGS",
          balance,
          available
        );
      });
    });
    AccountDetailsPage.getTransactionTableValues(0).then(
      ({ date, description, debitAmount, creditAmount }) => {
        AccountDetailsPage.verifyTransaction({
          shouldExist: true,
          date,
          description,
          creditAmount,
          amount: debitAmount,
        });
        cy.log(`credit amount is ${creditAmount}`);
      }
    );
  });

  it("[SAVINGS-003] Verify filtering transactions by month and type (no debits)", () => {
    cy.selectAccountType("SAVINGS");
    AccountDetailsPage.selectFilters("April", "Debit");
    AccountDetailsPage.clickGoButton();
    AccountDetailsPage.verifyFilteredResults({ shouldExist: false });
    AccountDetailsPage.verifyNoTransactionsFoundTextIsDisplayed();
  });

  it("[SAVINGS-004] Verify filtering transactions by month and type (show credit)", () => {
    cy.selectAccountType("SAVINGS");
    AccountDetailsPage.selectFilters("June", "Credit");
    AccountDetailsPage.clickGoButton();
    
    AccountDetailsPage.getTransactionTableValues(0).then(
      ({ date, description, debitAmount, creditAmount }) => {
        AccountDetailsPage.verifyTransaction({
          shouldExist: true,
          date,
          description,
          creditAmount,
          amount: debitAmount,
        });
        cy.log(`credit amount is ${creditAmount}`);
      }
    );
  });
});
