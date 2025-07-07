import {installWoo, wpLogin} from "../wp-module-support/utils.cy";
import {GetPluginId} from "../wp-module-support/pluginID.cy";

describe(
	'Quick Add Product Modal',
	{ testIsolation: true },
	() => {
		before( () => {
			if ( GetPluginId() !== 'bluehost' ) {
				this.skip();
			}

			installWoo();
		} );

		beforeEach( () => {
			wpLogin();
			cy.visit('/wp-admin/edit.php?post_type=product');
		} );

		it(
			'Verify modal form is visible',
			() => {

				// Check modal trigger is visible.
				cy.get('#nfd-quick-add-product-modal')
					.should('exist')
					.find('button')
					.click();

				// Modal is open.
				cy.get('.nfd-quick-add-product-modal').as('modalForm').should('exist');

				// Modal contains form.
				cy.get('@modalForm').find('.nfd-quick-add-product__form').should('exist');
			}
		)

		it(
			'Verify product preview',
			() => {

				cy.get('#nfd-quick-add-product-modal')
					.should('exist')
					.find('button')
					.click();

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