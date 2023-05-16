import AdvancedFeaturesConfig from "../configs/AdvancedFeatures.config";
import { useCardManager } from "./useCardManager";

export function AdvancedFeatures(props) {
  let cards = useCardManager(AdvancedFeaturesConfig(props));
  const isLoading = !(cards ?? []).every(
    (cardConfig) => cardConfig.isLoading == false
  );
  let WCUnavailable = props.plugins?.status?.woocommerce !== "Active";
  if (isLoading && !WCUnavailable) {
    return (
      <div style={{ height: "100%", display: "grid", placeContent: "center" }}>
        <div className="nfd-ecommerce-loader" />
      </div>
    );
  }

  return (
    <div className="yst-p-8 yst-grid yst-grid-cols-3 yst-gap-6">
      {cards.map((cardConfig) => {
        let { Card, title, ...props } = cardConfig;
        return <Card key={title} {...props} />;
      })}
    </div>
  );
}
