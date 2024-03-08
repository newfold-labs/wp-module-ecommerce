import { __ } from "@wordpress/i18n";
import { Badge, Button } from "@newfold/ui-component-library";
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
            <div className="nfd-h-[174px] nfd-border nfd-rounded-md nfd-p-6">
              <div
                className={classNames(
                  "max-[359px]:nfd-flex-col",
                  "min-[360px]:nfd-flex min-[360px]:nfd-justify-between min-[360px]:nfd-mb-8"
                )}
              >
                <Shippo />
                {!isInstalling ? (
                  <>
                    {isSetupComplete ? (
                      <Button
                        variant="secondary"
                        as="a"
                        href={integrationStatus?.integration?.plugin?.url}
                        className={classNames(
                          "max-[359px]:nfd-my-2",
                          "min-[360px]:nfd-m-0"
                        )}
                      >
                        {__("Manage", "wp-module-ecommerce")}
                      </Button>
                    ) : (
                      <Button
                        onClick={onConnect}
                        className={classNames(
                          "max-[359px]:nfd-my-2",
                          "min-[360px]:nfd-m-0"
                        )}
                      >
                          {!integrationStatus?.integration?.plugin?.status ? __("Install", "wp-module-ecommerce") : __("Connect", "wp-module-ecommerce")}
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                    variant="secondary"
                    isLoading={isInstalling}
                    className={classNames(
                      "max-[359px]:nfd-my-2",
                      "min-[360px]:nfd-m-0"
                    )}
                  >
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
                <div className="nfd-flex nfd-gap-4 nfd-mt-4">
                  <span>{__("Environment:", "wp-module-ecommerce")}</span>
                  <Badge
                    size="large"
                    variant={environment === "sandbox" ? "upsell" : "plain"}
                    className={classNames(
                      "nfd-text-sm nfd-capitalize",
                      environment === "live" &&
                        "nfd-bg-[--nfd-ecomemerce-bg-success] nfd-text-white"
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
