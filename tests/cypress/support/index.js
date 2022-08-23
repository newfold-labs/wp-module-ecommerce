// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import 'cypress-axe';
import './commands';

Cypress.Cookies.defaults({
	preserve: /wp|wordpress/,
});

// before(() => {
// 	cy.login(Cypress.env('wpUsername'), Cypress.env('wpPassword'));
// });

import sqlServer from 'cypress-sql-server';
sqlServer.loadDBCommands();

before(() => {
	cy.sso_login(
		Cypress.env('domain_username'), Cypress.env('domain_password'), 
		Cypress.env('bluehost_username'), Cypress.env('bluehost_password'));
});