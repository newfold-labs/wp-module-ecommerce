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
  adminUrl(path, backToNfd = false) {
    let href = window.NFDECOM?.admin_url + path;
    if (backToNfd === false) {
      return href;
    }
    let [page, qs] = href.split("?");
    let query = new URLSearchParams(qs);
    query.set("return_to_nfd", window.location.hash.replace("#", ""));
    return `${page}?${query}`;
  },
};
