const COMMON_SELECTOR = {
  save_changes_btton: "button[name=save]",
  ADD_MANUALLY: "Add manually",
};

const GENERAL_SETTING_SELECTOR = {
  ADDRESS1: "input#woocommerce_store_address",
  CITY: "input#woocommerce_store_city",
  COUNTRY: "select[name=woocommerce_default_country] option:selected",
  ZIPCODE: "input#woocommerce_store_postcode",
  ENABLE_TAX: "input#woocommerce_calc_taxes",
};

const TAX_SETTING_SELECTOR = {
  STANDARD_RATE: "Standard rates",
  INSERT_ROW: "a.button.plus.insert",
  REMOVE_ROW: "a.button.minus.remove_tax_rates",
  COUNTRY_ROW_LIST: "td.country",
  STATE_ROW_LIST: "td.state",
  RATE_ROW_LIST: "td.rate",
  APPLY_SHIPPING_ROW_LIST: "td.apply_to_shipping",
};

class WooCommercePage {
  saveChanges() {
    return cy.get(COMMON_SELECTOR.save_changes_btton);
  }

  wooCommerceTabs() {
    return cy.get("form#mainform>nav>a");
  }

  addressLine1() {
    return cy.get(GENERAL_SETTING_SELECTOR.ADDRESS1);
  }

  city() {
    return cy.get(GENERAL_SETTING_SELECTOR.CITY);
  }

  country() {
    return cy.get(GENERAL_SETTING_SELECTOR.COUNTRY);
  }

  zipCode() {
    return cy.get(GENERAL_SETTING_SELECTOR.ZIPCODE);
  }

  enableTax() {
    return cy.get(GENERAL_SETTING_SELECTOR.ENABLE_TAX);
  }

  standardTaxOption() {
    return cy.findByText(TAX_SETTING_SELECTOR.STANDARD_RATE);
  }

  deleteRow() {
    return cy.get(TAX_SETTING_SELECTOR.REMOVE_ROW);
  }

  insertRow() {
    return cy.get(TAX_SETTING_SELECTOR.INSERT_ROW);
  }

  countryRowList() {
    return cy.get(TAX_SETTING_SELECTOR.COUNTRY_ROW_LIST);
  }

  taxRateRowList() {
    return cy.get(TAX_SETTING_SELECTOR.RATE_ROW_LIST);
  }

  applyToShippingRowList() {
    return cy.get(TAX_SETTING_SELECTOR.APPLY_SHIPPING_ROW_LIST).find("input");
  }

  stateCodeRowList() {
    return cy.get(TAX_SETTING_SELECTOR.STATE_ROW_LIST);
  }

  addProductManually() {
    return cy.findByText(COMMON_SELECTOR.ADD_MANUALLY);
  }

  clearTable() {
    cy.get("td.compound>[type=checkbox]").each(($element, index, $list) => {
      for (let j = 0; j < $list.length - 1; j++) {
        cy.get("td.compound>[type=checkbox]").eq(0).click();
        WooCommercePage.deleteRow().click();
      }
      this.saveChanges().click();
    });
  }
  backButton() {
    return cy.get("[role=main]").contains("Back");
  }
}

export default new WooCommercePage();
