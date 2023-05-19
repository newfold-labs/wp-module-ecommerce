import apiFetch from "@wordpress/api-fetch";
import useSWR, { SWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { Home } from "./components/Home";
import { Endpoints } from "./services";

const fetcher = (path) => apiFetch({ path });

const pages = [
  { key: "/store", Page: Home },
  { key: "/store/products", Page: Home },
  { key: "/store/details", Page: Home },
];

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
  let { Page } =
    pages.find((page) => page.key === props.state.location) ?? pages[0];

  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnReconnect: false,
        isPaused: () => plugins.status?.woocommerce !== "Active",
      }}
    >
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
        <Page plugins={plugins} user={user} {...props} />
      )}
    </SWRConfig>
  );
};
