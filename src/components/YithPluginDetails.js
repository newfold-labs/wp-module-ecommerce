import { __ } from "@wordpress/i18n";
import { ReactComponent as CheckMarkIcon } from "../icons/check.svg";
import { ReactComponent as YithPluginsIcon } from "../icons/yithplugins.svg";

export function YithPluginDetails(){
    return(
        <>
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
        </>
    )
}