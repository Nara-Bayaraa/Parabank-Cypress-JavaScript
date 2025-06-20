class BillPayServicePage {
  get billPayServicePageTitle() {
    return cy.get("div[id='billpayForm'] h1[class='title']");
  }
  get payeeInfoMessage() {
    return cy.get("div[id='billpayForm'] p");
  }
  get payeeNameInput() {
    return cy.get('[name="payee.name"]');
  }
  get addressInput() {
    return cy.get('[name="payee.address.street"]');
  }
  get cityInput() {
    return cy.get('[name="payee.address.city"]');
  }
  get stateInput() {
    return cy.get('[name="payee.address.state"]');
  }
  get zipCodeInput() {
    return cy.get('[name="payee.address.zipCode"]');
  }
  get phoneNumberInput() {
    return cy.get('[name="payee.phoneNumber"]');
  }
  get accountNumberInput() {
    return cy.get('[name="payee.accountNumber"]');
  }
  get verifyAccountNumberInput() {
    return cy.get('[name="verifyAccount"]');
  }
  get amountInput() {
    return cy.get('[name="amount"]');
  }
  get fromAccountDropdown() {
    return cy.get('[name="fromAccountId"]');
  }
  get sendPaymentButton() {
    return cy.get('[value="Send Payment"]');
  }
  get payeeNameResult() {
    return cy.get('[id="payeeName"]');
  }
  get amountResult() {
    return cy.get('[id="amount"]');
  }
  get fromAccountResult() {
    return cy.get('[id="fromAccountId"]');
  }
  get confirmationMessageTitle() {
    return cy.get("div[id='billpayResult'] h1[class='title']");
  }
  get accountActivityMessage() {
    return cy.xpath(
      "//p[contains(text(), 'See Account Activity for more details.')]"
    );
  }

  verifyBillPaymentServiceTitleIsVisible() {
    this.billPayServicePageTitle.should("be.visible");
  }

  verifyPayeeInfoMessageIsVisible(expectedMessage) {
    this.payeeInfoMessage.should("be.visible").and("contain", expectedMessage);
  }

  typePayeeName(payeeName) {
    return payeeName
      ? this.payeeNameInput.clear().type(payeeName)
      : this.payeeNameInput.clear();
  }

  typeAddress(address) {
    return address
      ? this.addressInput.clear().type(address)
      : this.addressInput.clear();
  }

  typeCity(city) {
    return city ? this.cityInput.clear().type(city) 
    : this.cityInput.clear();
  }

  typeState(state) {
    return state ? this.stateInput.clear().type(state) : this.stateInput.clear();
  }

  typeZipCode(zipCode) {
    return zipCode
      ? this.zipCodeInput.clear().type(zipCode)
      : this.zipCodeInput.clear();
  }

  typePhoneNumber(phoneNumber) {
    return phoneNumber
      ? this.phoneNumberInput.clear().type(phoneNumber)
      : this.phoneNumberInput.clear();
  }

  typeAccountNumber(accountNumber) {
    const value = String(accountNumber || "");
    return accountNumber
      ? this.accountNumberInput.clear().type(value)
      : this.accountNumberInput.clear();
  }

  typeVerifyAccountNumber(verifyAccountNumber) {
    const value = String(verifyAccountNumber);
    return verifyAccountNumber
      ? this.verifyAccountNumberInput.clear().type(value)
      : this.verifyAccountNumberInput.clear();
  }

  typeAmount(amount) {
    const value = String(amount);
    return amount
      ? this.amountInput.clear().type(value)
      : this.amountInput.clear();
  }

  selectFromAccount(account) {
    this.fromAccountDropdown.select(account);
  }

  clickSendPaymentButton() {
    this.sendPaymentButton.click();
  }

  selectFromAccountByIndex(index = 0) {
    return this.fromAccountDropdown
      .find("option")
      .eq(index)
      .invoke("val")
      .then((accountNum) => {
        this.selectFromAccount(accountNum);
        return cy.wrap(accountNum);
      });
  }

  verifyBillPaymentConfirmation({
    expectedMessage,
    payeeName,
    amount,
    fromAccount,
  }) {
    this.confirmationMessageTitle
      .should("be.visible")
      .and("have.text", expectedMessage);
    this.payeeNameResult.should("have.text", payeeName);
    this.fromAccountResult.should("have.text", fromAccount);
    this.amountResult.should("have.text", `$${amount}`);
    this.accountActivityMessage.should("be.visible");
  }
}
export default new BillPayServicePage();
