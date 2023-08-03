import { LightBulbIcon } from "@heroicons/react/24/outline";
import { __ } from "@wordpress/i18n";
import { Button, Spinner, Title } from "@yoast/ui-library";
import { ProductsAndServicesDefinition } from "../configs/ProductsAndServices.config";
import { Section } from "./Section";
import { useCardManager } from "./useCardManager";
import classNames from "classnames";

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
        <div
          className={classNames(
            "yst-px-4 yst-py-2 yst-rounded-lg yst-bg-slate-100",
            "yst-flex yst-flex-col",
            "xl:yst-flex-row xl:yst-justify-between xl:yst-items-center"
          )}
        >
          <div className="yst-flex-1">
            <Title size={4} className="yst-leading-normal">
              {__("Want help adding products?", "wp-module-ecommerce")}
            </Title>
            <span className="lg:yst-whitespace-pre-wrap yst-leading-tight">
              {__(
                "Read this helpful knowledge base article to understand how to\nadd different products to your store",
                "wp-module-ecommerce"
              )}
            </span>
          </div>
          <div
            className={classNames(
              "yst-flex-none yst-flex",
              "max-[1024px]:yst-my-2",
              "min-[1025px]:yst-m-0"
            )}
          >
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
        <div
          className={classNames(
            "yst-grid yst-gap-6 yst-pt-8",
            "sm:yst-grid-cols-1",
            "md:yst-grid-cols-2",
            "lg:yst-grid-cols-3"
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
