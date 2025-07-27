import AccountServicesMenuPage from "../../../page-objects/account-services-menu.page";
import UpdateContactInfoPage from "../../../page-objects/update-contact-info.page";

describe("Update Contact Info Functionality", () => {
  let message;

  before(() => {
    cy.fixture("ui-test-data/messages.json").then((data) => {
      message = data;
    });
  });

  beforeEach(() => {
    cy.uiLogin();
    AccountServicesMenuPage.clickUpdateContactInfoLink();
  });

  it("[PROFILE-001] Should update contact info with valid data", () => {
    const address = "123 Main St";
    const city = "Chicago";
    const state = "IL";
    const zipCode = "60647";
    const phone = "312-123-4567";

    UpdateContactInfoPage.typeAddress(address);
    UpdateContactInfoPage.typeCity(city);
    UpdateContactInfoPage.typeState(state);
    UpdateContactInfoPage.typeZipCode(zipCode);
    UpdateContactInfoPage.typePhoneNumber(phone);
    UpdateContactInfoPage.clickUpdateProfileButton();

    UpdateContactInfoPage.verifyProfileUpdatedTextIsVisible(
      message.PROFILE_UPDATED_CONFIRMATION
    );
  });
});
