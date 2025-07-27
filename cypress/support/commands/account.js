import AccountOpenedConfirmationPage from "../../page-objects/account-opened-confirmation.page";
import AccountServicesMenuPage from "../../page-objects/account-services-menu.page";
import OpenNewAccountPage from "../../page-objects/open-new-account.page";
import AccountDetailsPage from "../../page-objects/account-details.page";




Cypress.Commands.add('getAccountBalances', () => {
  let balances = {};
  cy.contains("Balance:").next().invoke("text").then(text => balances.balance = text.trim());
  cy.contains("Available:").next().invoke("text").then(text => balances.available = text.trim());
  cy.wrap(balances);
});


Cypress.Commands.add("selectAccountType", (accountType) => {
  AccountServicesMenuPage.clickOpenNewAccountLink();
  OpenNewAccountPage.selectAccountType(accountType);
  AccountOpenedConfirmationPage.clickAccountNumberLink();
cy.wait(1000)
return AccountDetailsPage.getAccountNumber();
});

