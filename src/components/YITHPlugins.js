import { __ } from "@wordpress/i18n";
import { Spinner } from "@newfold/ui-component-library";
import { YITHPluginsDefinitions } from "../configs/YITHPlugins.config";
import { Section } from "./Section";
import { useCardManager } from "./useCardManager";
import classNames from "classnames";

export function YITHPlugins({ woo, wpModules }) {
  let [cards] = useCardManager(
    YITHPluginsDefinitions({ notify: wpModules.notify }),
    { refreshInterval: 10 * 1000, isPaused: () => !woo.isActive }
  );
  if (!woo.isActive) {
    return null;
  }
console.log("cards",cards);
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
          <div className="nfd-flex nfd-items-center nfd-text-center nfd-justify-center nfd-h-60">
            <Spinner size={8} className="nfd-text-primary" />
          </div>
        )}
        <div
          className={classNames(
            "nfd-grid nfd-gap-6",
            "sm:nfd-grid-cols-1",
            "md:nfd-grid-cols-2",
            "lg:nfd-grid-cols-3"
          )}
        >
          {cards.map((cardConfig) => {
            let { Card, name, ...props } = cardConfig;
            return <Card key={name} {...props} />;
          })}
        </div>
      </Section.Content>
    </Section.Container>
  );
}
