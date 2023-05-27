import { Spinner } from "@yoast/ui-library";
import { YITHPluginsDefinitions } from "../configs/YITHPlugins.config";
import { Section } from "./Section";
import { useCardManager } from "./useCardManager";
import { PluginsSdk } from "../sdk/plugins";

export function YITHPlugins({ plugins, wpModules, user }) {
  let isWCUnavailable = PluginsSdk.isPlugin(plugins, ["woocommerce"], "active");
  let [cards] = useCardManager(
    YITHPluginsDefinitions({
      notify: wpModules.notify,
      user,
    }),
    { refreshInterval: 10 * 1000, isPaused: () => isWCUnavailable }
  );
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
