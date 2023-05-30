import { __ } from "@wordpress/i18n";
import { Button, Badge } from "@yoast/ui-library";
import { ReactComponent as Shippo } from "../icons/shippo.svg";

const Shipping = ({ integrationStatus, setShowThirdPartyContent }) => {
  const isSetupComplete = integrationStatus?.complete;
  const environment = integrationStatus?.details?.environment;

  const handleOnClick = () => {
    if (isSetupComplete) {
      window.location.href =
        "admin.php?page=yith_shippo_shipping_for_woocommerce";
    } else {
      setShowThirdPartyContent(true);
    }
  };

  return (
    <div className="yst-h-[174px] yst-border yst-h-174px yst-p-6">
      <div className="yst-flex yst-justify-between yst-mb-8">
        <Shippo />
        <Button
          variant={isSetupComplete ? "secondary" : "primary"}
          onClick={handleOnClick}
        >
          {__(
            `${isSetupComplete ? "Manage" : "Connect"}`,
            "wp-module-ecommerce"
          )}
        </Button>
      </div>
      <span>
        {__(
          "The best multi-carrier shipping software for e-commerce businesses.",
          "wp-module-ecommerce"
        )}
      </span>
      <div className="yst-flex yst-gap-4 yst-mt-4">
        <span>Environment :</span>
        <Badge
          className={`yst-w-78 yst-h-26 yst-rounded ${
            environment == "sandbox"
              ? "yst-bg-[#178113] yst-text-black"
              : "yst-bg-[#F89C24] yst-text-white"
          }`}
        >
          {environment}
        </Badge>
      </div>
    </div>
  );
};
export default Shipping;
