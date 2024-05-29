import { Button } from "@newfold/ui-component-library";
import { __ } from "@wordpress/i18n";
import { ReactComponent as CheckMarkIcon } from "../icons/check.svg";
import { ReactComponent as LockIcon } from "../icons/lockicon.svg";
import { ReactComponent as TransformStore } from "../icons/transform-store.svg";
import { ReactComponent as WonderCartIcon } from "../icons/wondercart.svg";
import { ReactComponent as YithPluginsIcon } from "../icons/yithplugins.svg";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";



export function TransformtoEcommerce() {    
    return (
        <div className={"nfd-app-section-container nfd-bg-white nfd-w-full nfd-rounded-lg " + (!(NewfoldRuntime.isWoo) ? 'nfd--mt-12' : '')} id="nonecommerce-features-wrapper">        
            <div className="nfd-app-section-content nfd-border nfd-rounded-lg nfd-px-8 nfd-pt-0 nfd-pb-8 nfd--mt-2 nfd-items-start nfd-border-[#E2E8F0]">
                <div className="nfd-flex md:nfd-flex-row nfd-flex-col nfd-gap-x-10">
                    <div className="nfd-flex-none nfd-mt-8 nfd-w-40">
                        <TransformStore />
                    </div>
                    <div>

                        <div class="nfd-flex nfd-flex-col nfd-mt-5 nfd-pt-0.5">
                        <h1 className="nfd-text-2xl nfd-leading-9 nfd-font-medium nfd-text-[#111729]">
                            {__("Transform your store!", "wp-module-ecommerce")}
                        </h1>
                            <p className="nfd-leading-5 nfd-text-[#4A5567]">
                            {__("Give your online store a boost with our all-in-one eCommerce bundle filled with exclusive plugins and tools designed to help you sell your products and services like a pro.", "wp-module-ecommerce")}
                        </p>
                    </div>
                        <div className="nfd-flex nfd-mt-8 nfd-self-end nfd-justify-end">
                        <Button
                            as="a"
                            className="nfd-button nfd-button--upsell nfd-w-40"
                            variant="upsell"
                            data-ctb-id={"f95ccf1e-3028-4ea7-b2c2-847969348e8b"}   
                            data-action="load-nfd-ctb"
                            target="_blank"
                            rel="noopener"
                            id="buy-ecommerce-addon-btn"
                        >
                            <LockIcon className="nfd-w-5 nfd-h-5 nfd--ml-1 nfd-shrink-0" />
                            {__("Buy Now", "wp-module-ecommerce")}
                        </Button>
                        </div>
                    </div>
                </div>

                <h2 className="nfd-text-lg nfd-font-medium nfd-mt-8 nfd-text-black">
                    {__("Exclusive YITH plugins and tools to help you sell online", "wp-module-ecommerce")}
                </h2>
                <p className="nfd-leading-5 nfd-w-4/5 nfd-text-[#4A5567]">
                    {__("Our eCommerce bundle includes a comprehensive suite of advanced tools designed to boost the performance of your WooCommerce store. This bundle includes these exclusive YITH plugins:", "wp-module-ecommerce")}
                </p>
                <div className="nfd-flex nfd-flex-wrap nfd-gap-6">
                    <div className="nfd-flex-1">
                        <div className="nfd-flex nfd-flex-wrap nfd-gap-x-10 nfd-mt-3 nfd-pt-0.5 nfd-w-3/4">
                            <ul className="nfd-flex-1 nfd-text-black">
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                    <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Gift Cards", "wp-module-ecommerce")}</span>
                                </li>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                    <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Wishlists", "wp-module-ecommerce")}</span>
                                </li>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                    <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Custom 'My Account' Page", "wp-module-ecommerce")}</span>
                                </li>
                            </ul>
                            <ul className="nfd-flex-1 nfd-text-black">
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                    <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Bookings & Appointments", "wp-module-ecommerce")}</span>
                                </li>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                    <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("AJAX Product Filters", "wp-module-ecommerce")}</span>
                                </li>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                    <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("AJAX Product Search", "wp-module-ecommerce")}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="nfd-flex-none nfd-w-28 nfd-h-24 nfd-self-end">
                        <YithPluginsIcon />
                    </div>
                </div>

                <div className="nfd-h-px nfd-mx-4 nfd-mt-5 nfd-mb--1 nfd-pt-0.5 nfd-bg-[#E2E8F0]">&nbsp;</div>

                <h2 className="nfd-text-lg nfd-font-medium nfd-mt-8 nfd-text-black">
                    {__("Add upsells, cross-sells, and other promotions with WonderCart", "wp-module-ecommerce")}
                </h2>
                <p className="nfd-leading-5 nfd-w-4/5 nfd-text-[#4A5567]">
                    {__("Create and run effective promotional campaigns like BOGOs, free shipping offers, category discounts, and more to increase revenue and strengthen customer engagement.", "wp-module-ecommerce")}
                </p>
                <div className="nfd-flex nfd-flex-wrap nfd-gap-6">
                    <div className="nfd-flex-1">
                        <div className="nfd-flex nfd-flex-wrap nfd-gap-x-10 nfd-mt-3 nfd-pt-0.5 nfd-w-3/4">
                            <ul className="nfd-flex-1 nfd-text-black">
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                    <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Buy One Get One", "wp-module-ecommerce")}</span>
                                </li>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                    <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Cart Promotions", "wp-module-ecommerce")}</span>
                                </li>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                    <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Related Items Discounts", "wp-module-ecommerce")}</span>
                                </li>
                            </ul>
                            <ul className="nfd-flex-1 nfd-text-black">
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                    <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Free Shipping Offers", "wp-module-ecommerce")}</span>
                                </li>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                    <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("Category Discounts", "wp-module-ecommerce")}</span>
                                </li>
                                <li className="nfd-flex">
                                    <CheckMarkIcon className="nfd-mt-0.5 nfd-pt-px nfd-mr-1" />
                                    <span className="nfd-text-black nfd-font-medium nfd-antialiased">{__("and more!", "wp-module-ecommerce")}</span>
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