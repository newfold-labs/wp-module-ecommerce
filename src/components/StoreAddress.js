import useSWR from "swr";

function useProfile() {
  let { data: profile } = useSWR("/newfold-ecommerce/v1/user/profile");
  let { data: countries } = useSWR("/wc/v3/data/countries");
  let defaultContact = {};
  if (profile && countries) {
    let bhStateCode = profile.contact.state ?? "";
    let bhCountryCode = profile.contact.country ?? "";
    let wcStateCode =
      countries
        .find((country) => bhCountryCode === country.code)
        ?.states.find(
          (state) =>
            state.code === bhStateCode ||
            state.name.toLowerCase() === bhStateCode.trim().toLowerCase()
        ) ?? null;
    defaultContact = {
      country: bhCountryCode,
      state: wcStateCode,
      woocommerce_store_address: profile.contact.address,
      woocommerce_store_address_2: "",
      woocommerce_store_city: profile.contact.city,
      woocommerce_store_postcode: profile.contact.zip,
    };
  }
  return [!profile || !countries, defaultContact, countries];
}

export function StoreAddress({ wpModules, refreshTasks, onComplete }) {
  let [address, setAddress] = wpModules.useState({});
  let [isLoading, defaultContact, countries] = useProfile();
  function handleFieldChange(event) {
    setAddress({ ...address, [event.target.name]: event.target.value });
  }
  const eventHandlers = {
    onChange: handleFieldChange,
    onBlur: handleFieldChange,
  };
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
        await refreshTasks();
        onComplete();
      }}
      style={{ display: "grid", paddingTop: "64px", justifyItems: "center" }}
    >
      <h1 className="nfd-ecommerce-store-address-title">
        Confirm your business or store address{" "}
      </h1>
      <p>
        Use the same address you provided for your Bluehost account or change it
        below:
      </p>
      {isLoading && (
        <div style={{ display: "inline-flex", alignItems: "center" }}>
          Loading your information...{" "}
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
      </div>
      <button className="nfd-ecommerce-atoms" type="submit">
        Continue
      </button>
      <p>
        <em>
          Need help?{" "}
          <a href="/wp-admin/admin.php?page=bluehost#/marketplace/services/blue-sky">
            Hire our experts
          </a>
        </em>
      </p>
    </form>
  );
}
