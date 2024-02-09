import { GetPluginId, getAppId } from '../wp-module-support/pluginID.cy';
import { comingSoon } from '../wp-module-support/utils.cy';

const pluginId = GetPluginId();
const appId = getAppId();
const customCommandTimeout = 30000;

describe( 'Store Page- WooCommerce is deactivated/uninstalled', () => {
	before( () => {
		cy.exec( `npx wp-env run cli wp plugin deactivate woocommerce`, {
			failOnNonZeroExit: false,
		} );
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
		comingSoon( false );
	} );

	beforeEach( () => {
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/store' );
	} );

	it( 'Verify that Payments tab is not displayed', () => {
		cy.reload();
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
		cy.get( `.${ appId }-app-subnavitem-Payments` ).should( 'not.exist' );
	} );

	it( 'Verify Store page title and sub titles', () => {
		cy.get( '.nfd-app-section-header h2' ).should( 'exist' );
		cy.get( '.nfd-app-section-header' )
			.next()
			.as( 'storeFlex' )
			.should( 'exist' );
		cy.get( '@storeFlex' ).find( 'span' ).should( 'exist' );
	} );

	it( 'Verify Store and its sub tabs should have Install WooCommerce buttons', () => {
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
} );
