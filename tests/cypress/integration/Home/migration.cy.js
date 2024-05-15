import { GetPluginId } from '../wp-module-support/pluginID.cy';

const customCommandTimeout = 20000;
const pluginId = GetPluginId();
import { EventsAPI, APIList } from '../wp-module-support/eventsAPIs.cy';

describe( 'Home page', () => {
	before( () => {
		//cy.exec(`npx wp-env run cli wp option set showMigrationSteps ${ dataevent }`);
		//cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
	} );

	beforeEach( () => {
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
	} );

	it( 'Verify Next steps for your site when showMigrationSteps as true', () => {
		const steps = [
			'update nameserver clicked',
			'connect domain to site clicked',
			'Migrate View Guide Clicked',
		];
		cy.get( '.nfd-grid.nfd-gap-4', { timeout: customCommandTimeout } )
			.scrollIntoView()
			.should( 'exist' );
		cy.wait( 5000 );
		cy.get( '.nfd-grid.nfd-gap-4 ul li a' ).eq( 0 ).click();

		cy.get( '.nfd-help-center', { timeout: customCommandTimeout } ).should(
			'exist'
		);
		//cy.contains('How do I update my nameserver to BH?').should('be.visible');
		cy.get( '.close-button' ).click();

		EventsAPI( APIList.update_nameserver, pluginId );

		cy.get( '.nfd-grid.nfd-gap-4 ul li a' ).eq( 1 ).click();
		cy.get( '.nfd-help-center', { timeout: customCommandTimeout } ).should(
			'exist'
		);
		//cy.contains('How do I connect domain to site in BH?').should('be.visible');
		cy.get( '.close-button' ).click();
		EventsAPI( APIList.connect_domain, pluginId );

		//cy.get('.nfd-grid.nfd-gap-4 ul li a').eq(2).click();
		//cy.get( '.nfd-help-center', { timeout: customCommandTimeout } )

		//.should( 'exist' );
		//cy.contains('How do I update my nameserver to BH?').should('be.visible');
		//cy.get('.close-button').click();
		//EventsAPI( APIList.store_setup, pluginId );
	} );
} );
