import { NewfoldRuntime } from "@newfold-labs/wp-module-runtime";
import apiFetch from "@wordpress/api-fetch";

/**
 * @typedef MarketplaceProducts
 * @property {string} clickToBuyId
 * @property {string} name
 * @property {string} primaryUrl
 *
 */

const Endpoints = {
  PRODUCTS: NewfoldRuntime.createApiUrl("/newfold-marketplace/v1/marketplace"),
};

export const MarketplaceSdk = {
  /** @type {() => Promise<MarketplaceProducts[]>} */
  async eCommerceOptions() {
    const ctbIsSupported = window.nfdctb?.supportsCTB;
    let marketplace = await apiFetch({ url: Endpoints.PRODUCTS });
    let products = marketplace.products?.data
      ?.filter(
        (product) =>
          product.categories?.includes("eCommerce") &&
          product.vendor?.name === "YITH" &&
          product.type === "plugin"
      )
      .map((product) => ({
        clickToBuyId: ctbIsSupported ? product.clickToBuyId : null,
        name: product.name,
        primaryUrl: product.primaryUrl,
      }));
    return products;
  },
};
