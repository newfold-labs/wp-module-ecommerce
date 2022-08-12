import apiFetch from "@wordpress/api-fetch";
import useSWR, { SWRConfig } from "swr";
import { Banner } from "./components/Banner";
import { Dashboard } from "./components/Dashboard";
import { WooCommerceUnavailable } from "./components/WooCommerceUnavailable";

const fetcher = (path) => apiFetch({ path });

window.NewfoldECommerce = function NewfoldECommerce(props) {
  let {
    data,
    error,
    mutate: refreshPlugins,
  } = useSWR("/newfold-ecommerce/v1/plugins/status", fetcher, {
    revalidateOnReconnect: false,
  });
  let plugins = {
    errors: error,
    ...(data ?? {}),
    refresh: refreshPlugins,
  };
  let Hero =
    plugins.status?.woocommerce === "Active" ? Banner : WooCommerceUnavailable;
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnReconnect: false,
        isPaused: () => plugins.status?.woocommerce !== "Active",
      }}
    >
      <div className="nfd-ecommerce-atoms nfd-ecommerce-setup">
        {data === undefined ? (
          <div
            style={{ height: "100%", display: "grid", placeContent: "center" }}
          >
            <div className="bwa-loader" />
          </div>
        ) : (
          <>
            <Hero plugins={plugins} {...props} />
            <Dashboard plugins={plugins} {...props} />
          </>
        )}
      </div>
    </SWRConfig>
  );
};
