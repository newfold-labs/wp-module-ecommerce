import { __ } from "@wordpress/i18n";
import { Badge, Button } from "@yoast/ui-library";
import classNames from "classnames";
import { ReactComponent as Shippo } from "../icons/brands/shippo.svg";
import { RuntimeSdk } from "../sdk/runtime";
import { Section } from "./Section";
import { ThirdPartyIntegration } from "./ThirdPartyIntegration";

const Shipping = ({ notify }) => {
  if (!RuntimeSdk.brandSettings.setup.shipping.includes("Shippo")) {
    return null;
  }
  return (
    <Section.Content separator>
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
            <div className="yst-h-[174px] yst-border yst-rounded-md yst-p-6">
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
                  <span>{__("Environment:", "wp-module-ecommerce")}</span>
                  <Badge
                    size="large"
                    variant={environment === "sandbox" ? "upsell" : "plain"}
                    className={classNames(
                      "yst-text-sm yst-capitalize",
                      environment === "live" &&
                        "yst-bg-[#178113] yst-text-white"
                    )}
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
