import apiFetch from "@wordpress/api-fetch";
import useSWR, { SWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { Home } from "./components/Home";
import { PluginsSdk } from "./sdk/plugins";
import { Endpoints } from "./services";
import { Products } from "./components/ProductsAndServices";

const fetcher = (path) => apiFetch({ path });

const pages = [
  { key: "/store", Page: Home },
  { key: "/store/products", Page: Products },
  { key: "/store/details", Page: Home },
];

export function NewfoldECommerce(props) {
  let {
    data,
    error,
    mutate: refreshWooStatus,
  } = useSWR("woo-status", () => PluginsSdk.queryStatus("woocommerce"), {
    revalidateOnReconnect: false,
    refreshInterval: 10 * 1000,
  });
  let { data: user } = useSWRImmutable(Endpoints.BOOTSTRAP, fetcher);
  let plugins = { errors: error, ...(data ?? {}), refreshWooStatus };
  let { Page } =
    pages.find((page) => page.key === props.state.location) ?? pages[0];

  if (data === undefined) {
    return (
      <div className="yst-grid yst-place-content-center yst-h-full">
        <div className="nfd-ecommerce-loader" />
      </div>
    );
  }

  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnReconnect: false,
        revalidateOnFocus: plugins.details?.woocommerce?.status === "active",
      }}
    >
      <Page plugins={plugins} user={user} {...props} />
    </SWRConfig>
  );
}
