import { __ } from "@wordpress/i18n";
import { ExtendedCard } from "../components/ExtendedCard";
import { ReactComponent as Booking } from "../icons/booking.svg";
import { ReactComponent as CustomizeAccount } from "../icons/customize-account.svg";
import { ReactComponent as Filter } from "../icons/filter.svg";
import { ReactComponent as Gift } from "../icons/gift.svg";
import { ReactComponent as Search } from "../icons/search.svg";
import { ReactComponent as WishList } from "../icons/wishlist.svg";
import { Endpoints, queuePluginInstall } from "../services";
import { wcPluginStatusParser } from "./selectors";

const GeneralSettings = (plugins) => [
  {
    Card: ExtendedCard,
    shouldRender: () => true,
    title: "nfd_slug_yith_woocommerce_booking",
    assets: () => ({
      image: Booking,
    }),
    text: (isInstalled) => ({
      title: __("Manage bookable/rental products", "wp-module-ecommerce"),
      description: __(
        "Enable a booking/appointment system to manage renting or booking of services, rooms, houses.",
        "wp-module-ecommerce"
      ),
      actionName: isInstalled ? "Manage" : "Enable",
      slug: "yith_wcbk_panel",
    }),
    state: {
      isInstalled: (state) => state?.wcBookingPluginRefresh?.isInstalled,
      isInstalling: (state) => state?.wcBookingPluginRefresh?.isInstalling,
      isQueueEmpty: (state) => state?.wcBookingPluginRefresh?.isQueueEmpty,
    },
    actions: {
      buttonClick: async (isInstalled, onRefresh) => {
        if (isInstalled) {
          window.location.href = "admin.php?page=yith_wcbk_panel";
        } else {
          await queuePluginInstall(
            "nfd_slug_yith_woocommerce_booking",
            plugins.token,
            6
          );
          await onRefresh("wcBookingPluginRefresh");
        }
      },
    },
    dataDependencies: [
      {
        refreshInterval: 10 * 1000,
        endpoint: Endpoints.PLUGIN_STATUS,
        selector: wcPluginStatusParser(
          "nfd_slug_yith_woocommerce_booking",
          "yith_wcbk_panel"
        ),
        refresh: "wcBookingPluginRefresh",
      },
    ],
  },
  {
    Card: ExtendedCard,
    shouldRender: () => true,
    title: "yith-woocommerce-ajax-search",
    assets: () => ({
      image: Search,
    }),
    text: (isInstalled) => ({
      title: __(
        "Add a powerful search tool to your store",
        "wp-module-ecommerce"
      ),
      description: __(
        "Allow your users to search products in real time by title, description, tags, and more.",
        "wp-module-ecommerce"
      ),
      actionName: isInstalled ? "Manage" : "Enable",
      slug: "yith_wcas_panel",
    }),
    state: {
      isInstalled: (state) => state?.wcSearchPluginRefresh?.isInstalled,
      isInstalling: (state) => state?.wcSearchPluginRefresh?.isInstalling,
      isQueueEmpty: (state) => state?.wcSearchPluginRefresh?.isQueueEmpty,
    },
    actions: {
      buttonClick: (isInstalled) => {
        if (isInstalled) {
          window.location.href = "admin.php?page=yith_wcas_panel";
        } else {
          queuePluginInstall("yith-woocommerce-ajax-search", plugins.token, 6);
        }
      },
    },
    dataDependencies: [
      {
        refreshInterval: 10 * 1000,
        endpoint: Endpoints.PLUGIN_STATUS,
        selector: wcPluginStatusParser(
          "yith-woocommerce-ajax-search",
          "yith_wcas_panel"
        ),
        refresh: "wcSearchPluginRefresh",
      },
    ],
  },
  {
    Card: ExtendedCard,
    shouldRender: () => true,
    title: "nfd_slug_yith_woocommerce_wishlist",
    assets: () => ({
      image: WishList,
    }),
    text: (isInstalled) => ({
      title: __(
        "Allow your customers to save products in their Wishlist",
        "wp-module-ecommerce"
      ),
      description: __(
        "Make it easy for your customers to create lists and add their favorite items to them.",
        "wp-module-ecommerce"
      ),
      actionName: isInstalled ? "Manage" : "Enable",
      slug: "yith_wcwl_panel",
    }),
    state: {
      isInstalled: (state) => state?.wcWishlistPluginRefresh?.isInstalled,
      isInstalling: (state) => state?.wcWishlistPluginRefresh?.isInstalling,
      isQueueEmpty: (state) => state?.wcWishlistPluginRefresh?.isQueueEmpty,
    },
    actions: {
      buttonClick: (isInstalled) => {
        if (isInstalled) {
          window.location.href = "admin.php?page=yith_wcwl_panel";
        } else {
          queuePluginInstall(
            "nfd_slug_yith_woocommerce_wishlist",
            plugins.token,
            6
          );
        }
      },
    },
    dataDependencies: [
      {
        refreshInterval: 10 * 1000,
        endpoint: Endpoints.PLUGIN_STATUS,
        selector: wcPluginStatusParser(
          "nfd_slug_yith_woocommerce_wishlist",
          "yith_wcwl_panel"
        ),
        refresh: "wcWishlistPluginRefresh",
      },
    ],
  },
  {
    Card: ExtendedCard,
    shouldRender: () => true,
    title: "nfd_slug_yith_woocommerce_ajax_product_filter",
    assets: () => ({
      image: Filter,
    }),
    text: (isInstalled) => ({
      title: __(
        "Add a powerful product filter to your store",
        "wp-module-ecommerce"
      ),
      description: __(
        "If your store has lots of products, help your customers find what they're looking for fast.",
        "wp-module-ecommerce"
      ),
      actionName: isInstalled ? "Manage" : "Enable",
      slug: "yith_wcan_panel",
    }),
    state: {
      isInstalled: (state) => state?.wcFilterPluginRefresh?.isInstalled,
      isInstalling: (state) => state?.wcFilterPluginRefresh?.isInstalling,
      isQueueEmpty: (state) => state?.wcFilterPluginRefresh?.isQueueEmpty,
    },
    actions: {
      buttonClick: (isInstalled) => {
        if (isInstalled) {
          window.location.href = "admin.php?page=yith_wcan_panel";
        } else {
          queuePluginInstall(
            "nfd_slug_yith_woocommerce_ajax_product_filter",
            plugins.token,
            6
          );
        }
      },
    },
    dataDependencies: [
      {
        refreshInterval: 10 * 1000,
        endpoint: Endpoints.PLUGIN_STATUS,
        selector: wcPluginStatusParser(
          "nfd_slug_yith_woocommerce_ajax_product_filter",
          "yith_wcan_panel"
        ),
        refresh: "wcFilterPluginRefresh",
      },
    ],
  },
  {
    Card: ExtendedCard,
    shouldRender: () => true,
    title: "nfd_slug_yith_woocommerce_gift_cards",
    assets: () => ({
      image: Gift,
    }),
    text: (isInstalled) => ({
      title: __("Sell Gift Cards in your store", "wp-module-ecommerce"),
      description: __(
        "Use gift cards to increase your earnings and attract new customers.",
        "wp-module-ecommerce"
      ),
      actionName: isInstalled ? "Manage" : "Enable",
      slug: "yith_woocommerce_gift_cards_panel",
    }),
    state: {
      isInstalled: (state) => state?.wcGiftPluginRefresh?.isInstalled,
      isInstalling: (state) => state?.wcGiftPluginRefresh?.isInstalling,
      isQueueEmpty: (state) => state?.wcGiftPluginRefresh?.isQueueEmpty,
    },
    actions: {
      buttonClick: (isInstalled) => {
        if (isInstalled) {
          window.location.href =
            "admin.php?page=yith_woocommerce_gift_cards_panel";
        } else {
          queuePluginInstall(
            "nfd_slug_yith_woocommerce_wishlist",
            plugins.token,
            6
          );
        }
      },
    },
    dataDependencies: [
      {
        refreshInterval: 10 * 1000,
        endpoint: Endpoints.PLUGIN_STATUS,
        selector: wcPluginStatusParser(
          "nfd_slug_yith_woocommerce_wishlist",
          "yith_woocommerce_gift_cards_panel"
        ),
        refresh: "wcGiftPluginRefresh",
      },
    ],
  },
  {
    Card: ExtendedCard,
    shouldRender: () => true,
    title: "nfd_slug_yith_woocommerce_customize_myaccount_page",
    assets: () => ({
      image: CustomizeAccount,
    }),
    text: (isInstalled) => ({
      title: __(
        "Customize your customers' account page",
        "wp-module-ecommerce"
      ),
      description: __(
        "Show any kind of custom content in your customers' account page.",
        "wp-module-ecommerce"
      ),
      actionName: isInstalled ? "Manage" : "Enable",
      slug: "yith_wcmap_panel",
    }),
    state: {
      isInstalled: (state) => state?.wcCustomizeAcctPluginRefresh?.isInstalled,
      isInstalling: (state) =>
        state?.wcCustomizeAcctPluginRefresh?.isInstalling,
      isQueueEmpty: (state) =>
        state?.wcCustomizeAcctPluginRefresh?.isQueueEmpty,
    },
    actions: {
      buttonClick: (isInstalled) => {
        if (isInstalled) {
          window.location.href = "admin.php?page=yith_wcmap_panel";
        } else {
          queuePluginInstall(
            "nfd_slug_yith_woocommerce_customize_myaccount_page",
            plugins.token,
            6
          );
        }
      },
    },
    dataDependencies: [
      {
        refreshInterval: 10 * 1000,
        endpoint: Endpoints.PLUGIN_STATUS,
        selector: wcPluginStatusParser(
          "nfd_slug_yith_woocommerce_customize_myaccount_page",
          "yith_wcmap_panel "
        ),
        refresh: "wcCustomizeAcctPluginRefresh",
      },
    ],
  },
];

export default GeneralSettings;
