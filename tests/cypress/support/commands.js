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
  cy.getCookies().then((cookies) => {
    let hasMatch = false;
    cookies.forEach((cookie) => {
      if (cookie.name.substr(0, 20) === 'wordpress_logged_in_') {
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
  cy.getCookies().then((cookies) => {
    cookies.forEach((cookie) => {
      cy.clearCookie(cookie.name);
    });
  });
});

/**
 * Use cy.removeAllStandardTax() to delete all configured standard taxes
 */
Cypress.Commands.add('removeAllStandardTax', () => {
  cy.visit('/wp-admin/admin.php?page=wc-settings');
  cy.contains('Enable tax rates and calculations')
    .parent()
    .find('input')
    .check();
  cy.get('button[type=submit]').click();
  cy.get('a.nav-tab').contains('Tax').click();
  cy.findByText('Standard rates').click();

  cy.get('tbody > tr').then(($tr) => {
    if ($tr.find('td').length >= 1) {
      $tr.find('td.country').each(() => {
        cy.get('td.compound>input')
          .eq(0)
          .then(($element) => {
            if ($element.is(':checked')) cy.wrap($element).uncheck();
            else cy.wrap($element).check();
          });
        cy.get('a.button.minus.remove_tax_rates').click();
      });
      cy.get('button[type=submit]').click();
    }
  });
});

/**
 * @param {string} pluginName - The string
 * Use deactivatePlugin('anyPluginName') from test to deactivate plugin
 */
Cypress.Commands.add('deactivatePlugin', (pluginName) => {
  cy.contains('Plugins').click();
  cy.get('[type=search]').type(pluginName);
  cy.wait(2000);
  cy.get('tbody>tr').then(($tr) => {
    if (
      $tr.find('td.plugin-title>strong').length > 0 &&
      $tr.find('td.plugin-title>strong').text() === pluginName
    ) {
      cy.get('span.deactivate>a').click();
    } else {
      throw new Error(pluginName, ' Plugin Does Not Exist');
    }
  });
});

/**
 * @param {string} pluginName - The string
 * Use activatePlugin('All') from test to activate all plugins
 * Use activatePlugin('anyPluginName') from test to activate plugin
 */
Cypress.Commands.add('activatePlugin', (pluginName) => {
  cy.contains('Plugins', { timeout: 2000 }).click();

  if (pluginName.toLowerCase() !== 'all') {
    cy.get('[type=search]').type(pluginName);
    cy.wait(2000);
    cy.get('tbody>tr').then(($tr) => {
      if ($tr.find('td.plugin-title>strong').length > 0) {
        cy.wrap($tr.find('td.plugin-title>strong')).should(
          'include.text',
          pluginName
        );
      } else {
        throw new Error(pluginName, ' Plugin Does Not Exist');
      }
    });
  }
  cy.get('thead>tr>td>input').check();
  cy.get('.top div>select').select('Activate');
  cy.get('.top [value=Apply]').click();
});

/**
 * Use cy.deleteAllProducts() to delete all commerce product
 */
Cypress.Commands.add('deleteAllProducts', () => {
  cy.get('div.wp-menu-name').contains('Products').click();
  deleteAllRowInPagination();
});

/**
 * Use cy.deleteAllProducts() to delete all commerce pages
 */
Cypress.Commands.add('deleteAllPages', () => {
  cy.get('div.wp-menu-name').contains('Pages').click();
  deleteAllRowInPagination();
});

function deleteAllRowInPagination() {
  try {
    cy.get('div.top span.total-pages').then(($element) => {
      const count = parseInt($element.text());
      for (let index = 0; index < count; index++) {
        deleteAllRow();
      }
    });
  } catch (error) {
    deleteAllRow();
  }
}

function deleteAllRow() {
  cy.get('thead [type=checkbox]').check();
  cy.get('.top div.bulkactions select').select('Move to Trash');
  cy.get('.top div.bulkactions input').click();
}

Cypress.Commands.add('resetGeneralSettingTabs', () => {
  [
    // 'nfd-ecommerce-captive-flow-paypal',
    // 'nfd-ecommerce-captive-flow-shippo',
    // 'woocommerce_onboarding_profile',
    // 'woocommerce_store_address',
    // 'woocommerce_store_address_2',
    // 'woocommerce_store_city',
    // 'woocommerce_store_postcode',
    // 'woocommerce_default_country',
    // 'wc_connect_taxes_enabled',
    'woocommerce_calc_taxes',
    'woocommerce_no_sales_tax',
  ].forEach((optionName) => {
    cy.exec(`wp option delete ${optionName}`);
  });
});
