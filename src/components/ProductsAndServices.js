import { Icon } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Button, Title } from "@yoast/ui-library";
import ProductsConfig from "../configs/ProductsAndServices.config";
import { ReactComponent as Ideas } from "../icons/ideas.svg";
import { useCardManager } from "./useCardManager";
import { Section } from "./Section";

export function Products(props) {
  let [cards] = useCardManager(ProductsConfig(props));
  console.log(cards);
  let isWCUnavailable = props.plugins.details?.woocommerce.status !== "active";
  if (isWCUnavailable) {
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
              onClick={() =>
                window.open(
                  "https://woocommerce.com/document/managing-products/",
                  "_blank"
                )
              }
            >
              <Icon icon={Ideas} />
              {__(" How to add products", "wp-module-ecommerce")}
            </Button>
          </div>
        </div>
        <div className="yst-grid yst-grid-cols-3 yst-gap-6 yst-pt-8">
          {cards.map((cardConfig) => {
            let { Card, name, ...props } = cardConfig;
            return <Card key={name} {...props} />;
          })}
        </div>
      </Section.Content>
    </Section.Container>
  );
};

