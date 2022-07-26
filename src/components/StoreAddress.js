import useSWR from "swr";

let SupportedCountries = {
  AU: "Australia",
  CA: "Canada",
  JP: "Japan",
  IN: "India",
  MX: "Mexico",
  BR: "Brazil",
  US: "United States",
};

function useProfile() {
  let { data } = useSWR("/newfold-ecommerce/v1/user/profile");
  let defaultContact = {};
  let countries = [];
  if (data) {
    defaultContact = {
      woocommerce_default_country: `${data.contact?.country}:${data.contact?.state}`,
      woocommerce_store_address: data.contact?.address,
      woocommerce_store_address_2: "",
      woocommerce_store_city: data.contact?.city,
      woocommerce_store_postcode: data.contact?.zip,
    };
    let bhSupportedCountries = Object.entries(data.provinces).flatMap(
      ([country, states]) =>
        states.map(([code, name]) => [
          `${country}:${code}`,
          `${SupportedCountries[country]} - ${name}`,
        ])
    );
    let otherCountries = data.countries.filter(
      ([country]) => SupportedCountries[country] === undefined
    );
    countries = bhSupportedCountries.concat(otherCountries);
  }
  return [!data, defaultContact, countries];
}

export function StoreAddress({ wpModules, refreshTasks, onComplete }) {
  let [address, setAddress] = wpModules.useState({});
  let [isLoading, defaultContact, countries] = useProfile();
  function handleFieldChange(event) {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
  }
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        event.stopPropagation();
        await wpModules.apiFetch({
          path: "/wc-admin/options",
          method: "POST",
          data: { ...defaultContact, ...address },
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
            onChange={handleFieldChange}
            onBlur={handleFieldChange}
          />
        </div>
        <div>
          <label>Address line 2</label>
          <input
            name="woocommerce_store_address_2"
            type="text"
            required
            defaultValue={defaultContact.woocommerce_store_address_2}
            onChange={handleFieldChange}
            onBlur={handleFieldChange}
          />
        </div>
        <div>
          <label>City</label>
          <input
            name="woocommerce_store_city"
            type="text"
            required
            defaultValue={defaultContact.woocommerce_store_city}
            onChange={handleFieldChange}
            onBlur={handleFieldChange}
          />
        </div>
        <div>
          <label>Country - State</label>
          {isLoading ? (
            <input type="text" />
          ) : (
            <select
              type="text"
              name="woocommerce_default_country"
              required
              defaultValue={defaultContact.woocommerce_default_country}
              onChange={handleFieldChange}
              onBlur={handleFieldChange}
            >
              {countries.map(([country, value]) => (
                <option key={country} value={country}>
                  {value}
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
            onChange={handleFieldChange}
            onBlur={handleFieldChange}
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
