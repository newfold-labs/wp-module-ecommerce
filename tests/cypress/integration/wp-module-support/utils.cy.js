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
		`npx wp-env run cli wp plugin install woocommerce --activate && npx wp-env run cli wp plugin deactivate wonder-cart yith-paypal-payments-for-woocommerce-extended yith-stripe-payments-for-woocommerce-extended`,
		{
			timeout: longWait,
			log: true,
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
