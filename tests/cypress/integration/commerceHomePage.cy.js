import 'cypress-iframe'
import { GetPluginId } from './wp-module-support/pluginID.cy';

const customCommandTimeout = 60000;


describe(
	'Bluehost WP Admin Home Page',
	() => {
		before(() => {
			// cy.activatePlugin('all');
		})

		beforeEach(() => {
			cy.visit('/wp-admin/admin.php?page=' + GetPluginId() + '#/home')
		})

		it('Test Ready to go next level ', () => {
			cy.contains('Ready to go to the next level?', { timeout: customCommandTimeout }).should('exist')
		})

	}
);