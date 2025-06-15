class AccountServicesMenuPage{

get accountServicesTitle() {
    return cy.contains('h2', 'Account Services');
  }
  get openNewAccountLink() {
    return cy.xpath("//a[text()='Open New Account']");
  }
  get accountsOverviewLink() {
  return cy.contains('a', 'Accounts Overview');
  }
  get transferFundsLink() {
   return cy.contains('a', 'Transfer Funds');
  }
  get billPayLink() {
    return cy.contains('a', 'Bill Pay');

  }
  get findTransactionsLink() {
    return cy.contains('a', 'Find Transactions');
  }
  get updateContactInfoLink() {
    return cy.contains('a', 'Update Contact Info');
  }
  get requestLoanLink() {
    return cy.contains('a', 'Request Loan');
  }
get logoutButton() {
    return cy.contains("Log Out");
  }
    
  clickLogoutButton() {
    this.logoutButton.click();
  }

    clickOpenNewAccountLink() {
    this.openNewAccountLink.click();
  }
}
export default  new  AccountServicesMenuPage();