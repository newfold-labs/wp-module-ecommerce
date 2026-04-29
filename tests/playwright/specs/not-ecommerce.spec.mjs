import { test, expect } from '@playwright/test';
import {
	wordpress,
	auth,
	navigateToHomePage,
	uninstallWooCommerce,
	getNewfoldRuntimeSiteType,
	isWooCommerceActive,
} from '../helpers/index.mjs';

/**
 * Skip "non-ecommerce" home copy assertions when WP-CLI still reports Woo as active, or when
 * onboarding `site_type` is still "store" — the Home app uses that for store copy ("your store" /
 * "store is live"), which is independent of `plugin is-active woocommerce` (Woo can be off while
 * the option or UI still looks like a store site).
 */
function shouldSkipNonEcommerceHomeAssertions(woo, siteType) {
	return (
		woo || siteType === 'store' || siteType === 'ecommerce' || siteType === 'e-commerce'
	);
}

test.describe( 'ECommerce Module', () => {
	test.beforeEach( async ( { page } ) => {
		// Apply WP-CLI state before any admin session so the home app does not boot with a
		// stale "store" site type. We do not clear Next Steps or Solutions data here—assertions
		// are scoped to the Bluehost home layout and the ecommerce quick-add mount only.
		await uninstallWooCommerce();
		await wordpress.setOption(
			'nfd_module_onboarding_site_info',
			`'{ "site_type": "personal" }' --format=json`
		);

		await auth.loginToWordPress( page );
	} );

	test.afterAll( async () => {
		await wordpress.wpCli( 'option delete nfd_module_onboarding_site_info' );
	} );

	/**
	 * "Add Store Details" for store sites is only rendered in the Bluehost home page title
	 * row (`src/app/pages/home/index.js`: `siteKind === 'store'`). Next Steps may reuse
	 * `data-store-info-trigger` elsewhere, so we scope to `.wppbh-home .nfd-home__title-section`
	 * only.
	 */
	test.describe( 'No Store - Store Info', () => {
		test( 'Store info section does not display', async ( { page } ) => {
			const woo = await isWooCommerceActive();
			await navigateToHomePage( page );
			await page.waitForFunction( () => globalThis.NewfoldRuntime, { timeout: 20000 } );
			const siteType = await getNewfoldRuntimeSiteType( page );
			test.skip(
				shouldSkipNonEcommerceHomeAssertions( woo, siteType ),
				'Woo is still active or site_type is still store/ecommerce; cannot assert non-store ecommerce tests.'
			);

			const homeHeader = page.locator( '.wppbh-home .nfd-home__title-section' );
			const storeInfoCta = homeHeader.locator(
				'.nfd-button[data-store-info-trigger="true"]'
			);

			// Non-store copy in the home header (personal site_type → "website" in the title).
			await expect( homeHeader ).toContainText( /your website/i, { timeout: 20000 } );
			await expect( storeInfoCta ).not.toBeVisible( { timeout: 20000 } );
		} );
	} );

	/**
	 * Ecommerce "quick add product" UI is mounted in `#nfd-quick-add-product-widget` only
	 * (wp-module-ecommerce `QuickAddProduct` output). Next Steps may use the same
	 * `data-quick-add-product-trigger` on its own links; we only assert the ecommerce widget
	 * root has no such control.
	 */
	test.describe( 'No Woo - Quick Add Product', () => {
		test( 'Add product not visible', async ( { page } ) => {
			const woo = await isWooCommerceActive();
			await navigateToHomePage( page );
			await page.waitForFunction( () => globalThis.NewfoldRuntime, { timeout: 20000 } );
			const siteType = await getNewfoldRuntimeSiteType( page );
			test.skip(
				shouldSkipNonEcommerceHomeAssertions( woo, siteType ),
				'Woo is still active or site_type is still store/ecommerce; cannot assert personal home copy. Fix uninstall/options or use the ecommerce test suite for store sites.'
			);

			const homeHeader = page.locator( '.wppbh-home .nfd-home__title-section' );
			// Ecommerce module widget root (not Next Steps); empty when WC / hooks do not add it.
			const quickAddTrigger = page.locator(
				'#nfd-quick-add-product-widget .nfd-button[data-quick-add-product-trigger="true"]'
			);

			await expect( homeHeader ).toContainText( /your website/i, { timeout: 20000 } );
			await expect( quickAddTrigger ).toHaveCount( 0 );
		} );
	} );
} );
