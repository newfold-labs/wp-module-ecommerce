import { __ } from "@wordpress/i18n";
import { StoreAddress } from "./StoreAddress";

const taxManagementOptions = [
  {
    title: __("Auto-calculate my taxes for me", "wp-module-ecommerce"),
    data: {
      wc_connect_taxes_enabled: "yes",
      woocommerce_calc_taxes: "yes",
    },
  },
  {
    title: __("I will configure my own tax info later", "wp-module-ecommerce"),
    data: {
      wc_connect_taxes_enabled: "no",
      woocommerce_calc_taxes: "yes",
    },
  },
  {
    title: __("I don't charge sales tax", "wp-module-ecommerce"),
    data: {
      woocommerce_no_sales_tax: true,
      woocommerce_calc_taxes: "no",
    },
  },
];

const path = "/wp/v2/settings";

const Tax = (props) => {
  let { wpModules, onComplete, isStoreDetailsFilled } = props;
  const [selectedOption, setSelectedOption] = wpModules.useState(null);
  const [isAddressMandatory, setIsAddressMandatory] = wpModules.useState(false);

  const saveTaxOption = async () =>
    wpModules.apiFetch({ path, method: "POST", data: selectedOption.data });

  const onClickContinue = async () => {
    if (
      selectedOption.title == taxManagementOptions[0].title &&
      !isStoreDetailsFilled
    ) {
      setIsAddressMandatory(true);
      return;
    }
    await saveTaxOption();
    await onComplete();
  };

  if (isAddressMandatory) {
    return (
      <StoreAddress
        {...props}
        isMandatory
        onComplete={async () => {
          await saveTaxOption();
          await onComplete();
        }}
      />
    );
  }
  return (
    <>
      <div style={{ height: "64px" }} />
      <p className="nfd-ecommerce-modal-header">
        {__("Confirm your tax information", "wp-module-ecoomerce")}
      </p>
      <p className="nfd-ecommerce-modal-header-description">
        {__(
          "Based on the address you provided, we can auto-calculate your taxes.",
          "wp-module-ecoomerce"
        )}
        <div>
          {__(
            "How would you like to manage your taxes:",
            "wp-module-ecommerce"
          )}
        </div>
      </p>
      <div className="nfd-ecommerce-modal-options">
        {taxManagementOptions.map((option) => (
          <div
            key={option.title}
            role="button"
            className={`nfd-ecommerce-modal-option ${
              option.title == selectedOption?.title
                ? "nfd-ecommerce-modal-option-selected"
                : "nfd-ecommerce-modal-option-unselected"
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option.title}
          </div>
        ))}
      </div>
      <button
        disabled={!selectedOption}
        style={{ marginTop: "120px" }}
        className="nfd-ecommerce-atoms"
        onClick={onClickContinue}
      >
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
    </>
  );
};

export default Tax;
