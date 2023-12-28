import { GetPluginId, getAppId } from '../wp-module-support/pluginID.cy';
import { comingSoon, installWoo } from '../wp-module-support/utils.cy';

const customCommandTimeout = 30000;
const pluginId = GetPluginId();
const appId = getAppId();

describe('Commerce Home Page- Coming soon mode', () => {
    before(() => {
        cy.visit('/wp-admin/admin.php?page=' + pluginId + '#/store');
        installWoo();
        comingSoon(true);
    });

    beforeEach( () => {
		cy.visit( '/wp-admin/admin.php?page=' + pluginId + '#/store' );
	} );

    it(' Verify Quick Look and Recent Orders section', () => {
        cy.contains('h1', 'Quick Look').as('heading').should('exist')
        cy.get('@heading').next().next().should('have.text', 'Once you launch your store, you\'ll see a snapshot of recent purchases and other customer activity.')
    })
})