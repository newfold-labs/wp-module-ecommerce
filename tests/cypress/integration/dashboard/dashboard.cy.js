/// <reference types="cypress" />
import * as GeneralSetting from '../../pageAction/generalSetting.action'

describe('As a customer, I want to ', function () {

	before(()=>{cy.fixture('dashboard').then((data)=>{this.data=data})})

	beforeEach(()=>{
		cy.visit("https://commerce-demo.store/wp-admin/admin.php?page=bluehost#/home/store/general")
	})

	// TODO: Status can be live or Coming soon. How to make sure its in not Coming Soon mode
	it.skip('see the Site status in Comming Soon mode when store is not launched', ()=>{
		GeneralSetting.verifySiteStatusEqualsTo("Coming Soon")
	})
    
	// TODO: Check how to get the full clear state so that it can test for banner
	it.skip('see the launch pad banner on top of the home page',()=>{
        GeneralSetting.verifyLaunchPadBannerContains("Congrats on your new store! Let's get it ready to launch!")
	})

	it('see all 5 verticle tabs on Home Page',()=>{
        GeneralSetting.verifyVerticleTabsHave(['General Settings','Add products','Customize your store','Advanced features','Site Status'])
	})

	it('see Store Info, Payments, Shipping and Tax info cards in General Setting tab',()=>{
        GeneralSetting.verifyGeneralSettingTabHaveCard(['Store Info','Payments','Shipping','Tax Info'])
        GeneralSetting.checkLinkTextIsPresentOnGeneralSettingCardsOnHover()
	})

	it('add my Store address from "General Setting" "Store Info" card', ()=>{
		GeneralSetting.addStoreAddress()
        GeneralSetting.verifyStoreInfoCardIsInDoneState()
        GeneralSetting.verifyEnteredStoreAddressIsSameOnWooCommerceSetting()
	})

    it("link my existing payment method in General Setting",()=>{
        GeneralSetting.linkExistingPaymentAccount()
        GeneralSetting.verifyPaymentCardsInDoneSection()
	})

	it("link my existing shippo account in General Setting",()=>{
		GeneralSetting.linkExistingShippoAccount()
		GeneralSetting.verifyShippingCardIsInDoneState()
		GeneralSetting.verifyFilledShippingInformationSavedInYith()
	})

	it('configure "Yes, enable tax rates and calculations" from "General setting" "Tax Info" card', ()=>{
		GeneralSetting.selectTaxOption(0)
		GeneralSetting.verifyTaxInfoCardInDoneState()
		GeneralSetting.verifyTaxOptionIsEnableInWooCommerce()
		GeneralSetting.setStandardRate()
	})

	it("verify all general setting cards are in done state", ()=>{
		GeneralSetting.verifyAllCardAreInDoneState()
	})
});
