import { __ } from "@wordpress/i18n";
import { AdvancedFeatures } from "./AdvancedFeatures";
import { CustomizeStore } from "./CustomizeStore";
import { GeneralSettings } from "./GeneralSettings";
import { ManageProducts } from "./ManageProducts";
import { SiteStatus } from "./SiteStatus";

const guideSteps = [
  {
    key: "general",
    name: __("General Settings", "wp-module-ecommerce"),
    StepContent: GeneralSettings,
  },
  {
    key: "products",
    name: __("Add products", "wp-module-ecommerce"),
    StepContent: ManageProducts,
  },
  {
    key: "customize",
    name: __("Customize your store", "wp-module-ecommerce"),
    StepContent: CustomizeStore,
  },
  {
    key: "advanced",
    name: __("Advanced features", "wp-module-ecommerce"),
    StepContent: AdvancedFeatures,
  },
  {
    key: "status",
    name: __("Site Status", "wp-module-ecommerce"),
    StepContent: SiteStatus,
  },
];

export function Dashboard(props) {
  let { key, StepContent } =
    guideSteps.find((step) => step.key === props.section) ?? guideSteps[0];
  return (
    <div className="nfd-ecommerce-dashboard">
      <nav
        aria-label={__("Setup Guide", "wp-module-ecommerce")}
        className="nfd-ecommerce-dashboard-menu"
      >
        {guideSteps.map((step) => (
          <a
            key={step.key}
            data-active={key === step.key}
            href={`#/home/store/${step.key}`}
          >
            <li>{step.name}</li>
          </a>
        ))}
      </nav>
      <div className="nfd-ecommerce-dashboard-content">
        <StepContent {...props} />
      </div>
    </div>
  );
}
