const GENERAL_SETTING_SELECTOR = {
    address_line_1_input_field: "#woocommerce_store_address",
    city_input_field: "#woocommerce_store_city",
    country_state_input_field: "[name=woocommerce_default_country] option:selected",
    zip_code_input_field: "#woocommerce_store_postcode",
    enable_tax_checkbox: "input#woocommerce_calc_taxes"
}

class WooCommercePage{
    get_address_line_1(){
        return cy.get(GENERAL_SETTING_SELECTOR.address_line_1_input_field)
    }

    get_city(){
        return cy.get(GENERAL_SETTING_SELECTOR.city_input_field)
    }
    
    get_country_and_state(){
        return cy.get(GENERAL_SETTING_SELECTOR.country_state_input_field)
    }
    
    get_zip_code(){
        return cy.get(GENERAL_SETTING_SELECTOR.zip_code_input_field)
    }
    
    enable_tax(){
        return cy.get(GENERAL_SETTING_SELECTOR.enable_tax_checkbox)
    }
}

export default new WooCommercePage();