import { __ } from "@wordpress/i18n";
import { ReportTile } from "../components/ReportTile";
import { formatMoney } from "../sdk/formatMoney";
import { PluginsSdk } from "../sdk/plugins";
import {
  fetchReports,
  fetchStoreCurrency,
  fetchJetpackAnalytics,
} from "../services";

function formatMoneyToTile(filter) {
  return {
    reportValue: (data) =>
      data?.pluginStatus === false
        ? "-"
        : formatMoney({
            cost: Number(data?.[`reports_for_${filter}`]),
            currency: data?.currency?.value,
            currencyDisplay: "symbol",
          }),
  };
}

const Reports = (filter) => ({
  dataDependencies: {
    [`analytics_for_${filter}`]: () => fetchJetpackAnalytics(filter),
    [`reports_for_${filter}`]: () => fetchReports(filter),
    currency: fetchStoreCurrency,
    pluginStatus: () =>
      PluginsSdk.queries.status("woocommerce", "jetpack"),
  },
  cards: [
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
    {
      Card: ReportTile,
      shouldRender: () => true,
      name: "net_sales",
      text: () => ({
        title: __("Net Sales", "wp-module-ecommerce"),
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
          selector: (reports) => reports.net_sales,
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
        reportValue: (data) =>
          data?.pluginStatus ? Number(data?.[`reports_for_${filter}`]) : "-",
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
      name: "products",
      text: () => ({
        title: __("Products Sold", "wp-module-ecommerce"),
      }),
      state: {
        reportValue: (data) =>
          data?.pluginStatus ? Number(data?.[`reports_for_${filter}`]) : "-",
      },
      queries: [
        {
          key: "pluginStatus",
          selector: (plugins) =>
            PluginsSdk.queries.isPlugin(plugins, ["woocommerce"], "active"),
        },
        {
          key: `reports_for_${filter}`,
          selector: (reports) => reports.total_items,
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
        reportValue: (data) =>
          data?.pluginStatus ? Number(data?.[`reports_for_${filter}`]) : "-",
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
      ],
    },
    {
      Card: ReportTile,
      shouldRender: () => true,
      name: "views",
      text: () => ({
        title: __("Views", "wp-module-ecommerce"),
      }),
      state: {
        reportValue: (data) =>
          data?.pluginStatus ? Number(data?.[`reports_for_${filter}`]) : "-",
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
      ],
    },
  ],
});

export default Reports;
