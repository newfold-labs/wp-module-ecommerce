/// <reference types="cypress" />
import * as dashboard from '../../pageAction/ecommerce.dashboard.action'

describe('As a customer, I want to ', function () {

	before(()=>{cy.fixture('dashboard').then((data)=>{this.data=data})})

	beforeEach(()=>{
		cy.visit("https://commerce-demo.store/wp-admin/admin.php?page=bluehost#/home/store/general")
	})

	// TODO: Status can be live or Coming soon. How to make sure its in not Coming Soon mode
	it('see the Site status in Comming Soon mode when store is not launched', ()=>{
		dashboard.verifySiteStatusEqualsTo("Coming Soon")
	})
    
	// TODO: Check how to get the full clear state so that it can test for banner
	it.skip('see the launch pad banner on top of the home page',()=>{
        dashboard.verifyLaunchPadBannerContains("Congrats on your new store! Let's get it ready to launch!")
	})

	it('see all 5 verticle tabs on Home Page',()=>{
        dashboard.verifyVerticleTabsHave(['General Settings','Add products','Customize your store','Advanced features','Site Status'])
	})

	it('see Store Info, Payments, Shipping and Tax info cards in General Setting tab',()=>{
        dashboard.verifyGeneralSettingTabHaveCard(['Store Info','Payments','Shipping','Tax Info'])
        dashboard.checkLinkTextIsPresentOnGeneralSettingCardsOnHover()
	})

	it('add my Store address from "General Setting" "Store Info" card', ()=>{
		dashboard.addStoreAddress()
        dashboard.verifyStoreInfoCardIsInDoneState()
        dashboard.verifyEnteredStoreAddressIsSameOnWooCommerceSetting()
	})

    it("link my existing payment method in General Setting",()=>{
        dashboard.linkExistingPaymentAccount()
        dashboard
	})
});
