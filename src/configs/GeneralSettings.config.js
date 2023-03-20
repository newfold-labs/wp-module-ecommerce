import {
  razorpaySelector,
  wcTasksParser,
  yithOnboardingParser,
} from "./selectors";
import PluginsUnavailable from "../components/PluginsUnavailable";
import { MinimalCard } from "../components/MinimalCard";
import { StoreAddress } from "../components/StoreAddress";
import Tax from "../components/Tax";
import { ReactComponent as Payments } from "../icons/payments.svg";
import { ReactComponent as Shipping } from "../icons/shipping.svg";
import { ReactComponent as StoreIcon } from "../icons/store.svg";
import { ReactComponent as TaxInfo } from "../icons/taxinfo.svg";
import { Endpoints } from "../services";
import { CaptiveRazorpay } from "../components/CaptiveRazorpay";

const CaptiveFlows = {
  paypal: "nfd-ecommerce-captive-flow-paypal",
  shippo: "nfd-ecommerce-captive-flow-shippo",
  razorpay: "nfd-ecommerce-captive-flow-razorpay",
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

const GeneralSettings = (user, plugins) => [
  {
    Card: MinimalCard,
    shouldRender: () => true,
    title: "store_details",
    assets: () => ({
      image: StoreIcon,
    }),
    text: (taskCompleted) => ({
      title: "Store Info",
      actionName: taskCompleted ? "Edit Info" : "Add Info",
    }),
    state: {
      brandConfig: () => user?.currentBrandConfig,
      taskCompleted: (state) => state?.wcTasksRefresh?.isCompleted,
      isDisabled: () => plugins.status?.woocommerce !== "Active",
    },
    actions: {
      buttonClick: (data, setShowModal) => {
        if (data.taskCompleted) {
          window.location.href = getUrl(
            "admin.php?page=wc-settings&tab=general"
          );
        } else {
          setShowModal(true);
        }
      },
    },
    dataDependencies: [
      {
        endpoint: GET_WC_TASKS,
        selector: wcTasksParser("store_details"),
        refresh: "wcTasksRefresh",
      },
    ],
    modal: (state) => ({
      contentType: "component",
      content: StoreAddress,
      state,
      isFullScreen: false,
      onClose: ["wcTasksRefresh"],
    }),
  },
  {
    Card: MinimalCard,
    shouldRender: (state) =>
      user?.currentBrandConfig?.setup?.["payment"].includes("Paypal"),
    title: CaptiveFlows.paypal,
    assets: () => ({
      image: Payments,
    }),
    text: (taskCompleted) => ({
      title: "Payments",
      actionName: taskCompleted ? "Edit Settings" : "Setup",
    }),
    state: {
      taskCompleted: (state) => state?.yithOnboardingRefresh?.isCompleted,
      isDisabled: () => plugins.status?.woocommerce !== "Active",
    },
    actions: {
      buttonClick: (data, setShowModal) => {
        if (data.taskCompleted) {
          window.location.href = getUrl("admin.php?page=yith_paypal_payments");
        } else {
          setShowModal(true);
        }
      },
    },
    dataDependencies: [
      {
        endpoint: Endpoints.WP_SETTINGS,
        selector: yithOnboardingParser(CaptiveFlows.paypal),
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
          pluginName: "Paypal",
          supportUrl:user?.currentBrandConfig?.support,
          token: plugins.token,
          isFullScreen: false,
          onClose: [],

        },
      };
      return plugins?.status?.yith_paypal_payments === "Active"
        ? modals.pluginAvailable
        : modals.pluginUnavailable;
    },
  },
  {
    Card: MinimalCard,
    shouldRender: (state) =>
      user?.currentBrandConfig?.setup?.payment.includes("Razorpay"),
    title: CaptiveFlows.razorpay,
    assets: () => ({ image: Payments }),
    text: (_, taskStatus) => ({
      title: "Payments",
      actionName: taskStatus === "complete" ? "Edit Settings" : "Setup",
      inProgressMessage:
        taskStatus === "inprogress" ? "Test mode is active" : "",
    }),
    state: {
      razorpaySettings: (data) => data.razorpaySetup.settings,
      taskCompleted: () => false,
      taskStatus: (data) => {
        if (plugins.status?.woo_razorpay !== "Active") {
          return "pending";
        }
        const keyId = data?.razorpaySetup?.settings?.key_id ?? "";
        return keyId?.startsWith("rzp_live")
          ? "complete"
          : keyId?.startsWith("rzp_test")
          ? "inprogress"
          : "pending";
      },
      isDisabled: () => plugins.status?.woocommerce !== "Active",
    },
    actions: {
      buttonClick: (state, setShowModal) => {
        if (state.taskStatus === "complete") {
          window.location.href =
            "admin.php?page=wc-settings&tab=checkout&section=razorpay";
        } else {
          setShowModal(true);
        }
      },
    },
    dataDependencies: [
      {
        endpoint: Endpoints.WP_SETTINGS,
        selector: razorpaySelector,
        refresh: "razorpaySetup",
      },
    ],
    modal: (state) => {
      let modals = {
        pluginAvailable: {
          contentType: "component",
          content: CaptiveRazorpay,
          hireExpertsUrl: user?.currentBrandConfig?.hireExpertsInfo,
          settings: state.razorpaySettings,
          isFullScreen: false,
          style: { width: "800px" },
          onClose: ["razorpaySetup"],
        },
        pluginUnavailable: {
          contentType: "component",
          content: PluginsUnavailable,
          pluginName: "RazorPay",
          supportUrl:user?.currentBrandConfig?.support,
          token: plugins.token,
          isFullScreen: false,
          onClose: [],
        },
      };
      return plugins?.status?.woo_razorpay === "Active"
        ? modals.pluginAvailable
        : modals.pluginUnavailable;
    },
  },
  {
    Card: MinimalCard,
    shouldRender: (state) =>
      user?.currentBrandConfig?.setup?.["shipping"].includes("Shippo"),
    title: CaptiveFlows.shippo,
    assets: () => ({ image: Shipping }),
    text: (taskCompleted) => ({
      title: "Shipping",
      actionName: taskCompleted ? "Edit Settings" : "Setup",
    }),
    state: {
      brandConfig: () => user?.currentBrandConfig,
      taskCompleted: (state) => state?.yithOnboardingShippoRefresh?.isCompleted,
      isDisabled: () => plugins.status?.woocommerce !== "Active",
    },
    actions: {
      buttonClick: (data, setShowModal) => {
        if (data.taskCompleted) {
          window.location.href = getUrl(
            "admin.php?page=yith_shippo_shipping_for_woocommerce"
          );
        } else {
          setShowModal(true);
        }
      },
    },
    dataDependencies: [
      {
        endpoint: Endpoints.WP_SETTINGS,
        selector: yithOnboardingParser(CaptiveFlows.shippo),
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
          pluginName: "Shippo",
          token: plugins.token,
          supportUrl:user?.currentBrandConfig?.support,
          isFullScreen: false,
          onClose: [],
        },
      };
      return plugins?.status?.yith_shippo_shipping_for_woocommerce === "Active"
        ? modals.pluginAvailable
        : modals.pluginUnavailable;
    },
  },
  {
    Card: MinimalCard,
    shouldRender: () => true,
    title: "tax",
    assets: () => ({
      image: TaxInfo,
    }),
    text: (taskCompleted) => ({
      title: "Tax Info",
      actionName: taskCompleted ? "Edit Info" : "Add Info",
    }),
    state: {
      taskCompleted: (state) => state?.wcTasksTaxRefresh?.isCompleted,
      isDisabled: () => plugins.status?.woocommerce !== "Active",
    },
    actions: {
      buttonClick: (data, setShowModal) => {
        if (data.taskCompleted) {
          window.location.href = getUrl("admin.php?page=wc-settings&tab=tax");
        } else {
          setShowModal(true);
        }
      },
    },
    dataDependencies: [
      {
        endpoint: GET_WC_TASKS,
        selector: wcTasksParser("tax"),
        refresh: "wcTasksTaxRefresh",
      },
    ],
    modal: () => ({
      contentType: "component",
      content: Tax,
      hireExpertsUrl: user?.currentBrandConfig?.hireExpertsInfo,
      isFullScreen: false,
      onClose: ["wcTasksTaxRefresh"],
    }),
  },
];

export default GeneralSettings;
