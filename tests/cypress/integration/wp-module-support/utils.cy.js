import { getAppId } from './pluginID.cy';

const appId = getAppId();
const customCommandTimeout = 30000;
const mediumWait = 60000;
const longWait = 120000;

export const comingSoon = ( shouldBeComingSoon ) => {
	cy.get( `.${ appId }-app-navitem-Settings`, {
		timeout: customCommandTimeout,
	} ).click();

	cy.get( '[data-id="coming-soon-toggle"]', {
		timeout: customCommandTimeout,
	} ).as( 'comingSoonToggle' );

	if ( shouldBeComingSoon ) {
		cy.get( '@comingSoonToggle' )
			.invoke( 'attr', 'aria-checked' )
			.then( ( area_checked ) => {
				if ( area_checked == 'false' ) {
					cy.get( '@comingSoonToggle' ).click();
					cy.get( '.nfd-notification--success', {
						timeout: customCommandTimeout,
					} ).should( 'exist' );
				}
			} );
	} else {
		cy.get( '@comingSoonToggle' )
			.invoke( 'attr', 'aria-checked' )
			.then( ( area_checked ) => {
				if ( area_checked == 'true' ) {
					cy.get( '@comingSoonToggle' ).click();
					cy.get( '.nfd-notification--success', {
						timeout: customCommandTimeout,
					} ).should( 'exist' );
				}
			} );
	}
};

export const installWoo = () => {
	// cy.get(
	// 	'.nfd-button.nfd-button--upsell.nfd-gap-2.nfd-shadow-lg'
	// )
	// 	.click();
	// cy.get( '.nfd-notifications--bottom-left .nfd-notification--success', {
	// 	timeout: longWait,
	// } ).should( 'exist' );
	// cy.get( '.nfd-w-0  p' ).should( 'exist' );
	cy.exec( `npx wp-env run cli wp plugin install woocommerce`, {timeout: longWait} );
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
