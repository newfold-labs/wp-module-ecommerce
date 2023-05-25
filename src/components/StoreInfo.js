import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  Label,
  Select,
  SelectField,
  TextInput,
  Title,
} from "@yoast/ui-library";
import useSWR from "swr";

const CountriesInOFAC = ["CU", "KP", "IR", "RU", "SY", "AF", "BY", "MM", "VN"];
function useBasicProfile() {
  let { data: countries } = useSWR("/wc/v3/data/countries");
  let { data: currencies } = useSWR("/wc/v3/data/currencies");
  return [
    !countries || !currencies,
    countries?.filter((_) => !CountriesInOFAC.includes(_.code)),
    currencies,
  ];
}

const StoreInfo = ({ controls, setControls }) => {
  let [isLoading, countries, currencies] = useBasicProfile();
  const [states, setStates] = useState([]);
  return (
    <div className="yst-flex yst-gap-12">
      <div className="yst-w-[300px] yst-flex-initial">
        <Title size={4} className="yst-leading-normal yst-pb-1">
          {__("Store Info", "wp-module-ecommerce")}
        </Title>
        <span>
          {__(
            "We'll use this information to help you setup your online store",
            "wp-module-ecommerce"
          )}
        </span>
      </div>
      <div className="yst-flex-1">
        <div>
          <Label>{__("Where is your store based?")}</Label>
          {controls.country && countries && (
            <>
              <Select
                id="store-country-select"
                className="yst-mt-2"
                name="country"
                disabled={isLoading}
                onChange={(target) => {
                  setControls({
                    ...controls,
                    country: target,
                  });
                  console.log(
                    countries.filter((_) => _.code == target)[0].states
                  );
                }}
                value={controls?.country ?? ""}
                selectedLabel={
                  countries?.find((_) => _.code === controls?.country)?.name
                }
              >
                {countries?.map((country) => {
                  return (
                    <SelectField.Option
                      label={country.name}
                      value={country.code}
                      key={country.code}
                      name="country"
                    />
                  );
                })}
              </Select>
            </>
          )}
        </div>
        <div className="yst-mt-6">
          <Label>{__("Address Line 1")}</Label>
          <TextInput
            name="woocommerce_store_address"
            value={controls.woocommerce_store_address}
            className="yst-mt-2"
          />
        </div>
        <div className="yst-mt-6">
          <Label>{__("Address Line 2 (optional)")}</Label>
          <TextInput
            name="woocommerce_store_address_2"
            value={controls.woocommerce_store_address_2}
            className="yst-mt-2"
          />
        </div>
        <div className="yst-mt-6 yst-flex">
          <div className="yst-flex-1">
            <Label>{__("City")}</Label>
            <TextInput
              name="woocommerce_store_city"
              value={controls.woocommerce_store_city}
              className="yst-mt-2"
            />
          </div>
          {states?.length > 0 && (
            <div className="yst-flex-1 yst-ml-8">
              <Label>{__("State")}</Label>
              {states?.length > 0 && (
                <Select
                  id="state-select"
                  className="yst-mt-2"
                  disabled={isLoading}
                  onChange={(target) => {
                    setControls({
                      ...controls,
                      state: target,
                    });
                  }}
                  value={controls.state}
                  selectedLabel={
                    states?.find((_) => _.code === controls.state)?.name
                  }
                >
                  {states?.map((state) => {
                    return (
                      <SelectField.Option
                        label={state.name}
                        value={state.code}
                        key={state.code}
                      />
                    );
                  })}
                </Select>
              )}
            </div>
          )}

          <div className="yst-flex-1 yst-ml-8">
            <Label>{__("Postal Code")}</Label>
            <TextInput
              name="woocommerce_store_postcode"
              value={controls.woocommerce_store_postcode}
              className="yst-mt-2"
            />
          </div>
        </div>
        <div className="yst-mt-6">
          <Label>{__("Email")}</Label>
          <TextInput
            name="woocommerce_email_from_address"
            value={controls.woocommerce_email_from_address}
            className="yst-mt-2"
          />
        </div>
        <div className="yst-mt-6">
          <Label>
            {__("What currency do you want to display in your store?")}
          </Label>
          {currencies && (
            <Select
              id="select-currency"
              className="yst-mt-2"
              disabled={isLoading}
              onChange={(target) => {
                setControls({
                  ...controls,
                  woocommerce_currency: target,
                });
              }}
              value={controls.woocommerce_currency}
              selectedLabel={
                currencies.find((_) => _.code === controls.woocommerce_currency)
                  ?.name
              }
            >
              {currencies.map((currency) => {
                return (
                  <SelectField.Option
                    label={currency.name}
                    value={currency.code}
                    key={currency.code}
                  />
                );
              })}
            </Select>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
