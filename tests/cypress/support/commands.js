// <reference types="Cypress" />

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', (username, password) => {
	cy
		.getCookies()
		.then(cookies => {
			let hasMatch = false;
			cookies.forEach((cookie) => {
				if (cookie.name.substr(0, 20) === 'wordpress_logged_in_') {
					hasMatch = true;
				}
			});
			if (!hasMatch) {
				cy.visit('/wp-login.php').wait(1000);
				cy.get('#user_login').type(username);
				cy.get('#user_pass').type(`${ password }{enter}`);
			}
		});
});

Cypress.Commands.add('sso_login', (domain_username, domain_password, bluehost_username, bluehost_password) => {
	cy
		.getCookies()
		.then(cookies => {
			let hasMatch = false;
			cookies.forEach((cookie) => {
				if (cookie.name.substring(0, 20) === 'wordpress_logged_in_') {
					hasMatch = true;
				}
			});
			if (!hasMatch) {
				cy.visit('/cgi-bin/cplogin').wait(1000);
				cy.get('#ldomain').type(domain_username);
				cy.get('#lpass').type(`${ domain_password }{enter}`);
				cy.get("input[name=admin_user]").type(bluehost_username)
				cy.get("input[name=admin_pass]").type(bluehost_password)
		        cy.get("[value=Login]").click()
				cy.get("[data-testid=login-wordpress]",{timeout:30000}).as('login-wordpress')
				cy.get("@login-wordpress").parent().invoke('removeAttr','target')
		        cy.get("@login-wordpress").click()
				cy.get('[data-testid=desktop-nav]',{timeout:30000})
			}
		});
});

Cypress.Commands.add('logout', () => {
	cy
		.getCookies()
		.then(
			cookies => {
				cookies.forEach(
					cookie => {
						cy.clearCookie(cookie.name);
					}
				)
			}
		);
});

Cypress.Commands.add('getText',(element_selector)=>{
	element_selector.then(($element)=>{
		return $element.text()
	})
})
