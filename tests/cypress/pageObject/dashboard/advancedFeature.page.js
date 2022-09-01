/// <reference types="cypress" />

const SELECTOR = {
	NOT_INSTALLED_ADDONS_LIST: 'button[data-completed=false]',
	INSTALLED_ADDONS_LIST: 'button[data-completed=true]',
};

class AdvancedFeaturePage {
	uninstalledAddOns() {
		return cy.get( SELECTOR.NOT_INSTALLED_ADDONS_LIST );
	}

	installedAddons() {
		return cy.get( SELECTOR.INSTALLED_ADDONS_LIST );
	}

	addonsListToEnable() {
		return this.uninstalledAddOns().find( 'span>span' );
	}
}

export default new AdvancedFeaturePage();
