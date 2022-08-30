/// <reference types="cypress" />
///<reference types="cypress-iframe" />

import "cypress-iframe";

const SELECTOR = {
  UNCOMPLETED_CARDS: ".nfd-ecommerce-standard-actions-container>button",
  COMPLETED_CARDS: ".nfd-ecommerce-minimal-tasks-container>button",
  OVERLAY_IFRAME: "iframe",

  // Store Info Card Elements
  ADDRESS_LINE_1: "input[name=woocommerce_store_address]",
  CITY: "[name=woocommerce_store_city]",
  ZIPCODE: "input[name=woocommerce_store_postcode]",
  COUNTRY: "select[name=country]",
  STATE: "select[name=state]",
  STORE_CONTINUE_BUTTON: "button[type=submit]",

  // Payment Card
  PAYPAL_TITLE: "Title",
  PAYPAL_RADIO_BUTTON_LIST: "[data-type=radio] label",
  PYAPAL_SAVE_BUTTON: "button#yith-bh-save-button",
  CONNECT_WITH_PAYPAL: "Connect with PayPal",

  // Shippo card
  SHIPPO_ENV_RADIO_BUTTON_LIST: "[data-type=radio] label",
  API: "input#yith_shippo_sandbox_token",
  SENDER_NAME: "Name",
  COMPANY_NAME: "Company",
  EMAIL: "Email",
  USE_WC_ADDRESS_CHECKBOX: "[type=checkbox]",
  SHIPPO_SAVE_BUTTON: "Save",

  // Tax Info Crad
  ENABLE_TAX_OPTIONS: "div[role=button]",
  TAX_CONTINUE_BUTTON: "Continue",
};

class GeneralSettingPage {
  uncompletedCards() {
    return cy.get(SELECTOR.UNCOMPLETED_CARDS);
  }

  completedCards() {
    return cy.get(SELECTOR.COMPLETED_CARDS);
  }

  cardsLinkText() {
    return cy.get(SELECTOR.UNCOMPLETED_CARDS).find("span>span");
  }

  address1() {
    return cy.get(SELECTOR.ADDRESS_LINE_1);
  }

  city() {
    return cy.get(SELECTOR.CITY);
  }

  postalCode() {
    return cy.get(SELECTOR.ZIPCODE);
  }

  country() {
    return cy.get(SELECTOR.COUNTRY);
  }

  state() {
    return cy.get(SELECTOR.STATE);
  }

  storeInfoContinueButton() {
    return cy.get(SELECTOR.STORE_CONTINUE_BUTTON);
  }

  loadIframe() {
    return cy.frameLoaded(SELECTOR.OVERLAY_IFRAME);
  }

  paypalTitle() {
    return cy
      .iframe()
      .findByLabelText(SELECTOR.PAYPAL_TITLE)
      .parent()
      .find("input");
  }

  paypalRadioButtonList() {
    return cy.iframe().find(SELECTOR.PAYPAL_RADIO_BUTTON_LIST);
  }

  connectWithPayPal() {
    return cy.iframe().contains(SELECTOR.CONNECT_WITH_PAYPAL);
  }

  paypalSaveButton() {
    return cy.iframe().find(SELECTOR.PYAPAL_SAVE_BUTTON);
  }

  shippingAPI() {
    return cy.iframe().find(SELECTOR.API);
  }

  shippoEnvRadioButtonList() {
    return cy
      .iframe()
      .find(SELECTOR.SHIPPO_ENV_RADIO_BUTTON_LIST, { timeout: 30000 });
  }

  senderName() {
    return cy
      .iframe()
      .findByLabelText(SELECTOR.SENDER_NAME)
      .parent()
      .find("input[type=text]");
  }

  companyName() {
    return cy
      .iframe()
      .findByLabelText(SELECTOR.COMPANY_NAME)
      .parent()
      .find("input");
  }

  senderEmail() {
    return cy.iframe().findByLabelText(SELECTOR.EMAIL).parent().find("input");
  }

  useWooCommerceSavedStoreAddress() {
    return cy.iframe().find(SELECTOR.USE_WC_ADDRESS_CHECKBOX);
  }

  shippoSaveButton() {
    return cy.iframe().findByText(SELECTOR.SHIPPO_SAVE_BUTTON);
  }

  taxOptionList() {
    return cy.get(SELECTOR.ENABLE_TAX_OPTIONS);
  }

  taxContinueButton() {
    return cy.findByText(SELECTOR.TAX_CONTINUE_BUTTON);
  }
}

export default new GeneralSettingPage();
