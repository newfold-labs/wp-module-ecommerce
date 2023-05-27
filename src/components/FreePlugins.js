import apiFetch from "@wordpress/api-fetch";
import { Spinner } from "@yoast/ui-library";
import useSWR from "swr/immutable";
import { FreePluginsDefinition } from "../configs/FreePlugins.config";
import { Endpoints } from "../services";
import { Section } from "./Section";
import { useCardManager } from "./useCardManager";

export function FreePlugins({ notify }) {
  let bootstrap = useSWR(Endpoints.BOOTSTRAP, (path) => apiFetch({ path }));
  let [cards] = useCardManager(
    FreePluginsDefinition({ notify, user: bootstrap.data ?? {} })
  );
  return (
    <Section.Container>
      <Section.Header
        title={__("Additional Features", "wp-module-ecommerce")}
        subTitle={__(
          "Improve your site with these free add-ons included in your plan.",
          "wp-module-ecommerce"
        )}
      />
      <Section.Content>
        {cards.length === 0 && (
          <div className="yst-flex-1 yst-flex yst-items-center yst-text-center yst-justify-center">
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
