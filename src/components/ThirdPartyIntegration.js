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
  ...props
}) => {
  let {
    data: integrationStatus,
    isLoading,
    mutate: refreshIntegrationStatus,
  } = useSWR(`/newfold-ecommerce/v1/integrations/${integrationId}`);
  const [showThirdPartyContent, serShowThirdPartyContent] = useState(false);
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
          {true ? (
            <div className=" yst-h-[1180px]">
              <iframe
                style={{ width: "100%", height: "100%" }}
                src={integrationSrcPath}
              />
            </div>
          ) : (
            <>{children({ integrationStatus, serShowThirdPartyContent })}</>
          )}
        </div>
      )}
    </Section.Settings>
  );
};

export default ThirdPartyIntegration;
