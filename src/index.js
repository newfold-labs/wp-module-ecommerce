import apiFetch from "@wordpress/api-fetch";
import useSWR, { SWRConfig } from "swr";
import { Banner } from "./components/Banner";
import { Dashboard } from "./components/Dashboard";
import { SiteStatus } from "./components/SiteStatus";
import { StoreAnalytics } from "./components/StoreAnalytics";
import { WooCommerceUnavailable } from "./components/WooCommerceUnavailable";
import { Endpoints } from "./services";

const fetcher = (path) => apiFetch({ path });

if(window.parent){
  window.parent.postMessage({
    type:"captive-flow-completion"
  },
  window.location.origin
  )
}
window.NewfoldECommerce = function NewfoldECommerce(props) {
  let {
    data,
    error,
    mutate: refreshPlugins,
  } = useSWR(Endpoints.PLUGIN_STATUS, fetcher, {
    revalidateOnReconnect: false,
    refreshInterval: 10 * 1000,
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
            <StoreAnalytics plugins={plugins} {...props} />
            <Dashboard plugins={plugins} {...props} />
            <SiteStatus plugins={plugins} {...props} />
          </>
        )}
      </div>
    </SWRConfig>
  );
};
