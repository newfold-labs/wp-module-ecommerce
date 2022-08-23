const COMMON_SELECTOR = {
    save_changes_btton: "button[name=save]",
}

const GENERAL_SETTING_SELECTOR = {
    ADDRESS1: "#woocommerce_store_address",
    CITY: "#woocommerce_store_city",
    COUNTRY: "[name=woocommerce_default_country] option:selected",
    ZIPCODE: "#woocommerce_store_postcode",
    ENABLE_TAX: "input#woocommerce_calc_taxes",
}

const TAX_SETTING_SELECTOR ={
    TAX_OPTION_LIST: "ul.subsubsub>li>a",
    INSERT_ROW: "a.button.plus.insert",
    REMOVE_ROW: "a.button.minus.remove_tax_rates",
    COUNTRY_ROW_LIST: "td.country",
    STATE_ROW_LIST: "td.state",
    RATE_ROW_LIST: "td.rate",
    APPLY_SHIPPING_ROW_LIST: "apply_to_shipping",
}

class WooCommercePage{

    saveChanges(){
        return cy.get(COMMON_SELECTOR.save_changes_btton)
    }

    wooCommerceTabs(){
        return cy.get("form#mainform>nav>a")
    }

    addressLine1(){
        return cy.get(GENERAL_SETTING_SELECTOR.ADDRESS1)
    }

    city(){
        return cy.get(GENERAL_SETTING_SELECTOR.CITY)
    }
    
    country(){
        return cy.get(GENERAL_SETTING_SELECTOR.COUNTRY)
    }
    
    zipCode(){
        return cy.get(GENERAL_SETTING_SELECTOR.ZIPCODE)
    }
    
    enableTax(){
        return cy.get(GENERAL_SETTING_SELECTOR.ENABLE_TAX)
    }

    standardTaxOptionTabList(){
        return cy.get(TAX_SETTING_SELECTOR.TAX_OPTION_LIST)
    }

    deleteRow(){
        return cy.get(TAX_SETTING_SELECTOR.REMOVE_ROW)
    }

    insertRow(){
        return cy.get(TAX_SETTING_SELECTOR.INSERT_ROW)
    }

    countryRowList(){
        return cy.get(TAX_SETTING_SELECTOR.COUNTRY_ROW_LIST)
    }

    taxRateRowList(){
        return cy.get(TAX_SETTING_SELECTOR.RATE_ROW_LIST)
    }

    applyToShippingRowList(){
        return cy.get(TAX_SETTING_SELECTOR.APPLY_SHIPPING_ROW_LIST)
    }

    stateCodeRowList(){
        return cy.get(TAX_SETTING_SELECTOR.STATE_ROW_LIST)
    }
}

export default new WooCommercePage();