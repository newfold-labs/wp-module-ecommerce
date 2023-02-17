import {
  __experimentalNavigation as Navigation,
  __experimentalNavigationItem as NavigationItem,
  __experimentalNavigationMenu as NavigationMenu,
} from "@wordpress/components";
import { useViewportMatch } from "@wordpress/compose";
import { __ } from "@wordpress/i18n";
import { AdvancedFeatures } from "./AdvancedFeatures";
import { CustomizeStore } from "./CustomizeStore";
import { GeneralSettings } from "./GeneralSettings";
import { ManageProducts } from "./ManageProducts";
import { Marketplace } from "./Marketplace";
import { useOnboardingCleanup } from "./useOnboardingCleanup";
import { useSetupYITHWonderTheme } from "./useSetupYITHWonderTheme";

/**
 * @param {string} stepKey
 */
function getStepName(stepKey) {
  switch (stepKey) {
    case "general":
      return __("Store Info", "wp-module-ecommerce");
    case "products":
      return __("Products and Services", "wp-module-ecommerce");
    case "pages":
      return __("Pages", "wp-module-ecommerce");
    case "features":
      return __("Additional Features", "wp-module-ecommerce");
    case "recommended":
      return __("Recommended Plugins", "wp-module-ecommerce");
    default:
      return null;
  }
}

const guideSteps = [
  { key: "general", StepContent: GeneralSettings },
  { key: "products", StepContent: ManageProducts },
  { key: "pages", StepContent: CustomizeStore },
  { key: "features", StepContent: AdvancedFeatures },
  { key: "recommended", StepContent: Marketplace },
];

export function Dashboard(props) {
  const { navigate } = props.wpModules;
  const isLargeViewport = useViewportMatch("mobile", ">=");
  let isUpsellNeeded =
    props.state.wp.isWooActive && !props.state.wp.isOnECommercePlan;
  let { key, StepContent } =
    guideSteps
      .filter((step) =>
        isUpsellNeeded ? step.key !== "features" : step.key !== "recommended"
      )
      .find((step) => step.key === props.section) ?? guideSteps[0];
  useSetupYITHWonderTheme();
  let isCleanUpInProgress = useOnboardingCleanup(props.plugins.token?.hash);
  function onBackButtonClick() {
    navigate("/home/store");
  }
  return (
    <div className="nfd-ecommerce-dashboard">
      {isLargeViewport ? (
        <nav
          aria-label={__("Setup Guide", "wp-module-ecommerce")}
          className="nfd-ecommerce-dashboard-menu"
        >
          {guideSteps.map((step) => (
            <a
              key={getStepName(step.key)}
              data-active={key === step.key}
              href={`#/home/store/${step.key}`}
            >
              <li>{getStepName(step.key)}</li>
            </a>
          ))}
        </nav>
      ) : (
        <Navigation
          className="nf-onboarding__mobile"
          activeMenu={props.section ?? "dashboard-tabs"}
        >
          <NavigationMenu menu="dashboard-tabs">
            {guideSteps.map((tab) => (
              <NavigationItem
                key={tab.key}
                title={getStepName(tab.key)}
                navigateToMenu={tab.key}
                href={`#/home/store/${tab.key}`}
              />
            ))}
          </NavigationMenu>
          {guideSteps.map((tab) => {
            return (
              <NavigationMenu
                key={`${tab.key}-menu`}
                menu={tab.key}
                parentMenu="dashboard-tabs"
                onBackButtonClick={onBackButtonClick}
              >
                <NavigationItem>
                  <tab.StepContent {...props} />
                </NavigationItem>
              </NavigationMenu>
            );
          })}
        </Navigation>
      )}
      {isLargeViewport ? (
        <div className="nfd-ecommerce-dashboard-content">
          {isCleanUpInProgress ? (
            <div
              style={{
                height: "100%",
                display: "grid",
                placeContent: "center",
              }}
            >
              <div className="bwa-loader" />
            </div>
          ) : (
            <StepContent {...props} />
          )}
        </div>
      ) : null}
    </div>
  );
}
