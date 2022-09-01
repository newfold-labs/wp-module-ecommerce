/// <reference types="cypress" />
///<reference types="cypress-iframe" />

import "cypress-iframe";

const SELECTOR = {
  BLUEHOST_HORIZONTAL_TAB: "[data-testid=desktop-nav] ul>li",
  HERO_BANNER: "Congrats on your new store! Let's get it ready to launch!",
  SITE_STATUS_TITLE: "Launch Your Site",
  VERTICLE_TAB: "Setup Guide",
  Add_PRODUCT_TAB: "Products and Services",
  CUSTOMIZE_YOUR_STORE_TAB: "Pages",
  ADVANCED_FEATURE_TAB: "Additional Features",
  LAUNCH_YOUR_STORE_TAB: "Launch Your Store",
  SITE_STATUS: "Site Status",
};

class HomePage {
  bluehostHorizontalTab() {
    return cy.get(SELECTOR.BLUEHOST_HORIZONTAL_TAB, { timeout: 20000 });
  }

  heroBanner() {
    return cy.findByText(SELECTOR.HERO_BANNER);
  }

  siteStatusInHeader() {
    return cy.findByTitle(SELECTOR.SITE_STATUS_TITLE).find("span");
  }

  verticleTabs() {
    return cy.findByLabelText(SELECTOR.VERTICLE_TAB).find("a>li");
  }

  addProductTab() {
    return cy.findByText(SELECTOR.Add_PRODUCT_TAB);
  }

  customizeYourTab() {
    return cy.get("a > li").contains(SELECTOR.CUSTOMIZE_YOUR_STORE_TAB);
  }

  advancedFeature() {
    return cy.get("a > li").contains(SELECTOR.ADVANCED_FEATURE_TAB);
  }

  launchYourSite() {
    return cy.get("a > li").contains(SELECTOR.LAUNCH_YOUR_STORE_TAB);
  }

  siteStatus() {
    return cy.get("a > li").contains(SELECTOR.SITE_STATUS);
  }
}

export default new HomePage();
