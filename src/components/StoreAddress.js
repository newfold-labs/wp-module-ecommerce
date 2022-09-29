import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import useSWR from "swr";
import { updateWCOnboarding, updateWPSettings } from "../services";

const CountriesInOFAC = ["CU", "KP", "IR", "RU", "SY", "AF", "BY", "MM", "VN"];

function useBasicProfile() {
  let { data: countries } = useSWR("/wc/v3/data/countries");
  let defaultContact = {
    country: "US",
    state: "AZ",
    woocommerce_store_address: "",
    woocommerce_store_address_2: "",
    woocommerce_store_city: "",
    woocommerce_store_postcode: "",
  };
  return [
    !countries,
    defaultContact,
    countries?.filter((_) => !CountriesInOFAC.includes(_.code)),
  ];
}

export function StoreAddress({ onComplete, isMandatory = false }) {
  let [address, setAddress] = useState({});
  let [isLoading, defaultContact, countries] = useBasicProfile();
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
        <div>
          <label> {__("Address line 1", "wp-module-ecommerce")}</label>
          <input
            name="woocommerce_store_address"
            type="text"
            required
            defaultValue={defaultContact.woocommerce_store_address}
            {...eventHandlers}
          />
        </div>
        <div>
          <label> {__("Address line 2", "wp-module-ecommerce")}</label>
          <input
            name="woocommerce_store_address_2"
            type="text"
            defaultValue={defaultContact.woocommerce_store_address_2}
            {...eventHandlers}
          />
        </div>
        <div>
          <label> {__("City", "wp-module-ecommerce")}</label>
          <input
            name="woocommerce_store_city"
            type="text"
            required
            defaultValue={defaultContact.woocommerce_store_city}
            {...eventHandlers}
          />
        </div>
        {states.length === 0 || isLoading ? null : (
          <div>
            <label> {__("State", "wp-module-ecommerce")}</label>
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
        <div>
          <label> {__("Postcode/ZIP", "wp-module-ecommerce")}</label>
          <input
            name="woocommerce_store_postcode"
            type="zip"
            required
            defaultValue={defaultContact.woocommerce_store_postcode}
            {...eventHandlers}
          />
        </div>
        <div>
          <label> {__("Country", "wp-module-ecommerce")}</label>
          {isLoading ? (
            <input type="text" disabled />
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
