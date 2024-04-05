import { Badge, Button, Title } from "@newfold/ui-component-library";
import { __ } from "@wordpress/i18n";
import classNames from "classnames";
import { ReactComponent as AmexBrand } from "../icons/brands/amex.svg";
import { ReactComponent as DiscoverBrand } from "../icons/brands/discover.svg";
import { ReactComponent as GiroPayBrand } from "../icons/brands/giropay.svg";
import { ReactComponent as IdealBrand } from "../icons/brands/ideal.svg";
import { ReactComponent as MasterCardBrand } from "../icons/brands/mastercard.svg";
import { ReactComponent as PaypalBrand } from "../icons/brands/paypal.svg";
import { ReactComponent as SofortBrand } from "../icons/brands/sofort.svg";
import { ReactComponent as VenmoBrand } from "../icons/brands/venmo.svg";
import { ReactComponent as VisaBrand } from "../icons/brands/visa.svg";
import { ThirdPartyIntegration } from "./ThirdPartyIntegration";
import PayPalButton from "./PayPalButton";

const Paypal = ({ notify }) => {

  return (
    <ThirdPartyIntegration
      id="paypal"
      title={__("Paypal", "wp-module-ecommerce")}
      description={__(
        "Online payments built for success. We help you do business in 200+ markets and 100+ currencies—even if your customers don't have PayPal.",
        "wp-module-ecommerce",
      )}
      notify={notify}
    >
      {({ integrationStatus, onConnect, isInstalling }) => {
        const isSetupComplete = integrationStatus?.complete;
        const environment = integrationStatus?.details?.environment;
        return (
          <div className="nfd-border nfd-rounded-md nfd-p-6">
            <div
              className={classNames(
                "max-[359px]:nfd-flex-col",
                "min-[360px]:nfd-flex nfd-justify-between nfd-items-center min-[360px]:nfd-mb-8",
              )}
            >
              <PaypalBrand />
              {isInstalling ? (
                <Button
                  variant="secondary"
                  isLoading
                  className={classNames(
                    "max-[359px]:nfd-my-2",
                    "min-[360px]:nfd-m-0",
                  )}
                >
                  {__("Installing...", "wp-module-ecommerce")}
                </Button>
              ) : isSetupComplete ? (
                <Button
                  variant="secondary"
                  as="a"
                  href={integrationStatus?.integration?.plugin?.url}
                  className={classNames(
                    "max-[359px]:nfd-my-2",
                    "min-[360px]:nfd-m-0",
                  )}
                >
                  {__("Manage", "wp-module-ecommerce")}
                </Button>
              ) : typeof yith_ppwc_login !== "undefined" &&
                !parseInt(yith_ppwc_login?.liveConnected) ? (
                <PayPalButton />
              ) : (
                <Button
                  onClick={onConnect}
                  className={classNames(
                    "max-[359px]:nfd-my-2",
                    "min-[360px]:nfd-m-0",
                  )}
                >
                  {__("Install", "wp-module-ecommerce")}
                </Button>
              )}
            </div>
            {isSetupComplete && environment && (
              <div className="nfd-flex nfd-gap-4 nfd-mt-4">
                <span>{__("Environment:", "wp-module-ecommerce")}</span>
                <Badge
                  size="large"
                  variant={environment === "sandbox" ? "upsell" : "plain"}
                  className={classNames(
                    "nfd-text-sm nfd-capitalize",
                    environment === "live" && "nfd-bg-[#178113] nfd-text-white",
                  )}
                >
                  {environment}
                </Badge>
              </div>
            )}
            {!isSetupComplete && (
              <div className="nfd-space-y-4 nfd-text-[#5B5B5B]">
                <Title size="3">
                  {__("Provides flexible checkout options", "wp-module-ecommerce")}
                </Title>
                <ul className="nfd-pl-5 nfd-list-disc">
                  <li>{__("PayPal Buy Now Pay Later", "wp-module-ecommerce")}</li>
                  <li>{__("White-Labeling", "wp-module-ecommerce")}</li>
                  <li>
                    {__(
                      "Country-specific payment methods",
                      "wp-module-ecommerce",
                    )}
                  </li>
                </ul>
                <Title size="3">
                  {__(
                    " Supports many popular payment methods",
                    "wp-module-ecommerce",
                  )}
                </Title>
                <div className="nfd-flex nfd-items-end nfd-gap-2 nfd-flex-wrap">
                  <VisaBrand />
                  <MasterCardBrand />
                  <AmexBrand />
                  <DiscoverBrand />
                  <VenmoBrand />
                  <IdealBrand />
                  <GiroPayBrand />
                  <SofortBrand />
                </div>
              </div>
            )}
          </div>
        );
      }}
    </ThirdPartyIntegration>
  );
};
export default Paypal;
