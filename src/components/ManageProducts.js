import { __ } from "@wordpress/i18n";
import useSWR from "swr";
import { ReactComponent as AddProducts } from "../icons/add-products.svg";
import { ReactComponent as Help } from "../icons/help.svg";
import { ReactComponent as ImportProducts } from "../icons/import-products.svg";
import { Card } from "./Card";
import { DashboardContent } from "./DashboardContent";

const ManageProductsList = [
  {
    title: __("Add a product", "wp-module-ecommerce"),
    action: __("Add new", "wp-module-ecommerce"),
    actionUrl: "admin.php?page=wc-admin&task=products",
  },
  {
    title: __("Manage products", "wp-module-ecommerce"),
    action: __("View all", "wp-module-ecommerce"),
    actionUrl: "edit.php?post_type=product",
  },
  {
    title: __("Categories", "wp-module-ecommerce"),
    action: __("Manage", "wp-module-ecommerce"),
    actionUrl: "edit-tags.php?taxonomy=product_cat&post_type=product",
  },
  {
    title: __("Tags", "wp-module-ecommerce"),
    action: __("Manage", "wp-module-ecommerce"),
    actionUrl: "edit-tags.php?taxonomy=product_tag&post_type=product",
  },
];

export function ManageProducts(props) {
  let { data: productsResponse, error } = useSWR("/wc/v3/products");

  if (!productsResponse) {
    return (
      <div style={{ height: "100%", display: "grid", placeContent: "center" }}>
        {error ? (
          <h2>
            {__(
              "There was an error while loading this information",
              "wp-module-ecommerce"
            )}{" "}
          </h2>
        ) : (
          <div className="bwa-loader" />
        )}
      </div>
    );
  }

  return (
    <>
      {productsResponse.length === 0 ? (
        <DashboardContent
          title={__("Add Products", "wp-module-ecommerce")}
          subtitle={__(
            "Come here to manage your products or add new ones to your store.",
            "wp-module-ecommerce"
          )}
        >
          <div className="nfd-ecommerce-standard-actions-container">
            <Card
              variant="standard"
              title={__("Add Products", "wp-module-ecommerce")}
              action="Add"
              href="post-new.php?post_type=product"
            >
              <AddProducts />
            </Card>
            <Card
              variant="standard"
              title={__("Import Products", "wp-module-ecommerce")}
              action="Import"
              href="edit.php?post_type=product&page=product_importer"
            >
              <ImportProducts />
            </Card>
          </div>
        </DashboardContent>
      ) : (
        <DashboardContent
          title={__("Your Products", "wp-module-ecommerce")}
          subtitle={__(
            "Come here to manage your products or add new ones to your store.",
            "wp-module-ecommerce"
          )}
        >
          <div className="nfd-ecommerce-minimal-tasks-container">
            {ManageProductsList.map((card) => (
              <Card
                key={card.actionUrl}
                variant="minimal"
                title={card.title}
                action={card.action}
                href={card.actionUrl}
              />
            ))}
          </div>
        </DashboardContent>
      )}
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
