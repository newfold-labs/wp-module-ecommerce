import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Button } from "@newfold/ui-component-library";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { WooCommerceSdk } from "../sdk/woocommerce";
import { WordPressSdk } from "../sdk/wordpress";
import { RuntimeSdk } from "../sdk/runtime";
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

// async function parseForm() {
//   let settings = await WordPressSdk.settings.get();

//   return [
//     settings.woocommerce_bacs_settings,
//     settings.woocommerce_cod_settings,
//     settings.woocommerce_cheque_settings,
//   ];
// }

export function AllPayments(props) {
  let { params } = props.state;
  let { notify } = props.wpModules;
  // let { data: values, isLoading } = useSWR("settings", parseForm);
  
  let paymentMethods = useSWR(
    "payment-methods",
    WooCommerceSdk.options.paymentMethods
  );
  console.log('payment methods',paymentMethods.data);
  let updatePaymentMethods = useSWRMutation(
    "payment-methods",
    async (_, { arg }) => {
      let [addedGateways, removedGateways] = arg;
      console.log("Added Gatways: ",addedGateways)
      console.log("Removed Gatways: ",removedGateways)
      
      for (let gateway of addedGateways) {
        let mapGatewayToId = {
          woocommerce_bacs_settings: "bacs",
          woocommerce_cod_settings: "cod",
          woocommerce_cheque_settings: "cheque",
        };

        let gatewayId = mapGatewayToId[gateway];
        const gateWayObj = {}
        gateWayObj[gateway] = {}
        console.log("GAteWay" , gateWayObj)
        gateWayObj[gateway]["gateway_id"] = gatewayId;
        gateWayObj[gateway]["enabled"] = "yes";
        gateWayObj[gateway]["action"] = "woocommerce_toggle_gateway_enabled";
        gateWayObj[gateway]["security"] = RuntimeSdk?.nonce("gateway_toggle");
        if(gateway){
        await WordPressSdk.settings.put(gateWayObj);
        }
      }
      for (let gateway of removedGateways) {
        let mapGatewayToId = {
          woocommerce_bacs_settings: "bacs",
          woocommerce_cod_settings: "cod",
          woocommerce_cheque_settings: "cheque",
        };

        let gatewayId = mapGatewayToId[gateway];
        const gateWayObj = {}
        gateWayObj[gateway] = {}
        console.log("GAteWay" , gateWayObj)
        gateWayObj[gateway]["gateway_id"] = gatewayId;
        gateWayObj[gateway]["enabled"] = "no";
        gateWayObj[gateway]["action"] = "woocommerce_toggle_gateway_enabled";
        gateWayObj[gateway]["security"] = RuntimeSdk?.nonce("gateway_toggle");
        if(gateway){
        await WordPressSdk.settings.put(gateWayObj);
        }
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
    },
  };

  const resetForm = (e) => {
    e.preventDefault();
    setFormChanges({});
    setIsFormDirty(CLEAN_FORM);
  };
  return (
    <Section.Container>
      <Section.Header title={__("Payments", "wp-module-ecommerce")} />
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
                enabled: __("yes", "wp-module-ecommerce"),
                title: __(
                  "Credit Card/Debit Card/NetBanking",
                  "wp-module-ecommerce"
                ),
                description: __(
                  "Pay securely by Credit or Debit card or Internet Banking through Razorpay.",
                  "wp-module-ecommerce"
                ),
                payment_action: __("capture", "wp-module-ecommerce"),
                order_success_message: __(
                  "Thank you for shopping with us. Your account has been charged and your transaction is successful. We will be processing your order soon.",
                  "wp-module-ecommerce"
                ),
                enable_1cc_debug_mode: "yes",
                key_id: payload.key_id,
                key_secret: payload.key_secret,
              },
            });
          }
          notify.push(`store-details-save-success`, {
            title: __(
              "Successfully saved the Payment Details",
              "wp-module-ecommerce"
            ),
            variant: "success",
            autoDismiss: 5000,
          });
          setIsFormDirty(CLEAN_FORM);
        }}
        onReset={resetForm}
        onChange={(event) => {
          console.log(event.target.name);
          if (event.target.name === "woocommerce_toggle_gateway_enabled") {
            trackChanges("payment");
          } else {
            trackChanges("razorpay"),
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
              console.log("Gateways : ", gateways)
              setFormChanges((formChanges) => {
                return ({
                  ...formChanges,
                  woocommerce_toggle_gateway_enabled: gateways,
                })
              }
              );
            }}
          />
        )}
        <div className="nfd-p-8 nfd-border-t nfd-bg-[#F8FAFC] nfd-flex nfd-justify-end nfd-gap-4">
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
