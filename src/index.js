import { SWRConfig } from "swr";
import { Banner } from "./components/Banner";
import { Dashboard } from "./components/Dashboard";

export default function NewfoldECommerce(props) {
  let { wpModules } = props;
  const fetcher = (path) => wpModules.apiFetch({ path });
  return (
    <SWRConfig value={{ fetcher }}>
      <div className="nfd-ecommerce-atoms nfd-ecommerce-setup">
        <Banner {...props} />
        <Dashboard {...props} />
      </div>
    </SWRConfig>
  );
}
