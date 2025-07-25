import { Spinner } from "@newfold/ui-component-library";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { IntegrationsSdk } from "../sdk/integrations";
import { PluginsSdk } from "../sdk/plugins";
import { CaptiveRazorpay } from "./CaptiveRazorpay";
import { Section } from "./Section";
import { useLayoutEffect } from "@wordpress/element";

const replaceQueryParam = (param, newval, search) => {
  var regex = new URLSearchParams(search);
  regex.set(param, newval);
  return regex.toString();
}

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
    if (id === 'shippo' || id === 'paypal') {
      window.location.reload();
    }
  });
  const updateButtonEvent = async (event) => {
    if (event.detail.connected == 1) {
      const integrationStatusResponse =
          await refreshIntegrationStatus();
      if (integrationStatusResponse.complete) {
        notify.push(`${id}-account-connect-success`, {
          title: __(`Your ${id} account have been connected`,"wp-module-ecommerce"),
          variant: 'success',
        });
      }
      setConnectionActive(false);
    }
  };
  document.addEventListener('yith-shippo-update-connection-button', updateButtonEvent);

  function onConnect() {
    const isPluginActive = integrationStatus?.integration?.plugin?.status;
    if (!isPluginActive) {
      installPlugin.trigger();
    } else {
      if (id === 'shippo') {
        const event = new Event('onboarding-shippo-popup');
        window.document.dispatchEvent(event);
      } else {
        setConnectionActive(true);
      }
    }
  }

  return (
    <Section.Settings title={title} description={description}>
      {isLoading ? (
        <div className="nfd-flex nfd-items-center nfd-text-center nfd-justify-center nfd-h-60">
          <Spinner size="8" className="nfd-text-primary" />
        </div>
      ) : (
          <div className="nfd-flex-1">
            {isConnectionActive ? (
                id == "razorpay" ? (
                    <CaptiveRazorpay
                        razorpaySettings={integrationStatus?.details?.settings}
                    />
                ) : (
                    (id == "stripe" || id == 'paypal') && window.location.reload()
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
