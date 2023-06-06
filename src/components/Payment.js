import { __ } from "@wordpress/i18n";
import { Badge, Button, CheckboxGroup, Title } from "@yoast/ui-library";
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
import { RuntimeSdk } from "../sdk/runtime";
import { Section } from "./Section";
import { ThirdPartyIntegration } from "./ThirdPartyIntegration";
import Razorpay from "./Razorpay";

const Payment = ({ notify, pushChanges, values, controls }) => {
  if (!RuntimeSdk.brandSettings.setup.payment.includes("Paypal")) {
    return null;
  }
  return (
    <Section.Content separator>
      <ThirdPartyIntegration
        id="paypal"
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
            <div className="yst-border yst-p-6">
              <div className="yst-flex yst-justify-between yst-mb-8">
                <PaypalBrand />
                {isInstalling ? (
                  <Button variant="secondary" isLoading>
                    {__("Installing...", "wp-module-ecommerce")}
                  </Button>
                ) : isSetupComplete ? (
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
              </div>
              {isSetupComplete && environment && (
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
              {!isSetupComplete && (
                <p>
                  {__(
                    "Online payments built for success. We help you do business in 200+ markets and 100+ currencies—even if your customers don't have PayPal.",
                    "wp-module-ecommerce"
                  )}
                </p>
              )}
              {!isSetupComplete && (
                <div className="yst-space-y-4 yst-text-[#5B5B5B]">
                  <Title size="3">
                    {__("Provides flexible checkout options")}
                  </Title>
                  <ul className="yst-pl-5 yst-list-disc">
                    <li>{__("PayPal Pay Later")}</li>
                    <li>{__("White-Labeling", "wp-module-ecommerce")}</li>
                    <li>
                      {__(
                        "Country-specific payment methods",
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
                  <div className="yst-flex yst-items-end yst-gap-2">
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
      <Razorpay />
      <Section.Settings>
        <CheckboxGroup
          id="woocommerce_toggle_gateway_enabled"
          label="Offline payment methods"
          className="yst-mt-4"
          name="woocommerce_toggle_gateway_enabled"
          disabled={controls.isLoading}
          onChange={pushChanges}
          options={[
            {
              label: "Cheque payments",
              value: "woocommerce_cheque_settings",
            },
            {
              label: "Bank transfer payments",
              value: "woocommerce_bacs_settings",
            },
            {
              label: "Cash on delivery",
              value: "woocommerce_cod_settings",
            },
          ]}
          values={values}
        />
      </Section.Settings>
    </Section.Content>
  );
};

export default Payment;
