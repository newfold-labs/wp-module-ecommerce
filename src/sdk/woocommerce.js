import apiFetch from "@wordpress/api-fetch";
import { createApiUrl } from "./createApiUrl";

const Endpoints = {
  ORDERS: (filter) => createApiUrl("/wc/v3/orders", {}),
  PRODUCTS: createApiUrl("/wc/v3/products"),
  Analytics: {
    JETPACK: (range) =>
      createApiUrl("/jetpack/v4/module/stats/data", { range }),
    SALES: (period) => createApiUrl("/wc/v3/reports/sales", { period }),
  },
  Options: {
    CURRENCY: createApiUrl("/wc/v3/settings/general/woocommerce_currency"),
  },
};

export const WooCommerceSdk = {
  options: {
    async currency() {
      return apiFetch({ url: Endpoints.Options.CURRENCY });
    },
  },
  analytics: {
    async jetpack(period) {
      return await apiFetch({
        url: Endpoints.Analytics.JETPACK(period),
      }).catch((error) => ({}));
    },
    async sales(period) {
      try {
        let [reports] = await apiFetch({
          url: Endpoints.Analytics.SALES(period),
        });
        return reports;
      } catch {
        return {};
      }
    },
  },
  orders: {
    async list(filter) {
      return apiFetch({ url: Endpoints.ORDERS(filter) });
    },
  },
  products: {
    async list() {
      return apiFetch({ url: Endpoints.PRODUCTS });
    },
    async add(data) {
      return apiFetch({ url: Endpoints.PRODUCTS, method: "POST", data }).catch(
        (error) => null
      );
    },
  },
};
