import { Banner } from "./components/Banner";
import { Dashboard } from "./components/Dashboard";

export default function NewfoldECommerce(props) {
  return (
    <div className="nfd-ecommerce-setup">
      <Banner {...props} />
      <Dashboard {...props} />
    </div>
  );
}
