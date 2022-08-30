const SELECTOR = {
  CARD_LIST: "[data-variant=standard]",
  HOME_PAGE: "Home Page",
  ABOUT_PAGE: "About Page",
  CONTACT_PAGE: "Contact Page",
  STORE_LAYOUT: "Store Layout",
  CUSTOMER_ACCOUNT_PAGE: "Customer Account Page",

  THEME_HOMEPAGE_TITLE: "Homepage",
  THEME_ABOUTPAGE_TITLE: "About Us",
  THEME_CONTACTPAGE_TITLE: "Contact Us",
  PLUBISH_BUTTON: "Publish",
  SITE_IDENTITY: "Site Identity",
  SITE_TITLE: "Site Title",
  STORE_LAYOUT_PUBLISH_BUTTON: "[name=save]",
};

class CustomizeYourStorePage {
  cardList() {
    return cy.get("[data-variant=standard]");
  }

  homePage() {
    return cy.contains(SELECTOR.HOME_PAGE);
  }

  aboutPage() {
    return cy.contains(SELECTOR.ABOUT_PAGE);
  }

  contactPage() {
    return cy.contains(SELECTOR.CONTACT_PAGE);
  }

  storeLayout() {
    return cy.contains(SELECTOR.STORE_LAYOUT);
  }

  customerAccount() {
    return cy.contains(SELECTOR.CUSTOMER_ACCOUNT_PAGE);
  }

  yithThemeHomePageHeader() {
    return cy.contains(SELECTOR.THEME_HOMEPAGE_TITLE, { timeout: 100000 });
  }

  yithThemeAboutPageHeader() {
    return cy.contains(SELECTOR.THEME_ABOUTPAGE_TITLE, { timeout: 100000 });
  }

  yithThemeContactPageHeader() {
    return cy.contains(SELECTOR.THEME_CONTACTPAGE_TITLE, { timeout: 100000 });
  }

  publishButton() {
    return cy.get("button").contains(SELECTOR.PLUBISH_BUTTON);
  }

  waitForLoaderTill(timeInMillisecond) {
    cy.get("div.loaded", { timeout: timeInMillisecond });
  }

  editorPostCancelButton() {
    return cy
      .get("div.editor-post-publish-panel")
      .find("button")
      .contains("Cancel");
  }

  editorPostPublishButton() {
    return cy
      .get("div.editor-post-publish-panel")
      .find("button")
      .contains("Publish");
  }

  siteIdentity() {
    return cy.contains(SELECTOR.SITE_IDENTITY);
  }

  siteTitle() {
    return cy.contains(SELECTOR.SITE_TITLE).parent().find("input");
  }

  publishStoreLayout() {
    return cy.get(SELECTOR.STORE_LAYOUT_PUBLISH_BUTTON);
  }
}

export default new CustomizeYourStorePage();
