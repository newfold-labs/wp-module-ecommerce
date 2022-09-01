import BluehostHomePage from '../pageObject/bluehostHome.page';
import LaunchYourStatusPage from '../pageObject/dashboard/launchYourStore.page';

export function launchYourStore() {
	BluehostHomePage.siteStatusInHeader().then( ( $element ) => {
		const status = $element.text();
		if ( status === 'Live' ) {
			BluehostHomePage.siteStatus().click();
			LaunchYourStatusPage.goToYourSiteButton().should( 'exist' );
		} else {
			BluehostHomePage.launchYourSite().click();
			LaunchYourStatusPage.launchYourStoreButton().click();
			LaunchYourStatusPage.continueButton().click();
			LaunchYourStatusPage.goToYourSiteButton().should( 'exist' );
		}
	} );
}
