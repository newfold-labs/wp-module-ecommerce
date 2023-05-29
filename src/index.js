import apiFetch from "@wordpress/api-fetch";
import { Spinner } from "@yoast/ui-library";
import useSWR, { SWRConfig } from "swr";
import { Home } from "./components/Home";
import { Products } from "./components/ProductsAndServices";
import { StoreDetails } from "./components/StoreDetails";
import { PluginsSdk } from "./sdk/plugins";

const fetcher = (path) => apiFetch({ path });

const pages = [
  { key: "/store", Page: Home },
  { key: "/store/products", Page: Products },
  { key: "/store/details", Page: StoreDetails },
];

export function NewfoldECommerce(props) {
  let {
    data,
    error,
    mutate: refreshWooStatus,
  } = useSWR("woo-status", () => PluginsSdk.queries.status("woocommerce"), {
    revalidateOnReconnect: false,
    refreshInterval: 10 * 1000,
  });
  let plugins = { errors: error, ...(data ?? {}), refreshWooStatus };
  let { Page } =
    pages.find((page) => page.key === props.state.location) ?? pages[0];

  if (data === undefined) {
    return (
      <div className="yst-flex yst-items-center yst-text-center yst-justify-center yst-h-full">
        <Spinner size={8} className="yst-text-primary" />
      </div>
    );
  }
  const isWCActive = PluginsSdk.queries.isPlugin(
    plugins,
    ["woocommerce"],
    "active"
  );
  if (!isWCActive) {
    Page = Home;
  }
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnReconnect: false,
        revalidateOnFocus: isWCActive,
      }}
    >
      <Page plugins={plugins} {...props} />
    </SWRConfig>
  );
}

export * from "./components/FreePlugins";
export * from "./components/SiteStatus";
