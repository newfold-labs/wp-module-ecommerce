import { __ } from "@wordpress/i18n";
import GeneralSettingsConfig from "../configs/GeneralSettings.config";
import { useCardManager } from "./useCardManager";
import { DashboardContent } from "./DashboardContent";

export function GeneralSettings(props) {
  let { plugins } = props;
  let cards = useCardManager(GeneralSettingsConfig(plugins));
  const isLoading = !(cards ?? []).every(
    (cardConfig) => cardConfig.isLoading == false
  );
  let WCUnavailable = plugins?.status?.woocommerce !== "Active";
  if (isLoading && !WCUnavailable)
    return (
      <div style={{ height: "100%", display: "grid", placeContent: "center" }}>
        <div className="bwa-loader" />
      </div>
    );

  return (
    <>
      <DashboardContent
        title={__("Store Info", "wp-module-ecommerce")}
        subtitle={__(
          "Fill out the basic info and settings needed to run your store.",
          "wp-module-ecommerce"
        )}
      >
        <div className="nfd-ecommerce-minimal-tasks-container">
          {cards.map((cardConfig) => {
            let { Card, title, ...props } = cardConfig;
            return <Card key={title} {...props} />;
          })}
        </div>
        <div style={{ height: "24px" }} />
        {WCUnavailable && (
          <div className="nfd-wc-unavailable-msg">
            WooCommerce is required for these features to work, install it now
            or contact our support team for more assistance.{" "}
          </div>
        )}
      </DashboardContent>
    </>
  );
}
