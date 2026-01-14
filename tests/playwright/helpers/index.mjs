/**
 * ECommerce Module Test Helpers for Playwright
 * 
 * - Plugin Helpers (re-exported)
 * - Constants
 * - Navigation Helpers
 * - (Add module-specific helpers as needed)
 */
import { expect } from '@playwright/test';
import { join } from 'path';
import { pathToFileURL } from 'url';

// ============================================================================
// PLUGIN HELPERS (re-exported from plugin-level helpers)
// ============================================================================

const pluginDir = process.env.PLUGIN_DIR || process.cwd();
const finalHelpersPath = join(pluginDir, 'tests/playwright/helpers/index.mjs');
const helpersUrl = pathToFileURL(finalHelpersPath).href;
const pluginHelpers = await import(helpersUrl);

export const { auth, wordpress, newfold, a11y, utils } = pluginHelpers;

// ============================================================================
// CONSTANTS
// ============================================================================

/** Plugin ID from environment */
export const pluginId = process.env.PLUGIN_ID || 'bluehost';

/** Common selectors for ecommerce module */
export const SELECTORS = {
  // Add selectors as needed
  // Example:
  // quickAddProductWidget: '[data-testid="quick-add-product"]',
  // storeInfoModal: '[data-testid="store-info-modal"]',
};

// ============================================================================
// NAVIGATION HELPERS
// ============================================================================

/**
 * Navigate to the store/ecommerce page in the plugin
 * @param {import('@playwright/test').Page} page
 */
export async function navigateToStorePage(page) {
    await page.goto(`/wp-admin/admin.php?page=${pluginId}#/store`);
}

/**
 * Navigate to the home page in the plugin
 * @param {import('@playwright/test').Page} page
 */
  export async function navigateToHomePage(page) {
    await page.goto(`/wp-admin/admin.php?page=${pluginId}#/home`);
}

/**
 * Navigate to WooCommerce products page
 * @param {import('@playwright/test').Page} page
 */
export async function navigateToProductsPage(page) {
  await page.goto('/wp-admin/edit.php?post_type=product');
}

/**
 * Wait for ecommerce page to be ready
 * @param {import('@playwright/test').Page} page
 */
export async function waitForStorePage(page) {
  await page.waitForLoadState('networkidle');
}

/**
 * Combined setup: login, navigate to store page, and wait for it to load
 * @param {import('@playwright/test').Page} page
 */
export async function setupAndNavigate(page) {
  await auth.loginToWordPress(page);
  await navigateToStorePage(page);
  await waitForStorePage(page);
}

/**
 * Install and activate WooCommerce plugin
 */
export async function installWooCommerce() {
    try {
      await wordpress.wpCli('plugin install woocommerce --activate', {
        timeout: 15000,
      });
    } catch (error) {
      fancyLog('Failed to install WooCommerce:' + error.message, 55, 'yellow');
    }
  }
  
  /**
   * Uninstall WooCommerce and extensions
   */
  export async function uninstallWooCommerce() {
    try {
      await wordpress.wpCli(
        'plugin uninstall woocommerce --deactivate',
        {
          timeout: 20000,
          failOnNonZeroExit: false,
        }
      );
    } catch (error) {
      fancyLog('Failed to uninstall WooCommerce:' + error.message, 55, 'yellow');
    }
  }

// ============================================================================
// MODULE-SPECIFIC HELPERS
// ============================================================================

// Add ecommerce-specific helpers here as needed
// Examples:
// - Quick Add Product helpers
// - Store Info modal helpers
// - WooCommerce status checks
