import apiFetch from "@wordpress/api-fetch";
import moment from "moment"; //@TODO add to package.json
import { NewfoldRuntime } from "./NewfoldRuntime";
import { safeFetch } from "./safeFetch";
import { WordPressSdk } from "./wordpress";

const Endpoints = {
  ORDERS: (period) => NewfoldRuntime.createApiUrl("/wc/v3/orders", period),
  PRODUCTS: NewfoldRuntime.createApiUrl("/wc/v3/products"),
  Analytics: {
    JETPACK: (range) =>
      NewfoldRuntime.createApiUrl("/jetpack/v4/module/stats/data", { range }),
    SALES: (period) =>
      NewfoldRuntime.createApiUrl("/wc/v3/reports/sales", period),
  },
  Onboarding: {
    PROFILE: NewfoldRuntime.createApiUrl("/wc-admin/onboarding/profile"),
    TASKS: NewfoldRuntime.createApiUrl("/wc-admin/onboarding/tasks", {
      ids: "setup",
    }),
  },
  Options: {
    CURRENCY: NewfoldRuntime.createApiUrl(
      "/wc/v3/settings/general/woocommerce_currency"
    ),
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
  onboarding: {
    async updateProfile(data) {
      return safeFetch({
        url: Endpoints.Onboarding.PROFILE,
        method: "POST",
        data,
      });
    },
    async tasks() {
      return apiFetch({ url: Endpoints.Onboarding.TASKS });
    },
  },
  options: {
    /**
     * @returns {Promise<string[]>}
     */
    async paymentMethods() {
      let paymentSettings = await WordPressSdk.settings.get();
      return [
        "woocommerce_bacs_settings",
        "woocommerce_cod_settings",
        "woocommerce_cheque_settings",
      ].filter((gateway) => paymentSettings[gateway]?.enabled === "yes");
    },
    async currency() {
      if (NewfoldRuntime.isWoo) {
        return apiFetch({ url: Endpoints.Options.CURRENCY });
      }
    },
  },
  analytics: {
    /**
     *
     * @param {"week" | "day" | "month"} period
     * @returns {{views:[number, number]; visitors:[number, number]}}
     */
    async jetpack(period) {
      if (NewfoldRuntime.isJet) {
        let stats = await safeFetch({
          url: Endpoints.Analytics.JETPACK(period),
        });
        if (stats.error !== null || stats.data === undefined) {
          return { views: [], visitors: [] };
        }
        if (
          Array.isArray(stats.data[period]) &&
          stats.data[period].length === 0
        ) {
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
      }
    },
    async sales(period) {
      if (NewfoldRuntime.isWoo) {
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
      }
    },
  },
  orders: {
    async list(filter) {
      let orders = await safeFetch({
        url: Endpoints.ORDERS({
          after: moment().subtract(1, filter).toISOString(),
        }),
      });
      return orders.data ?? [];
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
