import constants from "../constants.json";
export function StoreAddress(props) {
  let currentData = {};
  function handleFieldChange(event) {
  }
  return (
    <form
      style={{ display: "grid", paddingTop: "64px", justifyItems: "center" }}
    >
      <h1 className="nfd-ecommerce-store-address-title">
        Confirm your business or store address{" "}
      </h1>
      <p>
        Use the same address you provided for your Bluehost account or change it
        below:
      </p>

      <div className="nfd-ecommerce-store-address-form">
        <div>
          <label>Address line 1</label>
          <input
            name="address_line_1"
            type="text"
            required
            defaultValue={currentData.storeAddress?.address_line_1}
            onChange={handleFieldChange}
            onBlur={handleFieldChange}
          />
        </div>
        <div>
          <label>Address line 2</label>
          <input
            name="address_line_2"
            type="text"
            required
            defaultValue={currentData.storeAddress?.address_line_2}
            onChange={handleFieldChange}
            onBlur={handleFieldChange}
          />
        </div>
        <div>
          <label>City</label>
          <input
            name="city"
            type="text"
            required
            defaultValue={currentData.storeAddress?.city}
            onChange={handleFieldChange}
            onBlur={handleFieldChange}
          />
        </div>
        <div>
          <label>State</label>
          <input
            name="state"
            type="text"
            required
            defaultValue={currentData.storeAddress?.state}
            onChange={handleFieldChange}
            onBlur={handleFieldChange}
          />
        </div>
        <div>
          <label>Postal Code</label>
          <input
            name="postal_code"
            type="zip"
            required
            defaultValue={currentData.storeAddress?.postal_code}
            onChange={handleFieldChange}
            onBlur={handleFieldChange}
          />
        </div>
        <div>
          <label>Country</label>
          <select
            type="text"
            name="country"
            required
            defaultValue={currentData.storeAddress?.country}
            onChange={handleFieldChange}
            onBlur={handleFieldChange}
          >
            {constants.countries.map((country) => (
              <option key={country.country_short} value={country.country_short}>
                {country.country}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="nfd-ecommerce-atoms" type="submit">
        Continue
      </button>
      <p>
        <em>
          Need help? <a>Hire our experts</a>
        </em>
      </p>
    </form>
  );
}
