import { test, expect } from '@playwright/test';
import {
  wordpress,
  auth,
  navigateToHomePage,
  uninstallWooCommerce,
} from '../helpers/index.mjs';

test.describe('ECommerce Module', () => {
	
	test.beforeEach(async ({ page }) => {
		// login to WordPress
		await auth.loginToWordPress(page);

		// uninstall WooCommerce
		await uninstallWooCommerce();

		// Persist personal site type (deleting the option in the same hook used to run before the
		// update finished, and left site_type unset, so store CTAs could still appear from the plan).
		await wordpress.setOption(
			'nfd_module_onboarding_site_info',
			`'{ "site_type": "personal" }' --format=json`
		);
		// reset next steps data
		await wordpress.wpCli('option delete nfd_next_steps', { failOnNonZeroExit: false });
		// reset solutions transient
		await wordpress.wpCli('transient delete newfold_solutions');
	});
	test.afterAll(async () => {
		// match ecommerce.spec / other suites: leave onboarding site info unscoped for next files
		await wordpress.wpCli('option delete nfd_module_onboarding_site_info', { failOnNonZeroExit: false });
	});

	test.describe('No Store - Store Info', () => {
		test('Store info section does not display', async ({ page }) => {
			await navigateToHomePage(page);

			await expect(page.locator('.nfd-button[data-store-info-trigger="true"]')).not.toBeVisible();
		});
	});

	test.describe('No Woo - Quick Add Product', () => {
		test('Add product not visible', async ({ page }) => {
			await navigateToHomePage(page);
			
			// Add assertions for Quick Add Product widget
			await expect(page.locator('.nfd-button[data-quick-add-product-trigger="true"]')).not.toBeVisible();
		});
	});

});
