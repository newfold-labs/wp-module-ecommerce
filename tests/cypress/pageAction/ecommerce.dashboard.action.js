/// <reference types="cypress" />

import HomePage from '../pageObject/homePage'
import WooCommercePage from '../pageObject/woocommercePage'

const data = require('../fixtures/dashboard.json');

export function check_bluehost_tabs_exists(){
    HomePage.bluehost_horizontal_tabs().should('have.length.greaterThan',0)
}

export function verifyLaunchPadBannerContains(bannerText){
    HomePage.get_hero_banner().should('have.text',bannerText)
}

export function verifySiteStatusEqualsTo(status_text){
    HomePage.get_site_status().then(($element)=>{
        cy.wrap($element.text()).should('have.text',status_text)
    })
}

export function verifyVerticleTabsHave(tab_list){
    HomePage.get_verticle_tabs().each(($element, index, $list)=>{
        cy.wrap($element).should('have.text', tab_list[index])
    })
}

export function verifyGeneralSettingTabHaveCard(cardList){
    HomePage.get_general_settings_cards().each(($element, index, $list)=>{
        cy.wrap($element).find('span').should('include.text',cardList[index])
    })
}
export function checkLinkTextIsPresentOnGeneralSettingCardsOnHover(){
    var link_text_list = ['Add Info','Setup','Setup','Add Info']
    HomePage.general_settings_cards_link_text().each(($el,index,$list)=>{
        cy.wrap($el).should('be.hidden').and('include.text',link_text_list[index])
    })
}
export function addStoreAddress(){
    HomePage.get_general_settings_uncompleted_cards().eq(0).click()
    HomePage.get_store_info_address_1_input_field().type(data.store_address.address1)
    HomePage.get_store_info_city_input_field().type(data.store_address.city)
    HomePage.get_store_info_postal_code_field().type(data.store_address.zipcode)
    HomePage.get_store_info_country_field().select(data.store_address.country)
    HomePage.get_store_info_state_select().select(data.store_address.state)
    // HomePage.store_info_continue_button().click()
}
export function verifyStoreInfoCardIsInDoneState(){
    HomePage.get_general_settings_completed_cards().eq(0).find('div').should('have.length',1)
	HomePage.get_store_info_address_1_input_field()
}
export function verifyEnteredStoreAddressIsSameOnWooCommerceSetting(){
    HomePage.get_general_settings_completed_cards().eq(0).click()
    WooCommercePage.get_address_line_1().should('have.value',data.store_address.address1)
    WooCommercePage.get_city().should('have.value',data.store_address.city)
    WooCommercePage.get_country_and_state().should(
        'have.text',`${this.data.store_address.country+ " — " +data.store_address.state}`
        )
    WooCommercePage.get_zip_code().should('have.value',data.store_address.zipcode)
}

export function linkExistingPaymentAccount(){
    HomePage.get_general_settings_uncompleted_cards().contains('Payments').click()
    HomePage.load_iframe()
    HomePage.get_paypal_title_input_field()
    
    if(data.existing_payment.environment=="sandbox"){
        HomePage.get_existing_paypal_radio_button_list().eq(1).click()
    }else{
        HomePage.get_existing_paypal_radio_button_list().eq(0).click()
    }
    if(((data.existing_payment.payment_action).toLowerCase()).includes("sale")){
        HomePage.get_existing_paypal_radio_button_list().eq(2).click()
    }else{
        HomePage.get_existing_paypal_radio_button_list().eq(3).click()
    }
    HomePage.get_existing_paypal_save_button().click()
}

export function verifyPaymentCardsInDoneSection(){
    HomePage.get_general_settings_completed_cards().should('include.text','Payments')
}
// export function xyz(){}
// export function xyz(){}
// export function xyz(){}
// export function xyz(){}
