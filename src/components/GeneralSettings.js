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

const OnboardingSteps = {
  store_details: {
    title: "Store Info",
    setupAction: "Add Info",
    editAction: "Edit Info",
    editUrl: "/wp-admin/admin.php?page=wc-settings&tab=general",
    isSetupDone: (state) => state.onboarding.isComplete,
    SetupIcon: StoreIcon,
  },
  paypal: {
    title: "Payments",
    setupAction: "Setup",
    editAction: "Edit Settings",
    editUrl: "/wp-admin/admin.php?page=yith_paypal_payments",
    isSetupDone: (state) => false,
    SetupIcon: Payments,
  },
  shippo: {
    title: "Shipping",
    setupAction: "Setup",
    editAction: "Edit Settings",
    editUrl: "/wp-admin/admin.php?page=yith_shippo_shipping_for_woocommerce",
    isSetupDone: (state) => false,
    SetupIcon: Shipping,
  },
  tax: {
    title: "Tax Info",
    setupAction: "Add Info",
    editAction: "Edit Info",
    editUrl: "/wp-admin/admin.php?page=wc-settings&task=tax",
    isSetupDone: (state) => state.onboarding.isComplete,
    SetupIcon: TaxInfo,
  },
};

export function GeneralSettings(props) {
  let { Modal, useEffect, useState } = props.wpModules;
  let [onboardingModalKey, setOnboardingModal] = useState(null);
  let {
    data: onboardingResponse,
    error,
    mutate: refreshTasks,
  } = useSWR("/wc-admin/onboarding/tasks?ids=setup");
  useEffect(() => {
    async function onExternalOnboardingComplete(messageEvent) {
      if (
        messageEvent.origin === window.location.origin &&
        messageEvent?.data?.type === "onboarding-complete"
      ) {
        setOnboardingModal(null);
      }
    }
    window.addEventListener("message", onExternalOnboardingComplete);
    return () =>
      window.removeEventListener("message", onExternalOnboardingComplete);
  }, [setOnboardingModal]);
  if (!onboardingResponse) {
    return (
      <div style={{ height: "100%", display: "grid", placeContent: "center" }}>
        {error ? (
          <h2>There was an error while loading this information</h2>
        ) : (
          <div className="bwa-loader" />
        )}
      </div>
    );
  }
  let onboardingSetup = onboardingResponse[0];
  let onboarding = Object.fromEntries(
    (onboardingSetup ? onboardingSetup.tasks : []).map((task) => [
      task.id,
      task,
    ])
  );
  let completedSteps = Object.entries(OnboardingSteps).filter(
    ([stepKey, stepProgress]) =>
      stepProgress.isSetupDone({ onboarding: onboarding[stepKey] ?? {} })
  );
  let incompleteSteps = Object.entries(OnboardingSteps).filter(
    ([stepKey, stepProgress]) =>
      !stepProgress.isSetupDone({
        onboarding: onboarding[stepKey] ?? {},
      })
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
          title="These steps are done, nice job!"
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
          shouldCloseOnClickOutside={false}
          onRequestClose={() => setOnboardingModal(null)}
        >
          <div className="nfd-ecommerce-modal-content">
            <NativeOnboarding
              {...props}
              refreshTasks={refreshTasks}
              onComplete={() => setOnboardingModal(null)}
            />
          </div>
        </Modal>
      ) : null}
      {onboardingModalKey === "paypal" || onboardingModalKey === "shippo" ? (
        <Modal
          overlayClassName="nfd-ecommerce-modal-overlay"
          className="nfd-ecommerce-atoms nfd-ecommerce-modal"
          isFullScreen
          shouldCloseOnClickOutside={false}
          onRequestClose={() => setOnboardingModal(null)}
        >
          <iframe
            style={{ width: "100%", height: "100%" }}
            src={`/wp-admin/admin.php?page=nfd-ecommerce-captive-flow-${onboardingModalKey}`}
          />
        </Modal>
      ) : null}
    </>
  );
}
