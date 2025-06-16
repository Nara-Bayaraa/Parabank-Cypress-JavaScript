import AccountOpenedConfirmationPage from "../../page-objects/account-opened-confirmation.page";
import AccountServicesMenuPage from "../../page-objects/account-services-menu.page";
import AccountDetailsPage from "../../page-objects/account-details.page";
import OpenNewAccountPage from "../../page-objects/open-new-account.page";

describe("Open New Checking Account Functionality", () => {
  
  let username, password;
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

  it("[CHECKING-001] Verify creation of new checking account and confirmation view", () => {
    AccountServicesMenuPage.clickOpenNewAccountLink();
    OpenNewAccountPage.verifyOpenNewAccountPageUrl();
    OpenNewAccountPage.verifyOpenNewAccountPageTitle();
    OpenNewAccountPage.selectAccountType("CHECKING");
    AccountOpenedConfirmationPage.verifyAccountOpenedPageTitle();
    AccountOpenedConfirmationPage.verifyAccountOpenMessage(
      message.ACCOUNT_OPENED_SUCCESS_MSG
    );
    AccountOpenedConfirmationPage.verifyAccountNumberLink();
  });

  it("[CHECKING-002] Verify correct account details and initial transaction are displayed", () => {
    cy.selectAccountType("CHECKING").then((checkingAccountNumber) => {
      cy.log("👋New checking account:", checkingAccountNumber);
      AccountDetailsPage.verifyAccountNumberUrl(checkingAccountNumber);
      AccountDetailsPage.getBalancesAndAvailableAmount().then(
        ({ balance, available }) => {
          AccountDetailsPage.verifyAccountDetails(
            checkingAccountNumber,
            "CHECKING",
            balance,
            available
          );
        }
      );

      AccountDetailsPage.getTransactionTableValues(0).then(
        ({ date, description, debitAmount, creditAmount }) => {
          AccountDetailsPage.verifyTransaction({
            shouldExist: true,
            expectedDate: date,
            expectedDescription: description,
            expectedDebitAmount: debitAmount,
            expectedCreditAmount: creditAmount,
          });
          cy.log(`Expected credit amount: ${creditAmount}`);
        }
      );
    });
  });
  it("[CHECKING-003] Verify filtering transactions by month and type (no debits)", () => {
    cy.selectAccountType("CHECKING");
    AccountDetailsPage.selectFilters("April", "Debit");
    AccountDetailsPage.clickGoButton();
    AccountDetailsPage.verifyFilteredResults({ shouldExist: false });
    AccountDetailsPage.verifyNoTransactionsFoundTextIsDisplayed();
  });

  it("[CHECKING-004] Verify filtering transactions by month and type (show credit)", () => {
    cy.selectAccountType("CHECKING");
    AccountDetailsPage.selectFilters("June", "Credit");
    AccountDetailsPage.clickGoButton();

    AccountDetailsPage.getTransactionTableValues(0).then(
      ({ date, description, debitAmount, creditAmount }) => {
        AccountDetailsPage.verifyTransaction({
          shouldExist: true,
          expectedDate: date,
          expectedDescription: description,
          expectedDebitAmount: debitAmount,
          expectedCreditAmount: creditAmount,
        });
        cy.log(`credit amount is ${creditAmount}`);
      }
    );
  });
});
