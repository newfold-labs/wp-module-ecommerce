const SELECTOR = {
    SELECTED_ENV: "input[type=radio][checked=checked]",
    API: "#yith_shippo_sandbox_token",
    SHIPPO_SETTING_TAB: "ul.yith-plugin-fw-tabs>li",
    SENDER_NAME: "#yith-shippo-sender-info-name",
    COMPNAY_NAME: "#yith-shippo-sender-info-company",
    EMAIL: "#yith-shippo-sender-info-email",
}

class YithShippoPage{
    selectedShippoEnv(){
        return cy.get(SELECTOR.SELECTED_ENV)
    }

    shippoAPI(){
        return cy.get(SELECTOR.API)
    }

    shippoShippingTab(){
        return cy.get(SELECTOR.SHIPPO_SETTING_TAB)
    }

    senderName(){
        return cy.get(SELECTOR.SENDER_NAME)
    }

    compnayName(){
        return cy.get(SELECTOR.COMPNAY_NAME)
    }

    email(){
        return cy.get(SELECTOR.EMAIL)
    }
}

export default new YithShippoPage()