import { __ } from "@wordpress/i18n";
import { AdvancedFeatures } from "./AdvancedFeatures";
import { CustomizeStore } from "./CustomizeStore";
import { GeneralSettings } from "./GeneralSettings";
import { ManageProducts } from "./ManageProducts";
import { SiteStatus } from "./SiteStatus";
import { useOnboardingCleanup } from "./useOnboardingCleanup";
import { useSetupYITHWonderTheme } from "./useSetupYITHWonderTheme";

function getStepName(stepKey, state) {
  switch (stepKey) {
    case "general":
      return __("Store Info", "wp-module-ecommerce");
    case "products":
      return __("Products and Services", "wp-module-ecommerce");
    case "pages":
      return __("Pages", "wp-module-ecommerce");
    case "features":
      return __("Additional Features", "wp-module-ecommerce");
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
  { key: "pages", StepContent: CustomizeStore },
  { key: "features", StepContent: AdvancedFeatures },
  { key: "status", StepContent: SiteStatus },
];

export function Dashboard(props) {
  let { key, StepContent } =
    guideSteps.find((step) => step.key === props.section) ?? guideSteps[0];
  useSetupYITHWonderTheme();
  let isCleanUpInProgress = useOnboardingCleanup(props.plugins.token?.hash);
  let addCurtain = props.plugins?.status?.woocommerce !== 'Active';
  let className = `nfd-ecommerce-dashboard ${addCurtain ? 'disableDashboardContent' : ''}` ;
  return (
    <div className={className}>
      <nav
        aria-label={__("Setup Guide", "wp-module-ecommerce")}
        className="nfd-ecommerce-dashboard-menu"
      >
        {guideSteps.map((step) => (
          <a
            key={getStepName(step.key, props.state)}
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
          <StepContent {...props} />
        )}
      </div>
    </div>
  );
}
