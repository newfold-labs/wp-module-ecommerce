import { __ } from "@wordpress/i18n";
import { FeatureCard } from "../components/FeatureCard";
import { ReactComponent as Booking } from "../icons/booking.svg";
import { ReactComponent as CustomizeAccount } from "../icons/customize-account.svg";
import { ReactComponent as Filter } from "../icons/filter.svg";
import { ReactComponent as Gift } from "../icons/gift.svg";
import { ReactComponent as Search } from "../icons/search.svg";
import { ReactComponent as Store } from "../icons/store.svg";
import { ReactComponent as WishList } from "../icons/wishlist.svg";
import { fetchUserCapabilities } from "../services";
import { wcPluginStatusParser } from "./selectors";
import { PluginsSdk } from "../sdk/plugins";

function defineFeatureState() {
  return {
    featureUrl: (data) =>
      data?.plugins?.isInstalled ? data.plugins?.pluginUrl : null,
    isActive: (data) => data?.plugins?.isInstalled,
    isDisabled: (data) => data?.plugins?.isWCActive === false,
    isInstalling: (data) => data?.plugins?.isInstalling,
    isQueueEmpty: (data) => data?.plugins?.isQueueEmpty,
    isUpsellNeeded: (data) => data?.user?.capabilities?.isEcommerce === false,
  };
}
function notifyPluginInstallError(notify, user) {
  notify.push("plugin-install-failure-nfd_slug_yith_woocommerce_booking", {
    title: "Plugin failed to install",
    description: (
      <span>
        {__("Please try again, or ", "wp-module-ecommerce")}
        <a href={user?.currentBrandConfig?.support} target="_blank">
          {__("contact support", "wp-module-ecommerce")}
        </a>
      </span>
    ),
    variant: "error",
  });
}

function createYITHInstaller(yithId, priority, { wpModules, user }) {
  return async (state, props) => {
    let response = await PluginsSdk.queueInstall(
      yithId,
      user?.site.install_token,
      priority
    );
    if (response === "failed") {
      notifyPluginInstallError(wpModules.notify, user);
    } else {
      await props.onRefresh("plugins");
    }
  };
}

const YITHPlugins = (props) => ({
  dataDependencies: {
    plugins: async () => PluginsSdk.queryStatus("all"),
    user: fetchUserCapabilities,
  },
  cards: [
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "nfd_slug_yith_woocommerce_booking",
      assets: () => ({
        Image: Booking,
        ActionIcon: null,
      }),
      text: ({ isActive }) => ({
        title: __("Manage bookable/rental products", "wp-module-ecommerce"),
        description: __(
          "Enable a booking/appointment system to manage renting or booking of services, rooms, houses.",
          "wp-module-ecommerce"
        ),
        actionName: isActive ? __("Manage") : __("Enable"),
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createYITHInstaller(
          "nfd_slug_yith_woocommerce_booking",
          10,
          props
        ),
      },
      queries: [
        {
          key: "plugins",
          selector: wcPluginStatusParser("nfd_slug_yith_woocommerce_booking"),
        },
        { key: "user", selector: (_) => _ },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "yith-woocommerce-ajax-search",
      assets: () => ({
        Image: Search,
      }),
      text: ({ isActive }) => ({
        title: __(
          "Add a powerful search tool to your store",
          "wp-module-ecommerce"
        ),
        description: __(
          "Allow your users to search products in real time by title, description, tags, and more.",
          "wp-module-ecommerce"
        ),
        actionName: isActive ? "Manage" : "Enable",
        slug: "yith_wcas_panel",
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createYITHInstaller(
          "yith-woocommerce-ajax-search",
          11,
          props
        ),
      },
      queries: [
        {
          key: "plugins",
          selector: wcPluginStatusParser("yith-woocommerce-ajax-search"),
        },
        { key: "user", selector: (_) => _ },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "nfd_slug_yith_woocommerce_wishlist",
      assets: () => ({
        Image: WishList,
      }),
      text: ({ isActive }) => ({
        title: __(
          "Allow your customers to save products in their Wishlist",
          "wp-module-ecommerce"
        ),
        description: __(
          "Make it easy for your customers to create lists and add their favorite items to them.",
          "wp-module-ecommerce"
        ),
        actionName: isActive ? "Manage" : "Enable",
        slug: "yith_wcwl_panel",
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createYITHInstaller(
          "nfd_slug_yith_woocommerce_wishlist",
          12,
          props
        ),
      },
      queries: [
        {
          key: "plugins",
          selector: wcPluginStatusParser("nfd_slug_yith_woocommerce_wishlist"),
        },
        { key: "user", selector: (_) => _ },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "nfd_slug_yith_woocommerce_ajax_product_filter",
      assets: () => ({
        Image: Filter,
      }),
      text: ({ isActive }) => ({
        title: __(
          "Add a powerful product filter to your store",
          "wp-module-ecommerce"
        ),
        description: __(
          "If your store has lots of products, help your customers find what they're looking for fast.",
          "wp-module-ecommerce"
        ),
        actionName: isActive ? "Manage" : "Enable",
        slug: "yith_wcan_panel",
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createYITHInstaller(
          "nfd_slug_yith_woocommerce_ajax_product_filter",
          13,
          props
        ),
      },
      queries: [
        {
          key: "plugins",
          selector: wcPluginStatusParser(
            "nfd_slug_yith_woocommerce_ajax_product_filter"
          ),
        },
        { key: "user", selector: (_) => _ },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "nfd_slug_yith_woocommerce_gift_cards",
      assets: () => ({
        Image: Gift,
      }),
      text: ({ isActive }) => ({
        title: __("Sell Gift Cards in your store", "wp-module-ecommerce"),
        description: __(
          "Use gift cards to increase your earnings and attract new customers.",
          "wp-module-ecommerce"
        ),
        actionName: isActive ? "Manage" : "Enable",
        slug: "yith_woocommerce_gift_cards_panel",
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createYITHInstaller(
          "nfd_slug_yith_woocommerce_gift_cards",
          14,
          props
        ),
      },
      queries: [
        {
          key: "plugins",
          selector: wcPluginStatusParser(
            "nfd_slug_yith_woocommerce_gift_cards"
          ),
        },
        { key: "user", selector: (_) => _ },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "nfd_slug_yith_woocommerce_customize_myaccount_page",
      assets: () => ({
        Image: CustomizeAccount,
      }),
      text: ({ isActive }) => ({
        title: __(
          "Customize your customers' account page",
          "wp-module-ecommerce"
        ),
        description: __(
          "Show any kind of custom content in your customers' account page.",
          "wp-module-ecommerce"
        ),
        actionName: isActive ? "Manage" : "Enable",
        slug: "yith_wcmap_panel",
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createYITHInstaller(
          "nfd_slug_yith_woocommerce_customize_myaccount_page",
          15,
          props
        ),
      },
      queries: [
        {
          key: "plugins",
          selector: wcPluginStatusParser(
            "nfd_slug_yith_woocommerce_customize_myaccount_page"
          ),
        },
        { key: "user", selector: (_) => _ },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: (state) => state?.isAvailable,
      name: "nfd_slug_ecomdash_wordpress_plugin",
      assets: () => ({ Image: Store }),
      text: ({ isActive }) => ({
        title: __(
          "Sell your products across multiple marketplaces",
          "wp-module-ecommerce"
        ),
        description: __(
          "Ecomdash is a multi-channel inventory control, listing, dropshipping and shipping management system.",
          "wp-module-ecommerce"
        ),
        actionName: isActive ? "Manage" : "Enable",
        slug: "nfd_slug_ecomdash_wordpress_plugin",
      }),
      state: defineFeatureState(),
      actions: {
        installFeature: createYITHInstaller(
          "nfd_slug_ecomdash_wordpress_plugin",
          16,
          props
        ),
      },
      queries: [
        {
          key: "plugins",
          selector: wcPluginStatusParser("nfd_slug_ecomdash_wordpress_plugin"),
        },
        { key: "user", selector: (_) => _ },
      ],
    },
  ],
});

export default YITHPlugins;
