import { __ } from "@wordpress/i18n";
import { Label, RadioGroup, Title } from "@yoast/ui-library";

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

const TaxSettings = ({ controls }) => {
  return (
    <div className="yst-flex yst-gap-12">
      <div className="yst-w-[300px] yst-flex-initial">
        <Title size={4} className="yst-leading-normal yst-pb-1">
          {__("Tax Settings", "wp-module-ecommerce")}
        </Title>
        <span>
          {__(
            "Decide whether you want to collect sales tax on items you sell. You can change this setting at anytime",
            "wp-module-ecommerce"
          )}
        </span>
      </div>
      <div className="yst-flex-initial">
        <Label>
          {__("Would you like to enable sales tax?", "wp-module-ecommerce")}
        </Label>
        <RadioGroup className="yst-pt-4" id="tax" name="woocommerce_calc_taxes">
          {taxManagementOptions.map((option, i) => {
            return (
              <RadioGroup.Radio
                checked={
                  option.value === controls.woocommerce_calc_taxes
                }
                id={"tax-" + option.value}
                label={option.label}
                value={option.value}
                name="woocommerce_calc_taxes"
              />
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default TaxSettings;
