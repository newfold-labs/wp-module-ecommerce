import { GetPluginId, getAppId } from '../wp-module-support/pluginID.cy';
import { comingSoon, installWoo } from '../wp-module-support/utils.cy';

const customCommandTimeout = 60000;
const pluginId = GetPluginId();
const appId = getAppId();

describe( 'Commerce Home Page- Coming soon mode', () => {
	before( () => {
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/store' );
		// installWoo();
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
        
        '[data-id="rzpTestModeToggle"]'
        '[name="key_id"]'
        '[name="key_secret"]'

    })
} );
