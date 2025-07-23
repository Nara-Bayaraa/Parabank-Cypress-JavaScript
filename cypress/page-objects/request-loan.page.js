class RequestLoanPage {
  get requestLoanPageTitle() {
    return cy.get("div[id='requestLoanForm'] h1[class='title']");
  }
  get loanAmount() {
    return cy.get('[id="amount"]');
  }
  get downPayment() {
    return cy.get('[id="downPayment"]');
  }
  get selectFromAccount() {
    return cy.get("#fromAccountId");
  }
  get applyNowButton() {
    return cy.get('[value="Apply Now"]');
  }
get loanRequestProcessedText() {return cy.get("div[id='requestLoanResult'] h1[class='title']")}
  
get loanProvider() {return cy.get('[id="loanProviderName"]')}
get loanRequestedDate() {return cy.get('[id="responseDate"]')}
get loanStatus() {return cy.get('[id="loanStatus"]')}
get loanApprovedText() {return cy.get('[id="loanRequestApproved"] p').first()}
verifyPageTitleIsVisible() {
    this.requestLoanPageTitle.should("be.visible");
  }

  enterLoanAmount(expectedAmount) {
    this.loanAmount.type(expectedAmount);
  }

  enterDownPayment(expectedDownPayment) {
    this.downPayment.type(expectedDownPayment);
  }
  
  clickApplyNowButton() {
    this.applyNowButton.click();
  }

  verifyLoanRequestProcessedText(expectedText){
    this.loanRequestProcessedText.should('be.visible', expectedText)
  }
  loanProviderName(expectedText){
    this.loanProvider.should('have.text', expectedText)
  }
  loanRequestedDate(expectedDate){
    this.loanRequestedDate.should('have.text', expectedDate)
  }
loanStatus(expectedStatus){
  this.loanStatus.should('have.text', expectedStatus)
}
verifyLoanHasBeenApprovedText(expectedText){
  this.loanApprovedText.should('be.visible', expectedText)
}
}
export default new RequestLoanPage();
