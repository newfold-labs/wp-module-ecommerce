import { __ } from "@wordpress/i18n";
import { ReactComponent as CheckMarkIcon } from "../icons/check.svg";
import { ReactComponent as WonderCartIcon } from "../icons/wondercart.svg";

export function WonderCartCampaignDetails(){

    return(
        <>
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
        </>
    )

}