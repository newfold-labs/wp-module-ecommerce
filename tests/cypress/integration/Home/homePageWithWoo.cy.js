import { GetPluginId, getAppId } from '../wp-module-support/pluginID.cy';
import {
	comingSoon,
	installWoo,
	viewCompletedTasks,
	viewRemainingTasks,
	waitForNextSteps
} from '../wp-module-support/utils.cy';

const customCommandTimeout = 20000;
const pluginId = GetPluginId();
const appId = getAppId();

describe( 'Commerce Home Page- When WooCommerce is installed', () => {
	before( () => {
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/store' );
		installWoo();
		comingSoon( true );
	} );

	beforeEach( () => {
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
	} );

	it( 'Verify next steps "Add your store info"', () => {
		waitForNextSteps()
		cy.contains( '.nfd-grid.nfd-gap-4 ul li a', 'Add your store info', {
			timeout: customCommandTimeout,
		} )
			.as( 'storeInfoStep' )
			.should( 'exist' )
			.scrollIntoView()
			.click();
		cy.get( `.${ appId }-app-subnavitem-Store.active` ).should( 'exist' );
		cy.get( 'h2' ).should( 'exist' );
		cy.get( '.nfd-border-t .nfd-button--primary' ).should( 'be.disabled' );

		// Select country
		cy.get( '[data-id="store-country-select"]' ).click();
		cy.contains( '.nfd-select__option', 'United States (US)' ).click();
		// Enter city
		cy.get( '[name="woocommerce_store_address"]' ).type(
			'Sunflower Canal'
		);
		cy.get( '[name="woocommerce_store_city"]' ).type( 'Safford' );
		// Select state
		cy.get( '[data-id="state-select"]' ).click();
		cy.contains( '.nfd-select__option', 'Arizona' ).click();
		// Enter postcode
		cy.get( '[name="woocommerce_store_postcode"]' ).type( '85546' );
		// Select Currency
		cy.get( '[data-id="currency"]' ).click();
		cy.contains(
			'.nfd-select__option',
			'United States (US) dollar ($)'
		).click();

		cy.get( '.nfd-border-t .nfd-button--primary' )
			.should( 'not.be.disabled' )
			.click();

		cy.get( '.nfd-notifications--bottom-left .nfd-notification--success', {
			timeout: customCommandTimeout,
		} ).should( 'exist' );
		cy.get( '.nfd-w-0  p' ).should( 'exist' );

		cy.get( `.${ appId }-app-navitem-Home` ).click();
		waitForNextSteps();
		cy.get( '@storeInfoStep', { timeout: customCommandTimeout } ).should(
			'not.exist'
		);
		viewCompletedTasks();
		cy.get( '@storeInfoStep' ).should( 'exist' );
		viewRemainingTasks();
	} );

	it( 'Verify next step "Connect a payment processor"', () => {
		cy.reload();
		waitForNextSteps();
		cy.contains(
			'.nfd-grid.nfd-gap-4 ul li a',
			'Connect a payment processor',
			{
				timeout: customCommandTimeout,
			}
		)
			.as( 'paymentStep' )
			.should( 'exist' )
			.scrollIntoView()
			.click();
		cy.get( `.${ appId }-app-subnavitem-Payments.active`, {
			timeout: customCommandTimeout
		}).should(
			'exist'
		);
		cy.contains( 'section', 'Razorpay' ).as( 'razorpayBlock' );
		cy.get( '@razorpayBlock' ).find( '.nfd-button--primary' ).click();

		cy.get( '[data-id="rzpTestModeToggle"]', {
			timeout: customCommandTimeout,
		} ).should( 'exist' );
		cy.get( '[data-id="rzpTestModeToggle"]' ).click();
		cy.get( '[name="key_id"]' ).type( 'rzp_test_qn0AnShxeczQr4' );
		cy.get( '[name="key_secret"]' ).type( 'rzp_test_qn0AnShxeczQr4' );

		cy.get( '.nfd-border-t .nfd-button--primary' ).click();

		cy.get( '@razorpayBlock' , { timeout: customCommandTimeout } )
			.find( '.nfd-badge--upsell' , { timeout: customCommandTimeout })
			.should( 'exist' );

		cy.get( `.${ appId }-app-navitem-Home` ).click();
		waitForNextSteps();
		cy.get( '@paymentStep' ).should( 'not.exist' );
		viewCompletedTasks();
		cy.get( '@paymentStep' ).should( 'exist' );
		viewRemainingTasks();

		// Delete razorpay settings from DB
		cy.exec(
			`npx wp-env run cli wp option delete nfd-ecommerce-captive-flow-razorpay`
		);
		cy.exec(
			`npx wp-env run cli wp option delete woocommerce_razorpay_settings`
		);
	} );

	it( ' Verify next step "Set up Shipping options" ', () => {
		if ( pluginId == 'bluehost' ) {
			waitForNextSteps();
			cy.contains(
				'.nfd-grid.nfd-gap-4 ul li a',
				'Setup shipping options',
				{
					timeout: customCommandTimeout,
				}
			)
				.as( 'paymentStep' )
				.should( 'exist' )
				.scrollIntoView()
				.click();

			cy.get( '.nfd-app-section-content .nfd-button--primary', {
				timeout: customCommandTimeout,
			} )
				.contains( 'Install' )
				.click();
			cy.get( '.nfd-app-section-content .nfd-button--primary' )
				.contains( 'Installing' )
				.should( 'not.exist' );

			cy.window().then( ( win ) => {
				cy.spy( win, 'open', ( url ) => {
					win.location.href =
						'https://goshippo.com/oauth/register?next=/oauth/authorize';
				} ).as( 'windowOpen' );
			} );

			cy.get( '.nfd-app-section-content .nfd-button--primary', {
				timeout: customCommandTimeout,
			} )
				.contains( 'Connect' )
				.click();
			cy.get( '@windowOpen', { timeout: customCommandTimeout } ).should(
				'be.called'
			);
		}
	} );

	it.skip( 'Verify next step "Configure tax settings"', () => {
		waitForNextSteps();
		cy.contains( '.nfd-grid.nfd-gap-4 ul li a', 'Configure tax settings', {
			timeout: customCommandTimeout,
		} )
			.as( 'taxStep' )
			.should( 'exist' )
			.scrollIntoView()
			.click();
		cy.get( `.${ appId }-app-subnavitem-Store.active`, { timeout : customCommandTimeout } ).should( 'exist' );
		cy.get( '#tax-yes' ).click();
		cy.get( '.nfd-border-t .nfd-button--primary' ).click();

		cy.get( '.nfd-notifications--bottom-left .nfd-notification--success', {
			timeout: customCommandTimeout,
		} ).should( 'exist' );
		cy.get( '.nfd-w-0  p' ).should( 'exist' );

		cy.get( `.${ appId }-app-navitem-Home` ).click();
		waitForNextSteps()
		cy.get( '@taxStep', { timeout: 30000 } ).should(
			'not.exist'
		);
		viewCompletedTasks();
		cy.get( '@taxStep' ).should( 'exist' );
		viewRemainingTasks();
	} );

	it( 'Verify next step "Add a Product"', () => {
		waitForNextSteps();
		cy.contains( '.nfd-grid.nfd-gap-4 ul li a', 'Add a product', {
			timeout: customCommandTimeout,
		})
			.as( 'addProduct' )
			.should( 'exist' )
		.click();
		cy.url().should(
			'eq',
			Cypress.config().baseUrl +
				'/wp-admin/post-new.php?post_type=product&return_to_nfd=%2Fhome'
		);
		cy.go( 'back' );
	} );
} );
