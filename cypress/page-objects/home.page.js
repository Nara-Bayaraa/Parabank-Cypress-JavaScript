class HomePage {
  get registerLink() {
    return cy.xpath("//a[text()='Register']");
  }
  get loginFieldInput() {
    return cy.xpath("//input[@name='username']");
  }
  get passwordFieldInput() {
    return cy.xpath("//input[@name='password']");
  }
  get loginButton() {
    return cy.get('[type="submit"]');
  }
  get credentialsRequiredErrorText() {
    return cy.get("div#rightPanel p");
  }

  verifyAccountOverviewPageUrl() {
    cy.url().should("includes", "overview.htm");
  }
  
  verifyAccountOverviewPage() {
    cy.title().should("eq", "ParaBank | Accounts Overview");
  }

  clickRegisterLink() {
    this.registerLink.click();
  }

  typeUserName(username) {
    if (username && username.length > 0) {
      this.loginFieldInput.should("be.visible").focus().type(username);
    } else {
      this.loginFieldInput.clear();
    }
  }

  typePassword(password) {
    if (password && password.length > 0) {
      this.passwordFieldInput.should("be.visible").focus().type(password);
    } else {
      this.passwordFieldInput.clear();
    }
  }
  
  clickLoginButton() {
    this.loginButton.click();
  }

  verifyCredentialsErrorMessageIsVisible() {
    this.credentialsRequiredErrorText.should("be.visible");
  }
}
export default new HomePage();
