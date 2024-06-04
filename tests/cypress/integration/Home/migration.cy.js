import { GetPluginId } from '../wp-module-support/pluginID.cy';
import { EventsAPI, APIList } from '../wp-module-support/eventsAPIs.cy';

const customCommandTimeout = 20000;
const pluginId = GetPluginId();
const helpCenter = JSON.stringify( {
	canAccessAI: true,
	canAccessHelpCenter: true,
} );

describe( 'Home page - post migration events with help center ', () => {
	before( function () {
		if ( pluginId !== 'bluehost' ) {
			this.skip();
		}
		cy.exec( `npx wp-env run cli wp option set nfd_show_migration_steps "true"` );
		cy.exec(
			`npx wp-env run cli wp option delete _transient_nfd_site_capabilities`,
			{ failOnNonZeroExit: false }
		);
		cy.exec(
			`npx wp-env run cli wp option set _transient_nfd_site_capabilities '${ helpCenter }' --format=json`,
			{ timeout: customCommandTimeout }
		);
		cy.reload();
	} );

	beforeEach( () => {
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
	} );

	it( 'Verify when update nameserver clicked', () => {
		cy.get( '.nfd-grid.nfd-gap-4', { timeout: customCommandTimeout } )
			.scrollIntoView()
			.should( 'exist' );
		cy.intercept( APIList.update_nameserver ).as( 'events' );
		cy.get( '.nfd-grid.nfd-gap-4 ul li a' ).eq( 0 ).click();
		EventsAPI( APIList.update_nameserver, pluginId );
		cy.get( '.nfd-help-center', { timeout: customCommandTimeout } ).should(
			'be.visible'
		);
		cy.get( '.close-button' ).click();
	} );

	it( 'Verify when connect domain to site clicked', () => {
		cy.get( '.nfd-grid.nfd-gap-4', { timeout: customCommandTimeout } )
			.scrollIntoView()
			.should( 'exist' );
		cy.intercept( APIList.connect_domain ).as( 'events' );
		cy.get( '.nfd-grid.nfd-gap-4 ul li a' ).eq( 1 ).click();
		EventsAPI( APIList.connect_domain, pluginId );
		cy.get( '.nfd-help-center', { timeout: customCommandTimeout } ).should(
			'be.visible'
		);
		cy.get( '.close-button' ).click();
	} );

	it( 'Verify when continue with store setup clicked', () => {
		cy.get( '.nfd-grid.nfd-gap-4', { timeout: customCommandTimeout } )
			.scrollIntoView()
			.should( 'exist' );
		cy.get( '.nfd-grid.nfd-gap-4 ul li a' ).eq( 2 ).click();
		cy.get( '#next-steps-section', { timeout: customCommandTimeout } )
			.scrollIntoView()
			.should( 'exist' );
		cy.get( '#add-a-product', { timeout: customCommandTimeout } ).should(
			'exist'
		);
	} );
} );
