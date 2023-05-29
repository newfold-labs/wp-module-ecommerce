import { LightBulbIcon } from "@heroicons/react/24/outline";
import { __ } from "@wordpress/i18n";
import { Button, Spinner, Title } from "@yoast/ui-library";
import { ProductsAndServicesDefinition } from "../configs/ProductsAndServices.config";
import { Section } from "./Section";
import { useCardManager } from "./useCardManager";

export function Products({ woo, wpModules }) {
  let [cards] = useCardManager(
    ProductsAndServicesDefinition({ notify: wpModules.notify })
  );
  if (!woo.isActive) {
    return (
      <div style={{ height: "100%", display: "grid", placeContent: "center" }}>
        <div className="nfd-ecommerce-loader" />
      </div>
    );
  }

  return (
    <Section.Container>
      <Section.Header
        title={__("Products & Services", "wp-module-ecommerce")}
        subTitle={__(
          "Come here to manage products and services or add new ones to your store.",
          "wp-module-ecommerce"
        )}
      />
      <Section.Content>
        <div className="yst-px-4 yst-py-2 yst-flex yst-rounded-lg yst-items-center yst-bg-slate-100">
          <div className="yst-flex-1">
            <Title size={4} className="yst-leading-normal">
              {__("Want help adding products?", "wp-module-ecommerce")}
            </Title>
            <span className="yst-whitespace-pre-wrap yst-leading-tight">
              {__(
                "Read this helpful knowledge base article to understand how to\nadd different products to your store",
                "wp-module-ecommerce"
              )}
            </span>
          </div>
          <div className="yst-flex-none yst-flex">
            <Button
              className="yst-flex yst-gap-2 yst-items-center"
              as="a"
              href="https://woocommerce.com/document/managing-products/"
              target="_blank"
            >
              <LightBulbIcon className="hst-w-4" />
              {__(" How to add products", "wp-module-ecommerce")}
            </Button>
          </div>
        </div>
        {cards?.length === 0 && (
          <div className="yst-flex yst-items-center yst-text-center yst-justify-center yst-h-60">
            <Spinner size={8} className="yst-text-primary" />
          </div>
        )}
        <div className="yst-grid yst-grid-cols-3 yst-gap-6 yst-pt-8">
          {cards.map((cardConfig) => {
            let { Card, name, ...props } = cardConfig;
            return <Card key={name} {...props} />;
          })}
        </div>
      </Section.Content>
    </Section.Container>
  );
}
