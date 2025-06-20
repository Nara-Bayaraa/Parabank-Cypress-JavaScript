import AccountServicesMenuPage from "../../../page-objects/account-services-menu.page";
import BillPaymentServicePage from "../../../page-objects/bill-payment-service-page";
import { generateBillPaymentsData } from "../../../support/helpers/generate-data";

describe('Bill Payment Service', () => {

  let fromAccount;
  let message;
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
    cy.fixture("messages.json").then((data) => {
      message = data;
    });
  });

  it('[PAYMENT-001] Verify paying bill to recipient account and sees a confirmation', () => {
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
    BillPaymentServicePage.typeVerifyAccountNumber(billPayData.verifyAccountNumber);
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

