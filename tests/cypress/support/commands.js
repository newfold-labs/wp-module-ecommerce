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
				if (cookie.name.substring(0, 20) === 'wordpress_logged_in_') {
					hasMatch = true;
				}
			});
			if (!hasMatch) {
				cy.visit('/wp-login.php').wait(1000);
				cy.get('#user_login').type(username);
				cy.get('#user_pass').type(`${password}{enter}`);
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

	/**
* @param {string} pluginName - The string
*                            Use deactivatePlugin('anyPluginName') from test to deactivate plugin
*/
	Cypress.Commands.add('deactivatePlugin', (pluginName) => {
		if (pluginName.toLowerCase() === 'all') {
			cy.exec('npx wp-env run cli wp plugin deactivate --all');
		} else {
			cy.exec(`npx wp-env run cli wp plugin deactivate ${pluginName}`);
		}
	});

	/**
	 * @param {string} pluginName - The string
	 *                            Use activatePlugin('All') from test to activate all plugins
	 *                            Use activatePlugin('anyPluginName') from test to activate plugin
	 */
	Cypress.Commands.add('activatePlugin', (pluginName) => {
		if (pluginName.toLowerCase() !== 'all') {
			cy.exec(`npx wp-env run cli wp plugin activate ${pluginName}`, {
				failOnNonZeroExit: false,
			});
		} else {
			cy.exec('npx wp-env run cli wp plugin activate --all', {
				failOnNonZeroExit: false,
			});
		}
	});
