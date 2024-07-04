import { GetPluginId, getAppId } from '../wp-module-support/pluginID.cy';
import { wpLogin, uninstallPlugins } from '../wp-module-support/utils.cy';

const pluginId = GetPluginId();
const appId = getAppId();
const customCommandTimeout = 30000;

describe(
	'Store Page - WooCommerce is deactivated/uninstalled',
	{ testIsolation: true },
	() => {
		before( () => {
			wpLogin();
			// uninstallPlugins();
			cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/store' );
		} );

		it( 'Verify Store Page renders properly without Woo', () => {
			cy.reload();
			// Payments tab is not displayed
			cy.get( `.${ appId }-app-subnavitem-Payments` ).should(
				'not.exist'
			);

			// Title and description elements display
			cy.get( '[data-testid="nfd-nowoo-store-title"]' ).should( 'exist' );
			cy.get( '[data-testid="nfd-nowoo-store-description"]' ).should(
				'exist'
			);

			// Verify Store and its sub tabs should have Install WooCommerce buttons
			const storeNavElements = [
				`.${ appId }-app-navitem-Store`,
				`.${ appId }-app-subnavitem-Products`,
				`.${ appId }-app-subnavitem-Store`,
			];

			storeNavElements.forEach( ( ele ) => {
				cy.get( ele, { timeout: customCommandTimeout } ).click();
				cy.get( '.nfd-button--upsell', {
					timeout: customCommandTimeout,
				} ).should( 'exist' );
			} );
		} );
	}
);
