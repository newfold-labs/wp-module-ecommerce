import { NewfoldRuntime } from "@newfold-labs/wp-module-runtime";
import apiFetch from "@wordpress/api-fetch";

const Endpoints = {
  INTEGRATIONS: (id) =>
    NewfoldRuntime.createApiUrl("/newfold-ecommerce/v1/integrations/" + id),
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
