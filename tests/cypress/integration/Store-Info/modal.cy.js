import {installWoo, wpLogin} from "../wp-module-support/utils.cy";
import {GetPluginId} from "../wp-module-support/pluginID.cy";

describe(
	'Store info modal',
	{ testIsolation: true },
	() => {
		before( function() {
			if ( GetPluginId() !== 'bluehost' ) {
				this.skip();
			}

			installWoo();
		} );

		beforeEach(() => {
			wpLogin();
			cy.visit('/wp-admin/admin.php?page=bluehost');

			// Create button to trigger modal open.
			cy.document().then(doc => {
				const button = doc.createElement('button');
				button.id = 'store-info-trigger';
				button.textContent = 'Open modal';
				button.setAttribute('data-store-info-trigger', 'yes');

				doc.body.appendChild(button);
			});
		});

		it(
			'Test modal opens correctly and contains form',
			() => {

				// Check if wrapper exists.
				cy.get('#nfd-store-info-modal-wrapper').should('exist');

				// Trigger modal open by clicking the button.
				cy.get('#store-info-trigger').click({ force: true });

				// Modal is open.
				cy.get('.nfd-store-info__modal').as('modalForm').should('exist').should('be.visible');

				// Modal contains form.
				cy.get('@modalForm').find('.nfd-store-info__form').should('exist');
			}
		)

		it(
			'Verify country/state select change accordingly',
			() => {

				// Trigger modal open by clicking the button.
				cy.get('#store-info-trigger').click({ force: true });

				cy.get('.nfd-store-info__form form').as('form');

				// Open country select and select Italy (US is the default value).
				cy.get('@form').find('button[data-id="store-country"]').then( (el) => {
					let refID = el.attr('id');

					el.trigger('click');

					cy.get('@form').find('.nfd-select__options[aria-labelledby="'+ refID +'"]').as('countrySelect').should('exist').should('be.visible');
					cy.get('@countrySelect').contains('li', 'Italy').click();

					// Country select should be closed.
					cy.get('@countrySelect').should('not.exist');

					cy.wrap(el).contains('span', 'Italy');
				})

				// State must be a select itself. Check if options listed are correct
				cy.get('@form').find('button[data-id="store-state"]').should('exist').then( (el) => {
					let refID = el.attr('id');

					el.trigger('click');

					cy.get('@form').find('.nfd-select__options[aria-labelledby="'+ refID +'"]').as('stateSelect').should('exist').should('be.visible');
					cy.get('@stateSelect').contains('li', 'Roma').click();

					// Country select should be closed.
					cy.get('@stateSelect').should('not.exist');

					cy.wrap(el).contains('span', 'Roma');
				})
			}
		)

		it(
			'On country without a state select, verify state is a text input',
			() => {

				// Trigger modal open by clicking the button.
				cy.get('#store-info-trigger').click({ force: true });

				cy.get('.nfd-store-info__form form').as('form');

				// Open country select and select Belgium as doesn't have a state select linked.
				cy.get('@form').find('button[data-id="store-country"]').then( (el) => {
					let refID = el.attr('id');

					el.trigger('click');

					cy.get('@form').find('.nfd-select__options[aria-labelledby="'+ refID +'"]').as('countrySelect').should('exist').should('be.visible');
					cy.get('@countrySelect').contains('li', 'Belgium').click();

					// Country select should be closed.
					cy.get('@countrySelect').should('not.exist');

					cy.wrap(el).contains('span', 'Belgium');
				})

				// State must be an input text with empty value.
				cy.get('@form').find('input#store-state').should('have.attr', 'type', 'text').should('have.value', '');
			}
		)

		it(
			'Verify form submit',
			() => {

				cy.intercept('POST', '/wp-json/newfold-ecommerce/v1/store-info*').as('formSubmitRequest');

				// Trigger modal open by clicking the button.
				cy.get('#store-info-trigger').should('exist').click({ force: true });

				cy.get('.nfd-store-info__form form').as('form');

				// Fill required form field.
				cy.get('@form').find('#store-address').type('Main Street 1');
				cy.get('@form').find('#store-city').type('New York');
				cy.get('@form').find('#store-postcode').type('AB1234');

				cy.get('@form').find('button[data-id="store-country"]').then( (el) => {
					let refID = el.attr('id');

					el.trigger('click');

					cy.get('@form').find('.nfd-select__options[aria-labelledby="'+ refID +'"]').contains('li', 'United States (US)').click();
				});

				cy.get('@form').find('button[data-id="store-state"]').then( (el) => {
					let refID = el.attr('id');

					el.trigger('click');

					cy.get('@form').find('.nfd-select__options[aria-labelledby="'+ refID +'"]').contains('li', 'New York').click();
				})

				cy.get('@form').find('button[data-id="store-industry"]').then( (el) => {
					let refID = el.attr('id');

					el.trigger('click');

					cy.get('@form').find('.nfd-select__options[aria-labelledby="'+ refID +'"]').contains('li', 'Electronics and computers').click();
				})

				// Submit form.
				cy.get('@form').submit();

				// Listen for submit request.
				cy.wait('@formSubmitRequest').then( request => {
					// Validate response code.
					expect( request?.response?.statusCode ).to.eq(200);
				});

				// Modal is close.
				cy.get('.nfd-store-info__modal').should('not.exist');
			}
		)
	}
);