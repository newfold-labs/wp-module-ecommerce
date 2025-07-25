import {installWoo, wpLogin} from "../wp-module-support/utils.cy";
import {GetPluginId} from "../wp-module-support/pluginID.cy";

describe(
	'Quick Add Product Form',
	{ testIsolation: true },
	() => {
		before( function() {
			if ( GetPluginId() !== 'bluehost' ) {
				this.skip();
			}

			installWoo();
		} );

		beforeEach( () => {
			wpLogin();
			cy.visit('/wp-admin/index.php');
		} );

		it(
			'Verify form is fillable',
			() => {

				// Get form.
				cy.get('.nfd-quick-add-product__form form').as('form');

				// Button should be disabled first.
				cy.get('@form').find('.nfd-quick-add-product__form-submit button').should('be.disabled');

				// Fill required form field.
				cy.get('@form').find('#product-name').type('Test product');
				cy.get('@form').find('#product-price').type('10.00');

				// Button should be clickable.
				cy.get('@form').find('.nfd-quick-add-product__form-submit button').should('not.be.disabled');
			}
		);

		it(
			'Verify price field',
			() => {
				// Lorem ipsum 1,79.56.78. => 179.56
				cy.get('#product-price').type('Lorem ipsum 1,79.56.78.').should('have.value', '179.56');
			}
		);

		it(
			'Verify categories field',
			() => {

				cy.get('.nfd-quick-add-product__categories-field').as('categoryField').should('exist');

				// Validate add a new category.
				cy.get('@categoryField').find('input[type="text"]').type('Plorbinate').type('{enter}');
				// Check if tag is added.
				cy.get('@categoryField').find('.nfd-badge').contains('Plorbinate');
				// Check if input has correct value.
				cy.get('#product-categories').invoke('val').then( value => {
					const parsedValue = JSON.parse(value);

					expect( parsedValue[0].name ).to.eq('Plorbinate');
				});

				// Check remove added category.
				cy.get('@categoryField').find('.nfd-badge .nfd-tag-input__remove-tag').click();
				cy.get('@categoryField').find('.nfd-badge').should('not.exist');
				cy.get('#product-categories').should('have.value', '[]');


				// Check add suggested category. Try using default WC category Uncategorized.
				cy.get('@categoryField').find('input[type="text"]').type('Uncategorized');
				cy.get('@categoryField').find('.nfd-tag-input-suggestion').should('exist').click();
				// Check if tag is added.
				cy.get('@categoryField').find('.nfd-badge').contains('Uncategorized');
				// Check if input has correct value.
				cy.get('#product-categories').invoke('val').then( value => {
					const parsedValue = JSON.parse(value);

					expect( parsedValue[0].name ).to.eq('Uncategorized');
				});
			}
		)

		it(
			'Verify image field',
			() => {
				cy.get('.nfd-quick-add-product__image-uploader').click();

				// Get a media.
				cy.get('#menu-item-browse').click();
				cy.get('.media-frame-content .attachments').find('.attachment').first().click();
				cy.get('.media-button-select').click();

				// Check if preview is shown.
				cy.get('.nfd-quick-add-product__image-preview').should('exist');
				// Validate input value.
				cy.get('#product-image').invoke('val').then( value => {
					const parsedValue = JSON.parse(value);

					expect( parsedValue[0].hasOwnProperty('id') ).to.be.true;
					expect( parsedValue[0].hasOwnProperty('url') ).to.be.true;
				});

				// Reset media and show again uploader.
				cy.get('.nfd-quick-add-product__image-remove').should('exist').click();
				cy.get('.nfd-quick-add-product__image-uploader').should('exist');
				cy.get('#product-image').should('have.value', '[]');
			}
		);

		it(
			'Verify form submit',
			() => {

				cy.intercept('POST', '/wp-json/newfold-ecommerce/v1/product*').as('formSubmitRequest');

				cy.get('.nfd-quick-add-product__form form').as('form');

				// Fill required form field.
				cy.get('@form').find('#product-name').type('Test product');
				cy.get('@form').find('#product-price').type('10.00');

				// Submit form.
				cy.get('@form').submit();

				// Listen for submit request.
				cy.wait('@formSubmitRequest').then( request => {
					// Validate response code.
					expect( request?.response?.statusCode ).to.eq(201);
					// Validate body.
					expect( request?.response?.body?.name ).to.eq('Test product');
					expect( request?.response?.body?.regular_price ).to.eq('10.00');
				});

				// Response is visible.
				cy.get('#nfd-quick-add-product__response').as('formSubmitResponse').should('exist').contains('Test product');
			}
		)
	}
);