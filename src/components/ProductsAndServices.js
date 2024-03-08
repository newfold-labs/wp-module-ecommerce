import { LightBulbIcon } from "@heroicons/react/24/outline";
import { __ } from "@wordpress/i18n";
import { Button, Spinner, Title } from "@newfold/ui-component-library";
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
            "nfd-px-4 nfd-py-2 nfd-rounded-lg nfd-bg-slate-100",
            "nfd-flex nfd-flex-col",
            "xl:nfd-flex-row xl:nfd-justify-between xl:nfd-items-center"
          )}
        >
          <div className="nfd-flex-1">
            <Title size="4" className="nfd-leading-normal">
              {__("Want help adding products?", "wp-module-ecommerce")}
            </Title>
            <span className="lg:nfd-whitespace-pre-wrap nfd-leading-tight">
              {__(
                "Read this helpful knowledge base article to understand how to\nadd different products to your store",
                "wp-module-ecommerce"
              )}
            </span>
          </div>
          <div
            className={classNames(
              "nfd-flex-none nfd-flex",
              "max-[1024px]:nfd-my-2",
              "min-[1025px]:nfd-m-0"
            )}
          >
            <Button
              className="nfd-flex nfd-gap-2 nfd-items-center"
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
          <div className="nfd-flex nfd-items-center nfd-text-center nfd-justify-center nfd-h-60">
            <Spinner size="8" className="nfd-text-primary" />
          </div>
        )}
        <div
          className={classNames(
            "nfd-grid nfd-gap-6 nfd-pt-8",
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
