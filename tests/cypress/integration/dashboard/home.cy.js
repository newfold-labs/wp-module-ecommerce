/// <reference types="cypress" />

const { contains } = require("cypress/types/jquery");

describe('As a customer, I want to ', function () {
	beforeEach(()=>{
		cy.visit("https://commerce-demo.store/wp-admin/admin.php?page=bluehost#/home/store/general")
	})

	it('see the launch pad banner on top of the home page',()=>{

	})

	it('see the Site status in Comming Soon mode when store is not launched', ()=>{

	})

	it('see all 5 verticle tabs on Home Page',()=>{
		cy.get(".nfd-ecommerce-dashboard-menu>a>li").as("verticle-tabs")
		cy.get('@verticle-tabs').should('have.length',5)
		cy.get('@verticle-tabs').eq(1).should('have.text', 'General Settings')
		cy.get('@verticle-tabs').eq(2).should('have.text', 'Add products')
		cy.get('@verticle-tabs').eq(3).should('have.text', 'Customize your store')
		cy.get('@verticle-tabs').eq(4).should('have.text', 'Advanced features')
		cy.get('@verticle-tabs').eq(5).should('have.text', 'Site Status')
	})

	it('see Store Info, Payments, Shipping and Tax info cards in General Setting tab',()=>{})
	it('see all General Setting cards has link text on mouse hover',()=>{})
	it('add my Store address from "General Setting" "Store Info" card', ()=>{})
    it('see the Sore Info card in Done section after adding address', ()=>{})
	it('configure "do not charge sales tax" from "General setting" "Tax Info" card', ()=>{})
	it('see the all the completed card in done section of general setting tab', ()=>{})
	it('configure "auto calculate my taxes for me" from "General setting" "Tax Info" card', ()=>{})
	it('configure "I will Configure my own tax info later" from "General setting" "Tax Info" card', ()=>{})
	


	it('see "Add a product" and "Import Product" cards in Your Product tab',()=>{})
	it('add a product from "Your product" tabs', ()=>{})
	it('see card Add a Product, Manage Products, Categories, Tags after adding products', ()=>{})
	it('add multiple products from external file from "Your product" tabs', ()=>{})
	it('check the documentation of how to add products', ()=>{})

	it('see Home Page, About Page, Contact Page, Store Layout, Customer Account Page cards in Customize Your Store tab',()=>{})
	it('add a Home Page in my Store from "Customize Your Store" tab', ()=>{})
	it('add a About Page in my Store from "Customize Your Store" tab', ()=>{})
	it('add a Contact Page in my Store from "Customize Your Store" tab', ()=>{})
	it('select a layout for my Store from "Customize Your Store" tab', ()=>{})
	it('manage customer account page from "Customize Your Store" tab', ()=>{})

	it('see Advanced Feature tabs contains all free addons which included in ecommerce plan',()=>{})
	it('enable not installed plugin from " Advanced Feature" tab', ()=>{})
	it('see all the enabled plugin in "Already Installed" Section', ()=>{

	})

	it('launch my Store',()=>{})

	it('see the site status in Live mode after lauch of store',()=>{})

});
