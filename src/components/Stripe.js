import { Alert, Badge, Button, Title, Link } from "@newfold/ui-component-library";
import { useEffect, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import classNames from "classnames";
import { ReactComponent as AmexBrand } from "../icons/brands/amex.svg";
import { ReactComponent as ApplePay } from "../icons/brands/applepay.svg";
import { ReactComponent as DiscoverBrand } from "../icons/brands/discover.svg";
import { ReactComponent as GooglePay } from "../icons/brands/googlepay.svg";
import { ReactComponent as Klarna } from "../icons/brands/klarna.svg";
import { ReactComponent as MasterCardBrand } from "../icons/brands/mastercard.svg";
import { ReactComponent as StripeBrand } from "../icons/brands/stripe.svg";
import { ReactComponent as VisaBrand } from "../icons/brands/visa.svg";
import { ThirdPartyIntegration } from "./ThirdPartyIntegration";
import { RuntimeSdk } from "../sdk/runtime";

const Stripe = ({ notify }) => {
  const buttonRef = useRef();
  const isHttp = window.location.protocol === "http:";

  useEffect(() => {
    return () => window?.yithStripePayments?.onboardingButton?.destroy();
  })

  const handleClick = () => {
    if (!window?.yithStripePayments?.onboardingButton?.$button?.is(buttonRef.current)) {
      window.yithStripePayments.onboardingButton = window.yithStripePayments.connectOnboarding(buttonRef.current, { reloadOnClose: false });
      window.yithStripePayments.onboardingButton.onClick();
    }
  }

  return (
    <ThirdPartyIntegration
      id="stripe"
      title={__("Stripe", "wp-module-ecommerce")}
      description={__(
        "Stripe provides all the tools that you need to accept payments online around the world, including support for Apple Pay and Google Pay.",
        "wp-module-ecommerce"
      )}
      notify={notify}
    >
      {({ integrationStatus, onConnect, isInstalling }) => {
        const isSetupComplete = integrationStatus?.complete;
        let environment = integrationStatus?.details?.environment;

        if (!environment) {
          environment = 'test' === window?.yithStripePayments?.env ? 'test' : 'live';
        }
        const isLive = environment === "live";
        return (
          <div className="nfd-border nfd-rounded-md nfd-p-6">
           {isHttp && isLive && <Alert variant="warning" className="nfd-mb-6">
             {__("A secure connection is required when running Stripe Payments in Live mode; plugin is currently enabled, but no gateway will be available until you secure connection to your site through a valid SSL certificate.\
             If you already have a valid SSL certificate, please change the url in", "wp-module-ecommerce")} <Link href={RuntimeSdk.adminUrl('options-general.php')}> {__("settings", "wp-module-ecommerce")}</Link> {__("page", "wp-module-ecommerce")}.
            </Alert>}
            <div className="nfd-flex nfd-justify-between nfd-mb-8">
              <StripeBrand />
              {!isInstalling ? (
                <>
                  {isSetupComplete && integrationStatus?.integration?.plugin?.status ? (
                    <Button
                      variant="secondary"
                      as="a"
                      href={integrationStatus?.integration?.plugin?.url}
                    >
                      {__("Manage", "wp-module-ecommerce")}
                    </Button>
                  ) : (
                    <>
                      {!integrationStatus?.integration?.plugin?.status ? (
                        <Button onClick={onConnect} >
                          {__("Install", "wp-module-ecommerce")}
                        </Button>
                      ) : (
                        <Button ref={buttonRef} disabled={isHttp && isLive} onClick={handleClick}>
                          {__("Connect", "wp-module-ecommerce")}
                        </Button>
                      )}
                    </>
                  )}
                </>
              ) : (
                <Button variant="secondary" isLoading={isInstalling}>
                  {__("Installing...", "wp-module-ecommerce")}
                </Button>
              )}
            </div>
            {environment && (
              <div className="nfd-flex nfd-gap-4 nfd-mt-4">
                <span>{__("Environment:", "wp-module-ecommerce")}</span>
                <Badge
                  size="large"
                  variant={environment === "sandbox" ? "upsell" : "plain"}
                  className={classNames(
                    "nfd-text-sm nfd-capitalize",
                    environment === "live" && "nfd-bg-[#178113] nfd-text-white"
                  )}
                >
                  {environment}
                </Badge>
              </div>
            )}
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
                    {__("Immediate capture or authorize and capture later")}
                  </li>
                  <li>{__("One-click refunds", "wp-module-ecommerce")}</li>
                  <li>
                    {__(
                      "Option to let customers save their credit card info securely",
                      "wp-module-ecommerce"
                    )}
                  </li>
                  <li>
                    {__("Support ACH direct debt", "wp-module-ecommerce")}
                  </li>
                </ul>
                <Title size="3">
                  {__(
                    " Uses many popular payment methods",
                    "wp-module-ecommerce"
                  )}
                </Title>
                <div className="nfd-flex nfd-items-end nfd-gap-2 nfd-flex-wrap">
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
};

export default Stripe;
