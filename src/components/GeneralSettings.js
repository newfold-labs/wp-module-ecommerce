import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import useSWR from "swr";
import { ReactComponent as Payments } from "../icons/payments.svg";
import { ReactComponent as Shipping } from "../icons/shipping.svg";
import { ReactComponent as StoreIcon } from "../icons/store.svg";
import { ReactComponent as CompletedTask } from "../icons/task-complete.svg";
import { ReactComponent as TaxInfo } from "../icons/taxinfo.svg";
import { Endpoints } from "../services";
import { Card } from "./Card";
import { DashboardContent } from "./DashboardContent";
import { StoreAddress } from "./StoreAddress";
import Tax from "./Tax";

const YithOptions = {
  paypal: "nfd-ecommerce-captive-flow-paypal",
  shippo: "nfd-ecommerce-captive-flow-shippo",
};
const GET_WC_TASKS = `/wc-admin/onboarding/tasks?${new URLSearchParams({
  ids: "setup",
})}`;

const OnboardingSteps = {
  store_details: {
    title: __("Store Info", "wp-module-ecommerce"),
    setupAction: __("Add Info", "wp-module-ecommerce"),
    editAction: __("Edit Info", "wp-module-ecommerce"),
    editUrl: "admin.php?page=wc-settings&tab=general",
    SetupIcon: StoreIcon,
  },
  [YithOptions.paypal]: {
    title: __("Payments", "wp-module-ecommerce"),
    setupAction: __("Setup", "wp-module-ecommerce"),
    editAction: __("Edit Settings", "wp-module-ecommerce"),
    editUrl: "admin.php?page=yith_paypal_payments",
    SetupIcon: Payments,
  },
  [YithOptions.shippo]: {
    title: __("Shipping", "wp-module-ecommerce"),
    setupAction: __("Setup", "wp-module-ecommerce"),
    editAction: __("Edit Settings", "wp-module-ecommerce"),
    editUrl: "admin.php?page=yith_shippo_shipping_for_woocommerce",
    SetupIcon: Shipping,
  },
  tax: {
    title: __("Tax Info", "wp-module-ecommerce"),
    setupAction: __("Add Info", "wp-module-ecommerce"),
    editAction: __("Edit Info", "wp-module-ecommerce"),
    editUrl: "admin.php?page=wc-settings&tab=tax",
    SetupIcon: TaxInfo,
  },
};

function useOnBoardingStatus() {
  let {
    data: wcOnboarding,
    error: wcError,
    mutate: refreshWC,
  } = useSWR(GET_WC_TASKS);
  let {
    data: yithOnboarding,
    error: yithError,
    mutate: refreshYith,
  } = useSWR(Endpoints.WP_SETTINGS);
  let onboardingSetup = wcOnboarding?.[0];
  let onboarding = Object.fromEntries(
    (onboardingSetup?.tasks ?? [])
      .map((task) => [task.id, task.isComplete])
      .concat(
        Object.entries(yithOnboarding ?? {}).map(([option, value]) => [
          option,
          value === "true",
        ])
      )
  );
  return [
    !wcOnboarding || !yithOnboarding,
    { wc: wcError, yith: yithError },
    { wc: refreshWC, yith: refreshYith },
    onboarding,
  ];
}

export function GeneralSettings(props) {
  let { wpModules, plugins } = props;
  let { Modal } = wpModules;
  let [onboardingModalKey, setOnboardingModal] = useState(null);
  let [isLoading, errors, refresh, onboarding] = useOnBoardingStatus();
  let isPaypalPluginInstalled =
    plugins?.status?.yith_paypal_payments === "Active";
  let isShippoPluginInstalled =
    plugins?.status?.yith_shippo_shipping_for_woocommerce === "Active";
  let showThirdPartyIntegration =
    onboardingModalKey === YithOptions.paypal ||
    onboardingModalKey === YithOptions.shippo;
  let isThirdPartyIntegrationPending =
    !isPaypalPluginInstalled || !isShippoPluginInstalled;
  if (isLoading) {
    return (
      <div style={{ height: "100%", display: "grid", placeContent: "center" }}>
        {errors.wc || errors.yith ? (
          <h2>
            {__(
              "There was an error while loading this information",
              "wp-module-ecommerce"
            )}
          </h2>
        ) : (
          <div className="bwa-loader" />
        )}
      </div>
    );
  }
  let completedSteps = Object.entries(OnboardingSteps).filter(
    ([stepKey]) => onboarding[stepKey] === true
  );
  let incompleteSteps = Object.entries(OnboardingSteps).filter(
    ([stepKey]) => onboarding[stepKey] !== true
  );
  let NativeOnboarding =
    onboardingModalKey === "store_details" ? StoreAddress : Tax;
  return (
    <>
      {incompleteSteps.length > 0 ? (
        <>
          <DashboardContent
            title={__("Get Started!", "wp-module-ecommerce")}
            subtitle={__(
              "Here you can find the essential steps we recommend you complete so you can launch your store.",
              "wp-module-ecommerce"
            )}
          >
            <div className="nfd-ecommerce-standard-actions-container">
              {incompleteSteps.map(([stepKey, stepProgress]) => {
                let { SetupIcon } = stepProgress;
                return (
                  <Card
                    key={stepKey}
                    variant="standard"
                    title={stepProgress.title}
                    action={stepProgress.setupAction}
                    onClick={() => setOnboardingModal(stepKey)}
                  >
                    <SetupIcon />
                  </Card>
                );
              })}
            </div>
          </DashboardContent>
          <div style={{ height: "40px" }} />
        </>
      ) : null}
      {completedSteps.length > 0 ? (
        <DashboardContent
          title={
            incompleteSteps.length === 0
              ? __("You've got the basics covered!", "wp-module-ecommerce")
              : __("These steps are done, nice job!", "wp-module-ecommerce")
          }
          subtitle={__(
            "Feel free to come back at any time and update any of the information in the steps you've already completed.",
            "wp-module-ecommerce"
          )}
        >
          <div className="nfd-ecommerce-minimal-tasks-container">
            {completedSteps.map(([stepKey, stepProgress]) => {
              return (
                <Card
                  key={stepKey}
                  variant="minimal"
                  title={stepProgress.title}
                  action={stepProgress.editAction}
                  href={stepProgress.editUrl}
                >
                  <CompletedTask />
                </Card>
              );
            })}
          </div>
        </DashboardContent>
      ) : null}
      {onboardingModalKey === "store_details" ||
      onboardingModalKey === "tax" ? (
        <Modal
          overlayClassName="nfd-ecommerce-modal-overlay"
          className="nfd-ecommerce-atoms nfd-ecommerce-modal"
          shouldCloseOnEsc={false}
          shouldCloseOnClickOutside={false}
          onRequestClose={() => setOnboardingModal(null)}
        >
          <div className="nfd-ecommerce-modal-content">
            <NativeOnboarding
              {...props}
              isStoreDetailsFilled={onboarding.store_details === true}
              onComplete={async () => {
                await refresh.wc();
                setOnboardingModal(null);
              }}
            />
          </div>
        </Modal>
      ) : null}
      {showThirdPartyIntegration ? (
        isThirdPartyIntegrationPending ? (
          <Modal
            overlayClassName="nfd-ecommerce-modal-overlay"
            className="nfd-ecommerce-atoms nfd-ecommerce-modal-wc-install-failed"
            shouldCloseOnEsc={false}
            shouldCloseOnClickOutside={false}
            onRequestClose={() => setOnboardingModal(null)}
          >
            <div className="nfd-ecommerce-modal-content">
              <h1>We hit a snag...</h1>
              <span style={{ marginTop: "48px" }}>
                {onboardingModalKey == YithOptions.paypal
                  ? "Payment"
                  : "Shipping"}{" "}
                support is being setup. Please check back in sometime.
              </span>
              <span style={{ marginTop: "32px", height: "60px" }}>
                If the problem persists, please{" "}
                <a href="https://www.bluehost.com/contact" target="_blank">
                  contact
                </a>{" "}
                the support team.
              </span>
            </div>
          </Modal>
        ) : (
          <Modal
            overlayClassName="nfd-ecommerce-modal-overlay"
            className="nfd-ecommerce-atoms nfd-ecommerce-modal"
            isFullScreen
            shouldCloseOnEsc={false}
            shouldCloseOnClickOutside={false}
            onRequestClose={() => setOnboardingModal(null)}
          >
            <iframe
              style={{ width: "100%", height: "100%" }}
              src={`admin.php?page=${onboardingModalKey}`}
            />
          </Modal>
        )
      ) : null}
    </>
  );
}
