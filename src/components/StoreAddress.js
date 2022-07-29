import useSWR from "swr";

/**
 * @TODO We need to get customer details from Hiive before using this hook
 * @deprecated
 */
function useProfile() {
  let { data: profile } = useSWR("/newfold-ecommerce/v1/user/profile");
  let { data: countries } = useSWR("/wc/v3/data/countries");
  let defaultContact = {};
  if (profile && countries) {
    let country = profile.contact?.country ?? "US";
    let state = profile.contact?.state ?? "";
    let isStateCodeValid =
      countries
        .find((_) => country === _.code)
        ?.states.find((_) => _.code === state) !== undefined;
    defaultContact = {
      country,
      state: isStateCodeValid ? state : null,
      woocommerce_store_address: profile.contact?.address,
      woocommerce_store_address_2: "",
      woocommerce_store_city: profile.contact?.city,
      woocommerce_store_postcode: profile.contact?.zip,
    };
  }
  return [!profile || !countries, defaultContact, countries];
}

function useBasicProfile() {
  let { data: countries } = useSWR("/wc/v3/data/countries");
  let defaultContact = {
    country: "US",
    state: "",
    woocommerce_store_address: "",
    woocommerce_store_address_2: "",
    woocommerce_store_city: "",
    woocommerce_store_postcode: "",
  };
  return [!countries, defaultContact, countries];
}

export function StoreAddress({ wpModules, onComplete, isMandatory = false }) {
  let [address, setAddress] = wpModules.useState({});
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
        await wpModules.apiFetch({
          path: "/wc-admin/options",
          method: "POST",
          data: {
            ...defaultContact,
            ...wcAddress,
            woocommerce_default_country: `${country}:${state}`,
          },
        });
        await wpModules.apiFetch({
          path: "/wc-admin/onboarding/profile",
          method: "POST",
          data: { completed: true },
        });
        await onComplete();
      }}
      style={{ display: "grid", paddingTop: "64px", justifyItems: "center" }}
    >
      <p className="nfd-ecommerce-modal-header">
        {isMandatory
          ? "First, we need your business or store address"
          : "Confirm your business or store address"}
      </p>
      <p className="nfd-ecommerce-modal-header-description">
        Use the same address you provided for your Bluehost account or change it
        below:
      </p>
      {isLoading && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          Loading your information...{"  "}
          <div className="bwa-loader nfd-ecommerce-loader-mini" />
        </div>
      )}
      <div className="nfd-ecommerce-store-address-form">
        <div>
          <label>Address line 1</label>
          <input
            name="woocommerce_store_address"
            type="text"
            required
            defaultValue={defaultContact.woocommerce_store_address}
            {...eventHandlers}
          />
        </div>
        <div>
          <label>Address line 2</label>
          <input
            name="woocommerce_store_address_2"
            type="text"
            defaultValue={defaultContact.woocommerce_store_address_2}
            {...eventHandlers}
          />
        </div>
        <div>
          <label>City</label>
          <input
            name="woocommerce_store_city"
            type="text"
            required
            defaultValue={defaultContact.woocommerce_store_city}
            {...eventHandlers}
          />
        </div>
        <div>
          <label>State</label>
          {states.length === 0 ? (
            <input type="text" name="state" required {...eventHandlers} />
          ) : (
            <select
              type="text"
              name="state"
              required
              defaultValue={defaultContact.state}
              {...eventHandlers}
            >
              {states.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <label>Postcode/ZIP</label>
          <input
            name="woocommerce_store_postcode"
            type="zip"
            required
            defaultValue={defaultContact.woocommerce_store_postcode}
            {...eventHandlers}
          />
        </div>
        <div>
          <label>Country</label>
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
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      <button className="nfd-ecommerce-atoms" type="submit">
        Continue
      </button>
      <p>
        <em>
          Need help?{" "}
          <a href="admin.php?page=bluehost#/marketplace/services/blue-sky">
            Hire our experts
          </a>
        </em>
      </p>
    </form>
  );
}
