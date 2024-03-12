import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { __ } from "@wordpress/i18n";
import { Spinner } from "@newfold/ui-component-library";
import { FreePluginsDefinition } from "../configs/FreePlugins.config";
import { Section } from "./Section";
import { useCardManager } from "./useCardManager";
import classNames from "classnames";

const Text = NewfoldRuntime.hasCapability("isEcommerce")
  ? __(
      "Improve your store with these free add-ons included in your plan.",
      "wp-module-ecommerce"
    )
  : __(
      "Improve your site with these free add-ons included in your plan.",
      "wp-module-ecommerce"
    );

export function FreePlugins({ notify, showShadowBox }) {
  let [cards] = useCardManager(FreePluginsDefinition({ notify }));
  return (
    <Section.Container showShadowBox={showShadowBox}>
      <Section.Header
        title={__("Additional Features", "wp-module-ecommerce")}
        subTitle={Text}
      />
      <Section.Content>
        {cards.length === 0 && (
          <div className="nfd-flex-1 nfd-flex nfd-items-center nfd-text-center nfd-justify-center">
            <Spinner size="8" className="nfd-text-primary" />
          </div>
        )}
        <div className={classNames("nfd-grid nfd-gap-6", "sm:nfd-grid-cols-1", "md:nfd-grid-cols-2", "lg:nfd-grid-cols-3")}>
          {cards.map((cardConfig) => {
            let { Card, name, ...props } = cardConfig;
            return <Card key={name} {...props} />;
          })}
        </div>
      </Section.Content>
    </Section.Container>
  );
}
