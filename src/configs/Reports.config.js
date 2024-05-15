import { __ } from "@wordpress/i18n";
import { ReportTile } from "../components/ReportTile";
import { formatMoney } from "../sdk/formatMoney";
import { PluginsSdk } from "../sdk/plugins";
import { WooCommerceSdk } from "../sdk/woocommerce";

function formatMoneyToTile(filter) {
  let calculateSales = calculateDelta(`reports_for_${filter}`);
  return {
    change: calculateSales,
    reportValue: (queries) =>
      queries?.pluginStatus !== true
        ? "-"
        : formatMoney({
          cost: Number(queries?.[`reports_for_${filter}`]?.[0]),
          currency: queries?.currency?.value,
          currencyDisplay: "symbol",
        }),
  };
}

const getReportValue = (queryKey) => (queries) => {
  if (!queries?.pluginStatus) {
    return "-";
  }
  let [stat] = queries?.[queryKey] ?? [];
  return stat ?? "-";
};

const calculateDelta = (queryKey) => (queries) => {
  if (!queries?.pluginStatus) {
    return { delta: 0, sign: null };
  }
  let [this_period, prior_period] = queries?.[queryKey] ?? [];
  if (prior_period - this_period === 0) {
    return { delta: 0, sign: null };
  }
  if (prior_period === 0 && this_period > 0) {
    return { delta: 100, sign: 1 };
  }
  if (prior_period > 0 && this_period === 0) {
    return { delta: 100, sign: -1 };
  }
  let delta = (1 - this_period / prior_period) * 100;
  return { delta: Math.abs(delta), sign: Math.sign(delta) };
};

const Reports = (filter) => ({
  dataDependencies: {
    [`analytics_for_${filter}`]: () => WooCommerceSdk.analytics.jetpack(filter),
    [`reports_for_${filter}`]: () => WooCommerceSdk.analytics.sales(filter),
    currency: WooCommerceSdk.options.currency,
    pluginStatus: () => PluginsSdk.queries.status("woocommerce", "jetpack"),
  },
  cards: [
    {
      Card: ReportTile,
      shouldRender: () => true,
      name: "views",
      text: () => ({
        title: __("Views", "wp-module-ecommerce"),
      }),
      state: {
        reportValue: getReportValue(`analytics_for_${filter}`),
        change: calculateDelta(`analytics_for_${filter}`),
      },
      queries: [
        {
          key: "pluginStatus",
          selector: (plugins) =>
            PluginsSdk.queries.isPlugin(
              plugins,
              ["woocommerce", "jetpack"],
              "active"
            ),
        },
        {
          key: `analytics_for_${filter}`,
          selector: (stats) => stats.views,
        },
      ],
    },
    {
      Card: ReportTile,
      shouldRender: () => true,
      name: "visitors",
      text: () => ({
        title: __("Visitors", "wp-module-ecommerce"),
      }),
      state: {
        reportValue: getReportValue(`analytics_for_${filter}`),
        change: calculateDelta(`analytics_for_${filter}`),
      },
      queries: [
        {
          key: "pluginStatus",
          selector: (plugins) =>
            PluginsSdk.queries.isPlugin(
              plugins,
              ["woocommerce", "jetpack"],
              "active"
            ),
        },
        {
          key: `analytics_for_${filter}`,
          selector: (stats) => stats.visitors,
        },
      ],
    },
    {
      Card: ReportTile,
      shouldRender: () => true,
      name: "orders",
      text: () => ({
        title: __("Orders", "wp-module-ecommerce"),
      }),
      state: {
        reportValue: getReportValue(`reports_for_${filter}`),
        change: calculateDelta(`reports_for_${filter}`),
      },
      queries: [
        {
          key: "pluginStatus",
          selector: (plugins) =>
            PluginsSdk.queries.isPlugin(plugins, ["woocommerce"], "active"),
        },
        {
          key: `reports_for_${filter}`,
          selector: (reports) => reports.total_orders,
        },
      ],
    },
    {
      Card: ReportTile,
      shouldRender: () => true,
      name: "total_sales",
      text: () => ({
        title: __("Total Sales", "wp-module-ecommerce"),
      }),
      state: formatMoneyToTile(filter),
      queries: [
        { key: "currency" },
        {
          key: "pluginStatus",
          selector: (plugins) =>
            PluginsSdk.queries.isPlugin(plugins, ["woocommerce"], "active"),
        },
        {
          key: `reports_for_${filter}`,
          selector: (reports) => reports.total_sales,
        },
      ],
    },
    // {
    //   Card: ReportTile,
    //   shouldRender: () => true,
    //   name: "net_sales",
    //   text: () => ({
    //     title: __("Net Sales", "wp-module-ecommerce"),
    //   }),
    //   state: formatMoneyToTile(filter),
    //   queries: [
    //     { key: "currency" },
    //     {
    //       key: "pluginStatus",
    //       selector: (plugins) =>
    //         PluginsSdk.queries.isPlugin(plugins, ["woocommerce"], "active"),
    //     },
    //     {
    //       key: `reports_for_${filter}`,
    //       selector: (reports) => reports.net_sales,
    //     },
    //   ],
    // },

    // {
    //   Card: ReportTile,
    //   shouldRender: () => true,
    //   name: "products",
    //   text: () => ({
    //     title: __("Products Sold", "wp-module-ecommerce"),
    //   }),
    //   state: {
    //     reportValue: getReportValue(`reports_for_${filter}`),
    //     change: calculateDelta(`reports_for_${filter}`),
    //   },
    //   queries: [
    //     {
    //       key: "pluginStatus",
    //       selector: (plugins) =>
    //         PluginsSdk.queries.isPlugin(plugins, ["woocommerce"], "active"),
    //     },
    //     {
    //       key: `reports_for_${filter}`,
    //       selector: (reports) => reports.total_items,
    //     },
    //   ],
    // },

  ],
});

export default Reports;
