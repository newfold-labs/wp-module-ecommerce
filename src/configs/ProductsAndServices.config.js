import { __ } from "@wordpress/i18n";
import { FeatureCard } from "../components/FeatureCard";
import { ReactComponent as AddProducts } from "../icons/add-products.svg";
import { ReactComponent as Booking } from "../icons/booking.svg";
import { ReactComponent as Gift } from "../icons/gift.svg";
import { ReactComponent as ImportProducts } from "../icons/import-products.svg";
import { ReactComponent as ManageProducts } from "../icons/manage-products.svg";
import {
  createProduct,
  fetchPluginStatus,
  fetchProducts,
  fetchUserCapabilities,
  queuePluginInstall,
} from "../services";
import { wcPluginStatusParser, wcProductsParser } from "./selectors";

const getUrl = (href) => {
  let [page, qs] = href.split("?");
  let query = new URLSearchParams(qs);
  query.set("return_to_nfd", window.location.hash.replace("#", ""));
  return `${page}?${query}`;
};

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
    let response = await queuePluginInstall(
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

const ProductsAndServices = (props) => ({
  dataDependencies: {
    plugins: async () => fetchPluginStatus("all"),
    user: fetchUserCapabilities,
    products: fetchProducts,
  },
  cards: [
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "add_products",
      assets: () => ({
        Image: AddProducts,
        ActionIcon: null,
      }),
      text: () => ({
        title: __("Add a Product", "wp-module-ecommerce"),
        actionName: __("Add a product"),
      }),

      state: {
        isActionExternal: () => false,
        isDisabled: (data) => data?.plugins?.isWCActive === false,
        isActive: () => true,
        featureUrl: () => getUrl("post-new.php?post_type=product"),
      },
      actions: {},
      queries: [
        {
          key: "plugins",
          selector: (_) => _,
        },
        { key: "user", selector: (_) => _ },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: (state) => state.hasAddedProduct,
      name: "manage_products",
      assets: () => ({
        Image: ManageProducts,
        ActionIcon: null,
      }),
      text: () => ({
        title: __("Manage Your Products", "wp-module-ecommerce"),
        actionName: __("Manage products"),
      }),

      state: {
        isActionExternal: () => false,
        isDisabled: (data) => data?.plugins?.isWCActive === false,
        isActive: () => true,
        hasAddedProduct: (data) => data?.products?.length > 0,
        featureUrl: () => getUrl("edit.php?post_type=product"),
      },
      actions: {},
      queries: [
        {
          key: "plugins",
          selector: (_) => _,
        },
        { key: "products", selector: (_) => _ },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "import_product",
      assets: () => ({
        Image: ImportProducts,
        ActionIcon: null,
      }),
      text: () => ({
        title: __("Import Products via CSV", "wp-module-ecommerce"),
        actionName: __("Import products"),
      }),

      state: {
        isActionExternal: () => false,
        isDisabled: (data) => data?.plugins?.isWCActive === false,
        isActive: () => true,
        featureUrl: () =>
          getUrl("edit.php?post_type=product&page=product_importer"),
      },
      actions: {},
      queries: [
        {
          key: "plugins",
          selector: (_) => _,
        },
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "booking",
      assets: () => ({
        Image: Booking,
        ActionIcon: null,
      }),
      text: (state) => ({
        title: __("Bookings", "wp-module-ecommerce"),
        actionName: !state.isActive
          ? "Enable"
          : state.hasUsedPlugin
          ? "Manage bookings"
          : "Create a booking",
        slug: "yith_wcbk_panel",
      }),
      state: {
        isActionExternal: () => false,
        isDisabled: (data) => data?.plugins?.isWCActive === false,
        isActive: (data) => data?.plugins?.isInstalled,
        isInstalling: (data) => data?.plugins?.isInstalling,
        isQueueEmpty: (data) => data?.plugins?.isQueueEmpty,
        hasUsedPlugin: (data) => data?.products.length > 0,
        featureUrl: (data) =>
          data?.products.length > 0 ? data.plugins?.pluginUrl : null,
      },
      actions: {
        installFeature: createYITHInstaller(
          "nfd_slug_yith_woocommerce_booking",
          10,
          props
        ),
        manageFeature: async () => {
          let product = await createProduct({
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
      ],
    },
    {
      Card: FeatureCard,
      shouldRender: () => true,
      name: "gifts",
      assets: () => ({
        Image: Gift,
        ActionIcon: null,
      }),
      text: (state) => ({
        title: __("Gift Cards", "wp-module-ecommerce"),
        actionName: !state.isActive
          ? "Enable"
          : state.hasUsedPlugin
          ? "Manage gift cards"
          : "Create a gift card",
        slug: "yith_woocommerce_gift_cards_panel",
      }),
      state: {
        isActionExternal: () => false,
        isDisabled: (data) => data?.plugins?.isWCActive === false,
        isActive: (data) => data?.plugins?.isInstalled,
        isInstalling: (data) => data?.plugins?.isInstalling,
        isQueueEmpty: (data) => data?.plugins?.isQueueEmpty,
        hasUsedPlugin: (data) => data?.products.length > 0,
        featureUrl: (data) =>
          data?.products.length > 0 ? data.plugins?.pluginUrl : null,
      },
      actions: {
        installFeature: createYITHInstaller(
          "nfd_slug_yith_woocommerce_gift_cards",
          10,
          props
        ),
        manageFeature: async () => {
          let product = await createProduct({
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
      ],
    },
  ],
});

export default ProductsAndServices;
