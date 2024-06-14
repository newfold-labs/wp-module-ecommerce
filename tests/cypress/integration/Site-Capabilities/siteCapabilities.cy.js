import { GetPluginId, getAppId } from '../wp-module-support/pluginID.cy';
import { installWoo } from '../wp-module-support/utils.cy';

const customCommandTimeout = 60000;
const mediumWait = 30000;
const pluginId = GetPluginId();
const appId = getAppId();

describe( 'Verify Wondercart accessibility as per site capabilities', () => {
	const cTBAndYithTrue = JSON.stringify( {
		canAccessAI: true,
		canAccessHelpCenter: true,
		canAccessGlobalCTB: true,
		hasEcomdash: false,
		hasYithExtended: true,
		isEcommerce: true,
		isJarvis: true,
	} );

	const cTBTrueYithFalse = JSON.stringify( {
		canAccessAI: true,
		canAccessHelpCenter: true,
		canAccessGlobalCTB: true,
		hasEcomdash: false,
		hasYithExtended: false,
		isEcommerce: false,
		isJarvis: true,
	} );

	before( () => {
		if ( pluginId !== 'bluehost' ) {
			this.skip();
		}
		installWoo();
	} );

	after( () => {
		cy.exec(
			`npx wp-env run cli wp transient delete nfd_site_capabilities`,
			{ failOnNonZeroExit: false }
		);
	} );

	it( 'Verify Sales and Discounts sub tab content and functionality', () => {
		cy.exec(
			`npx wp-env run cli wp transient delete nfd_site_capabilities && npx wp-env run cli wp option set _transient_nfd_site_capabilities '${ cTBAndYithTrue }' --format=json`,
			{ timeout: customCommandTimeout }
		);
		cy.reload();
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/store' );

		// Verify Install Now exists when customer has ecommerce addon
		cy.get( `.${ appId }-app-subnavitem-Sales`, {
			timeout: mediumWait,
		} )
			.as( 'salesTab' )
			.should( 'exist' );
		cy.get( '@salesTab' ).click();
		cy.get( '#installnow-wondercart', { timeout: mediumWait } ).should(
			'exist'
		);

		// Verify clicking Install Now successfully installs Wonder Cart plugin
		cy.get( '#installnow-wondercart', { timeout: mediumWait } )
			.scrollIntoView()
			.click();
		cy.get( '.nfd-notification--success', {
			timeout: customCommandTimeout,
		} ).should( 'exist' );
		cy.get( '#wonder-cart-init', { timeout: mediumWait } ).should(
			'exist'
		);
	} );

	it( 'Verify Buy Now is shown when canAccessGlobalCTB is true and commerce addon is false', () => {
		cy.exec(
			`npx wp-env run cli wp transient delete nfd_site_capabilities && npx wp-env run cli wp option set _transient_nfd_site_capabilities '${ cTBTrueYithFalse }' --format=json && npx wp-env run cli wp plugin deactivate wonder-cart yith-paypal-payments-for-woocommerce-extended yith-stripe-payments-for-woocommerce-extended`,
			{ timeout: customCommandTimeout }
		);
		cy.reload();
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/store' );
		cy.get( `.${ appId }-app-subnavitem-Sales` )
			.as( 'salesTab' )
			.should( 'exist' );
		cy.get( '@salesTab' ).click();
		cy.get( '#buynow-wondercart', { timeout: mediumWait } ).as(
			'buyButton'
		);
		cy.get( '@buyButton' ).scrollIntoView().should( 'be.visible' );
		// Verify Buy now button has correct link
		cy.get( '@buyButton' )
			.should( 'have.attr', 'href' )
			.and(
				'include',
				'https://my.bluehost.com/hosting/app?utm_source=wp-marketplace&utm_medium=brand-plugin&utm_campaign=wordpress-ad&utm_content=buynow#/marketplace/product'
			);
	} );
} );
