import apiFetch from "@wordpress/api-fetch";
import { Popover, SlotFillProvider } from "@wordpress/components";
import useSWR, { SWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { SiteStatus } from "./components/SiteStatus";
import { WooCommerceUnavailable } from "./components/WooCommerceUnavailable";
import { Endpoints } from "./services";

const fetcher = (path) => apiFetch({ path });

window.NewfoldECommerce = function NewfoldECommerce(props) {
  let {
    data,
    error,
    mutate: refreshPlugins,
  } = useSWR(Endpoints.PLUGIN_STATUS, fetcher, {
    revalidateOnReconnect: false,
    refreshInterval: 10 * 1000,
  });
  let { data: user } = useSWRImmutable(Endpoints.BOOTSTRAP, fetcher);
  let plugins = {
    errors: error,
    ...(data ?? {}),
    refresh: refreshPlugins,
  };
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnReconnect: false,
        isPaused: () => plugins.status?.woocommerce !== "Active",
      }}
    >
      <SlotFillProvider>
        <div>
          {data === undefined ? (
            <div
              style={{
                height: "100%",
                display: "grid",
                placeContent: "center",
              }}
            >
              <div className="nfd-ecommerce-loader" />
            </div>
          ) : (
            <>
              <WooCommerceUnavailable
                plugins={plugins}
                user={user}
                {...props}
              />
              <SiteStatus plugins={plugins} user={user} {...props} />
            </>
          )}
        </div>
        <Popover.Slot />
      </SlotFillProvider>
    </SWRConfig>
  );
};
