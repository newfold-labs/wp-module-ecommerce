import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Button } from "@yoast/ui-library";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { RuntimeSdk } from "../sdk/runtime";
import { WooCommerceSdk } from "../sdk/woocommerce";
import { WordPressSdk } from "../sdk/wordpress";
import Payment from "./Payment";
import { Section } from "./Section";

/**
 *
 * @param {URLSearchParams} params
 * @param {string} section
 * @returns {boolean}
 */
function isSectionActive(params, section) {
  return params.has("highlight") ? params.get("highlight") === section : true;
}

const CLEAN_FORM = {
  payment: false,
  razorpay: false,
};


export function AllPayments(props) {
  let { params } = props.state;
  let { notify } = props.wpModules;
  let paymentMethods = useSWR(
    "payment-methods",
    WooCommerceSdk.options.paymentMethods
  );
  let updatePaymentMethods = useSWRMutation(
    "payment-methods",
    async (_, { arg }) => {
      let [addedGateways, removedGateways] = arg;
      for (let gateway of addedGateways) {
        await WooCommerceSdk.options.toggleGateway(gateway);
      }
      for (let gateway of removedGateways) {
        await WooCommerceSdk.options.toggleGateway(gateway);
      }
    }
  );
  let settings = useSWRMutation("settings", (_, { arg }) =>
    WordPressSdk.settings.put(arg)
  );
  let isFormBusy = [settings.isMutating, updatePaymentMethods.isMutating].some(
    (_) => _ === true
  );

  const [formChanges, setFormChanges] = useState({});
  const [isFormDirty, setIsFormDirty] = useState(CLEAN_FORM);
  let isDirty = Object.values(isFormDirty).some((section) => section === true);
  function trackChanges(section) {
    setIsFormDirty((changes) => ({ ...changes, [section]: true }));
  }
  const controls = {
    payments: {
      isLoading: paymentMethods.isLoading,
      isActive: isSectionActive(params, "payments"),
    }
  };


  const resetForm = (e) => {
    e.preventDefault();
    setFormChanges({});
    setIsFormDirty(CLEAN_FORM);
  };
  return (
    <Section.Container>
      <Section.Header
        title={__("Payments", "wp-module-ecommerce")}
      />
      <form
        id="payment-details"
        onSubmit={async (event) => {
          event.preventDefault();
          event.stopPropagation();
          const payload = {
            ...Object.fromEntries(new FormData(event.target).entries()),
            ...formChanges,
          };
          console.log(payload);
          
          if (isFormDirty.payment) {
            let existingGateways = paymentMethods.data;
            let selectedGateways =
              payload.woocommerce_toggle_gateway_enabled ?? [];
            let removedGateways = [];
            let addedGateways = [];
            if (selectedGateways.length === 0 && existingGateways.length > 0) {
              removedGateways = existingGateways;
            } else if (
              existingGateways.length === 0 &&
              selectedGateways.length > 0
            ) {
              addedGateways = selectedGateways;
            } else {
              for (let gateway of existingGateways) {
                if (!selectedGateways.includes(gateway)) {
                  removedGateways.push(gateway);
                }
              }
              for (let gateway of selectedGateways) {
                if (!existingGateways.includes(gateway)) {
                  addedGateways.push(gateway);
                }
              }
            }
            await updatePaymentMethods.trigger([
              addedGateways,
              removedGateways,
            ]);
          }
          if (isFormDirty.razorpay) {
            await settings.trigger({
              "nfd-ecommerce-captive-flow-razorpay": "true",
              woocommerce_razorpay_settings: {
                enabled: "yes",
                title: "Credit Card/Debit Card/NetBanking",
                description:
                  "Pay securely by Credit or Debit card or Internet Banking through Razorpay.",
                payment_action: "capture",
                order_success_message:
                  "Thank you for shopping with us. Your account has been charged and your transaction is successful. We will be processing your order soon.",
                enable_1cc_debug_mode: "yes",
                key_id: payload.key_id,
                key_secret: payload.key_secret,
              },
            });
          }
          notify.push(`store-details-save-success`, {
            title: "Successfully saved the Store Details",
            variant: "success",
            autoDismiss: 5000,
          });
          setIsFormDirty(CLEAN_FORM);
        }}
        onReset={resetForm}
        onChange={(event) => {
          if (event.target.name === "woocommerce_toggle_gateway_enabled") {
            trackChanges("payment");
          } else {
            setFormChanges((formChanges) => ({
              ...formChanges,
              [event.target.name]: event.target.value,
            }));
          }
        }}
      >
        {controls.payments.isActive && (
          <Payment
            controls={controls.payments}
            notify={notify}
            values={
              formChanges.woocommerce_toggle_gateway_enabled ??
              paymentMethods.data
            }
            pushChanges={(gateways) => {
              setFormChanges((formChanges) => ({
                ...formChanges,
                woocommerce_toggle_gateway_enabled: gateways,
              }));
            }}
          />
        )}
        <div className="yst-p-8 yst-border-t yst-bg-[#F8FAFC] yst-flex yst-justify-end yst-gap-4">
          <Button
            type="reset"
            variant="secondary"
            disabled={!isDirty}
            isLoading={isFormBusy}
          >
            {__("Discard Changes", "wp-module-ecommerce")}
          </Button>
          <Button disabled={!isDirty} isLoading={isFormBusy} type="submit">
            {__("Save Changes", "wp-module-ecommerce")}
          </Button>
        </div>
      </form>
    </Section.Container>
  );
}
