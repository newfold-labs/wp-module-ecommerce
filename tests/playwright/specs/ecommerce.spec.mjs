import { test, expect } from '@playwright/test';
import {
  wordpress,
  auth,
  navigateToHomePage,
  installWooCommerce,
  uninstallWooCommerce,
} from '../helpers/index.mjs';

test.describe('ECommerce Module', () => {
  
	test.beforeAll(async () => {
		// install and activate WooCommerce
		await installWooCommerce();
		// set site type to store
		wordpress.setOption('nfd_module_onboarding_site_info', `'{ "site_type": "store" }' --format=json`);
	});
	test.afterAll(async () => {
		// uninstall WooCommerce
		await uninstallWooCommerce();
		// reset site type to default
		await wordpress.wpCli('option delete nfd_module_onboarding_site_info');
		// reset next steps data
		await wordpress.wpCli('option delete nfd_next_steps', { failOnNonZeroExit: false });
	});
	test.beforeEach(async ({ page }) => {
		// login to WordPress
		await auth.loginToWordPress(page);
	});

	test('App loads without errors', async ({ page }) => {
		await navigateToHomePage(page);
		await page.waitForLoadState('networkidle');
		
		// Verify the page loaded (no fatal errors)
		await expect(page.locator('body')).not.toContainText('Fatal error');
		await expect(page.locator('body')).not.toContainText('Error:');
	});

	test.describe('Quick Add Product', () => {
		test('Add Product button is visible in next steps', async ({ page }) => {
			await navigateToHomePage(page);
			await page.waitForLoadState('networkidle');
			
			// Add assertions for Quick Add Product widget
			await expect(page.locator('.nfd-button[data-quick-add-product-trigger="true"]')).toContainText('Add product');
		});
	});

	test.describe('Store Info', () => {
		test('Store info section displays correctly', async ({ page }) => {
			await navigateToHomePage(page);
			await page.waitForLoadState('networkidle');

			// Store details button is visible
			await expect(page.locator('.nfd-button[data-store-info-trigger="true"]')).toContainText('Add Store Details');
		});
	});

});
