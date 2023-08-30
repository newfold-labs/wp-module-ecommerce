import { __ } from "@wordpress/i18n";
import { Badge, Button, Title } from "@newfold/ui-component-library";
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
        const isInstalled = integrationStatus?.integration?.plugin?.status;
        const environment = integrationStatus?.details?.environment;
        return (
          <div className="nfd-border nfd-rounded-md nfd-p-6">
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
                      {__(
                        !isInstalled ? "Install" : "Connect",
                        "wp-module-ecommerce"
                      )}
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
            {!isSetupComplete && (
              <div className="nfd-space-y-4 nfd-text-[#5B5B5B]">
                <Title size="3">
                  {__(
                    "Complete control over the receiving and managing payments",
                    "wp-module-ecommerce"
                  )}
                </Title>
                <ul className="nfd-pl-5 nfd-list-disc">
                  <li>
                    {__("Immediate capture of funds", "wp-module-ecommerce")}
                  </li>
                  <li>
                    {__(
                      "Instant refunds and settlements",
                      "wp-module-ecommerce"
                    )}
                  </li>
                  <li>
                    {__("Fight fraud with Thirdwatch", "wp-module-ecommerce")}
                  </li>
                  <li>{__("Intuitive reporting", "wp-module-ecommerce")}</li>
                </ul>
              </div>
            )}
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
  );
};
export default Razorpay;
