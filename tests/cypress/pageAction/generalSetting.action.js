/// <reference types="cypress" />

import BluehostHomePage from '../pageObject/bluehostHome.page';
import GeneralSettingPage from '../pageObject/dashboard/generalSettings.page';
import WooCommercePage from '../pageObject/wooCommerce.page';
import YithShippoPage from '../pageObject/yithShippo.page';

const data = require( '../fixtures/dashboard.json' );

export function verifyBluehostTabsExists() {
	BluehostHomePage.bluehostHorizontalTab().should(
		'have.length.greaterThan',
		0
	);
}

export function verifyLaunchPadBannerExist() {
	BluehostHomePage.siteStatusInHeader().then( ( $element ) => {
		const status = $element.text();
		if ( status !== 'Live' ) {
			BluehostHomePage.heroBanner().should(
				'have.length.greaterThan',
				0
			);
		}
	} );
}

export function verifySiteStatusEqualsTo( statusText ) {
	BluehostHomePage.siteStatusInHeader().then( ( $element ) => {
		cy.wrap( $element.text() ).should( 'have.text', statusText );
	} );
}

export function verifyVerticleTabsHave( tabList ) {
	BluehostHomePage.siteStatusInHeader().then( ( $element ) => {
		const status = $element.text().trim();
		if ( status !== 'Live' ) {
			tabList[ 4 ] = 'Launch Your Store';
		} else {
			tabList[ 4 ] = 'Site Status';
		}
		tabList.forEach( ( element ) => {
			BluehostHomePage.verticleTabs().contains( element );
		} );
	} );
}

export function verifyGeneralSettingTabHaveCard( cardList ) {
	GeneralSettingPage.uncompletedCards().each( ( $element, index ) => {
		cy.wrap( $element )
			.find( 'span' )
			.should( 'include.text', cardList[ index ] );
	} );
}
export function checkLinkTextIsPresentOnGeneralSettingCardsOnHover() {
	const linkTextList = [ 'Add Info', 'Setup', 'Setup', 'Add Info' ];
	GeneralSettingPage.cardsLinkText().each( ( $el, index ) => {
		cy.wrap( $el )
			.should( 'be.hidden' )
			.and( 'include.text', linkTextList[ index ] );
	} );
}
export function addStoreAddress() {
	GeneralSettingPage.uncompletedCards().eq( 0 ).click();
	GeneralSettingPage.address1().type( data.store_address.address1 );
	GeneralSettingPage.city().type( data.store_address.city );
	GeneralSettingPage.postalCode().type( data.store_address.zipcode );
	GeneralSettingPage.country().select( data.store_address.country );
	GeneralSettingPage.state().select( data.store_address.state );
	GeneralSettingPage.storeInfoContinueButton().click();
}
export function verifyStoreInfoCardIsInDoneState() {
	GeneralSettingPage.completedCards().should( 'include.text', 'Store Info' );
}
export function verifyEnteredStoreAddressIsSameOnWooCommerceSetting() {
	GeneralSettingPage.completedCards().contains( 'Store Info' ).click();
	WooCommercePage.addressLine1().should(
		'have.value',
		data.store_address.address1
	);
	WooCommercePage.city().should( 'have.value', data.store_address.city );
	WooCommercePage.country().should(
		'have.text',
		`${ data.store_address.country + ' — ' + data.store_address.state }`
	);
	WooCommercePage.zipCode().should(
		'have.value',
		data.store_address.zipcode
	);
}

export function linkExistingPaymentAccount() {
	GeneralSettingPage.uncompletedCards().contains( 'Payments' ).click();
	GeneralSettingPage.loadIframe();
	GeneralSettingPage.paypalTitle().clear();

	if ( data.existing_payment.environment === 'sandbox' ) {
		GeneralSettingPage.paypalRadioButtonList().eq( 1 ).click();
	} else {
		GeneralSettingPage.paypalRadioButtonList().eq( 0 ).click();
	}
	if (
		data.existing_payment.payment_action.toLowerCase().includes( 'sale' )
	) {
		GeneralSettingPage.paypalRadioButtonList().eq( 2 ).click();
	} else {
		GeneralSettingPage.paypalRadioButtonList().eq( 3 ).click();
	}
	GeneralSettingPage.paypalSaveButton().click();
}

export function verifyPaymentCardsInDoneSection() {
	GeneralSettingPage.completedCards().should( 'include.text', 'Payments' );
}
export function linkExistingShippoAccount() {
	GeneralSettingPage.uncompletedCards().contains( 'Shipping' ).click();
	GeneralSettingPage.loadIframe( { timeout: 20000 } );
	if (
		data.existing_shipping.environment.toLowerCase().includes( 'sandbox' )
	) {
		GeneralSettingPage.shippoEnvRadioButtonList().eq( 1 ).click();
	} else {
		GeneralSettingPage.shippoEnvRadioButtonList().eq( 0 ).click();
	}
	GeneralSettingPage.shippingAPI()
		.clear()
		.type( data.existing_shipping.test_api );
	GeneralSettingPage.senderName()
		.clear()
		.type( data.existing_shipping.sender_name );
	GeneralSettingPage.companyName()
		.clear()
		.type( data.existing_shipping.sender_company );
	GeneralSettingPage.senderEmail()
		.clear()
		.type( data.existing_shipping.email );
	if ( data.existing_shipping.use_woocommerce_address ) {
		GeneralSettingPage.wooCommerceSavedStoreAddress().click();
	}
	GeneralSettingPage.shippoSaveButton().click();
}

export function verifyShippingCardIsInDoneState() {
	GeneralSettingPage.completedCards().should( 'include.text', 'Shipping' );
}

export function verifyFilledShippingInformationSavedInYith() {
	GeneralSettingPage.completedCards().contains( 'Shipping' ).click();

	YithShippoPage.selectedShippoEnv().should(
		'include.value',
		data.existing_shipping.environment
	);
	YithShippoPage.shippoAPI().should(
		'have.value',
		data.existing_shipping.test_api
	);

	YithShippoPage.shippoShippingTab().eq( 1 ).click();
	YithShippoPage.senderName().should(
		'have.value',
		data.existing_shipping.sender_name
	);
	YithShippoPage.compnayName().should(
		'have.value',
		data.existing_shipping.sender_company
	);
	YithShippoPage.email().should( 'have.value', data.existing_shipping.email );
}
export function selectTaxOption( option ) {
	GeneralSettingPage.uncompletedCards().contains( 'Tax Info' ).click();
	GeneralSettingPage.taxOptionList().eq( option ).click();
	GeneralSettingPage.taxContinueButton().click();
}

export function verifyTaxInfoCardInDoneState() {
	GeneralSettingPage.completedCards().should( 'include.text', 'Tax Info' );
}

export function verifyTaxOptionIsEnableInWooCommerce() {
	GeneralSettingPage.completedCards().contains( 'Tax Info' ).click();
	WooCommercePage.wooCommerceTabs().should( 'include.text', 'Tax' );
}

export function deleteAllTaxRow() {
	GeneralSettingPage.completedCards().contains( 'Tax Info' ).click();
	WooCommercePage.standardTaxOption().click();
	try {
		WooCommercePage.countryRowList().then( ( $element ) => {
			for ( let k = 0; k < $element.length; k++ ) {
				cy.get( 'td.compound>input' ).eq( 0 ).check();
				WooCommercePage.deleteRow().click();
			}
			WooCommercePage.saveChanges().click();
		} );
	} catch ( error ) {}
	cy.go( 'back' );
}

export function setStandardRate() {
	WooCommercePage.standardTaxOption().click();

	WooCommercePage.insertRow().click();
	WooCommercePage.countryRowList().then( ( $element ) => {
		const count = $element.length;
		WooCommercePage.countryRowList()
			.eq( count - 1 )
			.find( 'input' )
			.type( data.standard_tax_setting.country_code );
		WooCommercePage.stateCodeRowList()
			.eq( count - 1 )
			.find( 'input' )
			.type( data.standard_tax_setting.state_code );
		WooCommercePage.taxRateRowList()
			.eq( count - 1 )
			.find( 'input' )
			.type( data.standard_tax_setting.rate_percentage );
		if ( data.standard_tax_setting.apply_to_shipping === true ) {
			WooCommercePage.applyToShippingRowList()
				.eq( count - 1 )
				.click();
		}
		WooCommercePage.saveChanges().click();
	} );
}

export function verifyAllCardAreInDoneState() {
	GeneralSettingPage.uncompletedCards().should( 'have.length', 4 );
}
