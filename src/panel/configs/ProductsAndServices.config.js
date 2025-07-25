import {
  ArchiveBoxIcon,
  ArrowUpTrayIcon,
  CalendarIcon,
  CubeIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { __ } from "@wordpress/i18n";
import { FeatureCard } from "../components/FeatureCard";
import {
  YITH_WOOCOMMERCE_BOOKING_APPOINTMENTS,
  YITH_WOOCOMMERCE_GIFT_CARDS
} from "../constants";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { MarketplaceSdk } from "../sdk/marketplace";
import { PluginsSdk } from "../sdk/plugins";
import { WooCommerceSdk } from "../sdk/woocommerce";
import { createPluginInstallAction } from "./actions";
import {
  findUpsellWithName,
  wcPluginStatusParser,
  wcProductsParser,
} from "./selectors";
import apiFetch from '@wordpress/api-fetch';


const getUrl = (href) => {
  let [page, qs] = href.split("?");
  let query = new URLSearchParams(qs);
  query.set("return_to_nfd", window.location.hash.replace("#", ""));
  return `${page}?${query}`;
};

function defineFeatureState() {
  return {
    isDisabled: (data) => data?.plugins?.isWCActive === false,
    isActive: (data) => data?.plugins?.isInstalled,
    isInstalling: (data) => data?.plugins?.isInstalling,
    isQueueEmpty: (data) => data?.plugins?.isQueueEmpty,
    hasUsedPlugin: (data) => data?.products.length > 0,
    isUpsellNeeded: () => !(NewfoldRuntime.hasCapability("hasYithExtended") && NewfoldRuntime.hasCapability("hasSolution")),
    featureUrl: (data) =>
      data?.products.length > 0 ? data.plugins?.pluginUrl : null,
    purchasedSolution: ( data ) => data.isEcomSolution !== 'WP_SOLUTION_COMMERCE',
    upsellOptions: (data) => data?.upsellOptions,
  };
}

async function getPurchasedSolution() {
  const url = NewfoldRuntime.createApiUrl("/newfold-solutions/v1/entitlements")
  const res = await apiFetch( { url: `${ url }` } )
  return res
}

export const ProductsAndServicesDefinition = (props) => (
  {
  dataDependencies: {
    plugins: async () =>
      PluginsSdk.queries.status(
        "woocommerce",
        "nfd_slug_yith_woocommerce_booking",
        "nfd_slug_yith_woocommerce_gift_cards"
      ),
    products: WooCommerceSdk.products.list,
    upsellOptions: MarketplaceSdk.eCommerceOptions,
    isEcomSolution: () => getPurchasedSolution()
  },
  cards: [
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "add_products",
      assets: () => ({
        Image: CubeIcon,
        ActionIcon: true,
        learnMoreUrl: "https://woocommerce.com/document/managing-products/",
      }),
      text: () => ({
        title: __("Add a Product", "wp-module-ecommerce"),
        actionName: __("Add a product", "wp-module-ecommerce"),
      }),

      state: {
        isDisabled: (data) => data?.plugins?.isWCActive === false,
        isActive: () => true,
        featureUrl: () => getUrl("post-new.php?post_type=product"),
      },
      actions: {},
      queries: [
        {
          key: "plugins",
          selector: (plugins) => ({
            isWCActive: PluginsSdk.queries.isPlugin(
              plugins,
              ["woocommerce"],
              "active"
            ),
          }),
        },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: (state) => state.hasAddedProduct,
      name: "manage_products",
      assets: () => ({ Image: ArchiveBoxIcon, ActionIcon: true }),
      text: () => ({
        title: __("Manage Your Products", "wp-module-ecommerce"),
        actionName: __("Manage products", "wp-module-ecommerce"),
      }),
      state: {
        isDisabled: (data) => data?.plugins?.isWCActive === false,
        isActive: () => true,
        hasAddedProduct: (data) => data?.products?.length > 0,
        featureUrl: () => getUrl("edit.php?post_type=product"),
      },
      actions: {},
      queries: [
        {
          key: "plugins",
          selector: (plugins) => ({
            isWCActive: PluginsSdk.queries.isPlugin(
              plugins,
              ["woocommerce"],
              "active"
            ),
          }),
        },
        { key: "products" },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "import_product",
      assets: () => ({
        Image: ArrowUpTrayIcon,
        ActionIcon: true,
        learnMoreUrl:
          "https://woocommerce.com/document/product-csv-importer-exporter/?quid=f04c4dae81536a91e5a305a7299d4399",
      }),
      text: () => ({
        title: __("Import Products via CSV", "wp-module-ecommerce"),
        actionName: __("Import products", "wp-module-ecommerce"),
      }),

      state: {
        isDisabled: (data) => data?.plugins?.isWCActive === false,
        isActive: () => true,
        featureUrl: () =>
          getUrl("edit.php?post_type=product&page=product_importer"),
      },
      actions: {},
      queries: [
        {
          key: "plugins",
          selector: (plugins) => ({
            isWCActive: PluginsSdk.queries.isPlugin(
              plugins,
              ["woocommerce"],
              "active"
            ),
          }),
        },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: (state) => NewfoldRuntime.hasCapability("hasSolution") && state.purchasedSolution,
      name: "booking",
      assets: ({ isActive }) => ({
        Image: CalendarIcon,
        ActionIcon: isActive,
        learnMoreUrl: YITH_WOOCOMMERCE_BOOKING_APPOINTMENTS,
      }),
      text: (state) => ({
        title: __(
          "Bookings & Appointments",
          "wp-module-ecommerce"
        ),
        actionName: state.isActive ? __('Manage Bookings & Appointments', 'wp-module-ecommerce') : __('Setup Bookings & Appointments', 'wp-module-ecommerce'),
        slug: "yith_wcbk_panel",
      }),
      state: {...defineFeatureState(), featureUrl: () => NewfoldRuntime.adminUrl("admin.php?page=yith_wcbk_panel")},

      actions: {
        installFeature: createPluginInstallAction(
          "nfd_slug_yith_woocommerce_booking",
          10,
          props
        ),
        manageFeature: async () => {
          let product = await WooCommerceSdk.products.add({
            type: "booking",
            status: "draft",
          });
          window.location.href = product
            ? `post.php?post=${product.id}&action=edit`
            : "post-new.php?post_type=product";
        },
      },
      queries: [
        {
          key: "plugins",
          selector: wcPluginStatusParser("nfd_slug_yith_woocommerce_booking"),
        },
        {
          key: "products",
          selector: wcProductsParser("booking"),
        },
        {
          key: "upsellOptions",
          selector: findUpsellWithName(
            "YITH Booking and Appointment for WooCommerce"
          ),
        },
        {
          key: "isEcomSolution",
          selector: (data) => data?.solution
        }
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: (state) => NewfoldRuntime.hasCapability("hasSolution") && state.purchasedSolution,
      name: "gifts",
      assets: ({ isActive }) => ({
        Image: GiftIcon,
        ActionIcon: isActive,
        learnMoreUrl: YITH_WOOCOMMERCE_GIFT_CARDS,
      }),
      text: (state) => ({
        title: __("Gift Cards", "wp-module-ecommerce"),
        actionName: state.isActive ? __('Manage Gift Cards', 'wp-module-ecommerce') : __('Create a Gift Card', 'wp-module-ecommerce'),
        slug: "yith_woocommerce_gift_cards_panel",
      }),
      state: {...defineFeatureState(), featureUrl: () => NewfoldRuntime.adminUrl("admin.php?page=yith_woocommerce_gift_cards_panel")},
      actions: {
        installFeature: createPluginInstallAction(
          "nfd_slug_yith_woocommerce_gift_cards",
          10,
          props
        ),
        manageFeature: async () => {
          let product = await WooCommerceSdk.products.add({
            type: "gift-card",
            status: "draft",
          });
          window.location.href = product
            ? `post.php?post=${product.id}&action=edit`
            : "post-new.php?post_type=product";
        },
      },
      queries: [
        {
          key: "plugins",
          selector: wcPluginStatusParser(
            "nfd_slug_yith_woocommerce_gift_cards"
          ),
        },
        {
          key: "products",
          selector: wcProductsParser("gift-card"),
        },
        {
          key: "upsellOptions",
          selector: findUpsellWithName("YITH WooCommerce Gift Cards"),
        },
        {
          key: "isEcomSolution",
          selector: (data) => data?.solution
        }
      ],
    },
  ],
});
