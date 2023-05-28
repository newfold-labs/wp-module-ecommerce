import apiFetch from "@wordpress/api-fetch";
import { createApiUrl } from "./createApiUrl";

const Endpoints = {
  ORDERS: (filter) => createApiUrl("/wc/v3/orders", {}),
};

export const WooCommerceSdk = {
  async orders(filter) {
    return apiFetch({ url: Endpoints.ORDERS(filter) });
  },
};
