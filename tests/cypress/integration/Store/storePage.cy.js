import { GetPluginId, getAppId } from '../wp-module-support/pluginID.cy';
import { comingSoon } from '../wp-module-support/utils.cy';

const pluginId = GetPluginId();
const appId = getAppId();
const customCommandTimeout = 30000;
const longWait = 60000;

describe( 'Store Page- WooCommerce is deactivated/uninstalled', () => {
	const cTBAndYithTrue = JSON.stringify( {
		canAccessAI: true,
		canAccessHelpCenter: true,
		canAccessGlobalCTB: true,
		hasEcomdash: false,
		hasYithExtended: true,
		isEcommerce: true,
		isJarvis: true,
	} );
	before( () => {
		cy.exec( `npx wp-env run cli wp plugin deactivate woocommerce`, {
			failOnNonZeroExit: false,
		} );
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
		cy.get( `.${ appId }-app-site-info`, { timeout: longWait } ).should(
			'exist'
		);
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

	it( 'Verify Visit your site and Launch your site functionality', () => {
		cy.exec(
			`npx wp-env run cli wp option set _transient_nfd_site_capabilities '${ cTBAndYithTrue }' --format=json`,
			{ timeout: customCommandTimeout }
		);
		cy.get( '.nfd-flex-none > .nfd-button--secondary', {
			timeout: customCommandTimeout,
		} )
			.invoke( 'removeAttr', 'target' )
			.click();
		cy.url().should( 'eq', Cypress.config().baseUrl + '/' );
		cy.go( 'back' );
		cy.get( '.nfd-flex-none > .nfd-button--upsell' ).click();
		cy.get('[data-testid="siteStatus"]').should('not.exist');
		cy.get( '.nfd-notification--success' ).should( 'exist' );
	} );
} );
