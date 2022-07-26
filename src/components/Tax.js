const taxManagementOptions = [
  "Auto-calculate my taxes for me",
  "I will configure my own tax info later",
  "I don't charge sales tax",
];

const Tax = (props) => {
  let { wpModules, onComplete, refreshTasks } = props;
  const [selectedOption, setSelectedOption] = wpModules.useState(
    taxManagementOptions[0]
  );

  const onClickContinue = async () => {
    let data;
    let path = "/wc-admin/options";
    if (selectedOption == taxManagementOptions[0]) {
      data = {
        wc_connect_taxes_enabled: "yes",
        woocommerce_calc_taxes: "yes",
      };
    } else if (selectedOption == taxManagementOptions[1]) {
      data = {
        wc_connect_taxes_enabled: "no",
        woocommerce_calc_taxes: "yes",
      };
    } else {
      data = {
        woocommerce_no_sales_tax: true,
        woocommerce_calc_taxes: "no",
      };
    }
    await wpModules.apiFetch({
      path,
      method: "POST",
      data,
    });
    await refreshTasks();
    onComplete();
  };

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
            key={option}
            role="button"
            className={`nfd-ecommerce-modal-option ${
              option == selectedOption
                ? "nfd-ecommerce-modal-option-selected"
                : "nfd-ecommerce-modal-option-unselected"
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <button
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
