import { __ } from "@wordpress/i18n";
import useSWR from "swr";
import { AdvancedFeatures } from "./AdvancedFeatures";
import { CustomizeStore } from "./CustomizeStore";
import { GeneralSettings } from "./GeneralSettings";
import { ManageProducts } from "./ManageProducts";
import { SiteStatus } from "./SiteStatus";
import { useOnboardingCleanup } from "./useOnboardingCleanup";

function getStepName(stepKey, state) {
  switch (stepKey) {
    case "general":
      return __("General Settings", "wp-module-ecommerce");
    case "products":
      return __("Add products", "wp-module-ecommerce");
    case "customize":
      return __("Customize your store", "wp-module-ecommerce");
    case "advanced":
      return __("Advanced features", "wp-module-ecommerce");
    case "status":
      return state.wp.comingSoon
        ? __("Launch Your Store", "wp-module-ecommerce")
        : __("Site Status", "wp-module-ecommerce");
    default:
      return null;
  }
}

const guideSteps = [
  { key: "general", StepContent: GeneralSettings },
  { key: "products", StepContent: ManageProducts },
  { key: "customize", StepContent: CustomizeStore },
  { key: "advanced", StepContent: AdvancedFeatures },
  { key: "status", StepContent: SiteStatus },
];

export function Dashboard(props) {
  let { key, StepContent } =
    guideSteps.find((step) => step.key === props.section) ?? guideSteps[0];
  let { data: token } = useSWR("/newfold-ecommerce/v1/plugins/verification");
  let isCleanUpInProgress = useOnboardingCleanup(props.token);
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
            <li>{getStepName(step.key, props.state)}</li>
          </a>
        ))}
      </nav>
      <div className="nfd-ecommerce-dashboard-content">
        {isCleanUpInProgress ? (
          <div
            style={{ height: "100%", display: "grid", placeContent: "center" }}
          >
            <div className="bwa-loader" />
          </div>
        ) : (
          <StepContent token={token} {...props} />
        )}
      </div>
    </div>
  );
}
