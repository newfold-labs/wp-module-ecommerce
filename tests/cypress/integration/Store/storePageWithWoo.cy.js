import { GetPluginId, getAppId } from '../wp-module-support/pluginID.cy';
import { wpLogin, installWoo } from '../wp-module-support/utils.cy';

const pluginId = GetPluginId();
const appId = getAppId();
const customCommandTimeout = 30000;

describe(
	'Store Page - Critical Paths',
	{ testIsolation: true },
	() => {
		beforeEach( () => {
			wpLogin();
			installWoo();
			cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/store' );
		} );

		it( 'Verify Store Page renders properly', () => {
			cy.reload();

			// Shows users activity section.
			cy.get( '#recent-activity-report-wrapper' ).should( 'exist' );
			cy.get( '#nonecommerce-features-wrapper' ).should( 'exist' );

			// Install Woo Elements shouldn't be displayed.
			cy.get( '[data-testid="nfd-nowoo-store-title"]' ).should( 'not.exist' );
			cy.get( '[data-testid="nfd-nowoo-store-description"]' ).should( 'not.exist' );
			cy.get( 'button#install-woocommerce-to-unlock-btn' ).should( 'not.exist' );

		} );
	}
);
