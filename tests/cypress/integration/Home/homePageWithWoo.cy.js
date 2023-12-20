import { GetPluginId, getAppId } from '../wp-module-support/pluginID.cy';
import { comingSoon, installWoo } from '../wp-module-support/utils.cy';

const customCommandTimeout = 30000;
const pluginId = GetPluginId();
const appId = getAppId();

describe( 'Commerce Home Page- Coming soon mode', () => {
	before( () => {
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/store' );
		installWoo();
		comingSoon( true );
	} );

	beforeEach( () => {
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
	} );

	it( 'Verify next steps when woocommerce is installed', () => {
		const nextSteps = [
			'Add your store info',
			'Connect a payment processor',
			'Setup shipping options',
			'Configure tax settings',
			'Add a product',
		];

		cy.get( '.nfd-grid.nfd-gap-4', { timeout: customCommandTimeout } )
			.as( 'nextSteps' )
			.should( 'exist' );
		cy.get( '@nextSteps' )
			.find( 'h1' )
			.should( 'have.text', 'Next steps for your site' );
		cy.get( '@nextSteps' )
			.find( 'p' )
			.should(
				'have.text',
				"You're just a few steps away from sharing your store with the world!"
			);
		cy.get( '@nextSteps' )
			.find( 'ul li' )
			.each( ( item, index, list ) => {
				expect( list ).to.have.length( 5 );

				expect( Cypress.$( item ).text() ).to.eq( nextSteps[ index ] );
			} );
	} );

	it( 'Verify next steps "Add your store info"', () => {
		cy.contains( '.nfd-grid.nfd-gap-4 ul li a', 'Add your store info', {
			timeout: customCommandTimeout,
		} )
			.as( 'storeInfoStep' )
			.should( 'exist' )
			.scrollIntoView()
			.click();
		cy.get( `.${ appId }-app-subnavitem-Store.active` ).should( 'exist' );
		cy.contains( 'h2', 'Store Details' ).should( 'exist' );
		cy.contains( '.nfd-button--primary', 'Save Changes' ).should(
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

		cy.contains( '.nfd-button--primary', 'Save Changes' )
			.should( 'not.be.disabled' )
			.click();

		cy.get( '.nfd-notifications--bottom-left .nfd-notification--success', {
			timeout: customCommandTimeout,
		} ).should( 'exist' );
		cy.get( '.nfd-w-0  p' ).should(
			'have.text',
			'Successfully saved the Store Details'
		);

		cy.get( `.${ appId }-app-navitem-Home` ).click();
		cy.get( '@storeInfoStep' ).should( 'not.exist' );
		cy.contains( '.nfd-link', 'View completed tasks', {
			timeout: customCommandTimeout,
		} ).click();
		cy.get( '@storeInfoStep' ).should( 'exist' );
		cy.contains( '.nfd-link', 'View remaining tasks' ).click();
    });
    
    it('Verify Next step "Connect a payment processor"', () => {
        cy.contains( '.nfd-grid.nfd-gap-4 ul li a', 'Connect a payment processor', {
			timeout: customCommandTimeout,
		} )
			.as( 'paymentStep' )
			.should( 'exist' )
			.scrollIntoView()
			.click();
		cy.get( `.${ appId }-app-subnavitem-Payments.active` ).should( 'exist' );
		cy.contains( 'h2', 'Payments' ).should( 'exist' );
		cy.contains('section', 'Razorpay').as('razorpayBlock')
		cy.get('@razorpayBlock').find('.nfd-button--primary').click()

		cy.get('[data-id="rzpTestModeToggle"]', {timeout: customCommandTimeout}).should('exist')
		cy.get('[data-id="rzpTestModeToggle"]').click()
		cy.get('[name="key_id"]').type('rzp_test_qn0AnShxeczQr4')
		cy.get('[name="key_secret"]').type('rzp_test_qn0AnShxeczQr4')

		cy.contains( '.nfd-button--primary', 'Save Changes' )
			.click();
		cy.wait(5000)
		
		cy.get('@razorpayBlock').find('span').contains('Environment:').should('exist')
		cy.get('@razorpayBlock').find('.nfd-badge--upsell', {timeout: customCommandTimeout}).should('have.text', 'sandbox')


		cy.get( `.${ appId }-app-navitem-Home` ).click();
		cy.get( '@paymentStep' ).should( 'not.exist' );
		cy.contains( '.nfd-link', 'View completed tasks', {
			timeout: customCommandTimeout,
		} ).click();
		cy.get( '@paymentStep' ).should( 'exist' );
		cy.contains('.nfd-link', 'View remaining tasks').click();

		// Delete razorpay settings from DB
		cy.exec(`npx wp-env run cli wp option delete nfd-ecommerce-captive-flow-razorpay`)
		cy.exec(`npx wp-env run cli wp option delete woocommerce_razorpay_settings`)

    })

	it(' Verify next step Set up Shipping options ', () => {
		cy.contains( '.nfd-grid.nfd-gap-4 ul li a', 'Setup shipping options', {
			timeout: customCommandTimeout,
		} )
			.as( 'paymentStep' )
			.should( 'exist' )
			.scrollIntoView()
			.click();
		
		cy.contains('h2', 'Store Details').should('exist')
		cy.window().then(win => {
			cy.spy(win, 'open', url => {
				win.location.href= 'https://goshippo.com/oauth/register?next=/oauth/authorize'
			}).as('windowOpen');
		  });
		
		cy.get('.nfd-button--primary').contains('Connect').click();
		cy.get('@windowOpen').should('be.called');
	})

	it('Verify step Configure tax settings', () => {
		cy.contains( '.nfd-grid.nfd-gap-4 ul li a', 'Configure tax settings', {
			timeout: customCommandTimeout,
		} )
			.as( 'taxStep' )
			.should( 'exist' )
			.scrollIntoView()
			.click();
		cy.get(`.${appId}-app-subnavitem-Store.active`).should('exist');

		cy.get('#tax-yes').click()


		cy.contains( '.nfd-button--primary', 'Save Changes' )
			.click();

		cy.get( '.nfd-notifications--bottom-left .nfd-notification--success', {
			timeout: customCommandTimeout,
		} ).should( 'exist' );
		cy.get( '.nfd-w-0  p' ).should(
			'have.text',
			'Successfully saved the Store Details'
		);

		cy.get(`.${appId}-app-navitem-Home`).click();
		cy.get( '@taxStep', {timeout: customCommandTimeout}).should( 'not.exist' );
		cy.contains( '.nfd-link', 'View completed tasks', {
			timeout: customCommandTimeout,
		} ).click();
		cy.get( '@taxStep' ).should( 'exist' );
		cy.contains( '.nfd-link', 'View remaining tasks' ).click();
	})

	it('Verify step Add a Product', () => {
		cy.contains("Add a product").as("addProduct").should("exist");
    	cy.get("@addProduct").click();
    	cy.url().should("eq", Cypress.config().baseUrl + "/wp-admin/post-new.php?post_type=product&return_to_nfd=%2Fhome");
    	cy.go("back");
	})
} );
