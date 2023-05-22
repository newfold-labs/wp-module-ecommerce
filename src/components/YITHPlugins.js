import YITHPluginsConfig from "../configs/YITHPlugins.config";
import { useCardManager } from "./useCardManager";

export function YITHPlugins(props) {
  let [cards] = useCardManager(YITHPluginsConfig(props));
  let isWCUnavailable = props.plugins.details?.woocommerce.status !== "active";
  if (isWCUnavailable) {
    return (
      <div style={{ height: "100%", display: "grid", placeContent: "center" }}>
        <div className="nfd-ecommerce-loader" />
      </div>
    );
  }

  return (
    <div className="yst-grid yst-grid-cols-3 yst-gap-6">
      {cards.map((cardConfig) => {
        let { Card, name, ...props } = cardConfig;
        return <Card key={name} {...props} />;
      })}
    </div>
  );
}
