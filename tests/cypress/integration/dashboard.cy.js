/// <reference types="cypress" />
///<reference types="cypress-iframe" />

import 'cypress-iframe';

const homePageUrl = '/wp-admin/admin.php?page=bluehost#/home/store/general';

describe( 'As a customer, I want to ', function () {
	before( () => {
		cy.fixture( 'dashboard' ).then( ( data ) => {
			this.data = data;
		} );
	} );

	before( () => {
		cy.activatePlugin( 'all' );
		cy.removeAllStandardTax();
		cy.deleteAllProducts();
		cy.deleteAllPages();
		cy.resetGeneralSettingTabs();
	} );

	beforeEach( () => {
		cy.login( Cypress.env( 'wpUsername' ), Cypress.env( 'wpPassword' ) );
		cy.visit( homePageUrl );
		cy.wait( 1000 );
	} );

	it( 'verify "WooCommerce is not installed!" model displaying when WooCommerce plugin is not install or active', () => {
		cy.findByText( 'Uh-Oh! WooCommerce is not installed!' ).should(
			'exist'
		);
		cy.findByText(
			'WooCommerce is required for this dashboard to work, install it now or contact our support team for more assistance.'
		).should( 'exist' );
		cy.findByText( 'Install WooCommerce' ).should( 'exist' );
		cy.findByText( 'Contact Support' )
			.should( 'exist' )
			.and( 'have.attr', 'href', 'https://www.bluehost.com/contact' );
	} );

	it( 'see the launch pad banner on top of the home page when site status is not live', () => {
		cy.findByTitle( 'Launch Your Site' )
			.find( 'span' )
			.then( ( $element ) => {
				const status = $element.text();
				if ( status !== 'Live' ) {
					BluehostHomePage.heroBanner().should(
						'have.length.greaterThan',
						0
					);
				}
			} );
	} );

	it( 'see all 5 vertical tabs on Home Page', () => {
		const tabList = [
			'Store Info',
			'Products and Services',
			'Pages',
			'Additional Features',
			'Launch Your Store/Site Status',
		];
		cy.findByTitle( 'Launch Your Site' )
			.find( 'span' )
			.then( ( $element ) => {
				const status = $element.text().trim();
				if ( status !== 'Live' ) {
					tabList[ 4 ] = 'Launch Your Store';
				} else {
					tabList[ 4 ] = 'Site Status';
				}
				tabList.forEach( ( element ) => {
					cy.findByLabelText( 'Setup Guide' )
						.find( 'a>li' )
						.contains( element );
				} );
			} );
	} );

	it( 'see Store Info, Payments, Shipping and Tax info cards in General Setting tab', () => {
		const cardList = [ 'Store Info', 'Payments', 'Shipping', 'Tax Info' ];
		cy.get( '[data-variant=standard]' )
			.as( 'uncompletedCard' )
			.each( ( $element, index ) => {
				cy.wrap( $element )
					.find( 'span' )
					.should( 'include.text', cardList[ index ] );
			} );

		const linkTextList = [ 'Add Info', 'Setup', 'Setup', 'Add Info' ];
		cy.get( '@uncompletedCard' )
			.find( 'span>span' )
			.each( ( $el, index ) => {
				cy.wrap( $el )
					.should( 'be.hidden' )
					.and( 'include.text', linkTextList[ index ] );
			} );
	} );

	it( 'add my Store address from "General Setting" "Store Info" card', () => {
		cy.get( '[data-variant=standard]' )
			.as( 'uncompletedCard' )
			.eq( 0 )
			.click();

		cy.get( 'input[name=woocommerce_store_address]' ).type(
			this.data.store_address.address1
		);
		cy.get( '[name=woocommerce_store_city]' ).type(
			this.data.store_address.city
		);
		cy.get( 'input[name=woocommerce_store_postcode]' ).type(
			this.data.store_address.zipcode
		);
		cy.get( 'select[name=country]' ).select(
			this.data.store_address.country
		);
		cy.get( 'select[name=state]' ).select( this.data.store_address.state );
		cy.get( 'button[type=submit]' ).click();

		cy.get( '[data-variant=minimal]' )
			.as( 'completedCard' )
			.should( 'include.text', 'Store Info' );
		cy.get( '@completedCard' ).contains( 'Store Info' ).click();

		cy.get( 'input#woocommerce_store_address' ).should(
			'have.value',
			this.data.store_address.address1
		);

		cy.get( 'input#woocommerce_store_city' ).should(
			'have.value',
			this.data.store_address.city
		);
		cy.get(
			'select[name=woocommerce_default_country] option:selected'
		).should(
			'have.text',
			`${
				this.data.store_address.country +
				' — ' +
				this.data.store_address.state
			}`
		);
		cy.get( 'input#woocommerce_store_postcode' ).should(
			'have.value',
			this.data.store_address.zipcode
		);
	} );

	it( 'see the option to link my existing payment method in General Setting', () => {
		cy.get( '[data-variant=standard]' )
			.as( 'uncompletedCards' )
			.contains( 'Payments' )
			.click();
		cy.frameLoaded( 'iframe' );

		cy.iframe().findByLabelText( 'Title' ).parent().find( 'input' ).clear();
		cy.iframe()
			.find( '[data-type=radio] label' )
			.as( 'paypalRadioButtons' );
		if ( this.data.existing_payment.environment === 'sandbox' ) {
			cy.get( '@paypalRadioButtons' ).eq( 1 ).click();
		} else {
			cy.get( '@paypalRadioButtons' ).eq( 0 ).click();
		}
		if (
			this.data.existing_payment.payment_action
				.toLowerCase()
				.includes( 'sale' )
		) {
			cy.get( '@paypalRadioButtons' ).eq( 2 ).click();
		} else {
			cy.get( '@paypalRadioButtons' ).eq( 3 ).click();
		}
		cy.iframe().find( 'button#yith-bh-save-button' ).click();
	} );

	it( 'verify a model is displaying when "YITH PayPal Payments" plugin is not installed', () => {
		cy.deactivatePlugin( 'YITH PayPal Payments for WooCommerce Extended' );
		cy.visit( homePageUrl );
		cy.get( '[data-variant=standard]' ).contains( 'Payments' ).click();
		cy.get( '[role=document] h1' )
			.should( 'exist' )
			.and( 'have.text', 'Hold tight...' );
	} );

	it( 'verify a model is displaying when "YITH Shippo" plugin is not installed', () => {
		cy.deactivatePlugin( 'YITH Shippo Shippings for WooCommerce Extended' );
		cy.visit( homePageUrl );
		cy.get( '[data-variant=standard]' ).contains( 'Shipping' ).click();
		cy.get( '[role=document] h1' )
			.should( 'exist' )
			.and( 'have.text', 'Hold tight...' );
	} );

	//  Currently Failing Due To Bug Id: PRESS4-88
	it( 'link my existing shippo account in General Setting', () => {
		cy.activatePlugin( 'YITH Shippo Shippings for WooCommerce Extended' );
		cy.visit( homePageUrl );

		cy.get( '[data-variant=standard]' ).contains( 'Shipping' ).click();
		cy.get( '[data-variant=standard]' )
			.as( 'uncompletedCards' )
			.contains( 'Payments' )
			.click();
		cy.frameLoaded( 'iframe' );

		cy.iframe()
			.find( '[data-type=radio] label' )
			.as( 'shippoRadioButtonList' );
		if (
			this.data.existing_shipping.environment
				.toLowerCase()
				.includes( 'sandbox' )
		) {
			cy.get( '@shippoRadioButtonList' ).eq( 1 ).click();
		} else {
			cy.get( '@shippoRadioButtonList' ).eq( 0 ).click();
		}
		cy.iframe()
			.find( 'input#yith_shippo_sandbox_token' )
			.clear()
			.type( this.data.existing_shipping.test_api );

		cy.iframe()
			.findByLabelText( 'Name' )
			.parent()
			.find( 'input[type=text]' )
			.clear()
			.type( this.data.existing_shipping.sender_name );

		cy.iframe()
			.findByLabelText( 'Company' )
			.parent()
			.find( 'input' )
			.clear()
			.type( this.data.existing_shipping.sender_company );

		cy.iframe()
			.findByLabelText( 'Email' )
			.parent()
			.find( 'input' )
			.clear()
			.type( this.data.existing_shipping.email );

		if ( this.data.existing_shipping.use_woocommerce_address ) {
			cy.iframe().find( '[type=checkbox]' ).click();
		}
		cy.iframe().findByText( 'Save' ).click();

		cy.get( '[data-variant=minimal]' )
			.as( 'completedCard' )
			.should( 'include.text', 'Shipping' );
		cy.contains( 'Shipping' ).click();

		// Verify Value has enter properly into Yith SHippo

		cy.get( 'input[type=radio][checked=checked]' ).should(
			'include.value',
			this.data.existing_shipping.environment
		);

		cy.get( '#yith_shippo_sandbox_token' ).should(
			'have.value',
			this.data.existing_shipping.test_api
		);

		cy.get( 'ul.yith-plugin-fw-tabs>li' ).eq( 1 ).click();

		cy.get( '#yith-shippo-sender-info-name' ).should(
			'have.value',
			this.data.existing_shipping.sender_name
		);
		cy.get( '#yith-shippo-sender-info-company' ).should(
			'have.value',
			this.data.existing_shipping.sender_company
		);
		cy.get( '#yith-shippo-sender-info-email' ).should(
			'have.value',
			this.data.existing_shipping.email
		);
	} );

	it.skip( 'select, "I dont charge sales taxes"', () => {
		cy.contains( 'Tax Info' ).click();
		cy.get( 'div[role=button]' ).eq( 2 ).click();
		cy.findByText( 'Continue' ).click();

		cy.get( '[data-variant=minimal]' ).should( 'include.text', 'Tax Info' );
		cy.exec( 'npx wp-env run cli wp option delete woocommerce_calc_taxes' );
		cy.exec(
			'npx wp-env run cli wp option delete woocommerce_no_sales_tax'
		);

		// cy.task(
		//   'queryDb',
		//   `DELETE FROM ${Cypress.env(
		//     'wpOptionTableName'
		//   )} WHERE option_name IN ('woocommerce_calc_taxes','woocommerce_no_sales_tax');`
		// );
	} );

	it( 'configure "Yes, enable tax rates and calculations" from "General setting" "Tax Info" card', () => {
		cy.contains( 'Tax Info' ).click();
		cy.get( 'div[role=button]' ).eq( 0 ).click();
		cy.findByText( 'Continue' ).click();

		cy.get( '[data-variant=minimal]' ).should( 'include.text', 'Tax Info' );
		cy.contains( 'Tax Info' ).click();

		cy.get( 'form#mainform>nav>a' ).should( 'include.text', 'Tax' );

		// setStandardRate
		cy.findByText( 'Standard rates' ).click();

		cy.get( 'a.button.plus.insert' ).click();

		cy.get( 'td.country' ).then( ( $element ) => {
			const count = $element.length;
			cy.get( 'td.country' )
				.eq( count - 1 )
				.find( 'input' )
				.type( this.data.standard_tax_setting.country_code );
			cy.get( 'td.state' )
				.eq( count - 1 )
				.find( 'input' )
				.type( this.data.standard_tax_setting.state_code );
			cy.get( 'td.rate' )
				.eq( count - 1 )
				.find( 'input' )
				.type( this.data.standard_tax_setting.rate_percentage );
			if ( this.data.standard_tax_setting.apply_to_shipping === true ) {
				cy.get( 'td.apply_to_shipping' )
					.find( 'input' )
					.eq( count - 1 )
					.click();
			}
			cy.get( 'button[name=save]' ).click();
		} );
	} );

	it( 'see "Add a product" and "Import Product" cards in Your Product tab', () => {
		cy.findByText( 'Products and Services' ).click();
		[ 'Add Products', 'Import Products' ].forEach( ( card ) => {
			cy.contains( card );
		} );
	} );

	it( 'add a product from "Your product" tabs', () => {
		cy.findByText( 'Products and Services' ).click();
		cy.findAllByText( 'Add Products' ).eq( 1 ).click();

		cy.get( '[name=post_title]' ).type(
			this.data.simple_product_details.name
		);
		cy.get( 'select#product-type' ).select( 'Simple product' );
		cy.get( '[name=_regular_price]' ).type(
			this.data.simple_product_details.regular_price
		);
		cy.get( '[name=_sale_price]' ).type(
			this.data.simple_product_details.sale_price
		);

		cy.findByLabelText( 'Tax status' )
			.parent()
			.find( 'select' )
			.select( this.data.simple_product_details.tax_status );

		cy.findByLabelText( 'Tax class' )
			.parent()
			.find( 'select' )
			.select( this.data.simple_product_details.tax_class );

		cy.findByText( 'Inventory' ).parent().click();

		cy.get( '[name=_sku]' ).type( this.data.simple_product_details.sku );

		cy.get( '[name=_manage_stock]' ).click();
		cy.get( '[name=_stock]' ).type(
			this.data.simple_product_details.stock_quantity
		);
		cy.get( '[name=_low_stock_amount]' ).type(
			this.data.simple_product_details.low_stock_threshold
		);

		cy.get( 'a[href="#product_cat-add"]' ).click();
		cy.get( '[value="New category name"]' )
			.eq( 0 )
			.type( this.data.simple_product_details.category );
		cy.get( '[value="Add new category"]' ).eq( 0 ).click();
		cy.get( '#product_catchecklist' )
			.contains( this.data.simple_product_details.category.toString() )
			.find( 'input' )
			.then( ( $element ) => {
				if ( $element.prop( 'checked' ) === false ) {
					cy.wrap( $element ).check();
				}
			} );

		cy.get( 'input#new-tag-product_tag' ).type(
			this.data.simple_product_details.tags
		);
		cy.get( '[value=Add]' ).click();

		cy.get( '[name=publish]' ).click();
		cy.go( 'back' );
		cy.go( 'back' );

		cy.findByText( 'Add a product' ).should( 'exist' );
		cy.deleteAllProducts();
	} );

	it( 'import product from external file', () => {
		cy.findByText( 'Products and Services' ).click();
		cy.findByText( 'Import Products' ).click();
		cy.get( '[name=import]' ).selectFile(
			'./tests/cypress/fixtures/wc-products-list.csv'
		);
		cy.findByText( 'Continue' ).click();
		cy.findByText( 'Run the importer' ).click();
		cy.get( 'section.woocommerce-importer-done', {
			timeout: 30000,
		} ).should( 'exist' );
		cy.findByText( 'View products' ).should( 'exist' );
	} );

	it( 'Verify Add a Product, Manage a Product, Categories, Tags cards is visible after adding a product', () => {
		cy.findByText( 'Products and Services' ).click();
		[ 'Add a product', 'Manage products', 'Categories', 'Tags' ].forEach(
			( card ) => {
				cy.contains( card );
			}
		);
	} );

	it( "verify 'Add a Product', 'Manage a Product', 'Categories', 'Tags' redirecting to right page after click", () => {
		cy.findByText( 'Products and Services' ).click();

		cy.get( 'button[data-variant=minimal]' ).as( 'Cards' ).eq( 0 ).click();
		cy.findByText( 'Add manually' ).should( 'exist' );
		cy.get( '[role=main]' ).contains( 'Back' ).as( 'backButton' ).click();

		cy.get( '@Cards' ).eq( 1 ).click();
		cy.contains( 'Add New' ).should( 'exist' );

		//FIXME: Fix after [Bug ID:]
		cy.go( 'back' );

		cy.get( '@Cards' ).eq( 2 ).click();
		cy.get( '[value="Add new category"]' ).should( 'exist' );
		cy.get( '@backButton' ).click();

		cy.get( '@Cards' ).eq( 3 ).click();
		cy.get( '[value="Add new tag"]' ).should( 'exist' );
		cy.get( '@backButton' ).click();
	} );

	it( "verify 'How to add product' card exist", () => {
		const urlToVerify =
			'https://woocommerce.com/document/managing-products/';

		cy.findByText( 'Products and Services' ).click();
		cy.window().then( ( win ) => {
			cy.stub( win, 'open' )
				.as( 'windowOpen' )
				.callsFake( () => {} );
		} );

		cy.get( 'button[data-variant=minimal]' )
			.contains( 'How to add products' )
			.click();

		cy.get( '@windowOpen' ).should(
			'be.calledWith',
			urlToVerify,
			'_blank'
		);
	} );

	it( 'verify "customize Your Store" cards exist', () => {
		cy.get( 'a > li' ).contains( 'Pages' ).click();
		[
			'Home Page',
			'About Page',
			'Contact Page',
			'Store Layout',
			'Customer Account Page',
		].forEach( ( element ) => {
			cy.contains( element );
		} );
	} );

	it( 'create home page, about page, contcat page', () => {
		cy.get( 'a > li' ).contains( 'Pages' ).click();

		// Create HomePage
		cy.contains( 'Home Page' ).click();
		// cy.get('div.loaded', { timeout: 1000 });
		cy.contains( 'Homepage' ).should( 'exist' );
		cy.get( 'button' ).contains( 'Publish' ).click();
		cy.get( 'div.editor-post-publish-panel' )
			.find( 'button' )
			.contains( 'Publish' )
			.click();
		cy.contains( 'is now live.', { timeout: 10000 } );
		cy.contains( 'Back' ).click();

		cy.contains( 'About Page' ).click();
		cy.contains( 'About Us' ).should( 'exist' );
		// cy.get('div.loaded', { timeout: 1000 });
		cy.get( 'button' ).contains( 'Publish' ).click();
		cy.get( 'div.editor-post-publish-panel' )
			.find( 'button' )
			.contains( 'Publish' )
			.click();
		cy.contains( 'is now live.', { timeout: 10000 } );
		cy.contains( 'Back' ).click();

		cy.contains( 'Contact Page' ).click();
		cy.contains( 'Contact Us' ).should( 'exist' );
		// cy.get('div.loaded', { timeout: 1000 });
		cy.get( 'button' ).contains( 'Publish' ).click();
		cy.get( 'div.editor-post-publish-panel' )
			.find( 'button' )
			.contains( 'Cancel' );
		cy.get( 'div.editor-post-publish-panel' )
			.find( 'button' )
			.contains( 'Publish' )
			.click();
		cy.contains( 'is now live.', { timeout: 10000 } );
		cy.contains( 'Back' ).click();
	} );

	it( 'change my store layout', () => {
		Cypress.on( 'uncaught:exception', () => {
			// returning false here to prevents Cypress from failing the test
			// Application Error: Cannot read properties of null (reading 'addEventListener')
			return false;
		} );
		cy.get( 'a > li' ).contains( 'Pages' ).click();
		cy.contains( 'Store Layout' ).click();
		cy.contains( 'Site Identity' ).click();
		cy.contains( 'Site Title' )
			.parent()
			.find( 'input' )
			.click()
			.clear()
			.type( 'beyond' );
		cy.get( '[name=save]' ).click();
		cy.get( '[name=save]' ).should( 'be.disabled' );
	} );

	it.skip( 'go to "WooCommerce Customize My Account Page"', () => {
		cy.get( 'a > li' ).contains( 'Pages' ).click();
		cy.contains( 'Customer Account Page' ).click();
		cy.findByText( 'YITH WooCommerce Customize My Account Page' ).should(
			'exist'
		);
	} );

	it( 'check the additional feature exist', () => {
		const freeAddOns = [
			'Add a powerful search tool to your store',
			'Allow your customers to save products in their Wishlist',
			'Add a powerful product filter to your store',
			'Sell Gift Cards in your store',
			"Customize your customers' account page",
			'Manage bookable/rental products',
		];

		cy.contains( 'Additional Features' ).click();
		cy.intercept( 'GET', '/wp-json/newfold-ecommerce/v1/plugins/status*', {
			fixture: 'additionalFeature.json',
		} );
		cy.reload();

		freeAddOns.forEach( ( addon ) =>
			cy.get( '[data-completed=true]' ).contains( addon )
		);
	} );

	it( 'Launch My Store', () => {
		cy.findByTitle( 'Launch Your Site' )
			.find( 'span' )
			.then( ( $element ) => {
				const status = $element.text();
				if ( status === 'Live' ) {
					cy.get( 'a > li' ).contains( 'Site Status' ).click();
				} else {
					cy.get( 'a > li' ).contains( 'Launch Your Store' ).click();
					cy.get( 'button' ).contains( 'Launch your store' ).click();
					cy.findByText( 'Continue' ).click();
				}
				cy.findByText( 'Go to your site!' ).should( 'exist' );
			} );
	} );
} );
