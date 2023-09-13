import { Spinner } from "@newfold/ui-component-library";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { IntegrationsSdk } from "../sdk/integrations";
import { PluginsSdk } from "../sdk/plugins";
import { CaptiveRazorpay } from "./CaptiveRazorpay";
import { Section } from "./Section";
import { useLayoutEffect } from "@wordpress/element";

const replaceQueryParam = (param, newval, search) => {
  var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
  var query = search.replace(regex, "$1").replace(/&$/, '');

  return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
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
  const [openSection, setOpenSection] = useState(true);
  useLayoutEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentSection = urlParams.get('section');

    if (typeof integrationStatus !== 'undefined') {
      if (openSection && currentSection === 'paypal') {
        const ppButton = document.querySelector('.yith-btn-paypal');

        if (ppButton?.dataset?.securewindowmsg && document.getElementById('signup-js') !== 'undefined') {
          ppButton.click();
          ppButton.disabled = true;
          setOpenSection(false);
        }
      }

      if (openSection && currentSection === 'shippo') {
        const shippoButton = document.querySelector('.section-shippo button');
        const event = new Event('onboarding-shippo-popup');
        window.document.dispatchEvent(event);
        setOpenSection(false);
      }
    }
  },[]);


  let installPlugin = useSWRMutation("install-plugin", async () => {
    await PluginsSdk.actions.installSync(
      integrationStatus?.integration?.plugin?.slug
    );
    await refreshIntegrationStatus();
    setConnectionActive(true);
    if (id === 'shippo' || id === 'paypal') {
      window.location.reload();
      if(  window.location.search.indexOf('section') !== -1 ){
        window.location.search = replaceQueryParam('section', id,  window.location.search);
      }else{
        window.location.search += ('&section=' + id);
      }

    }
  });
  const updateButtonEvent = async (event) => {
    if (event.detail.connected == 1) {
      const integrationStatusResponse =
          await refreshIntegrationStatus();
      if (integrationStatusResponse.complete) {
        notify.push(`${id}-account-connect-success`, {
          title: `Your ${id} account have been connected`,
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
          <Spinner size={8} className="nfd-text-primary" />
        </div>
      ) : (
        <div className="nfd-flex-1">
          {isConnectionActive ? (
            id !== "razorpay" ? (
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
                        autoDismiss: 5000
                      });
                    }
                  }}
                />
                <iframe
                  className="nfd-h-full nfd-w-full"
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
