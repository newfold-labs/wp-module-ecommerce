/**
 * ECommerce Module Test Helpers for Playwright
 * 
 * - Plugin Helpers (re-exported)
 * - Constants
 * - Navigation Helpers
 * - (Add module-specific helpers as needed)
 */
import { join } from 'path';
import { pathToFileURL } from 'url';

// ============================================================================
// PLUGIN HELPERS (re-exported from plugin-level helpers)
// ============================================================================

const pluginDir = process.env.PLUGIN_DIR || process.cwd();
const finalHelpersPath = join(pluginDir, 'tests/playwright/helpers/index.mjs');
const helpersUrl = pathToFileURL(finalHelpersPath).href;
const pluginHelpers = await import(helpersUrl);

export const { auth, wordpress, newfold, a11y, utils, woocommerce } = pluginHelpers;

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
  // networkidle is unreliable in WP admin (background HTTP). load + locator assertions is enough.
  await page.waitForLoadState('load');
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
 * Install/uninstall/status helpers for WooCommerce (shared, defined at the plugin level in
 * tests/playwright/helpers/woocommerce.mjs so every module reuses the same implementation).
 */
export const { installWooCommerce, isWooCommerceActive, uninstallWooCommerce } = woocommerce;

/**
 * `siteType` as exposed on `window.NewfoldRuntime` (see `Data::runtime()` and `src/app/pages/home/index.js`).
 * This runs in the *browser* via `page.evaluate` — the test file runs in Node, so `window` is not available
 * at import time; pass `page` after navigating to a route where the app is loaded.
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<string|null>}
 */
export async function getNewfoldRuntimeSiteType(page) {
  return page.evaluate(() => {
    return globalThis.NewfoldRuntime?.siteType ?? null;
  });
}

// ============================================================================
// MODULE-SPECIFIC HELPERS
// ============================================================================

// Add ecommerce-specific helpers here as needed
// Examples:
// - Quick Add Product helpers
// - Store Info modal helpers
// - WooCommerce status checks
