import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { updateWPSettings } from "../services";
import { StoreAddress } from "./StoreAddress";

const taxManagementOptions = [
  {
    title: __("Yes, enable tax rates and calculations", "wp-module-ecommerce"),
    data: {
      wc_connect_taxes_enabled: "no",
      woocommerce_calc_taxes: "yes",
    },
  },
  {
    title: __("I will configure my own tax info later", "wp-module-ecommerce"),
    data: {
      wc_connect_taxes_enabled: "no",
      woocommerce_calc_taxes: "no",
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

const Tax = (props) => {
  let { onComplete, isStoreDetailsFilled, hireExpertsUrl } = props;
  const [selectedOption, setSelectedOption] = useState(null);
  // const [isAddressMandatory, setIsAddressMandatory] = useState(false);

  const onClickContinue = async () => {
    // if (
    //   selectedOption.title == taxManagementOptions[0].title &&
    //   !isStoreDetailsFilled
    // ) {
    //   setIsAddressMandatory(true);
    //   return;
    // }
    await updateWPSettings(selectedOption.data);
    await onComplete();
  };

  // if (isAddressMandatory) {
  //   return (
  //     <StoreAddress
  //       {...props}
  //       isMandatory
  //       onComplete={async () => {
  //         await updateWPSettings(selectedOption.data);
  //         await onComplete();
  //       }}
  //     />
  //   );
  // }
  return (
    <>
      <div style={{ height: "64px" }} />
      <p className="nfd-ecommerce-modal-header">
        {__("Confirm your tax information", "wp-module-ecoomerce")}
      </p>
      <p className="nfd-ecommerce-modal-header-description">
        {/* {__(
          "Based on the address you provided, we can auto-calculate your taxes.",
          "wp-module-ecoomerce"
        )} */}
        <div>
          {__(
            "Do you want to enable tax rates and calculations?",
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
          <a href={hireExpertsUrl}>
            {__("Hire our experts", "wp-module-ecommerce")}
          </a>
        </em>
      </p>
    </>
  );
};

export default Tax;
