import { getAppId } from './pluginID.cy';

const appId = getAppId();
const customCommandTimeout = 30000;
const longWait = 120000;

export const comingSoon = ( shouldBeComingSoon ) => {
	cy.visit( '/wp-admin/admin.php?page=' + Cypress.env('pluginId') + '#/settings' );
	cy.get( '[data-id="coming-soon-toggle"]', {
		timeout: customCommandTimeout,
	} ).as( 'comingSoonToggle' );

	if ( shouldBeComingSoon ) {
		cy.get( '@comingSoonToggle' )
			.invoke( 'attr', 'aria-checked' )
			.then( ( aria_checked ) => {
				if ( aria_checked == 'false' ) {
					cy.log( 'Enable Coming Soon Mode' );
					cy.get( '@comingSoonToggle' ).click();
					cy.get( '.nfd-notification--success', {
						timeout: customCommandTimeout,
					} ).should( 'exist' );
				}
			} );
	} else {
		cy.get( '@comingSoonToggle' )
			.invoke( 'attr', 'aria-checked' )
			.then( ( aria_checked ) => {
				if ( aria_checked == 'true' ) {
					cy.log( 'Disable Coming Soon Mode' );
					cy.get( '@comingSoonToggle' ).click();
					cy.get( '.nfd-notification--success', {
						timeout: customCommandTimeout,
					} ).should( 'exist' );
				}
			} );
	}
};

export const installWoo = () => {
	cy.log( 'Installing WooCommerce' );
	cy.exec(
		`npx wp-env run cli wp plugin install woocommerce --activate`,
		{
			timeout: longWait,
			log: true,
		}
	);
};

export const uninstallPlugins = () => {
	cy.log( 'Uninstalling plugins' );
	cy.exec(
		'npx wp-env run cli wp plugin uninstall --all --deactivate --exclude=bluehost-wordpress-plugin,wp-plugin-hostgator,wp-plugin-crazy-domains,wp-plugin-web,wp-plugin-mojo'
	);
};

export const viewCompletedTasks = () => {
	cy.get( '.nfd-card.nfd-p-0', {
		timeout: customCommandTimeout,
	} )
		.next()
		.click();
};

export const viewRemainingTasks = () => {
	cy.get( '.nfd-card.nfd-p-0', {
		timeout: customCommandTimeout,
	} )
		.next()
		.click();
};

export const waitForNextSteps = () => {
	cy.get( '#next-steps-section', { timeout: customCommandTimeout } )
		.as( 'nextSteps' )
		.scrollIntoView()
		.should( 'exist' );
};

export const deleteCapabilitiesTransient = () => {
	cy.log( 'Deleting capabilities transient' );
	cy.exec(
		`npx wp-env run cli wp transient delete nfd_site_capabilities`,
		{ failOnNonZeroExit: false }
	);
};