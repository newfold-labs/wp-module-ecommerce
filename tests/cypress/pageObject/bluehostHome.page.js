/// <reference types="cypress" />
///<reference types="cypress-iframe" />

import "cypress-iframe";

const SELECTOR = {
  BLUEHOST_HORIZONTAL_TAB: "[data-testid=desktop-nav] ul>li",
  HERO_BANNER: "Congrats on your new store! Let's get it ready to launch!",
  SITE_STATUS_TITLE: "Launch Your Site",
  VERTICLE_TAB: "Setup Guide",
  Add_PRODUCT_TAB: "Add products",
  CUSTOMIZE_YOUR_STORE_TAB: "Customize your store",
  ADVANCED_FEATURE_TAB: "Advanced features",
  LAUNCH_YOUR_STORE_TAB: "Launch Your Store",
  SITE_STATUS: "Site Status",

  WORDPRESS_ADMIN_MENU_LIST: "div.wp-menu-name",
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
    return cy.findByLabelText(SELECTOR.VERTICLE_TAB).find("li");
  }

  addProductTab() {
    return cy.findByText(SELECTOR.Add_PRODUCT_TAB);
  }

  customizeYourTab() {
    return cy.findByText(SELECTOR.CUSTOMIZE_YOUR_STORE_TAB);
  }

  advancedFeature() {
    return cy.findByText(SELECTOR.ADVANCED_FEATURE_TAB);
  }

  launchYourSite() {
    return this.verticleTabs().contains(SELECTOR.LAUNCH_YOUR_STORE_TAB);
  }

  siteStatus() {
    return this.verticleTabs().contains(SELECTOR.SITE_STATUS);
  }

  wpMenu() {
    return cy.get(SELECTOR.WORDPRESS_ADMIN_MENU_LIST);
  }
}

export default new HomePage();
