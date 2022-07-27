import { StoreAddress } from "./StoreAddress";

const taxManagementOptions = [
  {
    title: "Auto-calculate my taxes for me",
    data: {
      wc_connect_taxes_enabled: "yes",
      woocommerce_calc_taxes: "yes",
    },
  },
  {
    title: "I will configure my own tax info later",
    data: {
      wc_connect_taxes_enabled: "no",
      woocommerce_calc_taxes: "yes",
    },
  },
  {
    title: "I don't charge sales tax",
    data: {
      woocommerce_no_sales_tax: true,
      woocommerce_calc_taxes: "no",
    },
  },
];

const path = "/wc-admin/options";

const Tax = (props) => {
  let { wpModules, onComplete, isStoreDetailsFilled } = props;
  const [selectedOption, setSelectedOption] = wpModules.useState(null);
  const [isAutoCalTaxWithoutStoreDetails, setIsAutoCalTaxWithoutStoreDetails] =
    wpModules.useState(false);

  const saveTaxOption = async () =>
    wpModules.apiFetch({ path, method: "POST", data: selectedOption.data });

  const onClickContinue = async () => {
    if (
      selectedOption.title == taxManagementOptions[0].title &&
      !isStoreDetailsFilled
    ) {
      setIsAutoCalTaxWithoutStoreDetails(true);
      return;
    }
    await saveTaxOption();
    await onComplete();
  };

  if (isAutoCalTaxWithoutStoreDetails) {
    return (
      <StoreAddress
        {...props}
        onComplete={async () => {
          await saveTaxOption();
          await onComplete();
        }}
      />
    );
  }
  return (
    <>
      <div className="nfd-ecommerce-modal-header">
        Confirm your tax information
      </div>
      <div className="nfd-ecommerce-modal-header-description">
        Based on the address you provided, we can auto-calculate your taxes.
        <div> How would you like to manage your taxes:</div>
      </div>
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
    </>
  );
};

export default Tax;
