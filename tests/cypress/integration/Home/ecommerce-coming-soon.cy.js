import { GetPluginId } from '../wp-module-support/pluginID.cy';
import {
	wpLogin,
	comingSoon,
	uninstallPlugins,
} from '../wp-module-support/utils.cy';

const customCommandTimeout = 20000;
const pluginId = GetPluginId();

describe(
	'e-commerce Home Page- Coming soon mode',
	{ testIsolation: true },
	() => {
		beforeEach( () => {
			wpLogin();
			// uninstallPlugins();
			comingSoon( true );
			cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
		} );

		it( 'Verify Congrats on your new site message, coming soon alert', () => {
			cy.get( '.nfd-gap-4 .nfd-title.nfd-title--2', {
				timeout: customCommandTimeout,
			} )
				.eq( 0 )
				.should( 'exist' );
			cy.get( '.nfd-alert.nfd-alert--warning', {
				timeout: customCommandTimeout,
			} )
				.as( 'comingsoonalert' )
				.should( 'exist' );
			cy.get( '@comingsoonalert' )
				.find( '.nfd-validation-icon' )
				.should( 'exist' );
			cy.get( '@comingsoonalert' )
				.find( '.nfd-validation-message' )
				.should( 'exist' );
		} );

		it( 'Verify Site Preview flex and View your site option', () => {
			cy.get( '.nfd-justify-start > .nfd-flex-col > .nfd-absolute', {
				timeout: customCommandTimeout,
			} )
				.as( 'sitePreviewFlex' )
				.should( 'exist' );
			cy.get( '@sitePreviewFlex' )
				.trigger( 'mouseover' )
				.find( '[data-cy="view-site"]' )
				.should( 'exist' )
				.invoke( 'removeAttr', 'target' )
				.click();
			cy.url().should( 'eq', Cypress.config().baseUrl + '/' );
			cy.go( 'back' );
		} );

		it( 'Verify presense of Ready to go to live? canvas', () => {
			cy.get( '.nfd-px-4', { timeout: customCommandTimeout } )
				.as( 'readyToGoNextLevel' )
				.should( 'exist' );
			cy.get( '@readyToGoNextLevel', { timeout: customCommandTimeout } )
				.find( '.nfd-flex-1 h1' )
				.should( 'exist' );
			cy.get( '@readyToGoNextLevel' )
				.find( '.nfd-flex-1 span' )
				.should( 'exist' );
			cy.get( '@readyToGoNextLevel', { timeout: customCommandTimeout } )
				.find( '#view-site' )
				.should( 'exist' );
			cy.get( '@readyToGoNextLevel' )
				.find( '#launch-site' )
				.should( 'exist' );
		} );

		it( 'Verify Visit your site and Launch your site functionality', () => {
			cy.get( '.nfd-flex-none > .nfd-button--secondary', {
				timeout: customCommandTimeout,
			} )
				.invoke( 'removeAttr', 'target' )
				.click();
			cy.url().should( 'eq', Cypress.config().baseUrl + '/' );
			cy.go( 'back' );
			cy.get( '.nfd-flex-none > .nfd-button--upsell' ).click();
			cy.get('[data-testid="siteStatus"]').should('not.exist');
			cy.get( '.nfd-notification--success' ).should( 'exist' );
		} );
	}
);
