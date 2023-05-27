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
  status: {
    /** @type {() => Promise<IntegrationStatus>} */
    async paypal() {
      return apiFetch({ path: Endpoints.INTEGRATIONS + "paypal" });
    },
    /** @type {() => Promise<IntegrationStatus>} */
    async shippo() {
      return apiFetch({ path: Endpoints.INTEGRATIONS + "shippo" });
    },
    /** @type {() => Promise<IntegrationStatus>} */
    async razorpay() {
      return apiFetch({ path: Endpoints.INTEGRATIONS + "razorpay" });
    },
  },
};
