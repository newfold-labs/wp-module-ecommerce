import { __ } from "@wordpress/i18n";
import { Label, RadioGroup } from "@yoast/ui-library";
import { Section } from "./Section";
const taxManagementOptions = [
  {
    label: __("Yes, enable sales tax.", "wp-module-ecommerce"),
    value: "yes",
  },
  {
    label: __("No, don't enable sales tax.", "wp-module-ecommerce"),
    value: "no",
  },
];

const TaxSettings = ({ values }) => {
  let taxSelected = values.woocommerce_calc_taxes ?? "no";
  return (
    <Section.Content>
      <Section.Settings
        title={__("Tax Settings", "wp-module-ecommerce")}
        description={__(
          "Decide whether you want to collect sales tax on items you sell. You can change this setting at anytime",
          "wp-module-ecommerce"
        )}
      >
        <Label>
          {__("Would you like to enable sales tax?", "wp-module-ecommerce")}
        </Label>
        <RadioGroup className="yst-my-0" id="tax" name="woocommerce_calc_taxes">
          {taxManagementOptions.map((option, i) => (
            <RadioGroup.Radio
              checked={option.value === taxSelected}
              id={"tax-" + option.value}
              label={option.label}
              value={option.value}
              name="woocommerce_calc_taxes"
            />
          ))}
        </RadioGroup>
      </Section.Settings>
    </Section.Content>
  );
};

export default TaxSettings;
