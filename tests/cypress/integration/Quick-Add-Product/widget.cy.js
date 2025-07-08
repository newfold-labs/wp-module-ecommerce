import {installWoo, wpLogin} from "../wp-module-support/utils.cy";
import {GetPluginId} from "../wp-module-support/pluginID.cy";

describe(
	'Quick Add Product Dashboard Widget',
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
			'Verify widget form is visible',
			() => {

				// Widget is visible in dashboard.
				cy.get('#nfd-quick-add-product-widget').as('widget').should('exist');

				// Widget contains form.
				cy.get('@widget').find('.nfd-quick-add-product__form').as('widgetForm').should('exist');
			}
		);
	}
);