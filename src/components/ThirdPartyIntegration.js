import { __ } from "@wordpress/i18n";
import { Spinner } from "@yoast/ui-library";
import useSWR from "swr";
import { Section } from "./Section";

const ThirdPartyIntegration = ({
  integrationId,
  integrationTitle,
  integrationDescription,
  integrationSrcPath,
  children,
  notify,
  ...props
}) => {
  let {
    data: integrationStatus,
    isLoading,
    mutate: refreshIntegrationStatus,
  } = useSWR(`/newfold-ecommerce/v1/integrations/${integrationId}`);
  const [isConnectionActive, setConnectionActive] = useState(true);

  function onConnect() {
    setConnectionActive(true);
  }

  return (
    <Section.Settings
      title={__(`${integrationTitle}`, "wp-module-ecommerce")}
      description={__(`${integrationDescription}`, "wp-module-ecommerce")}
    >
      {isLoading ? (
        <div className="yst-flex yst-items-center yst-text-center yst-justify-center yst-h-60">
          <Spinner size={8} className="yst-text-primary" />
        </div>
      ) : (
        <div className="yst-flex-1">
          {isConnectionActive ? (
            <div className="components-modal__frame yst-h-[500px]">
              <button
                type="button"
                onClick={async () => {
                  setConnectionActive(false);
                  notify.push(`${integrationId}-account-connect-success`, {
                    title: `Your ${integrationId} account have been connected`,
                    variant: "success",
                  });
                  await refreshIntegrationStatus();
                }}
              />
              <iframe
                className="yst-h-full yst-w-full"
                src={integrationSrcPath}
              />
            </div>
          ) : (
            children({ integrationStatus, onConnect })
          )}
        </div>
      )}
    </Section.Settings>
  );
};

export default ThirdPartyIntegration;
