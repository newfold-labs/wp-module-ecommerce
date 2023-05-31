import { __ } from "@wordpress/i18n";
import { Spinner } from "@yoast/ui-library";
import useSWR from "swr";
import { Section } from "./Section";
import { IntegrationsSdk } from "../sdk/integrations";
import { CaptiveRazorpay } from "./CaptiveRazorpay";

const ThirdPartyIntegration = ({
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

  function onConnect() {
    setConnectionActive(true);
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
            id !== "razorpay" ?
            (<div className="components-modal__frame yst-h-[500px]">
              <button
                type="button"
                onClick={async () => {
                  setConnectionActive(false);
                  notify.push(`${id}-account-connect-success`, {
                    title: `Your ${id} account have been connected`,
                    variant: "success",
                  });
                  await refreshIntegrationStatus();
                }}
              />
              <iframe
                className="yst-h-full yst-w-full"
                src={integrationStatus?.integration?.captive}
              />
            </div> ) : (
              <CaptiveRazorpay />
            )

          ) : (
            children({ integrationStatus, onConnect })
          )}
        </div>
      )}
    </Section.Settings>
  );
};

export default ThirdPartyIntegration;
