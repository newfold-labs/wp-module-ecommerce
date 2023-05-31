import { __ } from "@wordpress/i18n";
import { Button, Badge } from "@yoast/ui-library";
import { ReactComponent as RazorPayBrand } from "../icons/razorpay-brand.svg";

const Razorpay = ({ integrationStatus, onConnect }) => {
  const isSetupComplete = integrationStatus?.complete;
  const environment = integrationStatus?.details?.environment;

  return (
    <div className="yst-h-[174px] yst-border yst-h-174px yst-p-6">
      <div className="yst-flex yst-justify-between yst-mb-8">
        <RazorPayBrand />
        {isSetupComplete ? (
          <Button
            variant="secondary"
            as="a"
            href={integrationStatus?.plugin?.url}
          >
            {__("Manage", "wp-module-ecommerce")}
          </Button>
        ) : (
          <Button onClick={onConnect}>
            {__("Connect", "wp-module-ecommerce")}
          </Button>
        )}
      </div>
      <span>
        {__(
          "Online payments built for success. We help you do business across different markets and 100+ currencies—even if your customers don’t have Razorpay."
        )}
      </span>
      {environment && (
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
      )}
    </div>
  );
};
export default Razorpay;
