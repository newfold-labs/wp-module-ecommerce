import { Button } from "@newfold/ui-component-library";
import { __ } from "@wordpress/i18n";
import { ReactComponent as LockIcon } from "../icons/lockicon.svg";
import { ReactComponent as TransformStore } from "../icons/transform-store.svg";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { Section } from "./Section";
import { WonderCartCampaignDetails } from "./WonderCartCampaignDetails";
import { YithPluginDetails } from "./YithPluginDetails";

export function WonderCartNonEcommerce() {    
    return(
            <Section.Container>
                <Section.Header title={__('Sales & Promotions', "wp-module-ecommerce")} subTitle={__("Create custom upsell, cross-sell and other promotional campaigns to generate more sales.", "wp-module-ecommerce")} />                    
                <Section.Content>    
                <div className={"nfd-app-section-container nfd-bg-white nfd-w-full nfd-rounded-lg " + (!(NewfoldRuntime.isWoo) ? 'nfd--mt-12' : '')} id="nonecommerce-features-wrapper">        
                    <div className="nfd-app-section-content nfd-border nfd-rounded-lg nfd-px-8 nfd-pt-0 nfd-pb-8 nfd--mt-2 nfd-items-start nfd-border-[#E2E8F0]">
                        <div className="nfd-flex md:nfd-flex-row nfd-flex-col nfd-gap-x-10">
                            <div className="nfd-flex-none nfd-mt-8 nfd-w-40">
                                <TransformStore />
                            </div>
                            <div>

                                <div class="nfd-flex nfd-flex-col nfd-mt-5 nfd-pt-0.5">
                                <h1 className="nfd-text-2xl nfd-leading-9 nfd-font-medium nfd-text-[#111729]">
                                    {__("Start selling like a Pro!", "wp-module-ecommerce")}
                                </h1>
                                    <p className="nfd-leading-5 nfd-text-[#4A5567]">
                                    {__("Give your online store a boost with our all-in-one eCommerce bundle filled with exclusive plugins and tools designed to help you sell your products and services like never before. ", "wp-module-ecommerce")}
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
                        
                        <WonderCartCampaignDetails />

                        <div className="nfd-h-px nfd-mx-4 nfd-mt-5 nfd-mb--1 nfd-pt-0.5 nfd-bg-[#E2E8F0]">&nbsp;</div>

                        <YithPluginDetails />

                    </div>
                </div>
                </Section.Content>
            </Section.Container> 
    )
}
