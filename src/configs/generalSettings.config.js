import { wcTasksParser, yithOnboardingParser } from "../components/Parsers";
import PluginsUnavailable from "../components/PluginsUnavailable";
import { StandardCard } from "../components/StandardCard";
import { StoreAddress } from "../components/StoreAddress";
import Tax from "../components/Tax";
import { ReactComponent as Payments } from "../icons/payments.svg";
import { ReactComponent as Shipping } from "../icons/shipping.svg";
import { ReactComponent as StoreIcon } from "../icons/store.svg";
import { ReactComponent as TaxInfo } from "../icons/taxinfo.svg";
import { Endpoints } from "../services";

const YithOptions = {
  paypal: "nfd-ecommerce-captive-flow-paypal",
  shippo: "nfd-ecommerce-captive-flow-shippo",
};

const GET_WC_TASKS = `/wc-admin/onboarding/tasks?${new URLSearchParams({
  ids: "setup",
})}`;

const getUrl = (href) => {
  let [page, qs] = href.split("?");
  let query = new URLSearchParams(qs);
  query.set("return_to_nfd", window.location.hash.replace("#", ""));
  return `${page}?${query}`;
};

const generalSettings = (plugins) => [
  {
    Card: StandardCard,
    shouldRender: () => true,
    title: "store_details",
    assets: () => ({
      image: StoreIcon,
    }),
    text: (responses) => ({
      title: "Store Info",
      actionName: responses?.wcTasksRefresh?.parsedData?.isCompleted
        ? "Edit Info"
        : "Add Info",
    }),
    actions: {
      getShowModal: (responses) => {
        return responses?.wcTasksRefresh?.parsedData?.isCompleted
          ? false
          : true;
      },
      buttonClick: () => {
        window.location.href = getUrl("admin.php?page=wc-settings&tab=general");
      },
    },
    dataDependencies: [
      {
        endpoint: GET_WC_TASKS,
        parser: wcTasksParser("store_details"),
        refresh: "wcTasksRefresh",
      }
    ],
    modal: () => ({
      contentType: "component",
      content: StoreAddress,
      isFullScreen: false,
      onClose: ["wcTasksRefresh"],
    }),
  },
  {
    Card: StandardCard,
    shouldRender: () => true,
    title: [YithOptions.paypal],
    assets: () => ({
      image: Payments,
    }),
    text: (responses) => ({
      title: "Payments",
      actionName: responses?.yithOnboardingRefresh?.parsedData?.isCompleted
        ? "Edit Settings"
        : "Setup",
    }),
    actions: {
      getShowModal: (responses) => {
        return responses?.yithOnboardingRefresh?.parsedData?.isCompleted
          ? false
          : true;
      },
      buttonClick: () => {
        window.location.href = getUrl("admin.php?page=yith_paypal_payments");
      },
    },
    dataDependencies: [
      {
        endpoint: Endpoints.WP_SETTINGS,
        parser: yithOnboardingParser(YithOptions.paypal),
        refresh: "yithOnboardingRefresh",
      },
    ],
    modal: () => {
      let modals = {
        pluginAvailable: {
          contentType: "iframe",
          content: (
            <iframe
              style={{ width: "100%", height: "100%" }}
              src="admin.php?page=nfd-ecommerce-captive-flow-paypal"
            />
          ),
          isFullScreen: true,
          onClose: ["yithOnboardingRefresh"],
        },
        pluginUnavailable: {
          contentType: "component",
          content: PluginsUnavailable,
          isFullScreen: false,
          onClose: [],
        },
      };
      return plugins?.status?.yith_paypal_payments == "Active"
        ? modals.pluginAvailable
        : modals.pluginUnavailable;
    },
  },
  {
    Card: StandardCard,
    shouldRender: () => true,
    title: [YithOptions.shippo],
    assets: () => ({
      image: Shipping,
    }),
    text: (responses) => ({
      title: "Shipping",
      actionName: responses?.yithOnboardingShippoRefresh?.parsedData?.isCompleted
        ? "Edit Settings"
        : "Setup",
    }),
    actions: {
      getShowModal: (responses) => {
        return responses?.yithOnboardingShippoRefresh?.parsedData?.isCompleted
          ? false
          : true;
      },
      buttonClick: () => {
        window.location.href = getUrl(
          "admin.php?page=yith_shippo_shipping_for_woocommerce"
        );
      },
    },
    dataDependencies: [
      {
        endpoint: Endpoints.WP_SETTINGS,
        parser: yithOnboardingParser(YithOptions.shippo),
        refresh: "yithOnboardingShippoRefresh",
      },
    ],
    modal: () => {
      let modals = {
        pluginAvailable: {
          contentType: "iframe",
          content: (
            <iframe
              style={{ width: "100%", height: "100%" }}
              src="admin.php?page=nfd-ecommerce-captive-flow-shippo"
            />
          ),
          isFullScreen: true,
          onClose: ["yithOnboardingShippoRefresh"],
        },
        pluginUnavailable: {
          contentType: "component",
          content: PluginsUnavailable,
          isFullScreen: false,
          onClose: [],
        },
      };
      return plugins?.status?.yith_shippo_shipping_for_woocommerce == "Active"
        ? modals.pluginAvailable
        : modals.pluginUnavailable;
    },
  },
  {
    Card: StandardCard,
    shouldRender: () => true,
    title: "tax",
    assets: () => ({
      image: TaxInfo,
    }),
    text: (responses) => ({
      title: "Tax Info",
      actionName: responses?.wcTasksTaxRefresh?.parsedData?.isCompleted
        ? "Edit Info"
        : "Add Info",
    }),
    actions: {
      getShowModal: (responses) => {
        return responses?.wcTasksTaxRefresh?.parsedData?.isCompleted
          ? false
          : true;
      },
      buttonClick: () => {
        window.location.href = getUrl("admin.php?page=wc-settings&tab=taxl");
      },
    },
    dataDependencies: [
      {
        endpoint: GET_WC_TASKS,
        parser: wcTasksParser("tax"),
        refresh: "wcTasksTaxRefresh",
      },
    ],
    modal: () => ({
      contentType: "component",
      content: Tax,
      isFullScreen: false,
      onClose: ["wcTasksTaxRefresh"],
    }),
  },
];

export default generalSettings;
