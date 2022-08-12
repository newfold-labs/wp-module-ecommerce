import apiFetch from "@wordpress/api-fetch";
import { SWRConfig } from "swr";
import { Banner } from "./components/Banner";
import { Dashboard } from "./components/Dashboard";
import { WooCommerceUnavailable } from "./components/WooCommerceUnavailable";

const fetcher = (path) => apiFetch({ path });

window.NewfoldECommerce = function NewfoldECommerce(props) {
  let Hero =
    props.state.wp?.isWooActive === 1 ? Banner : WooCommerceUnavailable;
  return (
    <SWRConfig value={{ fetcher, revalidateOnReconnect: false }}>
      <div className="nfd-ecommerce-atoms nfd-ecommerce-setup">
        <Hero {...props} />
        <Dashboard {...props} />
      </div>
    </SWRConfig>
  );
};
