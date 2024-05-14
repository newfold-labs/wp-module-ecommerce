import { ReactComponent as TransformStore } from "../icons/transform-store.svg"
import { ReactComponent as YithPluginsIcon } from "../icons/yithplugins.svg";
import { ReactComponent as WonderCartIcon } from "../icons/wondercart.svg";
import { ReactComponent as CheckMarkIcon } from "../icons/check.svg";

export function TransformtoEcommerce() {
    return(
           
        
        <div class="nfd-app-section-container nfd-bg-white nfd-w-full nfd-rounded-lg" id="nonecommerce-features-wrapper">
            <div class="nfd-app-section-content nfd-border nfd-rounded-lg nfd-px-8 nfd-pt-0 nfd-pb-8 nfd-m-8 nfd--mt-2 nfd-items-start" style={{borderColor: "#E2E8F0"}}>                
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
                                    
                <h2 className="nfd-text-lg nfd-font-medium nfd-mt-8" style={{color: "#000000"}}>
                    Exclusive YITH plugins and tools to help you sell online
                </h2>
                <p style={{fontSize: "0.813rem", color: "#4A5567" }} className="nfd-leading-5 nfd-w-4/5">
                    Our eCommerce bundle includes a comprehensive suite of advanced tools designed to boost the performance of your WooCommerce store.
                    This bundle includes these exclusive YITH plugins:
                </p>
                <div className="nfd-flex nfd-flex-wrap nfd-gap-6">
                    <div className="nfd-flex-1">
                        <div className="nfd-flex nfd-flex-wrap nfd-gap-x-10 nfd-mt-3 nfd-pt-0.5 nfd-w-3/5">
                            <ul className="nfd-flex-1" style={{color: "#000"}}>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" /><span>Gift Cards</span>
                                </li>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" /><span>Wishlists</span>
                                </li>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" /><span>Custom 'My Account' Page</span>
                                </li>
                            </ul>
                            <ul className="nfd-flex-1" style={{color: "#000"}}>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" /><span>Bookings & Appointments</span>
                                </li>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" /><span>AJAX Product Filters</span>
                                </li>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" /><span>AJAX Product Search</span>
                                </li>
                            </ul>
                        </div>                        
                    </div>
                    <div className="nfd-flex-none nfd-w-28 nfd-h-24 nfd-self-end">    
                        <YithPluginsIcon />                    
                    </div> 
                </div>

                <div className="nfd-h-px nfd-mx-10 nfd-mt-5 nfd-mb--1 nfd-pt-0.5" style={{backgroundColor: "#E2E8F0"}}>&nbsp;</div>                                    
                
                <h2 className="nfd-text-lg nfd-font-medium nfd-mt-8" style={{color: "#000000"}}>
                    Add upsells, cross-sells, and other promotions with WonderCart
                </h2>
                <p style={{fontSize: "0.813rem", color: "#4A5567" }} className="nfd-leading-5 nfd-w-4/5">
                    Create and run effective promotional campaigns like BOGOs, free shipping offers, category discounts, 
                    and more to increase revenue and strengthen customer engagement. 
                </p>
                <div className="nfd-flex nfd-flex-wrap nfd-gap-6">
                    <div className="nfd-flex-1">    
                        <div className="nfd-flex nfd-flex-wrap nfd-gap-x-10 nfd-mt-3 nfd-pt-0.5 nfd-w-3/5">
                            <ul className="nfd-flex-1" style={{color: "#000"}}>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" /><span>Buy One Get One</span>
                                </li>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" /><span>Cart Promotions</span>
                                </li>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" /><span>Related Items Discounts</span>
                                </li>
                            </ul>
                            <ul className="nfd-flex-1" style={{color: "#000"}}>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" /><span>Free Shipping Offers</span>
                                </li>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" /><span>Category Discounts</span>
                                </li>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" /><span>and more!</span>
                                </li>
                            </ul>
                        </div>                        
                    </div>
                    <div className="nfd-flex-none nfd-w-28 nfd-h-24 nfd-self-end">    
                        <WonderCartIcon />                    
                    </div> 
                </div>
            </div>
        </div>
    )
}
