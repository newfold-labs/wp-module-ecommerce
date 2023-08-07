import { __ } from "@wordpress/i18n";
import { Badge, Button } from "@yoast/ui-library";
import classNames from "classnames";
import { ReactComponent as RazorPayBrand } from "../icons/brands/razorpay.svg";
import { ThirdPartyIntegration } from "./ThirdPartyIntegration";

const Razorpay = ({ notify }) => {
  return (
    <ThirdPartyIntegration
      id="razorpay"
      title={__("Razorpay", "wp-module-ecommerce")}
      description={__(
        "Build specifically for companies based in India, manage all your payments and financial operations from a consolidated dashboard",
        "wp-module-ecommerce"
      )}
      notify={notify}
    >
      {({ integrationStatus, onConnect, isInstalling }) => {
        const isSetupComplete = integrationStatus?.complete;
        const environment = integrationStatus?.details?.environment;
        return (
          <div className="yst-h-[174px] yst-border yst-rounded-md yst-h-174px yst-p-6">
            <div
              className={classNames(
                "max-[359px]:yst-flex-col",
                "min-[360px]:yst-flex yst-justify-between min-[360px]:yst-mb-8"
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
                        "max-[359px]:yst-my-2",
                        "min-[360px]:yst-m-0"
                      )}
                    >
                      {__("Manage", "wp-module-ecommerce")}
                    </Button>
                  ) : (
                    <Button
                      onClick={onConnect}
                      className={classNames(
                        "max-[359px]:yst-my-2",
                        "min-[360px]:yst-m-0"
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
                    "max-[359px]:yst-my-2",
                    "min-[360px]:yst-m-0"
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
              <div className="yst-flex yst-gap-4 yst-mt-4">
                <span>{__("Environment:", "wp-module-ecommerce")}</span>
                <Badge
                  size="large"
                  variant={environment === "sandbox" ? "upsell" : "plain"}
                  className={classNames(
                    "yst-text-sm yst-capitalize",
                    environment === "live" && "yst-bg-[--nfd-ecomemerce-bg-success] yst-text-white"
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
