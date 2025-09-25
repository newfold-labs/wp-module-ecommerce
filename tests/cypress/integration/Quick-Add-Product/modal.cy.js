import {installWoo, setSolution, wpLogin, clearSolutionTransient} from "../wp-module-support/utils.cy";
import {GetPluginId} from "../wp-module-support/pluginID.cy";

describe(
	'Quick Add Product Modal',
	{ testIsolation: true },
	() => {
		before( function() {
			if ( GetPluginId() !== 'bluehost' ) {
				this.skip();
			}

			installWoo();
		} );

		after( () => {
			// clear solution transient
			clearSolutionTransient();
		} );

		beforeEach( () => {
			wpLogin();
			cy.visit('/wp-admin/edit.php?post_type=product');

			setSolution('creator');
		} );

		it(
			'Verify modal product type select is visible',
			() => {

				// Check modal trigger is visible.
				cy.get('.nfd-quick-add-product-modal-trigger')
					.should('exist')
					.find('button')
					.click();

				// Modal is open and type select is visible.
				cy.get('#nfd-quick-add-product__type-select').as('typeSelect').should('exist');

				// Modal contains product types list.
				cy.get('@typeSelect').find('.nfd-quick-add-product__types').should('exist');
			}
		)

		it(
			'Verify modal product premium types are visible',
			() => {

				// Open modal
				cy.get('.nfd-quick-add-product-modal-trigger')
					.find('button')
					.click();

				// Modal is open and type select is visible.
				cy.get('#nfd-quick-add-product__type-select').as('typeSelect').should('exist');

				// Type booking and subscription exists and have locked class.
				cy.get('@typeSelect').find('.nfd-quick-add-product__type.type-booking')
					.should('exist')
					.should('have.class', 'locked');

				cy.get('@typeSelect').find('.nfd-quick-add-product__type.type-subscription')
					.should('exist')
					.should('have.class', 'locked');
			}
		)

		it(
			'Verify product preview',
			() => {

				cy.get('.nfd-quick-add-product-modal-trigger')
					.should('exist')
					.find('button')
					.click();

				cy.get('#nfd-quick-add-product__type-select .nfd-quick-add-product__types-action a').click();

				cy.get('.nfd-quick-add-product-modal').as('modalForm');

				// Fill form field.
				cy.get('@modalForm').find('#product-name').type('Test product');
				cy.get('@modalForm').find('#product-price').type('10.00');
				cy.get('@modalForm').find('#product-description').type('Lorem ipsum dolor sit amet');

				// Check if preview is updated properly.
				cy.get('@modalForm').find('.nfd-quick-add-product__form-preview-product-title').contains( 'Test product' );
				cy.get('@modalForm').find('.nfd-quick-add-product__form-preview-product-price').contains( '$10.00' );
				cy.get('@modalForm').find('.nfd-quick-add-product__form-preview-product-description').contains('Lorem ipsum dolor sit amet');
			}
		)
	}
);