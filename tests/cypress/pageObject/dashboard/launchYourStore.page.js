const SELECTOR = {
	LAUNCH_YOUR_STORE: 'Launch your store',
	CONTINUE_BUTTON: 'Continue',
	GO_TO_YOUR_SITE: 'Go to your site!',
	SWITCH_TO_COMING_MODE: 'Switch back to "Coming Soon" mode',
};

class LaunchYourStore {
	launchYourStoreButton() {
		return cy.get( 'button' ).contains( SELECTOR.LAUNCH_YOUR_STORE );
	}
	continueButton() {
		return cy.findByText( SELECTOR.CONTINUE_BUTTON );
	}

	goToYourSiteButton() {
		return cy.findByText( SELECTOR.GO_TO_YOUR_SITE );
	}

	switchToComingModeButton() {
		return cy.findByText( SELECTOR.SWITCH_TO_COMING_MODE );
	}
}

export default new LaunchYourStore();
