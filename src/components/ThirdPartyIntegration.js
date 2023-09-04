import { Spinner } from "@newfold/ui-component-library";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { IntegrationsSdk } from "../sdk/integrations";
import { PluginsSdk } from "../sdk/plugins";
import { CaptiveRazorpay } from "./CaptiveRazorpay";
import { Section } from "./Section";

export const ThirdPartyIntegration = ({
  id,
  title,
  description,
  integrationSrcPath,
  children,
  notify,
  ...props
}) => {
  let {
    data: integrationStatus,
    isLoading,
    mutate: refreshIntegrationStatus,
  } = useSWR(id, IntegrationsSdk.status);

  const [isConnectionActive, setConnectionActive] = useState(false);

  let installPlugin = useSWRMutation("install-plugin", async () => {
    await PluginsSdk.actions.installSync(
      integrationStatus?.integration?.plugin?.slug
    );
    await refreshIntegrationStatus();
    setConnectionActive(true);
  });

  function onConnect() {
    const isPluginActive = integrationStatus?.integration?.plugin?.status;
    if (!isPluginActive) {
      installPlugin.trigger();
    } else {
      setConnectionActive(true);
    }
  }

  return (
    <Section.Settings title={title} description={description}>
      {isLoading ? (
        <div className="nfd-flex nfd-items-center nfd-text-center nfd-justify-center nfd-h-60">
          <Spinner size={8} className="nfd-text-primary" />
        </div>
      ) : (
        <div className="nfd-flex-1">
          {isConnectionActive ? (
            id !== "razorpay" && id !== "stripe" ? (
              <div className="components-modal__frame nfd-h-[500px]">
                <button
                  type="button"
                  onClick={async () => {
                    setConnectionActive(false);
                    const integrationStatusResponse =
                      await refreshIntegrationStatus();
                    if (integrationStatusResponse.complete) {
                      notify.push(`${id}-account-connect-success`, {
                        title: `Your ${id} account have been connected`,
                        variant: "success",
                      });
                    }
                  }}
                />
                <iframe
                  className="nfd-h-full nfd-w-full"
                  src={integrationStatus?.integration?.captive}
                />
              </div>
            ) : id == "razorpay" ? (
              <CaptiveRazorpay
                razorpaySettings={integrationStatus?.details?.settings}
              />
            ) : (
              id == "stripe" && window.location.reload()
            )
          ) : (
            children({
              integrationStatus,
              onConnect,
              isInstalling: installPlugin.isMutating,
            })
          )}
        </div>
      )}
    </Section.Settings>
  );
};
