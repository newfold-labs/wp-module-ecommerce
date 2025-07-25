import { GetPluginId } from '../wp-module-support/pluginID.cy';
import {
	wpLogin,
	installWoo,
	viewCompletedTasks,
	viewRemainingTasks,
	waitForNextSteps,
	uninstallWoo,
} from '../wp-module-support/utils.cy';

const customCommandTimeout = 20000;
const pluginId = GetPluginId();

describe(
	'e-commerce Home Page - When WooCommerce is installed',
	{ testIsolation: true },
	() => {
		before( () => {
			installWoo();
		} );

		beforeEach( () => {
			wpLogin();
			cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
		} );

		after( () => {
			uninstallWoo();
		} );

		// Skipping this test since the step changed
		it.skip( 'Verify next steps "Add your store info"', () => {
			cy.reload();
			waitForNextSteps();
			cy.get( '#add-your-store-info a', {
				timeout: customCommandTimeout,
			} )
				.as( 'storeInfoStep' )
				.should( 'exist' )
				.scrollIntoView()
				.click();

			cy.get( 'h2' ).should( 'exist' );
			cy.get( '.nfd-border-t .nfd-button--primary' ).should(
				'be.disabled'
			);

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

			cy.get(
				'.nfd-notifications--bottom-left .nfd-notification--success',
				{
					timeout: customCommandTimeout,
				}
			).should( 'exist' );
			cy.get( '.nfd-w-0  p' ).should( 'exist' );

			cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
			waitForNextSteps();
			cy.get( '@storeInfoStep', {
				timeout: customCommandTimeout,
			} ).should( 'not.exist' );
			viewCompletedTasks();
			cy.get( '@storeInfoStep' ).should( 'exist' );
			viewRemainingTasks();
		} );

		// Skipping this test since the step changed
		it.skip( 'Verify next step "Connect a payment processor"', function () {
			// Razorpay is not enabled for crazy-domains, hense skipping
			if ( pluginId == 'crazy-domains' ) {
				this.skip();
			}
			cy.reload();
			waitForNextSteps();
			cy.get( '#connect-a-payment-processor a', {
				timeout: customCommandTimeout,
			} )
				.as( 'paymentStep' )
				.should( 'exist' )
				.scrollIntoView()
				.click();

			cy.get( '#razorpay-section' ).as( 'razorpayBlock' );
			cy.get( '@razorpayBlock' ).find( '#install-razorpay' ).click();

			cy.get( '[data-id="rzpTestModeToggle"]', {
				timeout: customCommandTimeout,
			} ).should( 'exist' );
			cy.get( '[data-id="rzpTestModeToggle"]' ).click();
			cy.get( '[name="key_id"]' ).type( 'rzp_test_qn0AnShxeczQr4' );
			cy.get( '[name="key_secret"]' ).type( 'rzp_test_qn0AnShxeczQr4' );

			cy.get( '.nfd-border-t .nfd-button--primary' ).click();

			cy.get( '@razorpayBlock', { timeout: customCommandTimeout } )
				.find( '.nfd-badge--upsell', { timeout: customCommandTimeout } )
				.should( 'exist' );

			cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
			waitForNextSteps();
			cy.get( '@paymentStep' ).should( 'not.exist' );
			viewCompletedTasks();
			cy.get( '@paymentStep' ).should( 'exist' );
			viewRemainingTasks();

			// Delete razorpay settings from DB
			cy.exec(
				`npx wp-env run cli wp option delete nfd-ecommerce-captive-flow-razorpay woocommerce_razorpay_settings`
			);
		} );

		it( 'Verify next step "Set up Shipping options"', () => {
			if ( pluginId == 'bluehost' ) {
				waitForNextSteps();
				cy.get( '#setup-shipping-options a', {
					timeout: customCommandTimeout,
				} )
					.as( 'paymentStep' )
					.should( 'exist' )
					.scrollIntoView()
					.click();

				cy.get( '#install-shippo', {
					timeout: customCommandTimeout,
				} ).click();
				cy.get( '#installing-shippo' ).should( 'not.exist' );

				cy.window().then( ( win ) => {
					cy.spy( win, 'open', ( url ) => {
						win.location.href =
							'https://goshippo.com/oauth/register?next=/oauth/authorize';
					} ).as( 'windowOpen' );
				} );

				cy.get( '#connect-to-shippo-btn', {
					timeout: customCommandTimeout,
				} ).click();
				cy.get( '@windowOpen', {
					timeout: customCommandTimeout,
				} ).should( 'be.called' );
			}
		} );

		// Skipping this test since the step changed
		it.skip( 'Verify next step "Configure tax settings"', () => {
			waitForNextSteps();
			cy.get( '#configure-tax-settings a', {
				timeout: customCommandTimeout,
			} )
				.as( 'taxStep' )
				.should( 'exist' )
				.scrollIntoView()
				.click();

			cy.get( '#tax-yes' ).click();
			cy.get( '.nfd-border-t .nfd-button--primary' ).click();

			cy.get(
				'.nfd-notifications--bottom-left .nfd-notification--success',
				{
					timeout: customCommandTimeout,
				}
			).should( 'exist' );
			cy.get( '.nfd-w-0  p' ).should( 'exist' );

			cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
			cy.reload();
			waitForNextSteps();
			cy.get( '@taxStep', { timeout: 30000 } ).should( 'not.exist' );
			viewCompletedTasks();
			cy.get( '@taxStep' ).should( 'exist' );
			viewRemainingTasks();
		} );

		it( 'Verify next step "Add a Product"', () => {
			waitForNextSteps();
			cy.get( '#add-a-product a', {
				timeout: customCommandTimeout,
			} )
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
	}
);
