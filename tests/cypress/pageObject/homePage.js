/// <reference types="cypress" />
///<reference types="cypress-iframe" />

import 'cypress-iframe'

const SELECTOR = {
    bluehost_horizontal_tabs: "[data-testid=desktop-nav]",
    hero_banner: "div.nfd-ecommerce-banner",
    site_status: "#nfd-site-status-text",
    verticle_tabs: ".nfd-ecommerce-dashboard-menu>a>li",
    general_settings_uncompleted_cards_button: ".nfd-ecommerce-standard-actions-container>button",
    general_settings_completed_cards_button: ".nfd-ecommerce-minimal-tasks-container>button",
    cards_iframe: "div.components-modal__content>iframe",

    // Store Info Card Elements
    store_info_address_line_1_input: "[name=woocommerce_store_address]",
    store_info_city_input: "[name=woocommerce_store_city]",
    store_info_zipcode_input: "[name=woocommerce_store_postcode]",
    store_info_country_input: "[name=country]",
    store_info_state_input: "[name=state]",

    // Payment Card
    existing_paypal_title: "input.yith-plugin-fw-text-input",
    existing_paypal_radio_button_list: ".yith-plugin-fw-radio__row>label",
    existing_paypal_save_button: "button#yith-bh-save-button",

    // Shippo card
    shippo_radio_button_list: "div#yith_shippo_environment label",
    shippo_api_input_field: "input#yith_shippo_sandbox_token",
    shippo_sender_name_input: "input#yith-shippo-sender-info-name",
    shippo_sender_company_input: "input#yith-shippo-sender-info-company",
    shippo_sender_email_input: "input#yith-shippo-sender-info-email",
    wooCommerce_saved_address_checkbox: "input#yith-shippo-sender-use_wc_address",
    shippo_save_button: "button#yith-bh-save-button",
}

class HomePage{

    bluehost_horizontal_tabs(){
        return cy.get(SELECTOR.bluehost_horizontal_tabs,{timeout:20000});
    }

    get_hero_banner(){
        return cy.get(SELECTOR.hero_banner).find('h1');
    }

    get_site_status(){
        return cy.get(SELECTOR.site_status);
    }

    get_verticle_tabs(){
        return cy.get(SELECTOR.verticle_tabs);
    }

    get_general_settings_uncompleted_cards(){
        return cy.get(SELECTOR.general_settings_uncompleted_cards_button);
    }

    get_general_settings_completed_cards(){
        return cy.get(SELECTOR.general_settings_completed_cards_button);
    }

    general_settings_cards_link_text(){
        return cy.get(SELECTOR.general_settings_uncompleted_cards_button).find("span>span");
    }

    get_store_info_address_1_input_field(){
        return cy.get(SELECTOR.store_info_address_line_1_input);
    }

    get_store_info_city_input_field(){
        return cy.get(SELECTOR.store_info_city_input);
    }

    get_store_info_postal_code_field(){
        return cy.get(SELECTOR.store_info_zipcode_input);
    }

    get_store_info_country_field(){
        return cy.get(SELECTOR.store_info_country_input);
    }

    get_store_info_state_select(){
        return cy.get(SELECTOR.store_info_state_input);
    }

    store_info_continue_button(){
        return cy.get(SELECTOR.store_info_continue_button);
    }

    load_iframe(){
        return cy.frameLoaded(SELECTOR.cards_iframe)
    }

    get_paypal_title_input_field(){
        return cy.iframe().find(SELECTOR.existing_paypal_title)
    }

    get_existing_paypal_radio_button_list(){
        return cy.iframe().find(SELECTOR.existing_paypal_radio_button_list)
    }

    get_existing_paypal_save_button(){
        return cy.iframe().find(SELECTOR.existing_paypal_save_button)
    }

    get_shippo_api_input_field(){
        return cy.iframe().find(SELECTOR.shippo_api_input_field)
    }

    get_shippo_sender_name_input_field(){
        return cy.iframe().find(SELECTOR.shippo_sender_name_input)
    }

    get_shippo_sender_company_name_input_field(){
        return cy.iframe().find(SELECTOR.shippo_sender_company_input)
    }

    get_shippo_sender_email_input_fieldz(){
        return cy.iframe().find(SELECTOR.shippo_sender_email_input)
    }

    get_WooCommerce_Store_Address_checkbox(){
        return cy.iframe().find(SELECTOR.wooCommerce_saved_address_checkbox)
    }

    get_shippo_save_button(){
        return cy.iframe().find(SELECTOR.shippo_save_button)
    }
}

export default new HomePage();