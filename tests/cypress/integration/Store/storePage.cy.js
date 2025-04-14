import { GetPluginId, getAppId } from '../wp-module-support/pluginID.cy';
import { wpLogin } from '../wp-module-support/utils.cy';

const pluginId = GetPluginId();
const appId = getAppId();
const customCommandTimeout = 30000;

describe(
	'Store Page - WooCommerce is deactivated/uninstalled',
	{ testIsolation: true },
	() => {
		before( () => {
			wpLogin();
			cy.exec( `npx wp-env run cli wp plugin deactivate woocommerce`, {
				failOnNonZeroExit: false,
			} );
			cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/store' );
		} );

		it( 'Verify Store Page renders properly without Woo', () => {
			cy.reload();

			// Title and description elements display
			cy.get( '[data-testid="nfd-nowoo-store-title"]' ).should( 'exist' );
			cy.get( '[data-testid="nfd-nowoo-store-description"]' ).should(
				'exist'
			);
		} );
	}
);
