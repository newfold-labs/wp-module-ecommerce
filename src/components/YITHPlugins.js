import { Spinner } from "@yoast/ui-library";
import YITHPluginsConfig from "../configs/YITHPlugins.config";
import { Section } from "./Section";
import { useCardManager } from "./useCardManager";

export function YITHPlugins(props) {
  let [cards] = useCardManager(YITHPluginsConfig(props));
  let isWCUnavailable = props.plugins.details?.woocommerce.status !== "active";
  if (isWCUnavailable) {
    return null;
  }

  return (
    <Section.Container>
      <Section.Header
        title={__("Additional Features", "wp-module-ecommerce")}
        subTitle={__(
          "Improve your store with these powerful add-ons.",
          "wp-module-ecommerce"
        )}
      />
      <Section.Content>
        {cards.length === 0 && (
          <div className="yst-flex yst-items-center yst-text-center yst-justify-center yst-h-60">
            <Spinner size={8} className="yst-text-primary" />
          </div>
        )}
        <div className="yst-grid yst-grid-cols-3 yst-gap-6">
          {cards.map((cardConfig) => {
            let { Card, name, ...props } = cardConfig;
            return <Card key={name} {...props} />;
          })}
        </div>
      </Section.Content>
    </Section.Container>
  );
}
