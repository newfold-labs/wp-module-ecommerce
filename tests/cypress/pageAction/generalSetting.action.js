/// <reference types="cypress" />

import BluehostHomePage from "../pageObject/bluehostHome.page";
import GeneralSettingPage from "../pageObject/generalSettings.page";
import WooCommercePage from "../pageObject/wooCommerce.page";
import YithShippoPage from "../pageObject/yithShippo.page";

const data = require("../fixtures/dashboard.json");

export function verifyBluehostTabsExists() {
  BluehostHomePage.bluehostHorizontalTab().should("have.length.greaterThan", 0);
}

export function verifyLaunchPadBannerContains(bannerText) {
  BluehostHomePage.heroBanner().should("have.text", bannerText);
}

export function verifySiteStatusEqualsTo(status_text) {
  BluehostHomePage.siteStatus().then(($element) => {
    cy.wrap($element.text()).should("have.text", status_text);
  });
}

export function verifyVerticleTabsHave(tab_list) {
  BluehostHomePage.verticleTab().each(($element, index, $list) => {
    cy.wrap($element).should("have.text", tab_list[index]);
  });
}

export function verifyGeneralSettingTabHaveCard(cardList) {
  GeneralSettingPage.uncompletedCards().each(($element, index, $list) => {
    cy.wrap($element).find("span").should("include.text", cardList[index]);
  });
}
export function checkLinkTextIsPresentOnGeneralSettingCardsOnHover() {
  var linkTextList = ["Add Info", "Setup", "Setup", "Add Info"];
  GeneralSettingPage.cardsLinkText().each(($el, index, $list) => {
    cy.wrap($el).should("be.hidden").and("include.text", linkTextList[index]);
  });
}
export function addStoreAddress() {
  GeneralSettingPage.uncompletedCards().eq(0).click();
  GeneralSettingPage.address1().type(data.store_address.address1);
  GeneralSettingPage.city().type(data.store_address.city);
  GeneralSettingPage.postalCode().type(data.store_address.zipcode);
  GeneralSettingPage.country().select(data.store_address.country);
  GeneralSettingPage.state().select(data.store_address.state);
  GeneralSettingPage.storeInfoContinueButton().click();
}
export function verifyStoreInfoCardIsInDoneState() {
  GeneralSettingPage.completedCards()
    .eq(0)
    .find("div")
    .should("have.length", 1);
  GeneralSettingPage.address1();
}
export function verifyEnteredStoreAddressIsSameOnWooCommerceSetting() {
  GeneralSettingPage.completedCards().eq(0).click();
  WooCommercePage.addressLine1().should(
    "have.value",
    data.store_address.address1
  );
  WooCommercePage.city().should("have.value", data.store_address.city);
  WooCommercePage.country().should(
    "have.text",
    `${this.data.store_address.country + " — " + data.store_address.state}`
  );
  WooCommercePage.zipCode().should("have.value", data.store_address.zipcode);
}

export function linkExistingPaymentAccount() {
  GeneralSettingPage.uncompletedCards().contains("Payments").click();
  GeneralSettingPage.loadIframe();
  GeneralSettingPage.paypalTitle();

  if (data.existing_payment.environment == "sandbox") {
    GeneralSettingPage.paypalRadioButtonList().eq(1).click();
  } else {
    GeneralSettingPage.paypalRadioButtonList().eq(0).click();
  }
  if (data.existing_payment.payment_action.toLowerCase().includes("sale")) {
    GeneralSettingPage.paypalRadioButtonList().eq(2).click();
  } else {
    GeneralSettingPage.paypalRadioButtonList().eq(3).click();
  }
  GeneralSettingPage.paypalSaveButton().click();
}

export function verifyPaymentCardsInDoneSection() {
  GeneralSettingPage.completedCards().should("include.text", "Payments");
}
export function linkExistingShippoAccount() {
  GeneralSettingPage.uncompletedCards().contains("Shipping").click();
  GeneralSettingPage.loadIframe();
  if (data.existing_shipping.environment.toLowerCase().includes("sandbox")) {
    GeneralSettingPage.shippoEnvRadioButtonList().eq(1).click();
  } else {
    GeneralSettingPage.shippoEnvRadioButtonList().eq(0).click();
  }
  GeneralSettingPage.shippingAPI()
    .clear()
    .type(data.existing_shipping.test_api);
  GeneralSettingPage.senderName()
    .clear()
    .type(data.existing_shipping.sender_name);
  GeneralSettingPage.companyName()
    .clear()
    .type(data.existing_shipping.sender_company);
  GeneralSettingPage.senderEmail().clear().type(data.existing_shipping.email);
  if (this.data.existing_shipping.use_woocommerce_address) {
    GeneralSettingPage.useWooCommerceSavedStoreAddress().click();
  }
  GeneralSettingPage.shippoSaveButton().click();
}
export function verifyShippingCardIsInDoneState() {
  GeneralSettingPage.completedCards().should("include.text", "Shipping");
}

export function verifyFilledShippingInformationSavedInYith() {
  GeneralSettingPage.completedCards().contains("Shipping").click();

  YithShippoPage.selectedShippoEnv().should(
    "include.value",
    data.existing_shipping.environment
  );
  YithShippoPage.shippoAPI().should(
    "have.value",
    data.existing_shipping.test_api
  );

  YithShippoPage.shippoShippingTab().eq(1).click();
  YithShippoPage.senderName().should(
    "have.value",
    data.existing_shipping.sender_name
  );
  YithShippoPage.compnayName().should(
    "have.value",
    data.existing_shipping.sender_company
  );
  YithShippoPage.email().should("have.value", data.existing_shipping.email);
}
export function selectTaxOption(option) {
  GeneralSettingPage.taxOptionList().eq(option).click();
  GeneralSettingPage.taxContinueButton().click();
}

export function verifyTaxInfoCardInDoneState() {
  GeneralSettingPage.completedCards().should("include.text", "Tax Info");
}

export function verifyTaxOptionIsEnableInWooCommerce() {
  GeneralSettingPage.completedCards().contains("Tax Info").click();
  WooCommercePage.wooCommerceTabs().should("include.text", "Tax");
}

export function deleteAllRow() {
  WooCommercePage.countryRowList().each(($element, index, $list) => {
    cy.wrap($element).click();
    WooCommercePage.deleteRow().click();
  });
}

export function setStandardRate() {
  WooCommercePage.standardTaxOptionTabList().eq(1).click();
  WooCommercePage.countryRowList().then(($element) => {
    if ($element.length > 0) {
      deleteAllRow();
    }
  });
  WooCommercePage.insertRow().click();
  WooCommercePage.countryRowList()
    .eq(0)
    .find("input")
    .type(data.standard_tax_setting.country_code);
  WooCommercePage.stateCodeRowList()
    .eq(0)
    .find("input")
    .type(data.standard_tax_setting.state_code);
  WooCommercePage.taxRateRowList()
    .eq(0)
    .find("input")
    .type(data.standard_tax_setting.state_code);
  if (data.standard_tax_setting) {
    WooCommercePage.applyToShippingRowList().eq(0).click();
  }
  WooCommercePage.saveChanges().click();
}

export function verifyAllCardAreInDoneState() {
  GeneralSettingPage.uncompletedCards().should("have.length", 4);
}
