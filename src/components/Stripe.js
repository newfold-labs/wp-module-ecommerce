import { __ } from "@wordpress/i18n";
import { Badge, Button, Title } from "@yoast/ui-library";
import classNames from "classnames";
import { ReactComponent as VisaBrand } from "../icons/brands/visa.svg";
import { ReactComponent as MasterCardBrand } from "../icons/brands/mastercard.svg";
import { ReactComponent as AmexBrand } from "../icons/brands/amex.svg";
import { ReactComponent as DiscoverBrand } from "../icons/brands/discover.svg";
import { ReactComponent as StripeBrand } from "../icons/brands/stripe.svg";
import { ReactComponent as ApplePay } from "../icons/brands/applepay.svg";
import { ReactComponent as GooglePay } from "../icons/brands/googlepay.svg";
import { ReactComponent as Klarna } from "../icons/brands/klarna.svg";
import { ThirdPartyIntegration } from "./ThirdPartyIntegration";

const Stripe = ({ notify })=>{
    return (
        <ThirdPartyIntegration
          id="stripe"
          title={__("Stripe", "wp-module-ecommerce")}
          description={__("Stripe provides all the tools that you need to accept payments online around the world, including support for Apple Pay and Google Pay.", "wp-module-ecommerce")}
          notify={notify}
        >
          {({ integrationStatus, onConnect, isInstalling }) => {
            const isSetupComplete = integrationStatus?.complete;
            const environment = integrationStatus?.details?.environment;
            return (
              <div className="yst-border yst-rounded-md yst-p-6">
                <div className="yst-flex yst-justify-between yst-mb-8">
                  <StripeBrand/>
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
                    "Millions of companies of all sizes—from startups to Fortune 500s—use Stripe to accept payments and manage their business online.",
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
                {!isSetupComplete && (
                  <div className="yst-space-y-4 yst-text-[#5B5B5B]">
                    <Title size="3">
                      {__("Complete control over the receiving and managing payments")}
                    </Title>
                    <ul className="yst-pl-5 yst-list-disc">
                      <li>{__("Immediate capture or authorize and capture later")}</li>
                      <li>{__("One-click refunds", "wp-module-ecommerce")}</li>
                      <li>
                        {__(
                          "Option to let customers save their credit card info securely",
                          "wp-module-ecommerce"
                        )}
                      </li>
                      <li>
                        {__(
                          "Support ACH direct debt",
                          "wp-module-ecommerce"
                        )}
                      </li>
                    </ul>
                    <Title size="3">
                      {__(
                        " Uses many popular payment methods",
                        "wp-module-ecommerce"
                      )}
                    </Title>
                    <div className="yst-flex yst-items-end yst-gap-2 yst-flex-wrap">
                      <VisaBrand />
                      <MasterCardBrand />
                      <AmexBrand />
                      <DiscoverBrand />
                      <ApplePay />
                      <GooglePay />
                      <Klarna />
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        </ThirdPartyIntegration>
      );
}
export default Stripe;