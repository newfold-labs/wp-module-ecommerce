import { GetPluginId } from '../wp-module-support/pluginID.cy';
import { EventsAPI, APIList } from '../wp-module-support/eventsAPIs.cy';
import {
	wpLogin,
	wpCli,
	uninstallPlugins,
} from '../wp-module-support/utils.cy';
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
		before( function () {
			if ( pluginId !== 'bluehost' ) {
				this.skip();
			}
			uninstallPlugins();
		} );

		beforeEach( () => {
			wpLogin();
			wpCli(
				`option update _transient_nfd_site_capabilities '${ helpCenter }' --format=json`
			);
			const expiry = Math.floor( new Date().getTime() / 1000.0 ) + 3600;
			wpCli(
				`option update _transient_timeout_nfd_site_capabilities ${ expiry }`
			);
			// this resets on longin, so must be reset to true here
			wpCli( 'option update nfd_show_migration_steps 1' );

			cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
		} );

		after( () => {
			wpCli( `transient delete nfd_site_capabilities` );
			wpCli( `option delete nfd_show_migration_steps` );
		} );

		it( 'Verify if Welcome home! section shows', () => {
			cy.get( '.nfd-justify-start', { timeout: customCommandTimeout } )
				.scrollIntoView()
				.should( 'exist' );
		} );

		it( 'Verify if One last thing to do... section shows', () => {
			cy.get( '#next-steps-section', { timeout: customCommandTimeout } )
				.scrollIntoView()
				.should( 'exist' );
		} );

		it( 'Verify when update nameserver clicked', () => {
			cy.intercept( APIList.update_nameserver ).as( 'events' );
			cy.reload();
			cy.get( '#onboarding-list [data-testid="nameservers"]', {
				timeout: customCommandTimeout,
			} )
				.scrollIntoView()
				.should( 'exist' )
				.click();
			EventsAPI( APIList.update_nameserver, pluginId );
			cy.wait( 1000 );
			cy.get( '.help-container', {
				timeout: customCommandTimeout,
			} ).should( 'be.visible' );
			cy.get( '#search-input-box' )
				.should( 'have.attr', 'value' )
				.then( ( value ) => {
					expect( value.toLowerCase() ).to.contain( 'nameserver' );
				} );
		} );

		it( 'Verify when connect domain to site clicked', () => {
			cy.intercept( APIList.connect_domain ).as( 'events' );
			cy.reload();
			cy.get( '#onboarding-list [data-testid="domain"]', {
				timeout: customCommandTimeout,
			} )
				.scrollIntoView()
				.should( 'exist' )
				.click();
			EventsAPI( APIList.connect_domain, pluginId );
			cy.wait( 1000 );
			cy.get( '.help-container', {
				timeout: customCommandTimeout,
			} ).should( 'be.visible' );
			cy.get( '#search-input-box' )
				.should( 'have.attr', 'value' )
				.then( ( value ) => {
					expect( value.toLowerCase() ).to.contain( 'domain' );
				} );
		} );

		it( 'Verify when continue with store setup clicked', () => {
			cy.reload();
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
