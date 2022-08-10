import apiFetch from "@wordpress/api-fetch";
import { SWRConfig } from "swr";
import { Banner } from "./components/Banner";
import { Dashboard } from "./components/Dashboard";

const fetcher = (path) => apiFetch({ path });

export default function NewfoldECommerce(props) {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className="nfd-ecommerce-atoms nfd-ecommerce-setup">
        <Banner {...props} />
        <Dashboard {...props} />
      </div>
    </SWRConfig>
  );
}
