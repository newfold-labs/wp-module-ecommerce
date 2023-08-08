import { Spinner } from "@yoast/ui-library";
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
        <div className="yst-flex yst-items-center yst-text-center yst-justify-center yst-h-60">
          <Spinner size={8} className="yst-text-primary" />
        </div>
      ) : (
        <div className="yst-flex-1">
          {isConnectionActive ? (
            id !== "razorpay" ? (
              <div className="components-modal__frame yst-h-[500px]">
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
                  className="yst-h-full yst-w-full"
                  src={integrationStatus?.integration?.captive}
                />
              </div>
            ) : (
              <CaptiveRazorpay
                razorpaySettings={integrationStatus?.details?.settings}
              />
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
