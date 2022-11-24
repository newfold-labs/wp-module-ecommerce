import { __ } from "@wordpress/i18n";
import ManageProductsConfig from "../configs/ManageProducts.config";
import { ReactComponent as Help } from "../icons/help.svg";
import { Card } from "./Card";
import { DashboardContent } from "./DashboardContent";
import { useCardManager } from "./useCardManager";

export function ManageProducts(props) {
  let cards = useCardManager(ManageProductsConfig(props.plugins));
  const isLoading = !(cards ?? []).every(
    (cardConfig) => cardConfig.isLoading == false
  );
  let WCUnavialable = props?.plugins?.status?.woocommerce !== "Active";

  if (isLoading && !WCUnavialable)
    return (
      <div style={{ height: "100%", display: "grid", placeContent: "center" }}>
        <div className="bwa-loader" />
      </div>
    );

  return (
    <>
      <DashboardContent
        title={__("Products and Services", "wp-module-ecommerce")}
        subtitle={__(
          "Come here to manage your products or add new ones to your store.",
          "wp-module-ecommerce"
        )}
      >
        <div className="nfd-ecommerce-standard-actions-container">
          {cards.map((cardConfig) => {
            let { Card, title, ...props } = cardConfig;
            return <Card key={title} {...props} />;
          })}
        </div>
      </DashboardContent>
      <div style={{ height: "40px" }} />
      <DashboardContent
        title={__("First time adding a product?", "wp-module-ecommerce")}
        subtitle={__(
          "Read this helpful knowledge base article to understand how to add different products to your store.",
          "wp-module-ecommerce"
        )}
      >
        <div className="nfd-ecommerce-minimal-tasks-container">
          <Card
            variant="minimal"
            title={__("How to add products", "wp-module-ecommerce")}
            action={__("Learn More", "wp-module-ecommerce")}
            disable = {WCUnavialable}
            onClick={() =>
              window.open(
                "https://woocommerce.com/document/managing-products/",
                "_blank"
              )
            }
          >
            <Help />
          </Card>
        </div>
      </DashboardContent>
    </>
  );
}
