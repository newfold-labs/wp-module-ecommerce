/**
 * @typedef BrandSettings
 * @property {string} brand
 * @property {string} name
 * @property {string} url
 * @property {string} hireExpertsInfo
 * @property {string} support
 * @property {string} adminPage
 * @property {{ payment: string[]; shipping: string[] }} setup
 * @property {{ woocommerce_default_country: string; woocommerce_currency: string }} defaultContact
 *
 */

export const RuntimeSdk = {
  /**
   *
   * @returns {BrandSettings}
   */
  get brandSettings() {
    return window.NFDECOM?.brand_settings;
  },
  /**
   *
   * @param {"hasEcomdash" | "hasYithExtended" | "isEcommerce" | "isJarvis"} name Capability to check
   * @returns {boolean}
   */
  hasCapability(name) {
    return window.NFDECOM?.capabilities[name] === true;
  },
};
