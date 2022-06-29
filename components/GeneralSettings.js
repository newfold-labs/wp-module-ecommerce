import useSWR from "swr";
import { ReactComponent as Payments } from "../icons/payments.svg";
import { ReactComponent as Shipping } from "../icons/shipping.svg";
import { ReactComponent as StoreIcon } from "../icons/store.svg";
import { ReactComponent as TaxInfo } from "../icons/taxinfo.svg";
import { Card } from "./Card";
import { ReactComponent as CompletedTask } from "./CompletedTask.svg";
import { DashboardContent } from "./DashboardContent";

const OnboardingSteps = {
  store_details: {
    title: "Store Info",
    setupAction: "Add Info",
    editAction: "Edit Info",
    setupUrl: "/wp-admin/admin.php?page=wc-admin&path=%2Fsetup-wizard",
    editUrl: "/wp-admin/admin.php?page=wc-settings&tab=general",
    isSetupDone: (state) => state.onboarding.isComplete,
    SetupIcon: StoreIcon,
  },
  payments: {
    title: "Payments",
    setupAction: "Setup",
    editAction: "Edit Settings",
    setupUrl: "/wp-admin/admin.php?page=wc-admin&task=payments",
    editUrl: "/wp-admin/admin.php?page=wc-admin&task=payments",
    isSetupDone: (state) => state.onboarding.isComplete,
    SetupIcon: Payments,
  },
  shipping: {
    title: "Shipping",
    setupAction: "Setup",
    editAction: "Edit Settings",
    setupUrl: "/wp-admin/admin.php?page=wc-settings&tab=shipping",
    editUrl: "/wp-admin/admin.php?page=wc-settings&tab=shipping",
    isSetupDone: (state) => state.shipping.length > 1,
    SetupIcon: Shipping,
  },
  tax: {
    title: "Tax Info",
    setupAction: "Add Info",
    editAction: "Edit Info",
    setupUrl: "/wp-admin/admin.php?page=wc-admin&task=tax",
    editUrl: "/wp-admin/admin.php?page=wc-admin&task=tax",
    isSetupDone: (state) => state.onboarding.isComplete,
    SetupIcon: TaxInfo,
  },
};

export function GeneralSettings(props) {
  let { wpModules } = props;
  const fetcher = (path) => wpModules.apiFetch({ path });

  let { data: onboardingResponse = [] } = useSWR(
    "/wc-admin/onboarding/tasks?ids=setup",
    fetcher
  );
  let onboardingSetup = onboardingResponse[0];
  let { data: shipping = [] } = useSWR("/wc/v3/shipping/zones", fetcher);
  let onboarding = Object.fromEntries(
    (onboardingSetup ? onboardingSetup.tasks : []).map((task) => [
      task.id,
      task,
    ])
  );
  let completedSteps = Object.entries(OnboardingSteps).filter((task) => {
    let stepKey = task[0];
    let stepProgress = task[1];
    return stepProgress.isSetupDone({
      onboarding: onboarding[stepKey] ?? {},
      shipping,
    });
  });
  let incompleteSteps = Object.entries(OnboardingSteps).filter((task) => {
    let stepKey = task[0];
    let stepProgress = task[1];
    return !stepProgress.isSetupDone({
      onboarding: onboarding[stepKey] ?? {},
      shipping,
    });
  });
  console.warn(onboarding, completedSteps, incompleteSteps);
  return (
    <>
      {incompleteSteps.length > 0 ? (
        <>
          <DashboardContent
            title="Get Started!"
            subtitle="Here you can find the essential steps we recommend you complete so you can launch your store."
          >
            <div className="nfd-ecommerce-standard-actions-container">
              {incompleteSteps.map((task) => {
                let stepKey = task[0];
                let stepProgress = task[1];
                let { SetupIcon } = stepProgress;
                return (
                  <Card
                    key={stepKey}
                    variant="standard"
                    title={stepProgress.title}
                    action={stepProgress.setupAction}
                    href={stepProgress.setupUrl}
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
            {completedSteps.map((task) => {
              let stepKey = task[0];
              let stepProgress = task[1];
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
    </>
  );
}
