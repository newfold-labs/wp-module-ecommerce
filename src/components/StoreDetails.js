import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Button } from "@yoast/ui-library";
import useSWR from "swr";
import { RuntimeSdk } from "../sdk/runtime";
import { WordPressSdk } from "../sdk/wordpress";
import { Section } from "./Section";
import Shipping from "./Shipping";
import StoreInfo from "./StoreInfo";
import TaxSettings from "./TaxSettings";

export function StoreDetails(props) {
  let { notify } = props.wpModules;
  let { data, isLoading } = useSWR("settings", WordPressSdk.settings.get);
  const [formChanges, setFormChanges] = useState({});
  const [values, setValues] = useState({});
  const [isFormDirty, setIsFormDirty] = useState({
    details: false,
    shipping: false,
    tax: false,
  });
  let isDirty = Object.values(isFormDirty).some((section) => section === true);
  function trackChanges(section) {
    setIsFormDirty((changes) => ({ ...changes, [section]: true }));
  }

  const controls = {
    details: {
      isLoading,
    },
    shipping: {
      isLoading: false,
    },
    tax: {
      isLoading,
    },
  };
  const setInitialFormData = () => {
    let { defaultContact } = RuntimeSdk.brandSettings;
    let [country, state] = (
      data.woocommerce_default_country ??
      defaultContact.woocommerce_default_country
    ).split(":");

    setValues({
      woocommerce_calc_taxes:
        data.woocommerce_calc_taxes === undefined ||
        data.woocommerce_calc_taxes === null
          ? "no"
          : data.woocommerce_calc_taxes,
      country,
      state,
      woocommerce_email_from_address: data.woocommerce_email_from_address,
      woocommerce_store_address: data.woocommerce_store_address,
      woocommerce_store_address_2: data.woocommerce_store_address_2,
      woocommerce_store_city: data.woocommerce_store_city,
      woocommerce_store_postcode: data.woocommerce_store_postcode,
      woocommerce_currency:
        data.woocommerce_currency ?? defaultContact.woocommerce_currency,
    });
    if (
      data.woocommerce_calc_taxes === undefined ||
      data.woocommerce_calc_taxes === null
    ) {
      trackChanges("tax");
    }
  };

  useEffect(() => {
    if (data) {
      setInitialFormData();
    }
  }, [data, props.user]);

  const resetForm = (e) => {
    e.preventDefault();
    setFormChanges({});
    setIsFormDirty({ details: false, tax: false });
  };
  return (
    <Section.Container>
      <Section.Header
        title={__("Store Details", "wp-module-ecommerce")}
        subTitle={__(
          "This is the place for all your general store details and setup.",
          "wp-module-ecommerce"
        )}
      />
      <form
        id="store-details"
        onSubmit={async (event) => {
          event.preventDefault();
          event.stopPropagation();
          const payload = {
            ...Object.fromEntries(new FormData(event.target).entries()),
            ...formChanges,
          };
          await WordPressSdk.settings.put({
            woocommerce_calc_taxes: payload.woocommerce_calc_taxes,
            woocommerce_email_from_address:
              payload.woocommerce_email_from_address,
            woocommerce_store_address: payload.woocommerce_store_address,
            woocommerce_store_address_2: payload.woocommerce_store_address_2,
            woocommerce_store_city: payload.woocommerce_store_city,
            woocommerce_store_postcode: payload.woocommerce_store_postcode,
            woocommerce_currency: payload.woocommerce_currency,
            woocommerce_default_country: payload.state
              ? `${payload.country}:${payload.state}`
              : payload.country,
          });
          notify.push(`store-details-save-success`, {
            title: "Successfully saved the Store Details",
            variant: "success",
            autoDismiss: 5000,
          });
          setIsFormDirty({ details: false, tax: false });
        }}
        onReset={resetForm}
        onChange={(event) => {
          setFormChanges({
            ...formChanges,
            [event.target.name]: event.target.value,
          });
          if (event.target.name === "woocommerce_calc_taxes") {
            trackChanges("tax");
          } else {
            trackChanges(event.target.dataset?.section ?? "all");
          }
        }}
      >
        <StoreInfo
          values={{ ...values, ...formChanges }}
          pushChanges={(data) => {
            setFormChanges({ ...formChanges, ...data });
            trackChanges("details");
          }}
          controls={controls.details}
        />
        <Shipping notify={notify} />
        <TaxSettings values={{ ...values, ...formChanges }} />
        <div className="yst-p-8 yst-border-t yst-bg-[#F8FAFC] yst-flex yst-justify-end yst-gap-4">
          <Button type="reset" variant="secondary" disabled={!isDirty}>
            {__("Discard Changes", "wp-module-ecommerce")}
          </Button>
          <Button disabled={!isDirty} type="submit">
            {__("Save Changes", "wp-module-ecommerce")}
          </Button>
        </div>
      </form>
    </Section.Container>
  );
}
