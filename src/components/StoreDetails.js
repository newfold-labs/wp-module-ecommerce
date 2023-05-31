import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Button, Spinner } from "@yoast/ui-library";
import useSWR from "swr";
import { RuntimeSdk } from "../sdk/runtime";
import { WordPressSdk } from "../sdk/wordpress";
import Payment from "./Payment";
import { Section } from "./Section";
import Shipping from "./Shipping";
import StoreInfo from "./StoreInfo";
import TaxSettings from "./TaxSettings";

export function StoreDetails(props) {
  let { notify } = props.wpModules;
  let { data, isLoading } = useSWR("settings", WordPressSdk.settings.get);
  const [controls, setControls] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  const setInitialFormData = () => {
    let { defaultContact } = RuntimeSdk.brandSettings;
    let [country, state] = (
      data.woocommerce_default_country ??
      defaultContact.woocommerce_default_country
    ).split(":");

    setControls({
      ...controls,
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
  };

  useEffect(() => {
    if (data) {
      setInitialFormData();
    }
  }, [data, props.user]);

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
          await WordPressSdk.settings.put({
            ...controls,
            woocommerce_default_country: controls.state
              ? `${controls.country}:${controls.state}`
              : controls.country,
          });
          notify.push(`store-details-save-success`, {
            title: "Successfully saved the Store Details",
            variant: "success",
          });
          setIsDirty(false);
        }}
        onChange={(event) => {
          const name = event.target.name;
          const value = event.target.value;
          setControls({
            ...controls,
            [name]: value,
          });
          setIsDirty(true);
        }}
      >
        {isLoading ? (
          <div className="yst-flex yst-items-center yst-text-center yst-justify-center yst-h-60">
            <Spinner size={8} className="yst-text-primary" />
          </div>
        ) : (
          <>
            <StoreInfo
              controls={controls}
              setControls={setControls}
              setIsDirty={setIsDirty}
            />
            <Payment notify={notify} />
            <Shipping notify={notify} />
            <TaxSettings controls={controls} />
            <div className="yst-p-8 yst-border-t yst-bg-[#F8FAFC] yst-flex yst-justify-end yst-gap-4">
              <Button
                variant="secondary"
                disabled={!isDirty}
                onClick={() => {
                  setInitialFormData();
                  setIsDirty(false);
                }}
              >
                {__("Discard Changes", "wp-module-ecommerce")}
              </Button>
              <Button disabled={!isDirty} type="submit">
                {__("Save Changes", "wp-module-ecommerce")}
              </Button>
            </div>
          </>
        )}
      </form>
    </Section.Container>
  );
}
