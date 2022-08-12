/// <reference types="cypress" />

describe('As a customer, I want to ', function () {

	before(()=>{cy.fixture('dashboard').then((data)=>{this.data=data})})
	beforeEach(()=>{
		cy.visit("https://commerce-demo.store/wp-admin/admin.php?page=bluehost#/home/store/general")
		cy.get("[data-testid=desktop-nav]",{timeout:20000})
	})

	// it('see the launch pad banner on top of the home page',()=>{
	// 	cy.get("div.nfd-ecommerce-banner").find("h1")
	// 	.should('have.text',"Congrats on your new store! Let's get it ready to launch!")
	// })

	// it('see the Site status in Comming Soon mode when store is not launched', ()=>{
	// 	cy.get("#nfd-site-status-text").should('have.text',"Coming Soon")
	// })

	// it('see all 5 verticle tabs on Home Page',()=>{
	// 	cy.get(".nfd-ecommerce-dashboard-menu>a>li").as("verticle-tabs")
	// 	cy.get('@verticle-tabs').should('have.length',5)
	// 	cy.get('@verticle-tabs').eq(0).should('have.text', 'General Settings')
	// 	cy.get('@verticle-tabs').eq(1).should('have.text', 'Add products')
	// 	cy.get('@verticle-tabs').eq(2).should('have.text', 'Customize your store')
	// 	cy.get('@verticle-tabs').eq(3).should('have.text', 'Advanced features')
	// 	cy.get('@verticle-tabs').eq(4).should('have.text', 'Site Status')
	// })

	// it('see Store Info, Payments, Shipping and Tax info cards in General Setting tab',()=>{
	// 	cy.get(".nfd-ecommerce-standard-actions-container>button").as('general_setting_cards')
	// 	cy.get('@general_setting_cards').should('have.length',4)
	// 	cy.get('@general_setting_cards').eq(0).find('span').should('include.text','Store Info')
	// 	cy.get('@general_setting_cards').eq(1).find("span").should('include.text','Payments')
	// 	cy.get('@general_setting_cards').eq(2).find("span").should('include.text',"Shipping")
	// 	cy.get('@general_setting_cards').eq(3).find("span").should('include.text',"Tax Info")
	// })

	// // TODO: check for maouse hover in cypress
	// it.skip('see all General Setting cards has link text on mouse hover',()=>{})

	// it('add my Store address from "General Setting" "Store Info" card', ()=>{
	// 	cy.get(".nfd-ecommerce-standard-actions-container>button").eq(0).click()
	// 	cy.get("[name=woocommerce_store_address]").type(this.data.store_address.address1)
	// 	cy.get("[name=woocommerce_store_city]").type(this.data.store_address.city)
	// 	cy.get("[name=woocommerce_store_postcode]").type(this.data.store_address.zipcode)
	// 	cy.get("[name=country]").select(this.data.store_address.country)
	// 	cy.get("[name=state]").select(this.data.store_address.state)
	// 	cy.get("button.nfd-ecommerce-atoms").click()
	// })

    // it('see the Sore Info card in Done section after adding address', ()=>{
	// 	cy.get(".nfd-ecommerce-minimal-tasks-container>button").as("completed_card_section")
	// 	cy.get("@completed_card_section").eq(0).find("div").should('have.length',1)
	// 	cy.get("@completed_card_section").eq(0).find("span").should('include.text','Store Info')
	// })

	// //TODO: Fetch fixture data and match here
	it('check store addrees and woocommerce address fields are same after completing store info card',()=>{
		cy.get(".nfd-ecommerce-minimal-tasks-container>button").as("completed_card_section")
		cy.get("@completed_card_section").eq(0).click()
		cy.get("#woocommerce_store_address").should('have.value',this.data.store_address.address1)
		cy.get("#woocommerce_store_city").should('have.value',this.data.store_address.city)
		cy.get("[name=woocommerce_default_country] option:selected").should(
			'have.text',`${this.data.store_address.country+ " — " +this.data.store_address.state}`
			)
		cy.get("#woocommerce_store_postcode").should('have.value',this.data.store_address.zipcode)
	})

	// it("add link my existing payment method from General Setting",()=>{})
	// it("add create new payment account and link to General Setting",()=>{})
	// it("add link my existing shippo account in General Setting",()=>{})
	// it("add create new shippo account and link in General Setting",()=>{})

	// it('configure "do not charge sales tax" from "General setting" "Tax Info" card', ()=>{
	// 	cy.get('@general_setting_cards').find("button .nfd-ecommerce-card-title").contains("Tax Info").click()
	// 	cy.get("div.nfd-ecommerce-modal-options>div").eq(3).click()
	// })

	// it('see the all the completed card in done section of general setting tab', ()=>{})
	// it('configure "auto calculate my taxes for me" from "General setting" "Tax Info" card', ()=>{})
	// it('configure "I will Configure my own tax info later" from "General setting" "Tax Info" card', ()=>{})
	


	// it('see "Add a product" and "Import Product" cards in Your Product tab',()=>{})
	// it('add a product from "Your product" tabs', ()=>{})

	// it('see card Add a Product, Manage Products, Categories, Tags after adding products', ()=>{
	// 	cy.get("div.nfd-ecommerce-minimal-tasks-container").eq(1).as("product_cards")
	// 	cy.get('@product_cards').find('button').should('have.length',4)
	// 	cy.get('@product_cards').eq(1).find("span.nfd-ecommerce-card-title").should('have.text','Add a product')
	// 	cy.get('@product_cards').eq(2).find("span.nfd-ecommerce-card-title").should('have.text','Manage products')
	// 	cy.get('@product_cards').eq(3).find("span.nfd-ecommerce-card-title").should('have.text','Categories')
	// 	cy.get('@product_cards').eq(4).find("span.nfd-ecommerce-card-title").should('have.text','Tags')
	// })

	// it('add multiple products from external file from "Your product" tabs', ()=>{})

	// it('check the documentation of how to add products', ()=>{
	// 	cy.get("div.nfd-ecommerce-minimal-tasks-container").eq(2).find('span.nfd-ecommerce-card-title').
	// 	should('have.text',"How to add products")
	// })

	// it('see Home Page, About Page, Contact Page, Store Layout, Customer Account Page cards in Customize Your Store tab',()=>{
	// 	cy.get("nfd-ecommerce-standard-actions-container").as('customize_your_store_cards')
	// 	cy.get("@customize_your_store_cards").find('button').should('have.length',5)
	// 	cy.get("@customize_your_store_cards").find('button').eq(1).should('have.text',"Home Page")
	// 	cy.get("@customize_your_store_cards").find('button').eq(2).should('have.text',"About Page")
	// 	cy.get("@customize_your_store_cards").find('button').eq(3).should('have.text',"Contact Page")
	// 	cy.get("@customize_your_store_cards").find('button').eq(4).should('have.text',"Store Layout")
	// 	cy.get("@customize_your_store_cards").find('button').eq(5).should('have.text',"Customer Account Page")

	// })
	// it('add a Home Page in my Store from "Customize Your Store" tab', ()=>{})
	// it('add a About Page in my Store from "Customize Your Store" tab', ()=>{})
	// it('add a Contact Page in my Store from "Customize Your Store" tab', ()=>{})
	// it('select a layout for my Store from "Customize Your Store" tab', ()=>{})
	// it('manage customer account page from "Customize Your Store" tab', ()=>{})

	// it('see Advanced Feature tabs contains all free addons which included in ecommerce plan',()=>{})
	// it('enable not installed plugin from " Advanced Feature" tab', ()=>{})
	// it('see all the enabled plugin in "Already Installed" Section', ()=>{})

	// it('launch my Store',()=>{})

	// it('see the site status in Live mode after lauch of store',()=>{})

});
