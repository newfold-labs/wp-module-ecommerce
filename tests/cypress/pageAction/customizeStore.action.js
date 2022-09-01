import BluehostHomePage from '../pageObject/bluehostHome.page';
import CustomizeStorePage from '../pageObject/dashboard/customizeYourStore.page';

export function verifyCard( cards ) {
	BluehostHomePage.customizeYourTab().click();
	cards.forEach( ( element ) => {
		cy.contains( element );
	} );
}

export function createPages() {
	createHomePage();
	createAboutPage();
	createContactPage();
}

function createHomePage() {
	BluehostHomePage.customizeYourTab().click();
	CustomizeStorePage.homePage().click();
	CustomizeStorePage.yithThemeHomePageHeader().should( 'exist' );
	CustomizeStorePage.waitForLoaderTill( 10000 );
	CustomizeStorePage.publishButton().click( { force: true } );
	CustomizeStorePage.editorPostPublishButton().click( { force: true } );
	CustomizeStorePage.isNowLiveText();
	cy.go( 'back' );
}

function createAboutPage() {
	CustomizeStorePage.aboutPage().click();
	CustomizeStorePage.yithThemeAboutPageHeader().should( 'exist' );
	CustomizeStorePage.waitForLoaderTill( 10000 );
	CustomizeStorePage.publishButton().click( { force: true } );
	CustomizeStorePage.editorPostPublishButton().click( { force: true } );
	CustomizeStorePage.isNowLiveText();
	cy.go( 'back' );
}

function createContactPage() {
	CustomizeStorePage.contactPage().click();
	CustomizeStorePage.yithThemeContactPageHeader().should( 'exist' );
	CustomizeStorePage.waitForLoaderTill( 10000 );
	CustomizeStorePage.publishButton().click( { force: true } );
	CustomizeStorePage.editorPostCancelButton().should( 'exist' );
	CustomizeStorePage.editorPostPublishButton().click( { force: true } );
	CustomizeStorePage.isNowLiveText();
	cy.go( 'back' );
}

export function storeLayout() {
	BluehostHomePage.customizeYourTab().click();
	CustomizeStorePage.storeLayout().click();
	CustomizeStorePage.siteIdentity().click();
	CustomizeStorePage.siteTitle().click().clear().type( 'beyond' );
	CustomizeStorePage.publishStoreLayout().click();
	CustomizeStorePage.publishStoreLayout().should( 'be.disabled' );
}

export function customerAccount() {
	BluehostHomePage.customizeYourTab().click();
	CustomizeStorePage.customerAccount().click();
	cy.findByText( 'YITH WooCommerce Customize My Account Page' ).should(
		'exist'
	);
}
