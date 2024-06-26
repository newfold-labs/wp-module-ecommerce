import { Button } from "@newfold/ui-component-library";
import { __ } from "@wordpress/i18n";
import { ReactComponent as BuyOndGetOne } from "../icons/wondercart/buy1get1.svg";
import { ReactComponent as CategoryDiscount } from "../icons/wondercart/category-discount.svg";
import { ReactComponent as FreeShipping } from "../icons/wondercart/free-shipping.svg";
import { ReactComponent as GiftCard } from "../icons/wondercart/gift-card.svg";
import { ReactComponent as LastMinuteDeal } from "../icons/wondercart/last-minute-deal.svg";
import { ReactComponent as ThankYouDiscount } from "../icons/wondercart/thank-you-discount.svg";
import { Section } from "./Section";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { useInstallWonderCart } from "./useInstallWonderCart";
import classNames from "classnames";

//let [installWonderCart, isInstalling] = useInstallWonderCart({ wpModules });
// const handleWonderCart = () => {
//     installWonderCart();
// }


const canAccessGlobalCTB = NewfoldRuntime.hasCapability("canAccessGlobalCTB");
const hasYithExtended = NewfoldRuntime.hasCapability("hasYithExtended");


        // <Button
        //   className="nfd-button nfd-button--primary nfd-w-32 nfd-h-8 nfd-py-1 nfd-ml-auto nfd-text-[#FFFFFF]"
        //   variant="secondary"
        //   onClick={() => handleWonderCart() }
        //   as="a"
        //   href={state?.featureUrl}
        //   isLoading={state?.isInstalling && !state?.isActive}
        //   disabled={state?.isDisabled}
        //   id={state?.isInstalling
        //     ? "installing_wondercart"
        //     : state?.isActive
        //       ? "manage_wondercart"
        //       : "enable_wondercart"
        //     }
        // >
        //   <span>
        //     {(state?.isInstalling && !state?.isActive)
        //       ? __("Installing...", "wp-module-ecommerce")
        //       : __("Get Started", "wp-module-ecommerce")}
        //   </span>
        // </Button>
          

export function WonderCarNotActivated(props) {
    
     console.log("WonderCarNotActivated", props)   

    return(
            <Section.Container>
                <div className="nfd-flex nfd-flex-row nfd-flex-wrap nfd-items-center nfd-mx-8">
                    <Section.Header className="nfd-border nfd-border-[#FFFFFF] nfd-w-10/12 nfd-px-0" 
                    title={__('Create a campaign and boost your sales!', "wp-module-ecommerce")} 
                    subTitle={__("Create custom upsell, cross-sell and other promotional campaigns to generate more sales.", "wp-module-ecommerce")} 
                    />                                        
                    <Button
                        as="a"
                        className="nfd-button nfd-button--primary nfd-w-32 nfd-h-8 nfd-py-1 nfd-ml-auto nfd-text-[#FFFFFF]"
                        variant="upsell"
                        target="_blank"
                        rel="noopener"
                        id="install-wondercart"
                    >
                        {__("Get Started", "wp-module-ecommerce")}
                    </Button>
                </div>                      
                <Section.Content>    
                    
                    <p className="nfd-text-[#111729] nfd-text-base nfd-font-semibold nfd-mb-6 nfd--mt-10">{__("Not sure where to start? Try one of these popular promotions:", "wp-module-ecommerce")}</p>
                    <div className={classNames(
                                                    "nfd-grid nfd-gap-6",
                                                    "sm:nfd-grid-cols-1",
                                                    "md:nfd-grid-cols-2",
                                                    "lg:nfd-grid-cols-3"
                                                )}>

{/* className="nfd-flex nfd-flex-row nfd-flex-wrap nfd-gap-6" */}
                        
                        <div className="nfd-flex nfd-flex-col nfd-border nfd-border nfd-border-[#E5E7EB] nfd-pt-4 nfd-pb-3 nfd-px-6 nfd-rounded-lg nfd-card">
                            <FreeShipping className="nfd-my-0 nfd-mx-auto" />
                            <h2 className="nfd-font-medium nfd-text-base">{__("Free Shipping", "wp-module-ecommerce")}</h2>
                            <p className="nfd-text-[#4A5567] nfd-mt-1 nfd-grow">
                                {__("Attract and retain customers by offering free shipping based on cart amount, location or store category.", "wp-module-ecommerce")}
                            </p>
                            <button type="button" id="freeshipping"  className="nfd-button nfd-button--secondary">
                                {__("Create a Campaign", "wp-module-ecommerce")}
                            </button>                            
                        </div>                                     
                        <div className="nfd-flex nfd-flex-col nfd-border nfd-border nfd-border-[#E5E7EB] nfd-pt-4 nfd-pb-3 nfd-px-6 nfd-rounded-lg nfd-card">
                            <BuyOndGetOne className="nfd-my-0 nfd-mx-auto" />
                            <h2 className="nfd-font-medium nfd-text-base">{__("Buy 1 Get 1", "wp-module-ecommerce")}</h2>
                            <p className="nfd-text-[#4A5567] nfd-mt-1 nfd-grow">
                                {__("Attract customers with a compelling deal where they can buy one product and get another product for free.", "wp-module-ecommerce")}
                            </p>
                            <button type="button" id="bogo"  className="nfd-button nfd-button--secondary">
                                {__("Create a Campaign", "wp-module-ecommerce")}
                            </button>                            
                        </div>   
                        <div className="nfd-flex nfd-flex-col nfd-border nfd-border nfd-border-[#E5E7EB] nfd-pt-4 nfd-pb-3 nfd-px-6 nfd-rounded-lg nfd-card">
                            <GiftCard className="nfd-my-0 nfd-mx-auto" />
                            <h2 className="nfd-font-medium nfd-text-base">{__("Gift Product in Cart", "wp-module-ecommerce")}</h2>
                            <p className="nfd-text-[#4A5567] nfd-mt-1 nfd-grow">
                                {__("Reward customers with a free gift in their cart based on total cart value, or specific products or categories.", "wp-module-ecommerce")}
                            </p>
                            <button type="button" id="giftcard"  className="nfd-button nfd-button--secondary">
                                {__("Create a Campaign", "wp-module-ecommerce")}
                            </button>                            
                        </div>

                        <div className="nfd-flex nfd-flex-col nfd-border nfd-border nfd-border-[#E5E7EB] nfd-pt-4 nfd-pb-3 nfd-px-6 nfd-rounded-lg nfd-card">
                            <CategoryDiscount className="nfd-my-0 nfd-mx-auto" />
                            <h2 className="nfd-font-medium nfd-text-base">{__("Category Discount", "wp-module-ecommerce")}</h2>
                            <p className="nfd-text-[#4A5567] nfd-mt-1 nfd-grow">
                                {__("Give your customers a discount on specific categories of products and boost sales for those categories.", "wp-module-ecommerce")}
                            </p>
                            <button type="button" id="categorydiscount"  className="nfd-button nfd-button--secondary">
                                {__("Create a Campaign", "wp-module-ecommerce")}
                            </button>                            
                        </div>
                        <div className="nfd-flex nfd-flex-col nfd-border nfd-border nfd-border-[#E5E7EB] nfd-max-w-[370px] nfd-pt-4 nfd-pb-3 nfd-px-6 nfd-rounded-lg nfd-card">
                            <ThankYouDiscount className="nfd-my-0 nfd-mx-auto" />
                            <h2 className="nfd-font-medium nfd-text-base">{__("Upsell in Thank You Page", "wp-module-ecommerce")}</h2>
                            <p className="nfd-text-[#4A5567] nfd-mt-1 nfd-grow">
                                {__("Maximize sales by presenting relevant upsell options after customers have completed their purchase.", "wp-module-ecommerce")}
                            </p>
                            <button type="button" id="thankyoudiscount"  className="nfd-button nfd-button--secondary nfd-mb-auto">
                                {__("Create a Campaign", "wp-module-ecommerce")}
                            </button>                            
                        </div>
                        <div className="nfd-flex nfd-flex-col nfd-border nfd-border nfd-border-[#E5E7EB] nfd-max-w-[370px] nfd-pt-4 nfd-pb-3 nfd-px-6 nfd-rounded-lg nfd-card">
                            <LastMinuteDeal className="nfd-my-0 nfd-mx-auto" />
                            <h2 className="nfd-font-medium nfd-text-base">{__("Last Minute Deal", "wp-module-ecommerce")}</h2>
                            <p className="nfd-text-[#4A5567] nfd-mt-1 nfd-grow">
                                {__("Create urgency with a special time-limited deal for customers on the cart and checkout pages.", "wp-module-ecommerce")}
                            </p>
                            <button type="button" id="lastminutedeal"  className="nfd-button nfd-button--secondary">
                                {__("Create a Campaign", "wp-module-ecommerce")}
                            </button>                            
                        </div>
                    </div>                    

                </Section.Content>
            </Section.Container> 
    )
}