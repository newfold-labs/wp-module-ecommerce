import { __ } from "@wordpress/i18n";
import { Badge, Button } from "@yoast/ui-library";
import { ReactComponent as Shippo } from "../icons/brands/shippo.svg";
import ThirdPartyIntegration from "./ThirdPartyIntegration";
import { RuntimeSdk } from "../sdk/runtime";
import { Section } from "./Section";

const Shipping = ({ notify }) => {
  if (!RuntimeSdk.brandSettings.setup.shipping.includes("Shippo")) {
    return null;
  }
  return (
    <Section.Content separator={true}>
      <ThirdPartyIntegration
        id="shippo"
        title={__("Shipping Options", "wp-module-ecommerce")}
        description={__(
          "Setup a shipping account for delivering products to your customers",
          "wp-module-ecommerce"
        )}
        notify={notify}
      >
        {({ integrationStatus, onConnect, isInstalling }) => {
          const isSetupComplete = integrationStatus?.complete;
          const environment = integrationStatus?.details?.environment;
          return (
            <div className="yst-h-[174px] yst-border yst-h-174px yst-p-6">
              <div className="yst-flex yst-justify-between yst-mb-8">
                <Shippo />
                {!isInstalling ? (
                  <>
                    {isSetupComplete ? (
                      <Button
                        variant="secondary"
                        as="a"
                        href={integrationStatus?.integration?.plugin?.url}
                      >
                        {__("Manage", "wp-module-ecommerce")}
                      </Button>
                    ) : (
                      <Button onClick={onConnect}>
                        {__("Connect", "wp-module-ecommerce")}
                      </Button>
                    )}
                  </>
                ) : (
                  <Button variant="secondary" isLoading={isInstalling}>
                    {__("Installing...", "wp-module-ecommerce")}
                  </Button>
                )}
              </div>
              <span>
                {__(
                  "The best multi-carrier shipping software for e-commerce businesses.",
                  "wp-module-ecommerce"
                )}
              </span>
              {environment && (
                <div className="yst-flex yst-gap-4 yst-mt-4">
                  <span>Environment :</span>
                  <Badge
                    size="large"
                    className={`yst-text-sm yst-capitalize ${
                      environment == "sandbox"
                        ? "yst-bg-[#178113] yst-text-black"
                        : "yst-bg-[#F89C24] yst-text-white"
                    }`}
                  >
                    {environment}
                  </Badge>
                </div>
              )}
            </div>
          );
        }}
      </ThirdPartyIntegration>
    </Section.Content>
  );
};
export default Shipping;
