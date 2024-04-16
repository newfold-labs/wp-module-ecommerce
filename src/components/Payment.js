import { __ } from "@wordpress/i18n";
import { CheckboxGroup, Link } from "@newfold/ui-component-library";
import { RuntimeSdk } from "../sdk/runtime";
import Razorpay from "./Razorpay";
import { Section } from "./Section";
import Paypal from "./Paypal";
import Stripe from "./Stripe";

const Payment = ({ notify, pushChanges, values, controls }) => {
  if (RuntimeSdk.brandSettings.setup.payment.length === 0) {
    return null;
  }
  return (
    <Section.Container>
      {RuntimeSdk.brandSettings.setup.payment.includes("Paypal") && (
        <Section.Content className="paypal-section" separator>
          <Paypal notify={notify} />
        </Section.Content>
      )}

      {RuntimeSdk.brandSettings.setup.payment.includes("Stripe") && (
        <Section.Content className="stripe-section" separator>
          <Stripe notify={notify} />
        </Section.Content>
      )}

      {RuntimeSdk.brandSettings.setup.payment.includes("Razorpay") && (
        <Section.Content className="razorpay-section" separator>
          <Razorpay notify={notify} />
        </Section.Content>
      )}

      <Section.Content className="offline-payment-section">
        <Section.Settings title={__("Offline Payments", "wp-module-ecommerce")} description={__("Accept payments (money orders, bank transfers or C.O.D.) that are made outside your online store. ", "wp-module-ecommerce")} >
          <div className="nfd-border nfd-rounded-md nfd-p-6">
            <CheckboxGroup
              id="woocommerce_toggle_gateway_enabled"
              label={__("Manual Payment methods", "wp-module-ecommerce")}
              className="nfd-mt-4"
              description={__("When a customer selects a manual payment method, you'll need to approve their order before it can be fulfilled.", "wp-module-ecommerce")}
              name="woocommerce_toggle_gateway_enabled"
              disabled={controls.isLoading}
              onChange={pushChanges}
              options={[
                {
                  label: __("Check payments", "wp-module-ecommerce"),
                  value: "woocommerce_cheque_settings",
                },
                {
                  label: __("Bank transfer payments", "wp-module-ecommerce"),
                  value: "woocommerce_bacs_settings",
                },
                {
                  label: __("Cash on delivery (C.O.D.)", "wp-module-ecommerce"),
                  value: "woocommerce_cod_settings",
                },
              ]}
              values={values}
            />
          </div>
        </Section.Settings>
      </Section.Content>
    </Section.Container>
  );
};

export default Payment;
