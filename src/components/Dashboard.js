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
    shouldRender: (state) => true,
  },
  {
    key: "products",
    name: __("Add products", "wp-module-ecommerce"),
    StepContent: ManageProducts,
    shouldRender: (state) => true,
  },
  {
    key: "customize",
    name: __("Customize your store", "wp-module-ecommerce"),
    StepContent: CustomizeStore,
    shouldRender: (state) => true,
  },
  {
    key: "plugins",
    name: __("Advanced features", "wp-module-ecommerce"),
    StepContent: AdvancedFeatures,
    shouldRender: (state) => true,
  },
  {
    key: "launch",
    name: __("Site Status", "wp-module-ecommerce"),
    StepContent: SiteStatus,
    shouldRender: (state) => true,
  },
];

export function Dashboard(props) {
  let { wpModules, state } = props;
  let visibleSteps = guideSteps.filter((step) => step.shouldRender(state));
  let firstStep = visibleSteps[0];
  let step = wpModules.useState(firstStep.key);
  let activeStep = step[0];
  let setStep = step[1];
  let StepContent = "div";
  let stepConfig = visibleSteps.find((step) => step.key === activeStep);
  if (stepConfig) {
    StepContent = stepConfig.StepContent;
  }
  return (
    <div className="nfd-ecommerce-dashboard">
      <nav
        aria-label={__("Setup Guide", "wp-module-ecommerce")}
        className="nfd-ecommerce-dashboard-menu"
      >
        {visibleSteps.map((step) => (
          <li
            key={step.key}
            data-active={activeStep === step.key}
            onClick={() => setStep(step.key)}
          >
            <h3>{step.name}</h3>
          </li>
        ))}
      </nav>
      <div className="nfd-ecommerce-dashboard-content">
        <StepContent {...props} />
      </div>
    </div>
  );
}
