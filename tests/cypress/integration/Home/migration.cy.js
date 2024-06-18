import { GetPluginId } from '../wp-module-support/pluginID.cy';
import { EventsAPI, APIList } from '../wp-module-support/eventsAPIs.cy';

const customCommandTimeout = 20000;
const pluginId = GetPluginId();
const helpCenter = JSON.stringify( {
	canAccessAI: true,
	canAccessHelpCenter: true,
} );

describe(
	'Home page - post migration events with help center ',
	{ testIsolation: true },
	() => {
		beforeEach( function () {
			cy.login(
				Cypress.env( 'wpUsername' ),
				Cypress.env( 'wpPassword' )
			);
			
			if ( pluginId !== 'bluehost' ) {
				this.skip();
			}
			cy.exec(
				`npx wp-env run cli wp option set showMigrationSteps "true"`
			);
			cy.exec(
				`npx wp-env run cli wp option delete _transient_nfd_site_capabilities`,
				{ failOnNonZeroExit: false }
			);
			cy.exec(
				`npx wp-env run cli wp option set _transient_nfd_site_capabilities '${ helpCenter }' --format=json`,
				{ timeout: customCommandTimeout }
			);
			cy.reload();
			cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
		} );

		it( 'Verify when update nameserver clicked', () => {
			cy.intercept( APIList.update_nameserver ).as( 'events' );
			cy.get( '#onboarding-list [data-testid="nameservers"]', {
				timeout: customCommandTimeout,
			} )
				.scrollIntoView()
				.should( 'exist' )
				.click();
			EventsAPI( APIList.update_nameserver, pluginId );
			cy.get( '.nfd-help-center', {
				timeout: customCommandTimeout,
			} ).should( 'be.visible' );
			cy.get( '.close-button' ).click();
		} );

		it( 'Verify when connect domain to site clicked', () => {
			cy.intercept( APIList.connect_domain ).as( 'events' );
			cy.get( '#onboarding-list [data-testid="domain"]', {
				timeout: customCommandTimeout,
			} )
				.scrollIntoView()
				.should( 'exist' )
				.click();
			EventsAPI( APIList.connect_domain, pluginId );
			cy.get( '.nfd-help-center', {
				timeout: customCommandTimeout,
			} ).should( 'be.visible' );
			cy.get( '.close-button' ).click();
		} );

		it( 'Verify when continue with store setup clicked', () => {
			cy.get( '#onboarding-list [data-testid="continue"]', {
				timeout: customCommandTimeout,
			} )
				.scrollIntoView()
				.should( 'exist' )
				.click();
			cy.get( '#next-steps-section', { timeout: customCommandTimeout } )
				.scrollIntoView()
				.should( 'exist' );
			cy.get( '#upload-media-to-your-site', {
				timeout: customCommandTimeout,
			} ).should( 'exist' );
		} );
	}
);
