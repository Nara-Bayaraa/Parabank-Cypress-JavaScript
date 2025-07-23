import RequestLoanPage from "../../../page-objects/request-loan.page";
import AccountServicesMenuPage from "../../../page-objects/account-services-menu.page";

describe("Request Loan Functionality", () => {
  let loanAmount = "50.00";
  let downPaymentAmount = "10.00";
  let message;

  before(() => {
    cy.fixture("messages.json").then((data) => {
      message = data;
    });
    cy.registerUserWithRetry(5);
    cy.get("@registeredUser").then((user) => {});
  });

  it("[LOAN-001] Verify successfully submit a loan request with valid data", () => {
    AccountServicesMenuPage.clickRequestLoanLink();
    RequestLoanPage.verifyPageTitleIsVisible();
    RequestLoanPage.enterLoanAmount(loanAmount);
    RequestLoanPage.enterDownPayment(downPaymentAmount);
    RequestLoanPage.clickApplyNowButton();
    RequestLoanPage.verifyLoanRequestProcessedText(
      message.LOAN_REQUEST_PROCESSED_CONFIRMATION
    );
    RequestLoanPage.verifyLoanHasBeenApprovedText(
      message.LOAN_APPROVED_SUCCESSFULLY_MSG
    );
  });
});
