import { test, expect } from '@playwright/test';
import {
  wordpress,
  auth,
  navigateToHomePage,
  uninstallWooCommerce,
  utils,
} from '../helpers/index.mjs';

test.describe('ECommerce Module', () => {
	
	test.beforeEach(async ({ page }) => {
		// login to WordPress
		await auth.loginToWordPress(page);

		// uninstall WooCommerce
		await uninstallWooCommerce();
		
		// set site type to personal
		wordpress.setOption('nfd_module_onboarding_site_info', `'{ "site_type": "personal" }' --format=json`);
		// reset site type to default
		await wordpress.wpCli('option delete nfd_module_onboarding_site_info');
		// reset next steps data
		await wordpress.wpCli('option delete nfd_next_steps', { failOnNonZeroExit: false });
		// reset solutions transient
		await wordpress.wpCli('transient delete newfold_solutions');
	});
	test.afterEach(async () => {
		
	});

	test.describe('No Store - Store Info', () => {
		test('Store info section does not display', async ({ page }) => {
			await navigateToHomePage(page);
			await page.waitForLoadState('networkidle');

			// Store details button is visible
			await expect(page.locator('.nfd-button[data-store-info-trigger="true"]')).not.toBeVisible();
		});
	});

	test.describe('No Woo - Quick Add Product', () => {
		test('Add product not visible', async ({ page }) => {
			await navigateToHomePage(page);
			await page.waitForLoadState('networkidle');
			
			// Add assertions for Quick Add Product widget
			await expect(page.locator('.nfd-button[data-quick-add-product-trigger="true"]')).not.toBeVisible();
		});
	});

});
