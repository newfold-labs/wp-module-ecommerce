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
 * Install and activate WooCommerce plugin
 */
export async function installWooCommerce() {
  try {
    await wordpress.wpCli('plugin install woocommerce --activate', {
      timeout: 15000,
    });
  } catch (error) {
    utils.fancyLog('Failed to install WooCommerce:' + error.message, 100, 'yellow');
  }
}

/**
 * @returns {Promise<boolean>} true if `wp plugin is-active woocommerce` exits 0
 *   (this helper’s wpCli() returns 0 for empty success stdout).
 */
export async function isWooCommerceActive() {
  return (await wordpress.wpCli('plugin is-active woocommerce')) === 0;
}

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

/**
 * Uninstall WooCommerce. Runs `deactivate --uninstall` first; if the plugin
 * is still active (e.g. uninstall step failed), runs `plugin deactivate` so
 * later tests do not run with WooCommerce still active. Repeats up to
 * `maxAttempts` (no unbounded recursion).
 */
export async function uninstallWooCommerce() {
  const maxAttempts = 3;
  for (let i = 0; i < maxAttempts; i++) {
    if (!(await isWooCommerceActive())) {
      return;
    }
    await wordpress.wpCli('plugin deactivate woocommerce --uninstall');
    if (!(await isWooCommerceActive())) {
      return;
    }
    await wordpress.wpCli('plugin deactivate woocommerce');
  }
  if (await isWooCommerceActive()) {
    utils.fancyLog(
      'WooCommerce is still active after multiple deactivate attempts; later tests may fail.',
      100,
      'yellow',
    );
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
