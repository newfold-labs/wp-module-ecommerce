/// <reference types="cypress" />
///<reference types="cypress-iframe" />

import "cypress-iframe";

const SELECTOR = {
  BLUEHOST_HORIZONTAL_TAB: "[data-testid=desktop-nav]",
  HERO_BANNER: "div.nfd-ecommerce-banner",
  SITE_STATUS: "#nfd-site-status-text",
  VERTICLE_TAB: ".nfd-ecommerce-dashboard-menu>a>li",
};

class HomePage {
  bluehostHorizontalTab() {
    return cy.get(SELECTOR.BLUEHOST_HORIZONTAL_TAB, { timeout: 20000 });
  }

  heroBanner() {
    return cy.get(SELECTOR.HERO_BANNER).find("h1");
  }

  siteStatus() {
    return cy.get(SELECTOR.SITE_STATUS);
  }

  verticleTab() {
    return cy.get(SELECTOR.VERTICLE_TAB);
  }
}

export default new HomePage();
