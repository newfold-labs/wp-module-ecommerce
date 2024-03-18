import { GetPluginId, getAppId } from '../wp-module-support/pluginID.cy';
import { installWoo } from '../wp-module-support/utils.cy';

const customCommandTimeout = 60000;
const mediumWait = 30000;
const pluginId = GetPluginId();
const appId = getAppId();

describe( 'Verify Wondercart accessibility as per site capabilities', () => {
	const cTBAndYithTrue = JSON.stringify( {
		"canAccessAI": true,
		"canAccessHelpCenter": true,
		"canAccessGlobalCTB": true,
		"hasEcomdash": false,
		"hasYithExtended": true,
		"isEcommerce": true,
		"isJarvis": true,
	} );

	const cTBTrueYithFalse = JSON.stringify( {
		"canAccessAI": true,
		"canAccessHelpCenter": true,
		"canAccessGlobalCTB": true,
		"hasEcomdash": false,
		"hasYithExtended": false,
		"isEcommerce": false,
		"isJarvis": true,
	} );

	before( function () {
		if ( pluginId !== 'bluehost' ) {
			this.skip();
		}
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/store' );
		installWoo();
	} );

	beforeEach( () => {
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
	} );

	after( () => {
		cy.exec(
			`npx wp-env run cli wp option delete _transient_nfd_site_capabilities`,
			{ failOnNonZeroExit: false }
		);
	} );

	it( 'Verify if Sales and Discounts sub tab is displayed', () => {
		cy.exec(
			`npx wp-env run cli wp option delete _transient_nfd_site_capabilities`,
			{ failOnNonZeroExit: false }
		);
		cy.exec(
			`npx wp-env run cli wp option set _transient_nfd_site_capabilities '${ cTBAndYithTrue }' --format=json`,
			{ timeout: customCommandTimeout }
		);
		cy.reload();
		cy.get( `.${ appId }-app-navitem-Store`, {
			timeout: mediumWait,
		} ).click();
		cy.get( `.${ appId }-app-subnavitem-Sales` ).should( 'exist' );
	} );

	it( 'Verify Buy Now is shown when canAccessGlobalCTB is true and commerce addon is false', () => {
		cy.exec(
			`npx wp-env run cli wp option delete _transient_nfd_site_capabilities`,
			{ failOnNonZeroExit: false }
		);
		cy.exec(
			`npx wp-env run cli wp option set _transient_nfd_site_capabilities '${ cTBTrueYithFalse }' --format=json`,
			{ timeout: customCommandTimeout }
		);
		cy.reload();
		cy.get( `.${ appId }-app-navitem-Store`, {
			timeout: customCommandTimeout,
		} ).click();
		cy.get( `.${ appId }-app-subnavitem-Sales` )
			.as( 'salesTab' )
			.should( 'exist' );
		cy.get( '@salesTab' ).click();
		cy.get( '.nfd-button--upsell', { timeout: mediumWait } ).should(
			'exist'
		);
	} );

	it('Verify clicking on Buy Now leads to cpanel login page', () => {
		cy.reload();
		cy.get( `.${ appId }-app-navitem-Store`, {
			timeout: customCommandTimeout,
		} ).should( 'exist' );
		cy.get( `.${ appId }-app-navitem-Store`, {
			timeout: customCommandTimeout,
		} ).click();
		cy.get( `.${ appId }-app-subnavitem-Sales` ).click();
		cy.get( '.nfd-button--upsell', { timeout: mediumWait } )
			.eq( 1 )
			.as( 'buyButton' );

		cy.get( '@buyButton' ).should( 'be.visible' );
		cy.get( '@buyButton' )
			.should( 'have.attr', 'href' )
			.and(
				'include',
				'https://my.bluehost.com/hosting/app?utm_source=wp-marketplace&utm_medium=brand-plugin&utm_campaign=wordpress-ad&utm_content=buynow#/marketplace/product'
			);
	} );

	it( 'Verify Install Now is shown when customer has ecommerce addon', () => {
		cy.exec(
			`npx wp-env run cli wp option delete _transient_nfd_site_capabilities`,
			{ failOnNonZeroExit: false }
		);
		cy.exec(
			`npx wp-env run cli wp option set _transient_nfd_site_capabilities '${ cTBAndYithTrue }' --format=json`,
			{ timeout: customCommandTimeout }
		);
		cy.reload();
		cy.get( `.${ appId }-app-navitem-Store`, {
			timeout: customCommandTimeout,
		} ).click();
		cy.get( `.${ appId }-app-subnavitem-Sales`, { timeout: mediumWait } )
			.as( 'salesTab' )
			.should( 'exist' );
		cy.get( '@salesTab' ).click();
		cy.get( '.nfd-button--upsell', { timeout: mediumWait } ).should(
			'exist'
		);
	} );

	it( 'Verify clicking Install Now successfully installs Wonder Cart plugin', () => {
		cy.get( `.${ appId }-app-navitem-Store`, {
			timeout: customCommandTimeout,
		} ).click();
		cy.get( `.${ appId }-app-subnavitem-Sales` ).click();
		cy.get( '.nfd-button--upsell', { timeout: mediumWait } )
			.eq( 0 )
			.scrollIntoView()
			.click();
		cy.get( '.nfd-notification--success', {
			timeout: customCommandTimeout,
		} ).should( 'exist' );
		cy.get( '#wonder-cart-init', { timeout: mediumWait } ).should(
			'exist'
		);
	} );
} );
