import { ReactComponent as AddProducts } from "../icons/add-products.svg";
import { ReactComponent as ImportProducts } from "../icons/import-products.svg";
import { ReactComponent as Help } from "../icons/help.svg";
import { Card } from "./Card";
import { DashboardContent } from "./DashboardContent";

export function ManageProducts(props) {
  return (
    <>
      <DashboardContent
        title="Add Products"
        subtitle="Come here to manage your products or add new ones to your store."
      >
        <div className="nfd-ecommerce-standard-actions-container">
          <Card
            variant="standard"
            title="Add Products"
            action="Add Info"
            href="/wp-admin/post-new.php?post_type=product"
          >
            <AddProducts />
          </Card>
          <Card
            variant="standard"
            title="Import Products"
            action="Add Info"
            href="/wp-admin/edit.php?post_type=product&page=product_importer"
          >
            <ImportProducts />
          </Card>
        </div>
      </DashboardContent>
      <div style={{ height: "40px" }} />
      <DashboardContent
        title="First time adding a product?"
        subtitle="Read this helpful knowledge base article to understand how to add different products to your store."
      >
        <div className="nfd-ecommerce-minimal-tasks-container">
          <Card
            variant="minimal"
            title="How to add products"
            action="Learn More"
            href="/wp-admin/edit.php?post_type=product&page=product_importer"
          >
            <Help />
          </Card>
        </div>
      </DashboardContent>
    </>
  );
}
