import { __ } from "@wordpress/i18n";
import AdvancedFeaturesConfig from "../configs/AdvancedFeatures.config";
import { DashboardContent } from "./DashboardContent";
import { useCardManager } from "./useCardManager";

export function AdvancedFeatures(props) {
  let { plugins } = props;
  let cards = useCardManager(AdvancedFeaturesConfig(plugins));
  const isLoading = !(cards ?? []).every(
    (cardConfig) => cardConfig.isLoading == false
  );
  let WCUnavialable = plugins?.status?.woocommerce !== "Active";
 
  if (isLoading && !WCUnavialable)
    return (
      <div style={{ height: "100%", display: "grid", placeContent: "center" }}>
        <div className="bwa-loader" />
      </div>
    );

  return (
    <>
      <DashboardContent
        title={__("Additional Features", "wp-module-ecommerce")}
        subtitle={__(
          "Enjoy the free add-ons included in your plan and improve your store.",
          "wp-module-ecommerce"
        )}
      >
        <div className="nfd-ecommerce-extended-actions-container">
          {cards.map((cardConfig) => {
            let { Card, title, ...props } = cardConfig;
            return <Card key={title} {...props} />;
          })}
        </div>
      </DashboardContent>
    </>
  );
}
