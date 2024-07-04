import { __ } from "@wordpress/i18n";
import { Button } from "@newfold/ui-component-library";
import { Section } from "./Section";
import { ReactComponent as Ecomdash } from "../icons/sales-channel/ecomdash.svg";
import { ReactComponent as Inventory } from "../icons/sales-channel/inventory-illustration.svg";
import { ReactComponent as InventoryBrands } from "../icons/sales-channel/inventory-brands.svg";
import { ReactComponent as OrdersTable } from "../icons/sales-channel/orders-table.svg";
import { ReactComponent as Amazon } from "../icons/sales-channel/amazon-icon.svg";
import { ReactComponent as Barcodes } from "../icons/sales-channel/barcodes.svg";
import { ReactComponent as CustomTemplates } from "../icons/sales-channel/custom-templates.svg";
import { ReactComponent as ShippingLabels } from "../icons/sales-channel/shipping-labels.svg";
import { ReactComponent as WarehouseFeeds } from "../icons/sales-channel/warehouse-feeds.svg";
import { ReactComponent as ListingPresets } from "../icons/sales-channel/listing-presets.svg";
import { ReactComponent as PurchaseOrders } from "../icons/sales-channel/purchase-orders.svg";
import { ReactComponent as Accounting } from "../icons/sales-channel/accounting.svg";

export function SalesChannel(){
    return(
        <>
            <Section.Container>
                <Section.Header title={__("Sales Channels", "wp-module-ecommerce")} subTitle={__("Sell your products everywhere, confidently, with Ecomdash.", "wp-module-ecommerce")} />
                <Section.Content>
                    <h2 className="nfd-text-[#0F172A] nfd-text-lg nfd-font-medium nfd-pb-1.5">
                        {__("Sell your products everywhere, confidently, with Ecomdash.", "wp-module-ecommerce")}
                    </h2>
                    <div className="nfd-flex  nfd-flex-row nfd-flex-wrap nfd-gap-6">                        
                       <div className="nfd-flex-1">
                            <p className="nfd-text-[#4A5567]">
                                {__("With ecomdash, you can manage different sales channels all in one place.", "wp-module-ecommerce")}
                            </p>
                            <p className="nfd-text-[#4A5567]">
                                {__("Simply connect your business accounts from Amazon, Etsy or Walmart to", "wp-module-ecommerce")}
                            </p>
                            <p className="nfd-text-[#4A5567]">
                                {__("your ecomdash platform and easily manage products, customer orders and", "wp-module-ecommerce")}
                            </p>
                            <p className="nfd-text-[#4A5567] nfd-pb-7">
                                {__("more saving you valuable time.", "wp-module-ecommerce")}​
                            </p>
                            <Button
                            id="install-ecomdash"
                            variant="primary"
                            >
                                {__("Get Started Now", "wp-module-ecommerce")}
                            </Button>
                       </div>
                       <Ecomdash className="nfd-flex-none nfd-self-start" />
                    </div>

                    <div className="">
                        <h2>{__("Manage inventory across multiple platforms", "wp-module-ecommerce")}</h2>
                        <Inventory />
                        <ul>
                            <li>{__("Enjoy near real-time inventory updates for an unlimited number of channels with our inventory management software.", "wp-module-ecommerce")}</li>
                            <li>{__("Manage product levels across multiple warehouses without the fear of overselling.", "wp-module-ecommerce")}</li>
                            <li>{__("Accurately sync kits, multipacks, and components without any headaches.", "wp-module-ecommerce")}</li>
                        </ul>
                        <InventoryBrands />    
                    </div>

                    <div className="">
                        <h2>{__("Order Management and Reporting", "wp-module-ecommerce")}</h2>
                        <p>{__("With Ecomdash you can sit back and relax, knowing that all aspects of order fulfillment are under control. Easily track your top selling items, cost of goods sold, stale inventory and more with Ecomdash’s extensive reporting tools.", "wp-module-ecommerce")}</p>
                        <OrdersTable />
                    </div>

                    <div className="">
                        <h2>{__("Powerful Add-ons", "wp-module-ecommerce")}</h2>
                        <p>{__("Ecomdash contains a variety of powerful add-ons that will help you handle everything from creating barcodes and inventory templates, to managing warehouse feeds, Fulfillment By Amazon and even accounting.", "wp-module-ecommerce")}</p>
                        <div className="">
                            <Amazon />
                            <h2>{__("Fullfillment By Amazon (FBA)", "wp-module-ecommerce")}</h2>
                            <p>{__("Auto-export non-Amazon orders to FBA. Import the tracking and pass it to the originating sales channel, marking it as shipped.", "wp-module-ecommerce")}</p>
                        </div>
                        <ul>
                            <li>
                                <Barcodes />
                                <span>{__("Barcodes", "wp-module-ecommerce")}</span>
                                <span>{__("Print barcodes for your products that can be used for labeling and scanning your products", "wp-module-ecommerce")}</span>
                            </li>
                            <li>
                                <CustomTemplates />
                                <span>{__("Custom Inventory Templates", "wp-module-ecommerce")}</span>
                                <span>{__("Creating a custom file template allows you to upload and/or export files with product data for thousands of products at once.", "wp-module-ecommerce")}</span>
                            </li>
                            <li>
                                <ShippingLabels />
                                <span>{__("Shipping Labels", "wp-module-ecommerce")}</span>
                                <span>{__("Print shipping labels with a preferred carrier right from your ecomdash account and save on postage.", "wp-module-ecommerce")}</span>
                            </li>

                            <li>
                                <WarehouseFeeds />
                                <span>{__("Warehouse Feeds", "wp-module-ecommerce")}</span>
                                <span>{__("Setup feeds to export your sales orders via email or FTP sites to third parties such as Dropshippers, Suppliers, or 3PL systems.", "wp-module-ecommerce")}</span>
                            </li>
                            <li>
                                <ListingPresets />
                                <span>{__("Listing Presets", "wp-module-ecommerce")}</span>
                                <span>{__("Create listing presets to cut down most of the manual data entry needed when creating new listings. ", "wp-module-ecommerce")}</span>
                            </li>
                            <li>
                                <PurchaseOrders />
                                <span>{__("Purchase Orders", "wp-module-ecommerce")}</span>
                                <span>{__("Quickly create new orders and have inventory quantities adjusted and synced out to listings as units are received.", "wp-module-ecommerce")}</span>
                            </li>
                            <li>
                                <Accounting />
                                <span>{__("Accounting", "wp-module-ecommerce")}</span>
                                <span>{__("Seamlessly communicate your sales and purchase order information directly to your accounting software.", "wp-module-ecommerce")}</span>
                            </li>
                        </ul>
                    </div>

                </Section.Content>
           </Section.Container> 
        </>
    )
}