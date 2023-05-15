import { Card, Title } from "@yoast/ui-library";
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
    <Card className="yst-p-0">
      <Card.Header className="yst-bg-white yst-block yst-m-0 yst-py-8 yst-px-8 yst-h-auto">
        <Title className="yst-text-2xl yst-text-[#0F172A]" size={2}>
          Additional Features
        </Title>
      </Card.Header>
      <Card.Content className="yst-m-0 yst-px-8 yst-pb-8 yst-grid yst-grid-cols-3 yst-auto-rows-fr yst-gap-6">
        {cards.map((cardConfig) => {
          let { Card, title, ...props } = cardConfig;
          return <Card key={title} {...props} />;
        })}
      </Card.Content>
    </Card>
  );
}
