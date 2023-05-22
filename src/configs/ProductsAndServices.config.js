import { __ } from "@wordpress/i18n";
import { FeatureCard } from "../components/FeatureCard";
import { ReactComponent as Booking } from "../icons/booking.svg";
import { ReactComponent as Gift } from "../icons/gift.svg";
import { ReactComponent as AddProducts } from "../icons/add-products.svg";
import { ReactComponent as ImportProducts } from "../icons/import-products.svg";
import { ReactComponent as ManageProducts } from "../icons/manage-products.svg";
import { createProduct, queuePluginInstall } from "../services";
import {
  wcBookings,
  wcGiftCardsSelector,
  wcProductsSelector
} from "./selectors";

const getUrl = (href) => {
  let [page, qs] = href.split("?");
  let query = new URLSearchParams(qs);
  query.set("return_to_nfd", window.location.hash.replace("#", ""));
  return `${page}?${query}`;
};

const ProductsAndServices = ({ plugins, user }) => [
  {
    Card: FeatureCard,
    shouldRender: () => true,
    title: "add_product",
    assets: () => ({
      image: AddProducts,
    }),
    text: () => ({
      title: __("Add a Product", "wp-module-ecommerce"),
      actionName: __("Add a product"),
    }),
    state: {
      isActionExternal: () => false,
      isDisabled: () => plugins.status?.woocommerce !== "Active",
      isActive: () => true,
    },
    actions: {
      buttonClick: () =>
        (window.location.href = getUrl("post-new.php?post_type=product")),
    },
    dataDependencies: [],
  },
  {
    Card: FeatureCard,
    shouldRender: (state) => state.hasAddedProduct,
    title: "manage_products",
    assets: () => ({
      image: ManageProducts,
    }),
    text: (state) => ({
      title: __("Manage Your Products", "wp-module-ecommerce"),
      actionName: __("Manage products"),
    }),
    state: {
      isActionExternal: () => false,
      isDisabled: () => plugins.status?.woocommerce !== "Active",
      hasAddedProduct: (data) => data?.wcProductsList?.length > 0,
      isActive: () => true,
    },
    actions: {
      buttonClick: () =>
        (window.location.href = getUrl("edit.php?post_type=product")),
    },
    dataDependencies: [
      {
        endpoint: "/wc/v3/products",
        selector: wcProductsSelector,
        refresh: "wcProductsList",
      },
    ],
  },
  {
    Card: FeatureCard,
    shouldRender: () => true,
    title: "import_product",
    assets: () => ({
      image: ImportProducts,
    }),
    text: () => ({
      title: __("Import Products via CSV", "wp-module-ecommerce"),
      actionName: __("Import products"),
    }),
    state: {
      isActionExternal: () => false,
      isDisabled: () => plugins.status?.woocommerce !== "Active",
      isActive: () => true,
    },
    actions: {
      buttonClick: () =>
        (window.location.href = getUrl(
          "edit.php?post_type=product&page=product_importer"
        )),
    },
    dataDependencies: [],
  },
  {
    Card: FeatureCard,
    shouldRender: () => true,
    title: "booking",
    assets: () => ({
      image: Booking,
    }),
    text: (state) => ({
      title: __("Bookings", "wp-module-ecommerce"),
      actionName: !state.isActive ? "Enable" : state.hasUsedPlugin ? "Manage bookings" : "Create a booking",
      slug: "yith_wcbk_panel",
    }),
    state: {
      isActive: () => plugins?.status?.["yith_wcbk_panel"] === "Active",
      isActionExternal: () => false,
      isInstalling: () =>
        plugins?.status?.["queue-status"].some(
          (queue) => queue.slug === "nfd_slug_yith_woocommerce_booking"
        ),
      isQueueEmpty: () => plugins?.status?.["queue-status"].length === 0,
      isDisabled: () => plugins.status?.woocommerce !== "Active",
      hasUsedPlugin: (data) => data.yith_wcbk_panel.length > 0,
    },
    actions: {
      buttonClick: async (state) => {
        if (!state.isActive) {
          return queuePluginInstall(
            "nfd_slug_yith_woocommerce_booking",
            plugins.token,
            10
          );
        } else if (state.hasUsedPlugin) {
          window.location.href = "admin.php?page=yith_wcbk_panel";
        } else {
          let product = await createProduct({
            type: "booking",
            status: "draft",
          });
          window.location.href = product
            ? `post.php?post=${product.id}&action=edit`
            : "post-new.php?post_type=product";
        }
      },
    },
    dataDependencies: [
      {
        endpoint: "/wc/v3/products",
        selector: wcBookings,
        refresh: "yith_wcbk_panel",
      },
    ],
  },
  {
    Card: FeatureCard,
    shouldRender: () => true,
    title: "gifts",
    assets: () => ({
      image: Gift,
    }),
    text: (state) => ({
      title: __("Gift Cards", "wp-module-ecommerce"),
      actionName: !state.isActive ? "Enable" : state.hasUsedPlugin ? "Manage gift cards" : "Create a gift card",
      slug: "yith_woocommerce_gift_cards_panel",
    }),
    state: {
      isActive: () => plugins?.status?.["yith_woocommerce_gift_cards_panel"] === "Active",
      isActionExternal: () => false,
      isInstalling: () =>
        plugins?.status?.["queue-status"].some(
          (queue) => queue.slug === "nfd_slug_yith_woocommerce_gift_cards"
        ),
      isQueueEmpty: () => plugins?.status?.["queue-status"].length === 0,
      isDisabled: () => plugins.status?.woocommerce !== "Active",
      hasUsedPlugin: (data) => data.yith_woocommerce_gift_cards_panel.length > 0,
    },
    actions: {
      buttonClick: async (state) => {
        if (!state.isActive) {
          return queuePluginInstall(
            "nfd_slug_yith_woocommerce_gift_cards",
            plugins.token,
            10
          );
        } else if (state.hasUsedPlugin) {
          window.location.href = "admin.php?page=yith_woocommerce_gift_cards_panel";
        } else {
          let product = await createProduct({
            type: "gift-card",
            status: "draft",
          });
          window.location.href = product
            ? `post.php?post=${product.id}&action=edit`
            : "post-new.php?post_type=product";
        }
      },
    },
    dataDependencies: [
      {
        endpoint: "/wc/v3/products",
        selector: wcGiftCardsSelector,
        refresh: "yith_woocommerce_gift_cards_panel",
      }
    ],
  },
];

export default ProductsAndServices;
