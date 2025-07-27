import AccountServicesMenuPage from "../../../page-objects/account-services-menu.page";
import BillPaymentServicePage from "../../../page-objects/bill-payment-service-page";
import { generateBillPaymentsData } from "../../../support/helpers/generate-data";

describe("Bill Payment Functionality Negative Test Cases", () => {
  let errorMessage;
  
  before(() => {
    cy.fixture("ui-test-data/error-messages.json").then((data) => {
      errorMessage = data;
    });
  });
  beforeEach(() => {
    cy.uiLogin();
  });

  it("[PAYMENT-NEG-001] Should display validation errors when required fields are empty", () => {
    AccountServicesMenuPage.clickPayBillLink();
    BillPaymentServicePage.verifyBillPaymentServiceTitleIsVisible();
    BillPaymentServicePage.clickSendPaymentButton();
    BillPaymentServicePage.verifyErrorMessages(
      errorMessage.BILL_PAYMENT_FORM_FIELDS
    );
  });

  it("[PAYMENT-NEG-002] Verifies error message display for mismatched account number", () => {
    AccountServicesMenuPage.clickPayBillLink();
    BillPaymentServicePage.verifyBillPaymentServiceTitleIsVisible();

    const billPayData = generateBillPaymentsData();
    BillPaymentServicePage.typePayeeName(billPayData.payeeName);
    BillPaymentServicePage.typeAddress(billPayData.address);
    BillPaymentServicePage.typeCity(billPayData.city);
    BillPaymentServicePage.typeState(billPayData.state);
    BillPaymentServicePage.typeZipCode(billPayData.zipCode);
    BillPaymentServicePage.typePhoneNumber(billPayData.phoneNumber);
    BillPaymentServicePage.typeAccountNumber(billPayData.accountNumber);
    BillPaymentServicePage.typeVerifyAccountNumber("99999");
    BillPaymentServicePage.typeAmount(billPayData.amount);

    BillPaymentServicePage.clickSendPaymentButton();
    BillPaymentServicePage.verifyMismatchErrorIsVisible(
      errorMessage.ACCOUNT_MISMATCH
    );
  });
});
