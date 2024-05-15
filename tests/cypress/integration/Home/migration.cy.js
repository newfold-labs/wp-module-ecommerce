import { GetPluginId } from '../wp-module-support/pluginID.cy';

const customCommandTimeout = 20000;
const pluginId = GetPluginId();
import { EventsAPI, APIList } from '../wp-module-support/eventsAPIs.cy';

describe( 'Home page', () => {
	before( () => {
		cy.exec( `npx wp-env run cli wp option set showMigrationSteps "true"` );
	} );

	beforeEach( () => {
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
	} );

	it( 'Verify when update nameserver clicked', () => {
		const steps = [ 'update nameserver clicked' ];
		cy.get( '.nfd-grid.nfd-gap-4', { timeout: customCommandTimeout } )
			.scrollIntoView()
			.should( 'exist' );
		cy.wait( 5000 );
		cy.get( '.nfd-grid.nfd-gap-4 ul li a' ).eq( 0 ).click();
		EventsAPI( APIList.update_nameserver, pluginId );

		cy.get( '.nfd-help-center', { timeout: customCommandTimeout } ).should(
			'exist'
		);

		cy.get( '.close-button' ).click();
	} );

	it( 'Verify when connect domain to site clicked', () => {
		const steps = [ 'connect domain to site clicked' ];
		cy.get( '.nfd-grid.nfd-gap-4', { timeout: customCommandTimeout } )
			.scrollIntoView()
			.should( 'exist' );
		cy.wait( 5000 );
		cy.get( '.nfd-grid.nfd-gap-4 ul li a' ).eq( 1 ).click();
		EventsAPI( APIList.connect_domain, pluginId );
		cy.get( '.nfd-help-center', { timeout: customCommandTimeout } ).should(
			'exist'
		);

		cy.get( '.close-button' ).click();
	} );

	it( 'Verify when continue with store setup clicked', () => {
		const steps = [ 'continue with store setup clicked' ];
		cy.get( '.nfd-grid.nfd-gap-4', { timeout: customCommandTimeout } )
			.scrollIntoView()
			.should( 'exist' );
		cy.wait( 5000 );
		cy.get( '.nfd-grid.nfd-gap-4 ul li a' ).eq( 2 ).click();
	} );
} );
