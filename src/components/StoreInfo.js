import { __ } from "@wordpress/i18n";
import {
  Label,
  Select,
  SelectField,
  TextInput,
  Spinner,
  TextField,
} from "@yoast/ui-library";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Section } from "./Section";

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

const textarea = document.createElement("textarea");
function formatCurrency(currency) {
  textarea.innerHTML = currency;
  return textarea.value;
}

const StoreInfo = ({ values, pushChanges, controls }) => {
  let [isLoading, countries, currencies] = useBasicProfile();
  const [states, setStates] = useState([]);
  useEffect(() => {
    if (countries && values.country) {
      setStates(countries.find((_) => _.code == values.country)?.states ?? []);
    }
  }, [values.country, countries]);
  return (
    <Section.Content separator>
      <Section.Settings
        title={__("Store Info", "wp-module-ecommerce")}
        description={__(
          "We'll use this information to help you setup your online store",
          "wp-module-ecommerce"
        )}
      >
        {controls.isLoading ? (
          <div className="yst-flex yst-items-center yst-text-center yst-justify-center yst-h-60">
            <Spinner size={8} className="yst-text-primary" />
          </div>
        ) : (
          <div>
            <div>
              <Label>{__("Where is your store based? *")}</Label>
              {isLoading || !values.country ? (
                <TextInput name="country" className="yst-mt-2" disabled />
              ) : (
                <Select
                  id="store-country-select"
                  className="yst-mt-2"
                  name="country"
                  required
                  onChange={(target) => {
                    const statesList =
                      countries?.find((_) => _.code == target)?.states ?? [];
                    pushChanges({
                      country: target,
                      state: statesList.length == 0 ? "" : statesList[0].name,
                    });
                    setStates(statesList);
                  }}
                  value={values.country}
                  selectedLabel={
                    countries?.find((_) => _.code === values.country)?.name
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
              )}
            </div>
            <div className="yst-mt-6">
              <TextField
                data-section="details"
                name="woocommerce_store_address"
                value={values.woocommerce_store_address}
                required
                label={__("Address Line 1 *")}
              />
            </div>
            <div className="yst-mt-6">
              <TextField
                data-section="details"
                name="woocommerce_store_address_2"
                value={values.woocommerce_store_address_2}
                label={__("Address Line 2 (optional)")}
              />
            </div>
            <div className="yst-mt-6 yst-flex">
              <div className="yst-flex-1">
                <TextField
                  data-section="details"
                  name="woocommerce_store_city"
                  value={values.woocommerce_store_city}
                  label={__("City *")}
                  required
                />
              </div>
              {states?.length > 0 && (
                <div className="yst-flex-1 yst-ml-8">
                  <Label>{__("State *")}</Label>
                  <Select
                    id="state-select"
                    className="yst-mt-2"
                    required
                    onChange={(target) => {
                      pushChanges({ state: target });
                    }}
                    value={values.state}
                    selectedLabel={
                      states?.find((_) => _.code === values.state)?.name ??
                      states[0].name
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
                </div>
              )}
              <div className="yst-flex-1 yst-ml-8">
                <TextField
                  data-section="details"
                  name="woocommerce_store_postcode"
                  value={values.woocommerce_store_postcode}
                  label={__("Postal Code *")}
                  required
                />
              </div>
            </div>
            <div className="yst-mt-6">
              <TextField
                data-section="details"
                name="woocommerce_email_from_address"
                value={values.woocommerce_email_from_address}
                label={__("Email")}
                required
              />
            </div>
            <div className="yst-mt-6">
              <Label>
                {__("What currency do you want to display in your store?")}
              </Label>
              {isLoading ? (
                <TextInput
                  name="woocommerce_currency"
                  className="yst-mt-2"
                  disabled
                />
              ) : (
                <Select
                  id="currency"
                  className="yst-mt-2 yst-mb-4"
                  name="woocommerce_currency"
                  onChange={(target) => {
                    pushChanges({ woocommerce_currency: target });
                  }}
                  value={values.woocommerce_currency}
                  selectedLabel={formatCurrency(
                    `${
                      currencies.find(
                        (_) => _.code === values.woocommerce_currency
                      )?.name
                    } (${
                      currencies.find(
                        (_) => _.code === values.woocommerce_currency
                      )?.symbol
                    })`
                  )}
                >
                  {currencies.map((currency) => {
                    return (
                      <SelectField.Option
                        label={formatCurrency(
                          `${currency.name} (${currency.symbol})`
                        )}
                        value={currency.code}
                        key={currency.code}
                      />
                    );
                  })}
                </Select>
              )}
            </div>
            <span>* indicates a required field</span>
          </div>
        )}
      </Section.Settings>
    </Section.Content>
  );
};

export default StoreInfo;
