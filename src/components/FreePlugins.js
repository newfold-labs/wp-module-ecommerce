import { NewfoldRuntime } from "@newfold-labs/wp-module-runtime";
import { __ } from "@wordpress/i18n";
import { Spinner } from "@yoast/ui-library";
import { FreePluginsDefinition } from "../configs/FreePlugins.config";
import { Section } from "./Section";
import { useCardManager } from "./useCardManager";

const Text = NewfoldRuntime.hasCapability("isEcommerce")
  ? __(
      "Improve your store with these free add-ons included in your plan.",
      "wp-module-ecommerce"
    )
  : __(
      "Improve your site with these free add-ons included in your plan.",
      "wp-module-ecommerce"
    );

export function FreePlugins({ notify }) {
  let [cards] = useCardManager(FreePluginsDefinition({ notify }));
  return (
    <Section.Container>
      <Section.Header
        title={__("Additional Features", "wp-module-ecommerce")}
        subTitle={Text}
      />
      <Section.Content>
        {cards.length === 0 && (
          <div className="yst-flex-1 yst-flex yst-items-center yst-text-center yst-justify-center">
            <Spinner size={8} className="yst-text-primary" />
          </div>
        )}
        <div className="yst-grid yst-gap-6 sm:yst-grid-cols-1 md:yst-grid-cols-2 lg:yst-grid-cols-3">
          {cards.map((cardConfig) => {
            let { Card, name, ...props } = cardConfig;
            return <Card key={name} {...props} />;
          })}
        </div>
      </Section.Content>
    </Section.Container>
  );
}
