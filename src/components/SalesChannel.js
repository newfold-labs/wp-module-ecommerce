import { Button } from "@newfold/ui-component-library";
import { __ } from "@wordpress/i18n";
import { ReactComponent as Accounting } from "../icons/sales-channel/accounting.svg";
import { ReactComponent as Amazon } from "../icons/sales-channel/amazon-icon.svg";
import { ReactComponent as Barcodes } from "../icons/sales-channel/barcodes.svg";
import { ReactComponent as CustomTemplates } from "../icons/sales-channel/custom-templates.svg";
import { ReactComponent as EcomdashBulletPoint } from "../icons/sales-channel/ecomdash-bullet-point.svg";
import { ReactComponent as Ecomdash } from "../icons/sales-channel/ecomdash.svg";
import { ReactComponent as InventoryBrands } from "../icons/sales-channel/inventory-brands.svg";
import { ReactComponent as Inventory } from "../icons/sales-channel/inventory-illustration.svg";
import { ReactComponent as ListingPresets } from "../icons/sales-channel/listing-presets.svg";
import { ReactComponent as OrdersTable } from "../icons/sales-channel/orders-table.svg";
import { ReactComponent as PurchaseOrders } from "../icons/sales-channel/purchase-orders.svg";
import { ReactComponent as ShippingLabels } from "../icons/sales-channel/shipping-labels.svg";
import { ReactComponent as WarehouseFeeds } from "../icons/sales-channel/warehouse-feeds.svg";
import { Section } from "./Section";
import { useEffect, useState } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";


export function SalesChannel(){

    const [ecomdashStatus, setEcomdashStatus] = useState("");

    const apiUrl = NewfoldRuntime.createApiUrl("/newfold-ecommerce/v1/plugins/status", {
        plugins: "nfd_slug_ecomdash_wordpress_plugin",
    })

    useEffect(() => {
        const fecthApi = async () => {
            const data = await apiFetch({
            url: apiUrl,
            });
            setEcomdashStatus(data?.details?.nfd_slug_ecomdash_wordpress_plugin?.status);
        }
        fecthApi()
    }, []);

    console.log("ecomDashStatus", ecomdashStatus)

    let showInstallButton = ecomdashStatus === "need_to_install" ? true : false;

    return(
        <>
            <Section.Container>
                <Section.Header title={__("Sales Channels", "wp-module-ecommerce")} subTitle={__("Sell your products everywhere, confidently, with Ecomdash.", "wp-module-ecommerce")} />
                <Section.Content>
                    
                    <div className="nfd-flex  nfd-flex-row nfd-flex-wrap nfd-gap-6">                                             
                       <div className="nfd-flex-1">
                            <h2 className="nfd-text-[#0F172A] nfd-text-lg nfd-font-medium nfd-pb-1.5">
                                    {__("Sell your products everywhere, confidently, with Ecomdash.", "wp-module-ecommerce")}
                            </h2>  
                            <p className="nfd-text-[#4A5567] nfd-pb-7 nfd-leading-5  nfd-font-medium">
                                {__("With ecomdash, you can manage different sales channels all in one place.", "wp-module-ecommerce")}
                                <br />
                                {__("Simply connect your business accounts from Amazon, Etsy or Walmart to", "wp-module-ecommerce")}
                                <br />
                                {__("your ecomdash platform and easily manage products, customer orders and", "wp-module-ecommerce")}
                                <br />
                                {__("more saving you valuable time.", "wp-module-ecommerce")}​
                            </p>
                            <Button
                                id={showInstallButton ? "install-ecomdash" : "manage-ecomdash"}
                                variant="primary"
                                >
                                    {showInstallButton ? __("Get Started Now", "wp-module-ecommerce") : __("Go to Ecomdash", "wp-module-ecommerce")}
                            </Button>                                                        
                       </div>
                       <Ecomdash className="nfd-flex-none nfd-self-start" />
                    </div>

                    <div className="nfd-border nfd-border-[#E2E8F0] nfd-bg-[#F9F9F9] nfd-rounded-lg nfd-p-4 nfd-mt-10">
                        <div className="nfd-flex  nfd-flex-row nfd-flex-wrap nfd-gap-6"> 
                            <div className="nfd-flex-none">                                            
                                <h2 className="nfd-text-[#111729] nfd-font-medium nfd-text-base nfd-mb-11">
                                    {__("Manage inventory across multiple platforms", "wp-module-ecommerce")}
                                </h2>
                                <Inventory className="nfd-mt-4" />
                            </div>
                            <ul className="nfd-flex-1 nfd-mt-16 nfd-ml-3.5">
                                <li className="nfd-flex nfd-flex-row nfd-gap-6 nfd-mb-6">
                                    <EcomdashBulletPoint className="nfd-flex-none" />
                                    <span className="nfd-flex-1 nfd-text-[#4A5567] nfd-leading-5 nfd-font-medium">
                                        {__("Enjoy near real-time inventory updates for an unlimited number of", "wp-module-ecommerce")}
                                        <br />
                                        {__("number of channels with our inventory management software.", "wp-module-ecommerce")}
                                    </span>
                                </li>
                                <li className="nfd-flex nfd-flex-row nfd-gap-6 nfd-mb-6">
                                    <EcomdashBulletPoint className="nfd-flex-none" />
                                    <span className="nfd-flex-1 nfd-text-[#4A5567] nfd-leading-5 nfd-font-medium">
                                        {__("Manage product levels across multiple warehouses without the fear of overselling.", "wp-module-ecommerce")}
                                        <br />
                                        {__("without the fear of overselling.", "wp-module-ecommerce")}
                                    </span>
                                </li>
                                <li className="nfd-flex nfd-flex-row nfd-gap-6 nfd-mb-6">
                                    <EcomdashBulletPoint className="nfd-flex-none" />
                                    <span className="nfd-flex-1 nfd-text-[#4A5567] nfd-leading-5 nfd-font-medium">
                                        {__("Accurately sync kits, multipacks, and components without any headaches.", "wp-module-ecommerce")}
                                        <br />
                                        {__("headaches.", "wp-module-ecommerce")}
                                    </span>
                                </li>
                            </ul>                            
                        </div>
                        <InventoryBrands />                        
                    </div>
                    

                    <div className="nfd-flex nfd-flex-wrap nfd-flex-col nfd-border nfd-rounded-lg nfd-border-[#E2E8F0] nfd-mt-6 nfd-p-4 nfd-pt-5">
                        <h2 className="nfd-text-[#111729] nfd-font-medium nfd-text-base ">
                            {__("Order Management and Reporting", "wp-module-ecommerce")}
                        </h2>
                        <p className="nfd-flex-1 nfd-text-[#4A5567] nfd-leading-5 nfd-font-medium nfd-mb-7 nfd-mt-3.5">
                            {__("With Ecomdash you can sit back and relax, knowing that all aspects of order fulfillment are under control. Easily track your top selling items, cost of goods sold, stale inventory and more with Ecomdash's extensive reporting tools.", "wp-module-ecommerce")}                            
                        </p>
                        {/* <p className="nfd-flex-1 nfd-text-[#4A5567] nfd-leading-5 nfd-font-medium nfd-mb-7 nfd-mt-3.5">
                            {__("With Ecomdash you can sit back and relax, knowing that all aspects of order fulfillment are under control. Easily track your top selling", "wp-module-ecommerce")}
                            <br />
                            {__("items, cost of goods sold, stale inventory and more with Ecomdash's extensive reporting tools.", "wp-module-ecommerce")}
                        </p> */}
                        <OrdersTable className="nfd-mx-auto" />                                            
                    </div>



                    <div className="nfd-border nfd-border-[#E2E8F0] nfd-rounded-lg nfd-mt-6 nfd-p-4">
                        <h2 className="nfd-text-[#111729] nfd-text-base nfd-font-medium nfd-mb-4">
                            {__("Powerful Add-ons", "wp-module-ecommerce")}
                        </h2>
                        <p className="nfd-text-[#4A5567] nfd-leading-5  nfd-font-medium">
                            {__("Ecomdash contains a variety of powerful add-ons that will help you handle everything from creating barcodes and inventory templates, to managing warehouse feeds, Fulfillment By Amazon and even accounting.", "wp-module-ecommerce")}                            
                        </p>
                        {/* <p className="nfd-text-[#4A5567] nfd-leading-5  nfd-font-medium">
                            {__("Ecomdash contains a variety of powerful add-ons that will help you handle everything from creating barcodes and inventory templates, to", "wp-module-ecommerce")}
                            <br />
                            {__("managing warehouse feeds, Fulfillment By Amazon and even accounting.", "wp-module-ecommerce")}
                        </p> */}

                        <div className="nfd-mx-auto nfd-bg-[#F8F8F8] nfd-rounded-lg nfd-mx-auto nfd-max-w-[650px] nfd-flex nfd-flex-row nfd-p-6 nfd-mt-4 nfd-mb-8">
                            <Amazon className="nfd-flex-none nfd-mr-6" />
                            <div className="nfd-flex-1">
                                <h2 className="nfd-text-[#111729] nfd-text-base nfd-leading-6 nfd-font-medium">
                                    {__("Fullfillment By Amazon (FBA)", "wp-module-ecommerce")}
                                </h2>
                                <p className="nfd-text[#000000]">
                                    {__("Auto-export non-Amazon orders to FBA. Import the tracking and pass it to the", "wp-module-ecommerce")}
                                <br />
                                {__("originating sales channel, marking it as shipped.", "wp-module-ecommerce")}
                                </p>
                            </div>                            
                        </div>

                        <div className="nfd-flex nfd-flex-wrap nfd-flex-row nfd-min-w-[315px] nfd-max-w-[646px] nfd-mx-auto">

                            <div className="nfd-flex-1 nfd-mr-14">
                                <div>
                                    <div className="nfd-flex nfd-flex-row">
                                        <Barcodes className="nfd-mr-4" />
                                        <h3 className="nfd-text-[#111729] nfd-text-base nfd-leading-6 nfd-font-medium">
                                            {__("Barcodes", "wp-module-ecommerce")}
                                        </h3>
                                    </div>
                                    <div className="nfd-text-[#000000] nfd-leading-5 nfd-font-medium nfd-mt-5 nfd-mb-11">
                                        {__("Print barcodes for your products that can be", "wp-module-ecommerce")}
                                        <br />
                                        {__("used for labedivng and scanning your", "wp-module-ecommerce")}
                                        <br />
                                        {__("products", "wp-module-ecommerce")}
                                    </div>
                                </div>
                                <div>
                                    <div className="nfd-flex nfd-flex-row">
                                        <ShippingLabels className="nfd-mr-4" />
                                        <h3 className="nfd-text-[#111729] nfd-text-base nfd-leading-6 nfd-font-medium">
                                            {__("Shipping Labels", "wp-module-ecommerce")}
                                        </h3>
                                    </div>
                                    <div className="nfd-text-[#000000] nfd-leading-5 nfd-font-medium nfd-mt-5 nfd-mb-11">
                                        {__("Print shipping labels with a preferred carrier right from your ecomdash account and save on postage.", "wp-module-ecommerce")}
                                        <br />
                                        {__("right from your ecomdash account and save", "wp-module-ecommerce")}
                                        <br />
                                        {__("on postage.", "wp-module-ecommerce")}
                                    </div>
                                </div>
                                <div>
                                    <div className="nfd-flex nfd-flex-row">
                                        <ListingPresets className="nfd-mr-4" />                                    
                                        <h3 className="nfd-text-[#111729] nfd-text-base nfd-leading-6 nfd-font-medium">
                                            {__("Listing Presets", "wp-module-ecommerce")}
                                        </h3>
                                    </div>
                                    <div className="nfd-text-[#000000] nfd-leading-5 nfd-font-medium nfd-mt-5 nfd-mb-11">
                                        {__("Create listing presets to cut down most of the manual data entry needed when creating new listings. ", "wp-module-ecommerce")}
                                        <br />
                                        {__("the manual data entry needed when creating", "wp-module-ecommerce")}
                                        <br />
                                        {__("new listings.", "wp-module-ecommerce")}
                                    </div>
                                </div>
                                <div>
                                    <div className="nfd-flex nfd-flex-row">
                                        <Accounting className="nfd-mr-4" />
                                        <h3 className="nfd-text-[#111729] nfd-text-base nfd-leading-6 nfd-font-medium">
                                            {__("Accounting", "wp-module-ecommerce")}
                                        </h3>
                                    </div>
                                    <div className="nfd-text-[#000000] nfd-leading-5 nfd-font-medium nfd-mt-5 nfd-mb-11">
                                        {__("Seamlessly communicate your sales and", "wp-module-ecommerce")}
                                        <br />
                                        {__("purchase order information directly to your", "wp-module-ecommerce")}
                                        <br />
                                        {__("accounting software.", "wp-module-ecommerce")}
                                    </div>
                                </div>
                            </div>

                            <div className="nfd-flex-1">                            
                                <div>
                                    <div className="nfd-flex nfd-flex-row">
                                        <CustomTemplates className="nfd-mr-4" />
                                        <h3 className="nfd-text-[#111729] nfd-text-base nfd-leading-6 nfd-font-medium">
                                            {__("Custom Inventory Templates", "wp-module-ecommerce")}
                                        </h3>
                                    </div>
                                    <div className="nfd-text-[#000000] nfd-leading-5 nfd-font-medium nfd-mt-5 nfd-mb-11">
                                        {__("Creating a custom file template allows you to", "wp-module-ecommerce")}
                                        <br />
                                        {__("upload and/or export files with product data", "wp-module-ecommerce")}
                                        <br />
                                        {__("for thousands of products at once.", "wp-module-ecommerce")}
                                    </div>
                                </div>                            
                                <div>
                                    <div className="nfd-flex nfd-flex-row">
                                        <WarehouseFeeds className="nfd-mr-4" />
                                        <h3 className="nfd-text-[#111729] nfd-text-base nfd-leading-6 nfd-font-medium">
                                            {__("Warehouse Feeds", "wp-module-ecommerce")}
                                        </h3>
                                    </div>
                                    <div className="nfd-text-[#000000] nfd-leading-5 nfd-font-medium nfd-mt-5 nfd-mb-11">
                                        {__("Setup feeds to export your sales orders via", "wp-module-ecommerce")}
                                        <br />
                                        {__("email or FTP sites to third parties such as", "wp-module-ecommerce")}
                                        <br />
                                        {__("Dropshippers, Suppliers, or 3PL systems.", "wp-module-ecommerce")}
                                    </div>
                                </div>                            
                                <div>
                                    <div className="nfd-flex nfd-flex-row">
                                        <PurchaseOrders className="nfd-mr-4" />
                                        <h3 className="nfd-text-[#111729] nfd-text-base nfd-leading-6 nfd-font-medium">
                                            {__("Purchase Orders", "wp-module-ecommerce")}
                                        </h3>
                                    </div>
                                    <div className="nfd-text-[#000000] nfd-leading-5 nfd-font-medium nfd-mt-5 nfd-mb-11">
                                        {__("Quickly create new orders and have", "wp-module-ecommerce")}
                                        <br />
                                        {__("inventory quantities adjusted and synced out", "wp-module-ecommerce")}
                                        <br />
                                        {__("to listings as units are received.", "wp-module-ecommerce")}
                                    </div>
                                </div>                            
                            </div>

                        </div>

                        
                    </div>

                </Section.Content>
           </Section.Container> 
        </>
    )
}