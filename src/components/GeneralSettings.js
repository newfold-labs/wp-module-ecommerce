import useSWR from "swr";
import { ReactComponent as Payments } from "../icons/payments.svg";
import { ReactComponent as Shipping } from "../icons/shipping.svg";
import { ReactComponent as StoreIcon } from "../icons/store.svg";
import { ReactComponent as CompletedTask } from "../icons/task-complete.svg";
import { ReactComponent as TaxInfo } from "../icons/taxinfo.svg";
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
const GET_YITH_OPTIONS = `/wp/v2/settings`;

const OnboardingSteps = {
  store_details: {
    title: "Store Info",
    setupAction: "Add Info",
    editAction: "Edit Info",
    editUrl: "admin.php?page=wc-settings&tab=general",
    SetupIcon: StoreIcon,
  },
  [YithOptions.paypal]: {
    title: "Payments",
    setupAction: "Setup",
    editAction: "Edit Settings",
    editUrl: "admin.php?page=yith_paypal_payments",
    SetupIcon: Payments,
  },
  [YithOptions.shippo]: {
    title: "Shipping",
    setupAction: "Setup",
    editAction: "Edit Settings",
    editUrl: "admin.php?page=yith_shippo_shipping_for_woocommerce",
    SetupIcon: Shipping,
  },
  tax: {
    title: "Tax Info",
    setupAction: "Add Info",
    editAction: "Edit Info",
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
  } = useSWR(GET_YITH_OPTIONS);
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
  let { Modal, useState } = props.wpModules;
  let [onboardingModalKey, setOnboardingModal] = useState(null);
  let [isLoading, errors, refresh, onboarding] = useOnBoardingStatus();
  if (isLoading) {
    return (
      <div style={{ height: "100%", display: "grid", placeContent: "center" }}>
        {errors.wc || errors.yith ? (
          <h2>There was an error while loading this information</h2>
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
            title="Get Started!"
            subtitle="Here you can find the essential steps we recommend you complete so you can launch your store."
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
              ? "You've got the basics covered!"
              : "These steps are done, nice job!"
          }
          subtitle="Feel free to come back at any time and update any of the information in the steps you've already completed."
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
      {onboardingModalKey === YithOptions.paypal ||
      onboardingModalKey === YithOptions.shippo ? (
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
      ) : null}
    </>
  );
}
