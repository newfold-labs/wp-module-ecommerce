import { __ } from "@wordpress/i18n";
import { Badge, Button } from "@yoast/ui-library";
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
          <div className="yst-h-[174px] yst-border yst-h-174px yst-p-6">
            <div className="yst-flex yst-justify-between yst-mb-8">
              <RazorPayBrand />
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
                "Online payments built for success. We help you do business across markets — even if your customers don’t have Razorpay.",
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
                    environment === "live" && "yst-bg-[#178113] yst-text-white"
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
