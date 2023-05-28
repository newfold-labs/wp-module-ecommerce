import apiFetch from "@wordpress/api-fetch";
import { createApiUrl } from "./createApiUrl";

const Endpoints = {
  INTEGRATIONS: (id) =>
    createApiUrl("/newfold-ecommerce/v1/integrations/" + id),
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
    return apiFetch({ url: Endpoints.INTEGRATIONS(id) });
  },
};
