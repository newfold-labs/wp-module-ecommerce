import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import useSWR from "swr";
import { updateWCOnboarding, updateWPSettings } from "../services";

const CountriesInOFAC = ["CU", "KP", "IR", "RU", "SY", "AF", "BY", "MM", "VN"];

function useBasicProfile() {
  let { data: countries } = useSWR("/wc/v3/data/countries");
  let { data: currencies } = useSWR("/wc/v3/data/currencies");
  let defaultContact = {
    country: "US",
    state: "AZ",
    woocommerce_store_address: "",
    woocommerce_store_address_2: "",
    woocommerce_store_city: "",
    woocommerce_store_postcode: "",
  };
  return [
    !countries || !currencies,
    defaultContact,
    countries?.filter((_) => !CountriesInOFAC.includes(_.code)),
    currencies,
  ];
}

export function StoreAddress({ onComplete, isMandatory = false }) {
  let [address, setAddress] = useState({});
  let [isLoading, defaultContact, countries, currencies] = useBasicProfile();
  function handleChange(event) {
    setAddress({ ...address, [event.target.name]: event.target.value });
  }
  const eventHandlers = { onChange: handleChange, onBlur: handleChange };
  let selectedCountry = address?.country ?? defaultContact.country;
  let states =
    countries?.find((country) => country.code === selectedCountry)?.states ??
    [];
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        event.stopPropagation();
        let { country, state, ...wcAddress } = address;
        let selectedState = state;
        if (selectedCountry === defaultContact.country && state === undefined) {
          selectedState = defaultContact.state;
        }
        await updateWPSettings({
          ...defaultContact,
          ...wcAddress,
          woocommerce_default_country: selectedState
            ? `${selectedCountry}:${selectedState}`
            : selectedCountry,
        });
        await updateWCOnboarding({ completed: true });
        await onComplete();
      }}
      style={{ display: "grid", paddingTop: "64px", justifyItems: "center" }}
    >
      <p className="nfd-ecommerce-modal-header">
        {isMandatory
          ? __(
              "First, we need your business or store address",
              "wp-module-ecoomerce"
            )
          : __("Confirm your business or store address", "wp-module-ecoomerce")}
      </p>
      <p className="nfd-ecommerce-modal-header-description">
        {__(
          "We'll use this information to help you setup your online store",
          "wp-module-ecoomerce"
        )}
      </p>
      {isLoading && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {__("Loading your information...", "wp-module-ecoomerce")}
          {"  "}
          <div className="bwa-loader nfd-ecommerce-loader-mini" />
        </div>
      )}
      <div className="nfd-ecommerce-store-address-form">
        <div data-name="country">
          <label aria-required>
            {__("Where is your store based?", "wp-module-ecommerce")}
          </label>
          {isLoading ? (
            <input type="text" name="country" disabled />
          ) : (
            <select
              type="text"
              name="country"
              required
              defaultValue={defaultContact.country}
              {...eventHandlers}
            >
              {countries.map((country) => (
                <option
                  key={country.code}
                  value={country.code}
                  dangerouslySetInnerHTML={{ __html: country.name }}
                />
              ))}
            </select>
          )}
        </div>
        <div data-name="woocommerce_store_address">
          <label aria-required> {__("Address", "wp-module-ecommerce")}</label>
          <input
            name="woocommerce_store_address"
            type="text"
            required
            defaultValue={defaultContact.woocommerce_store_address}
            {...eventHandlers}
          />
        </div>
        <div
          data-name="full-address"
          data-state-empty={states.length === 0 || isLoading}
        >
          <div data-name="woocommerce_store_city">
            <label aria-required> {__("City", "wp-module-ecommerce")}</label>
            <input
              name="woocommerce_store_city"
              type="text"
              required
              defaultValue={defaultContact.woocommerce_store_city}
              {...eventHandlers}
            />
          </div>
          {states.length === 0 || isLoading ? null : (
            <div data-name="state">
              <label aria-required> {__("State", "wp-module-ecommerce")}</label>
              <select
                type="text"
                name="state"
                required
                defaultValue=""
                {...eventHandlers}
              >
                <option key={""} value={""} selected />
                {states.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div data-name="woocommerce_store_postcode">
            <label aria-required>
              {__("Postal Code", "wp-module-ecommerce")}
            </label>
            <input
              name="woocommerce_store_postcode"
              type="zip"
              required
              defaultValue={defaultContact.woocommerce_store_postcode}
              {...eventHandlers}
            />
          </div>
        </div>
        <div>
          <label aria-required> {__("Email", "wp-module-ecommerce")}</label>
          <input
            name="woocommerce_email_from_address"
            type="email"
            required
            {...eventHandlers}
          />
        </div>
        <div>
          <label>
            {__(
              "What currency do you want to display in your store?",
              "wp-module-ecommerce"
            )}
          </label>
          {isLoading ? (
            <input type="text" disabled />
          ) : (
            <select name="woocommerce_currency" {...eventHandlers}>
              {currencies.map((currency) => (
                <option
                  key={currency.code}
                  value={currency.code}
                  dangerouslySetInnerHTML={{
                    __html: `${currency.name} (${currency.code}) (${currency.symbol})`,
                  }}
                />
              ))}
            </select>
          )}
        </div>
      </div>
      <button className="nfd-ecommerce-atoms" type="submit">
        {__("Continue", "wp-module-ecommerce")}
      </button>
      <p>
        <em>
          {__("Need help?", "wp-module-ecommerce")}{" "}
          <a href="admin.php?page=bluehost#/marketplace/services/blue-sky">
            {__("Hire our experts", "wp-module-ecommerce")}
          </a>
        </em>
      </p>
    </form>
  );
}
