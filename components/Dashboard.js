import { AdvancedFeatures } from "./AdvancedFeatures";
import { CustomizeStore } from "./CustomizeStore";
import { GeneralSettings } from "./GeneralSettings";
import { LaunchStore } from "./LaunchStore";
import { ManageProducts } from "./ManageProducts";

const guideSteps = [
  {
    key: "general",
    name: "General Settings",
    StepContent: GeneralSettings,
    shouldRender: (state) => true,
  },
  {
    key: "products",
    name: "Add products",
    StepContent: ManageProducts,
    shouldRender: (state) => true,
  },
  {
    key: "customize",
    name: "Customize your store",
    StepContent: CustomizeStore,
    shouldRender: (state) => true,
  },
  {
    key: "plugins",
    name: "Advanced features",
    StepContent: AdvancedFeatures,
    shouldRender: (state) => true,
  },
  {
    key: "launch",
    name: "Launch your store",
    StepContent: LaunchStore,
    shouldRender: (state) => state.wp.comingSoon === true,
  },
];

export function Dashboard(props) {
  let { wpModules, state } = props;
  let step = wpModules.useState("general");
  let activeStep = step[0];
  let setStep = step[1];
  let { StepContent } = guideSteps.find((step) => step.key === activeStep);
  return (
    <div className="nfd-ecommerce-dashboard">
      <nav aria-label="Setup Guide" className="nfd-ecommerce-dashboard-menu">
        {guideSteps
          .filter((step) => step.shouldRender(state))
          .map((step) => (
            <li
              key={step.key}
              data-active={activeStep === step.key}
              onClick={() => setStep(step.key)}
            >
              {step.name}
            </li>
          ))}
      </nav>
      <div className="nfd-ecommerce-dashboard-content">
        <StepContent {...props} />
      </div>
    </div>
  );
}
