import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Button } from "@yoast/ui-library";
import useSWR from "swr";
import { updateWPSettings } from "../services";
import { Section } from "./Section";
import StoreInfo from "./StoreInfo";
import TaxSettings from "./TaxSettings";

export function StoreDetails(props) {
  let { data } = useSWR("/wp/v2/settings");
  let defaultCurrency =
    props?.user?.currentBrandConfig?.defaultContact?.woocommerce_currency ??
    "USD";
  const [controls, setControls] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  const setInitialFormData = () => {
    let country = data?.woocommerce_default_country.split(":")?.[0];
    let state = data?.woocommerce_default_country.split(":")?.[1];
    setControls({
      ...controls,
      woocommerce_calc_taxes: data?.woocommerce_calc_taxes,
      country: country ?? "",
      state: state ?? "",
      woocommerce_email_from_address: data?.woocommerce_email_from_address,
      woocommerce_store_address: data?.woocommerce_store_address,
      woocommerce_store_address_2: data?.woocommerce_store_address_2,
      woocommerce_store_city: data?.woocommerce_store_city,
      woocommerce_store_postcode: data?.woocommerce_store_postcode,
      woocommerce_currency: data?.woocommerce_currency ?? defaultCurrency,
    });
  };

  useEffect(() => {
    if (data && props.user) {
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
        onSubmit={async (event) => {
          event.preventDefault();
          event.stopPropagation();
          await updateWPSettings({
            ...controls,
          });
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
        <Section.Content>
          <StoreInfo {...props} controls={controls} setControls={setControls} />
        </Section.Content>
        <Section.Content>
          <TaxSettings {...props} controls={controls} />
        </Section.Content>
        <div className="yst-p-8 yst-border-t yst-bg-[#F8FAFC] yst-border-line yst-flex yst-justify-end yst-items-baseline yst-gap-4">
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
      </form>
    </Section.Container>
  );
}
