/// <reference types="cypress" />
///<reference types="cypress-iframe" />

import 'cypress-iframe'

const SELECTOR = {
    UNCOMPLETED_CARDS: ".nfd-ecommerce-standard-actions-container>button",
    COMPLETED_CARDS: ".nfd-ecommerce-minimal-tasks-container>button",
    OVERLAY_IFRAME: "div.components-modal__content>iframe",

    // Store Info Card Elements
    ADDRESS_LINE_1: "[name=woocommerce_store_address]",
    CITY: "[name=woocommerce_store_city]",
    ZIPCODE: "[name=woocommerce_store_postcode]",
    COUNTRY: "[name=country]",
    STATE: "[name=state]",
    STORE_CONTINUE_BUTTON: "button[type=submit]",

    // Payment Card
    PAYPAL_TITLE: "input.yith-plugin-fw-text-input",
    PAYPAL_RADIO_BUTTON_LIST: ".yith-plugin-fw-radio__row>label",
    PYAPAL_SAVE_BUTTON: "button#yith-bh-save-button",

    // Shippo card
    SHIPPO_ENV_RADIO_BUTTON_LIST: "div#yith_shippo_environment label",
    API: "input#yith_shippo_sandbox_token",
    SENDER_NAME: "input#yith-shippo-sender-info-name",
    COMPANY_NAME: "input#yith-shippo-sender-info-company",
    EMAIL: "input#yith-shippo-sender-info-email",
    USE_WC_ADDRESS_CHECKBOX: "input#yith-shippo-sender-use_wc_address",
    SHIPPO_SAVE_BUTTON: "button#yith-bh-save-button",

    // Tax Info Crad
    ENABLE_TAX_OPTIONS: "div.nfd-ecommerce-modal-options>div",
    TAX_CONTINUE_BUTTON: "div.nfd-ecommerce-modal-content>button",
}

class GeneralSettingPage{

    uncompletedCards(){
        return cy.get(SELECTOR.UNCOMPLETED_CARDS);
    }

    completedCards(){
        return cy.get(SELECTOR.COMPLETED_CARDS);
    }

    cardsLinkText(){
        return cy.get(SELECTOR.UNCOMPLETED_CARDS).find("span>span");
    }

    address1(){
        return cy.get(SELECTOR.ADDRESS_LINE_1);
    }

    city(){
        return cy.get(SELECTOR.CITY);
    }

    postalCode(){
        return cy.get(SELECTOR.ZIPCODE);
    }

    country(){
        return cy.get(SELECTOR.COUNTRY);
    }

    state(){
        return cy.get(SELECTOR.STATE);
    }

    storeInfoContinueButton(){
        return cy.get(SELECTOR.STORE_CONTINUE_BUTTON);
    }

    loadIframe(){
        return cy.frameLoaded(SELECTOR.OVERLAY_IFRAME)
    }

    paypalTitle(){
        return cy.iframe().find(SELECTOR.PAYPAL_TITLE)
    }

    paypalRadioButtonList(){
        return cy.iframe().find(SELECTOR.PAYPAL_RADIO_BUTTON_LIST)
    }

    paypalSaveButton(){
        return cy.iframe().find(SELECTOR.PYAPAL_SAVE_BUTTON)
    }

    shippingAPI(){
        return cy.iframe().find(SELECTOR.API)
    }

    senderName(){
        return cy.iframe().find(SELECTOR.SENDER_NAME)
    }

    companyName(){
        return cy.iframe().find(SELECTOR.COMPANY_NAME)
    }

    senderEmail(){
        return cy.iframe().find(SELECTOR.EMAIL)
    }

    useWooCommerceSavedStoreAddress(){
        return cy.iframe().find(SELECTOR.USE_WC_ADDRESS_CHECKBOX)
    }

    shippoSaveButton(){
        return cy.iframe().find(SELECTOR.SHIPPO_SAVE_BUTTON)
    }

    taxOptionList(){
        return cy.get(SELECTOR.ENABLE_TAX_OPTIONS)
    }

    taxContinueButton(){
        return cy.get(SELECTOR.TAX_CONTINUE_BUTTON)
    }
}

export default new GeneralSettingPage();