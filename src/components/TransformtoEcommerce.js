import { ReactComponent as TransformStore } from "../icons/transform-store.svg"
import { ReactComponent as YithPluginsIcon } from "../icons/yithplugins.svg";
import { ReactComponent as WonderCartIcon } from "../icons/wondercart.svg";


export function TransformtoEcommerce() {
    return(
           
        
        <div class="nfd-app-section-container nfd-bg-white nfd-w-full nfd-rounded-lg" id="nonecommerce-features-wrapper">
            <div class="nfd-app-section-content nfd-border nfd-rounded-lg nfd-p-4 nfd-pt-0 nfd-m-8 nfd--mt-2 nfd-items-start" style={{borderColor: "#E2E8F0"}}>
                <div className="nfd-flex nfd-flex-wrap nfd-gap-x-10">
                    <div className="nfd-flex-none nfd-mt-8 nfd-w-40">
                        <TransformStore />
                    </div>                    
                    <div class="nfd-flex-1 nfd-mt-5 nfd-pt-0.5">
                        <h1 className="nfd-text-2xl nfd-leading-9 nfd-font-medium" style={{color: "#111729"}}>Transform your store!</h1>
                        <p style={{fontSize: "0.813rem", color: "#4A5567" }} className="nfd-leading-5">
                            Give your online store a boost with our all-in-one eCommerce bundle filled with exclusive plugins and tools 
                            designed to help you sell your products and services like a pro.
                        </p>
                    </div>
                </div>

                <div className="nfd-flex nfd-flex-wrap nfd-gap-6">
                    <div className="nfd-flex-1">
                        <h2 className="nfd-text-lg nfd-font-medium nfd-mt-8" style={{color: "#000000"}}>Exclusive YITH plugins and tools to help you sell online</h2>
                        <p style={{fontSize: "0.813rem", color: "#4A5567" }} className="nfd-leading-5">
                            Our eCommerce bundle includes a comprehensive suite of advanced tools designed to boost the performance of your WooCommerce store.
                            This bundle includes these exclusive YITH plugins:
                        </p>
                        <div className="nfd-flex nfd-flex-wrap nfd-gap-x-10 nfd-mt-3 nfd-pt-0.5 nfd-w-1/2">
                            <ul className="nfd-flex-1">
                                <li>Gift Cards</li>
                                <li>Wishlists</li>
                                <li>Custom 'My Account' Page</li>
                            </ul>
                            <ul className="nfd-flex-1">
                                <li>Bookings & Appointments</li>
                                <li>AJAX Product Filters</li>
                                <li>AJAX Product Search</li>
                            </ul>
                        </div>
                        
                    </div>
                    <div className="nfd-flex-none nfd-mt-8 nfd-w-28 nfd-h-24 nfd-self-end">    
                        <YithPluginsIcon />                    
                    </div> 
                </div>

                <div className="nfd-h-px nfd-mx-10 nfd-mt-5 nfd-mb--1 nfd-pt-0.5" style={{backgroundColor: "#E2E8F0"}}>&nbsp;</div>

                <div className="nfd-flex nfd-flex-wrap nfd-gap-6" >
                    <div className="nfd-flex-1">
                        <h2 className="nfd-text-lg nfd-font-medium nfd-mt-8" style={{color: "#000000"}}>Add upsells, cross-sells, and other promotions with WonderCart</h2>
                        <p style={{fontSize: "0.813rem", color: "#4A5567" }} className="nfd-leading-5">
                            Create and run effective promotional campaigns like BOGOs, free shipping offers, category discounts, and more to increase revenue and strengthen customer engagement. 
                        </p>
                        <div className="nfd-flex nfd-flex-wrap nfd-gap-x-10 nfd-mt-3 nfd-pt-0.5 nfd-w-1/2">
                            <ul className="nfd-flex-1">
                                <li>Buy One Get One</li>
                                <li>Cart Promotions</li>
                                <li>Related Items Discounts</li>
                            </ul>
                            <ul className="nfd-flex-1">
                                <li>Free Shipping Offers</li>
                                <li>Category Discounts</li>
                                <li>and more!</li>
                            </ul>
                        </div>
                        
                    </div>
                    <div className="nfd-flex-none nfd-mt-8 nfd-w-28 nfd-h-24 nfd-self-end">    
                        <WonderCartIcon />                    
                    </div> 
                </div>
            </div>
        </div>
    )
}
