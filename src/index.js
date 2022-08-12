import apiFetch from "@wordpress/api-fetch";
import { SWRConfig } from "swr";
import { Banner } from "./components/Banner";
import { Dashboard } from "./components/Dashboard";
import { WooCommerceUnavailable } from "./components/WooCommerceUnavailable";

const fetcher = (path) => apiFetch({ path });

export default function NewfoldECommerce(props) {
  return (
    <SWRConfig value={{ fetcher, revalidateOnReconnect: false }}>
      <div className="nfd-ecommerce-atoms nfd-ecommerce-setup">
        {props.state.wp.isWooActive === 1 ? <Banner {...props} /> :<WooCommerceUnavailable {...props}/> }
        <Dashboard {...props} />
      </div>
    </SWRConfig>
  );
}
