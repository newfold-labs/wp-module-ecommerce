import { GetPluginId } from '../wp-module-support/pluginID.cy';
import {
	wpLogin,
	installWoo,
	uninstallWoo,
} from '../wp-module-support/utils.cy';

const customCommandTimeout = 60000;
const mediumWait = 30000;
const pluginId = GetPluginId();

describe(
	'Verify Wondercart follows site capabilities',
	{ testIsolation: true },
	() => {
		const CTBAndYithTrue = JSON.stringify( {
			canAccessAI: true,
			canAccessHelpCenter: true,
			canAccessGlobalCTB: true,
			hasEcomdash: false,
			hasYithExtended: true,
			isEcommerce: true,
			isJarvis: true,
		} );

		const CTBTrueYithFalse = JSON.stringify( {
			canAccessAI: true,
			canAccessHelpCenter: true,
			canAccessGlobalCTB: true,
			hasEcomdash: false,
			hasYithExtended: false,
			isEcommerce: false,
			isJarvis: true,
		} );

		before( function () {
			if ( pluginId !== 'bluehost' ) {
				this.skip();
			}
			installWoo();
		} );

		after( () => {
			uninstallWoo();
		} );

		beforeEach( () => {
			wpLogin();
			cy.visit( '/wp-admin/admin.php?page=' + pluginId );
		} );

		it( 'Verify Buy Now is shown when canAccessGlobalCTB is true and commerce addon is false', () => {
			// Buy now button is displayed when capabilities are false.
			cy.log( 'Update capabilities transient: CTBTrueYithFalse' );
			cy.exec(
				`npx wp-env run cli wp option update _transient_nfd_site_capabilities '${ CTBTrueYithFalse }' --format=json`,
				{ timeout: customCommandTimeout }
			);
			cy.reload();
			cy.visit(
				'/wp-admin/admin.php?page=' +
					pluginId +
					'#/store/sales_discounts'
			);
			cy.get( '#buynow-wondercart', { timeout: mediumWait } ).as(
				'buyButton'
			);
			cy.get( '@buyButton' ).scrollIntoView().should( 'be.visible' );
			// Verify Buy now button has correct link
			cy.get( '@buyButton' )
				.should( 'have.attr', 'data-ctb-id' )
				.and( 'include', 'f95ccf1e-3028-4ea7-b2c2-847969348e8b' );
		} );

		it( 'Verify Sales and Discounts content and functionality', () => {
			// Install button is displayed when capabilities are true
			cy.log( 'Update capabilities transient: CTBAndYithTrue' );
			cy.exec(
				`npx wp-env run cli wp option update _transient_nfd_site_capabilities '${ CTBAndYithTrue }' --format=json`,
				{ timeout: customCommandTimeout }
			);
			cy.reload();
			cy.visit(
				'/wp-admin/admin.php?page=' +
					pluginId +
					'#/store/sales_discounts'
			);
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
			cy.reload();
			// display installed plugins for debugging
			// cy.exec( `npx wp-env run cli wp plugin list`, {
			// 	failOnNonZeroExit: false,
			// } ).then( ( result ) => {
			// 	cy.log( result.stdout );
			// 	expect( result.stdout ).to.contains( 'wonder-cart' );
			// } );
			// Verify wonder cart content displays
			cy.get( '#wonder-cart-init', {
				timeout: customCommandTimeout,
			} ).should( 'exist' );
		} );
	}
);
