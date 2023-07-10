import apiFetch from "@wordpress/api-fetch";
import { Spinner } from "@yoast/ui-library";
import useSWR, { SWRConfig } from "swr";
import { Products } from "./components/ProductsAndServices";
import { Store } from "./components/Store";
import { StoreDetails } from "./components/StoreDetails";
import { WonderCart } from "./components/WonderCart";
import { createApiUrl } from "./sdk/createApiUrl";
import { PluginsSdk } from "./sdk/plugins";
import domReady from "@wordpress/dom-ready";
import { HiiveAnalytics } from "@newfold-labs/js-utility-ui-analytics";

domReady(() => {
  HiiveAnalytics.initialize({
    namespace: "wp-module-ecommerce",
    urls: {
      single: createApiUrl("/newfold-data/v1/events"),
      batch: createApiUrl("/newfold-data/v1/events/batch"),
    },
    settings: {
      debounce: {
        time: 3000,
      },
    },
  });
});

const fetcher = (path) => apiFetch({ url: createApiUrl(path) });

const pages = [
  { key: "/store", Page: Store },
  { key: "/store/products", Page: Products },
  { key: "/store/details", Page: StoreDetails },
  { key: "/store/sales_discounts", Page: WonderCart },
];

function parseWCStatus(data) {
  const status = data?.details?.woocommerce?.status;
  const isActive = status === "active";
  const needsInstall = status === "need_to_install";
  const isInstalling = data?.queue?.includes("woocommerce");
  return { isActive, needsInstall, isInstalling };
}

/** @type {import("..").NewfoldEcommerce}  */
export function NewfoldECommerce(props) {
  let { data: woo, mutate } = useSWR(
    "woo-status",
    () => PluginsSdk.queries.status("woocommerce").then(parseWCStatus),
    { revalidateOnReconnect: false, refreshInterval: 30 * 1000 }
  );
  let { Page } =
    pages.find((page) => page.key === props.state.location) ?? pages[0];

  if (woo === undefined) {
    return (
      <div className="yst-flex yst-items-center yst-text-center yst-justify-center yst-h-full">
        <Spinner size={8} className="yst-text-primary" />
      </div>
    );
  }
  if (!woo.isActive) {
    Page = Store;
  }
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnReconnect: false,
        revalidateOnFocus: woo.isActive,
      }}
    >
      <Page woo={{ ...woo, refreshStatus: mutate }} {...props} />
    </SWRConfig>
  );
}

export * from "./components/FreePlugins";
export * from "./components/OnboardingScreen";
