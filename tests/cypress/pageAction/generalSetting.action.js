/// <reference types="cypress" />

import BluehostHomePage from "../pageObject/bluehostHome.page";
import GeneralSettingPage from "../pageObject/dashboard/generalSettings.page";
import WooCommercePage from "../pageObject/wooCommerce.page";
import YithShippoPage from "../pageObject/yithShippo.page";

const data = require("../fixtures/dashboard.json");

export function verifyBluehostTabsExists() {
  BluehostHomePage.bluehostHorizontalTab().should("have.length.greaterThan", 0);
}

export function verifyLaunchPadBannerContains(bannerText) {
  BluehostHomePage.siteStatusInHeader().then(($element) => {
    let status = $element.text();
    if (status != "Live") {
      BluehostHomePage.heroBanner().should("have.length.greaterThan", 0);
    }
  });
}

export function verifySiteStatusEqualsTo(status_text) {
  BluehostHomePage.siteStatusInHeader().then(($element) => {
    cy.wrap($element.text()).should("have.text", status_text);
  });
}

export function verifyVerticleTabsHave(tabList) {
  BluehostHomePage.siteStatusInHeader().then(($element) => {
    let status = $element.text().trim();
    if (status != "Live") {
      tabList[4] = "Launch Your Store";
    } else {
      tabList[4] = "Site Status";
    }
    tabList.forEach((element) => {
      BluehostHomePage.verticleTabs().contains(element);
    });
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
  GeneralSettingPage.completedCards().should("include.text", "Store Info");
}
export function verifyEnteredStoreAddressIsSameOnWooCommerceSetting() {
  GeneralSettingPage.completedCards().contains("Store Info").click();
  WooCommercePage.addressLine1().should(
    "have.value",
    data.store_address.address1
  );
  WooCommercePage.city().should("have.value", data.store_address.city);
  WooCommercePage.country().should(
    "have.text",
    `${data.store_address.country + " — " + data.store_address.state}`
  );
  WooCommercePage.zipCode().should("have.value", data.store_address.zipcode);
}

// #####################################################

const getIframeDocument = () => {
  return (
    cy
      .get("iframe")
      // Cypress yields jQuery element, which has the real
      // DOM element under property "0".
      // From the real DOM iframe element we can get
      // the "document" element, it is stored in "contentDocument" property
      // Cypress "its" command can access deep properties using dot notation
      // https://on.cypress.io/its
      .its("0.contentDocument")
      .should("exist")
  );
};

const getIframeBody = () => {
  // get the document
  return (
    getIframeDocument()
      // automatically retries until body is loaded
      .its("body")
      .should("not.be.undefined")
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      .then(cy.wrap)
  );
};

export function linkExistingPaymentAccount() {
  GeneralSettingPage.uncompletedCards().contains("Payments").click();
  GeneralSettingPage.loadIframe();
  GeneralSettingPage.paypalTitle().clear();

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

  cy.contains("PayPal ID").find("input").type("xyz");
  // GeneralSettingPage.paypalSaveButton().click();

  // Testing #######################################################
  // let newUrl = "https://www.sandbox.paypal.com/bizsignup/#/checkAccount";
  // cy.window().then((win) => {
  //   const stub = cy.stub(win, "open").as("windowOpen");
  // });

  // GeneralSettingPage.connectWithPayPal().click();
  // cy.wait(10000);
  // cy.frameLoaded("iframe");
  // cy.iframe("iframe.aut-iframe")
  // .its("0.contentDocument.body")
  // cy.wait(10000);
  // cy.get('[label="Email"]');
  // .type("sb-4lydi20305701@business.example.com");
  // cy.frameLoaded("iframe.aut-iframe");
  // cy.iframe()
  //   .get(["name=Email"], { timeout: 20000 })
  //   .type("sb-4lydi20305701@business.example.com");

  // cy.window().then((win) => (win.location.href = newUrl));
  // cy.wait(10000);
  // cy.frameLoaded("iframe.aut-iframe");
  // cy.iframe()
  //   .get(["name=Email"], { timeout: 20000 })
  //   .type("sb-4lydi20305701@business.example.com");
  // cy.findByText("Next").click();
  // cy.iframe().get("input#password").type("_^evP^H2");
  // cy.get("value=Login").click();
  // cy.window().then((win) => {
  //   cy.origin(newUrl);
  //   cy.wait(20000);
  //   cy.get(["name=Email"], { timeout: 10000 }).type(
  //     "sb-4lydi20305701@business.example.com"
  //   );
  // });
  // cy.window().then((win) => {
  //   win.location.href = newUrl;
  //   cy.get(["name=Email"], { timeout: 10000 }).type(
  //     "sb-4lydi20305701@business.example.com"
  //   );
  //   cy.findByText("Next").click();
  //   cy.get("input#password").type("_^evP^H2");
  //   cy.get("value=Login").click();
  // });
}

export function test() {
  // let newUrl = "https://www.sandbox.paypal.com/bizsignup/#/checkAccount";
  // cy.window().then((win) => {
  //   win.location.href = newUrl;
  // });
  // cy.visit(newUrl);
  // cy.get("iframe").then(($element) => {
  //   cy.log($element.length);
  // });
  // cy.wait(2000);
  // cy.frameLoaded("iframe");
  // cy.iframe().find('[label="Email"]').type("test");
  // cy.get("iframe").its("0.contentDocument").should("exist");
  // // getIframeBody().find('[label="Email"]').click();
}

export function verifyPaymentCardsInDoneSection() {
  GeneralSettingPage.completedCards().should("include.text", "Payments");
}
export function linkExistingShippoAccount() {
  GeneralSettingPage.uncompletedCards().contains("Shipping").click();
  GeneralSettingPage.loadIframe({ timeout: 20000 });
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
  if (data.existing_shipping.use_woocommerce_address) {
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
  GeneralSettingPage.uncompletedCards().contains("Tax").click();
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

export function deleteAllTaxRow() {
  GeneralSettingPage.completedCards().contains("Tax Info").click();
  WooCommercePage.standardTaxOption().click();
  try {
    WooCommercePage.countryRowList().then(($element) => {
      for (let k = 0; k < $element.length; k++) {
        cy.get("td.compound>input").eq(0).check();
        WooCommercePage.deleteRow().click();
      }
      WooCommercePage.saveChanges().click();
    });
  } catch (error) {}
  cy.go("back");
}

export function setStandardRate() {
  WooCommercePage.standardTaxOption().click();

  WooCommercePage.insertRow().click();
  WooCommercePage.countryRowList().then(($element) => {
    var count = $element.length;
    WooCommercePage.countryRowList()
      .eq(count - 1)
      .find("input")
      .type(data.standard_tax_setting.country_code);
    WooCommercePage.stateCodeRowList()
      .eq(count - 1)
      .find("input")
      .type(data.standard_tax_setting.state_code);
    WooCommercePage.taxRateRowList()
      .eq(count - 1)
      .find("input")
      .type(data.standard_tax_setting.rate_percentage);
    if (data.standard_tax_setting.apply_to_shipping == true) {
      WooCommercePage.applyToShippingRowList()
        .eq(count - 1)
        .click();
    }
    WooCommercePage.saveChanges().click();
  });
}

export function verifyAllCardAreInDoneState() {
  GeneralSettingPage.uncompletedCards().should("have.length", 4);
}
