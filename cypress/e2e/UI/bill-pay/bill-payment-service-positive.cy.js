import AccountServicesMenuPage from "../../../page-objects/account-services-menu.page";
import BillPaymentServicePage from "../../../page-objects/bill-payment-service-page";
import { generateBillPaymentsData } from "../../../support/helpers/generate-data";

describe("Bill Payment Functionality Positive Test Cases", () => {
  let fromAccount;
  let message;

  before(() => {
    cy.fixture("ui-test-data/messages.json").then((data) => {
      message = data;
    });
  });
  
  beforeEach(() => {
    cy.uiLogin();
  });

  it("[PAYMENT-001] Verify paying bill to recipient account and sees a confirmation", () => {
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
    BillPaymentServicePage.typeVerifyAccountNumber(
      billPayData.verifyAccountNumber
    );
    BillPaymentServicePage.typeAmount(billPayData.amount);

    BillPaymentServicePage.selectFromAccountByIndex(0).then((toAcc) => {
      fromAccount = toAcc;
      BillPaymentServicePage.clickSendPaymentButton();

      BillPaymentServicePage.verifyBillPaymentConfirmation({
        expectedMessage: message.BILL_PAYMENT_CONFIRMATION,
        payeeName: billPayData.payeeName,
        amount: billPayData.amount.toFixed(2),
        fromAccount: fromAccount,
      });
    });
  });
});
