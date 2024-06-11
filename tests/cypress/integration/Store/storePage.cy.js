import { GetPluginId, getAppId } from '../wp-module-support/pluginID.cy';
import { comingSoon } from '../wp-module-support/utils.cy';

const pluginId = GetPluginId();
const appId = getAppId();
const customCommandTimeout = 30000;

describe(
	'Store Page - WooCommerce is deactivated/uninstalled',
	{ testIsolation: true },
	() => {
		it( 'Verify Store Page renders properly without Woo', () => {
			cy.exec( `npx wp-env run cli wp plugin deactivate woocommerce`, {
				failOnNonZeroExit: false,
			} );
			comingSoon( false );
			cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/store' );

			// Payments tab is not displayed
			cy.get( `.${ appId }-app-navitem-Store`, {
				timeout: customCommandTimeout,
			} )
				.next()
				.find( '.nfd-m-0' )
				.each( ( item, index, list ) => {
					expect( list ).to.have.length( 2 );
				} );
			cy.get( `.${ appId }-app-subnavitem-Products` ).should( 'exist' );
			cy.get( `.${ appId }-app-subnavitem-Store` ).should( 'exist' );
			cy.get( `.${ appId }-app-subnavitem-Payments` ).should(
				'not.exist'
			);

			// Title and desctription elements display
			// cy.get( '[data-testid="nfd-nowoo-store-title"]' ).should( 'exist' );
			// cy.get( '[data-testid="nfd-nowoo-store-description"]' ).should(
			// 	'exist'
			// );
			cy.get( '.nfd-app-section-header h2' ).should( 'exist' );
			cy.get( '.nfd-app-section-header' )
				.next()
				.as( 'storeFlex' )
				.should( 'exist' );
			cy.get( '@storeFlex' ).find( 'span' ).should( 'exist' );

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
