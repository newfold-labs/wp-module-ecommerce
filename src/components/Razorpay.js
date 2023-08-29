import { __ } from "@wordpress/i18n";
import { Badge, Button } from "@newfold/ui-component-library";
import classNames from "classnames";
import { ReactComponent as RazorPayBrand } from "../icons/brands/razorpay.svg";
import { ThirdPartyIntegration } from "./ThirdPartyIntegration";

const Razorpay = ({ notify }) => {
  return (
    <ThirdPartyIntegration
      id="razorpay"
      title={__("Payment Processors", "wp-module-ecommerce")}
      description={__(
        "Choose a service that your customers will use to process their payments in return for your products and services.",
        "wp-module-ecommerce"
      )}
      notify={notify}
    >
      {({ integrationStatus, onConnect, isInstalling }) => {
        const isSetupComplete = integrationStatus?.complete;
        const environment = integrationStatus?.details?.environment;
        return (
          <div className="nfd-h-[174px] nfd-border nfd-rounded-md nfd-h-174px nfd-p-6">
            <div
              className={classNames(
                "max-[359px]:nfd-flex-col",
                "min-[360px]:nfd-flex nfd-justify-between min-[360px]:nfd-mb-8"
              )}
            >
              <RazorPayBrand />
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
                      {__("Connect", "wp-module-ecommerce")}
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
                "Online payments built for success. We help you do business across markets — even if your customers don’t have Razorpay.",
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
                    environment === "live" && "nfd-bg-[--nfd-ecomemerce-bg-success] nfd-text-white"
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
  );
};
export default Razorpay;
