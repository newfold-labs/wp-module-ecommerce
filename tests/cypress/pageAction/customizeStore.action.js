import BluehostHomePage from "../pageObject/bluehostHome.page";
import CustomizeStorePage from "../pageObject/dashboard/customizeYourStore.page";
import WPPages from "../pageObject/wpPages.page";

export function verifyCard(cards) {
  BluehostHomePage.customizeYourTab().click();
  cards.forEach((element) => {
    cy.contains(element);
  });
}

export function createPages() {
  createHomePage();
  createAboutPage();
  createContactPage();
}

function createHomePage() {
  BluehostHomePage.customizeYourTab().click();
  CustomizeStorePage.homePage().click();
  CustomizeStorePage.yithThemeHomePageHeader().should("exist");
  CustomizeStorePage.waitForLoaderTill(10000);
  CustomizeStorePage.publishButton().click({ force: true });
  CustomizeStorePage.editorPostPublishButton().click({ force: true });
  cy.go("back");
}

function createAboutPage() {
  CustomizeStorePage.aboutPage().click();
  CustomizeStorePage.yithThemeAboutPageHeader().should("exist");
  CustomizeStorePage.waitForLoaderTill(10000);
  CustomizeStorePage.publishButton().click({ force: true });
  CustomizeStorePage.editorPostPublishButton().click({ force: true });
  cy.go("back");
}

function createContactPage() {
  CustomizeStorePage.contactPage().click();
  CustomizeStorePage.yithThemeContactPageHeader().should("exist");
  CustomizeStorePage.waitForLoaderTill(10000);
  CustomizeStorePage.publishButton().click({ force: true });
  CustomizeStorePage.editorPostCancelButton().should("exist");
  CustomizeStorePage.editorPostPublishButton().click({ force: true });
  cy.go("back");
}

export function storeLayout() {
  BluehostHomePage.customizeYourTab().click();
  CustomizeStorePage.storeLayout().click();
  CustomizeStorePage.siteIdentity().click();
  CustomizeStorePage.siteTitle().click().clear().type("beyond");
  CustomizeStorePage.publishStoreLayout().click();
}

export function customerAccount() {
  BluehostHomePage.customizeYourTab().click();
  CustomizeStorePage.customerAccount().click();
  cy.findByText("YITH WooCommerce Customize My Account Page").should("exist");
}

export function deleteAllWPPages() {
  BluehostHomePage.wpMenu().contains("Pages").click();
  try {
    cy.get("div.top span.total-pages").then(($element) => {
      var count = parseInt($element.text());
      for (let index = 0; index < count; index++) {
        deleteAllPage();
      }
    });
  } catch (error) {
    deleteAllPage();
  }
}

function deleteAllPage() {
  WPPages.selectAllProductButton().check();
  WPPages.selectActionOnProduct().select("Move to Trash");
  WPPages.applyButton().click();
}
