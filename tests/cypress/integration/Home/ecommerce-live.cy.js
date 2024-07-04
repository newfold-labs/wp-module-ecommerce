import { GetPluginId } from '../wp-module-support/pluginID.cy';
import {
	wpLogin,
	comingSoon,
	uninstallPlugins,
} from '../wp-module-support/utils.cy';

const customCommandTimeout = 20000;
const pluginId = GetPluginId();

describe( 'e-commerce Home Page- Live Mode', { testIsolation: true }, () => {
	beforeEach( () => {
		wpLogin();
		// uninstallPlugins();
		comingSoon( false );
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/home' );
	} );

	it( 'Verify presense of Ready to go to next level? canvas', () => {
		cy.get( '.nfd-flex.nfd-gap-4', { timeout: customCommandTimeout } )
			.eq( 2 )
			.as( 'readyToGoNextLevel' )
			.should( 'exist' );
		cy.get( '@readyToGoNextLevel', { timeout: customCommandTimeout } )
			.find( 'h1' )
			.should( 'exist' );
		cy.get( '@readyToGoNextLevel' ).find( 'div span' ).should( 'exist' );
	} );

	it( 'Verify by default View Site option should be displayed', () => {
		cy.get( '.nfd-button--primary', {
			timeout: customCommandTimeout,
		} )
			.eq( 1 )
			.should( 'exist' )
			.invoke( 'removeAttr', 'target' )
			.click();
		cy.url().should( 'eq', Cypress.config().baseUrl + '/' );
	} );
} );
