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

Cypress.Commands.add( 'login', ( username, password ) => {
	cy.getCookies().then( ( cookies ) => {
		let hasMatch = false;
		cookies.forEach( ( cookie ) => {
			if ( cookie.name.substr( 0, 20 ) === 'wordpress_logged_in_' ) {
				hasMatch = true;
			}
		} );
		if ( ! hasMatch ) {
			cy.visit( '/wp-login.php' ).wait( 1000 );
			cy.get( '#user_login' ).type( username );
			cy.get( '#user_pass' ).type( `${ password }{enter}` );
		}
	} );
} );

Cypress.Commands.add( 'logout', () => {
	cy.getCookies().then( ( cookies ) => {
		cookies.forEach( ( cookie ) => {
			cy.clearCookie( cookie.name );
		} );
	} );
} );

Cypress.Commands.add( 'resetGeneralSettingTab', ( tableName ) => {
	cy.task(
		'queryDb',
		`DELETE FROM
  ${ tableName }
WHERE
  option_name IN (
    'nfd-ecommerce-captive-flow-paypal',
    'nfd-ecommerce-captive-flow-shippo',
    'woocommerce_onboarding_profile',
    'woocommerce_store_address',
    'woocommerce_store_address_2',
    'woocommerce_store_city',
    'woocommerce_store_postcode',
    'woocommerce_default_country',
    'wc_connect_taxes_enabled',
    'woocommerce_calc_taxes',
    'woocommerce_no_sales_tax'
  );`
	);
} );

Cypress.Commands.add( 'removeAllTax', () => {
	cy.visit( '/wp-admin/admin.php?page=wc-settings' );
	cy.contains( 'Enable tax rates and calculations' )
		.parent()
		.find( 'input' )
		.check();
	cy.get( 'button[type=submit]' ).click();
	cy.get( 'a.nav-tab' ).contains( 'Tax' ).click();
	cy.findByText( 'Standard rates' ).click();

	cy.get( 'tbody > tr' ).then( ( $tr ) => {
		if ( $tr.find( 'td' ).length >= 1 ) {
			$tr.find( 'td.country' ).each( () => {
				cy.get( 'td.compound>input' )
					.eq( 0 )
					.then( ( $element ) => {
						if ( $element.is( ':checked' ) )
							cy.wrap( $element ).uncheck();
						else cy.wrap( $element ).check();
					} );
				cy.get( 'a.button.minus.remove_tax_rates' ).click();
			} );
			cy.get( 'button[type=submit]' ).click();
		}
	} );
} );

Cypress.Commands.add( 'deleteAllProducts', () => {
	cy.get( 'div.wp-menu-name' ).contains( 'Products' ).click();
	deleteAllPage();
} );

Cypress.Commands.add( 'deleteAllPages', () => {
	cy.get( 'div.wp-menu-name' ).contains( 'Pages' ).click();
	deleteAllPage();
} );

function deleteAllPage() {
	try {
		cy.get( 'div.top span.total-pages' ).then( ( $element ) => {
			const count = parseInt( $element.text() );
			for ( let index = 0; index < count; index++ ) {
				deleteAllRow();
			}
		} );
	} catch ( error ) {
		deleteAllRow();
	}
}

function deleteAllRow() {
	cy.get( 'thead [type=checkbox]' ).check();
	cy.get( '.top div.bulkactions select' ).select( 'Move to Trash' );
	cy.get( '.top div.bulkactions input' ).click();
}
