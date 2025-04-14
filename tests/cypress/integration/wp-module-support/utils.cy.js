import { getAppId } from './pluginID.cy';

const appId = getAppId();
const customCommandTimeout = 30000;
const longWait = 120000;

export const comingSoon = ( shouldBeComingSoon ) => {
	cy.visit(
		'/wp-admin/admin.php?page=' + Cypress.env( 'pluginId' ) + '#/settings'
	);
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
	cy.exec( `npx wp-env run cli wp plugin install woocommerce --activate`, {
		timeout: longWait,
		log: true,
		failOnNonZeroExit: false,
	} );
};

export const uninstallWoo = () => {
	cy.log( 'Uninstalling WooCommerce and Yith Extended Plugins' );
	cy.exec(
		'npx wp-env run cli wp plugin uninstall woocommerce yith-stripe-payments-for-woocommerce-extended yith-paypal-payments-for-woocommerce-extended yith-shippo-shippings-for-woocommerce-extended wonder-cart --deactivate',
		{
			failOnNonZeroExit: false,
			timeout: longWait,
		}
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
	cy.exec( `npx wp-env run cli wp transient delete nfd_site_capabilities`, {
		failOnNonZeroExit: false,
	} );
};

export const wpLogin = () => {
	cy.login( Cypress.env( 'wpUsername' ), Cypress.env( 'wpPassword' ) );
};

// wp cli wrapper
export const wpCli = ( cmd ) => {
	cy.exec( `npx wp-env run cli wp ${ cmd }`, {
		env: {
			NODE_TLS_REJECT_UNAUTHORIZED: '1',
		},
	} ).then( ( result ) => {
		for ( const [ key, value ] of Object.entries( result ) ) {
			cy.log( `${ key }: ${ value }` );
		}
	} );
};
