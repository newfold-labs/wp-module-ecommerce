import apiFetch from "@wordpress/api-fetch";
import moment from "moment"; //@TODO add to package.json
import { createApiUrl } from "./createApiUrl";
import { safeFetch } from "./safeFetch";

const Endpoints = {
  ORDERS: (period) => createApiUrl("/wc/v3/orders", period),
  PRODUCTS: createApiUrl("/wc/v3/products"),
  Analytics: {
    JETPACK: (range) =>
      createApiUrl("/jetpack/v4/module/stats/data", { range }),
    SALES: (period) => createApiUrl("/wc/v3/reports/sales", period),
  },
  Options: {
    ONBOARDING: createApiUrl("/wc-admin/onboarding/profile"),
    CURRENCY: createApiUrl("/wc/v3/settings/general/woocommerce_currency"),
  },
};

function getPriorPeriodForSales(period) {
  switch (period) {
    case "month":
      return { period: "last_month" };
    case "week":
      return {
        date_min: moment().subtract(2, "weeks").format("YYYY-MM-DD"),
        date_max: moment().subtract(8, "days").format("YYYY-MM-DD"),
      };
    case "day":
    default:
      let yesterday = moment().subtract(1, "day").format("YYYY-MM-DD");
      return { date_min: yesterday, date_max: yesterday };
  }
}

export const WooCommerceSdk = {
  options: {
    async updateOnboarding(data) {
      return safeFetch({
        url: Endpoints.Options.ONBOARDING,
        method: "POST",
        data,
      });
    },
    async currency() {
      return apiFetch({ url: Endpoints.Options.CURRENCY });
    },
  },
  analytics: {
    /**
     *
     * @param {"week" | "day" | "month"} period
     * @returns {{views:[number, number]; visitors:[number, number]}}
     */
    async jetpack(period) {
      let stats = await safeFetch({
        url: Endpoints.Analytics.JETPACK(period),
      });
      if (stats.error !== null || stats.data === undefined) {
        return { views: [], visitors: [] };
      }
      let { data, fields, errors } = stats.data[period];
      if (errors) {
        return { views: [], visitors: [] };
      }
      let [this_period, prior_period] = [
        data[data.length - 1],
        data[data.length - 2],
      ];
      let viewsIndex = fields.findIndex((field) => field === "view");
      let visitorsIndex = fields.findIndex((field) => field === "visitors");
      return {
        views: [this_period[viewsIndex], prior_period[viewsIndex]],
        visitors: [this_period[visitorsIndex], prior_period[visitorsIndex]],
      };
    },
    async sales(period) {
      let currentPeriodResponse = await safeFetch({
        url: Endpoints.Analytics.SALES(period === "day" ? {} : { period }),
      });
      let priorPeriodResponse = await safeFetch({
        url: Endpoints.Analytics.SALES(getPriorPeriodForSales(period)),
      });
      // @TODO Handle error state
      let [current] = currentPeriodResponse.data;
      let [prior] = priorPeriodResponse.data;
      return Object.fromEntries(
        ["total_sales", "net_sales", "total_orders", "total_items"].map(
          (key) => [key, [current[key], prior[key]].map(Number)]
        )
      );
    },
  },
  orders: {
    async list(filter) {
      return apiFetch({
        url: Endpoints.ORDERS({
          after: moment().subtract(1, filter).toISOString(),
        }),
      });
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
