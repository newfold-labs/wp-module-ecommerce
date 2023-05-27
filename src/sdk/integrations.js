import apiFetch from "@wordpress/api-fetch";

const Endpoints = {
  INTEGRATIONS: "/newfold-ecommerce/v1/integrations/",
};

/**
 * @typedef IntegrationDetails
 * @property {"sandbox" | "live"} environment
 * @property {string?} email
 *
 * @typedef IntegrationStatus
 * @property {boolean} complete
 * @property {IntegrationDetails} details
 */

export const IntegrationsSdk = {
  /** @type {(id: "paypal" | "shippo" | "razorpay") => Promise<IntegrationStatus>} */
  async status(id) {
    return apiFetch({ path: Endpoints.INTEGRATIONS + id });
  },
};
