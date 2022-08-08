/// <reference types="cypress" />

describe('Home Page ', function () {

	before(() => {
		cy.visit('https://my.bluehost.com/cgi-bin/cplogin'); // use internal override
	// 	cy.injectAxe();
		cy.get('#ldomain').type("commerce-demo.store")
		cy.get('#lpass').type("Commerce_Testing!2#4")
		cy.get('button.btn_secondary').click()
		cy.get("[name=admin_user]").type("roshan.si")
		cy.get("[name=admin_pass]").type("Rks@4151")
		cy.get("[value=Login]").click()
		cy.wait(20000)
		cy.get("[data-testid=login-wordpress]").parent().invoke('removeAttr','target')
		cy.get("button[data-testid=login-wordpress]").click()
		cy.wait(30000)
		cy.get("[data-testid=desktop-nav] ul li:nth-of-type(2)").click()
		cy.visit("https://commerce-demo.store/wp-admin/admin.php?page=bluehost#/home/store/general")
	});

	it('Has vertical tab "General Setting"', ()=>{
		cy.get(".nfd-ecommerce-dashboard-menu>a:nth-of-type(1)>li").should('have.text', 'General Settings')
	})

	it('Has vertical tab "Add Products"', ()=>{
		cy.get(".nfd-ecommerce-dashboard-menu>a:nth-of-type(2)>li").should('have.text', 'Add products')
	})

	it('Has vertical tab "Customize Your Store"', ()=>{
		cy.get(".nfd-ecommerce-dashboard-menu>a:nth-of-type(3)>li").should('have.text', 'Customize your store')
	})

	it('Has vertical tab "Advanced Features"', ()=>{
		cy.get(".nfd-ecommerce-dashboard-menu>a:nth-of-type(4)>li").should('have.text', 'Advanced features')
	})

	it('Has vertical tab "Site Status"', ()=>{
		cy.get('#nfd-site-status-text')
		cy.get(".nfd-ecommerce-dashboard-menu>a:nth-of-type(5)>li").should('have.text', 'Site Status')
	})
});
