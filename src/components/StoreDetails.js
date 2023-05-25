import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Button } from "@yoast/ui-library";
import useSWR from "swr";
import { Section } from "./Section";
import TaxSettings from "./TaxSettings";
import { updateWPSettings } from "../services";

export function StoreDetails(props) {
  let { data } = useSWR("/wp/v2/settings");
  const [controls, setControls] = useState({
    woocommerce_calc_taxes: "",
  });
  const [isDirty, setIsDirty] = useState(false);

  const setInitialFormData = () => {
    setControls({
      ...controls,
      woocommerce_calc_taxes: data?.woocommerce_calc_taxes,
    });
  };

  useEffect(() => {
    setInitialFormData();
  }, [data]);

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
            ...controls
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
          <TaxSettings {...props} controls={controls} />
        </Section.Content>
        <div className="yst-p-8 yst-border-t yst-bg-[#F8FAFC] yst-border-line yst-flex yst-justify-end yst-items-baseline yst-gap-4">
          <Button
            variant="secondary"
            disabled={!isDirty}
            onClick={setInitialFormData}
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
