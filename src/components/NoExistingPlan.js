import { Button } from "@newfold/ui-component-library";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Section } from "./Section";
import { ReactComponent as GreenTick } from "../icons/green-tick.svg";


export function NoExistingPlan(){
    return(   
        <Section.Container className="nfd-container">
            <Section.Header 
                title={__("Upgrade your plan for success.", "wp-module-ecommerce")} 
                subTitle={__("Choose the set of plugins and services that’s right for your needs. You're covered by our no-quibble, 30 day money back guarantee.", "wp-module-ecommerce")}                 
            />
            <Section.Content className="nfd-app-section-home">     
                
                <div className="nfd-border nfd-border-[#E2E8F0] nfd-p-6 nfd-rounded-lg nfd-mb-6">
                    <h2 className="nfd-text-[#0F172A] nfd-text-lg nfd-font-semibold nfd-mb-5">
                        {__("CONTENT CREATOR", "wp-module-ecommerce")}
                    </h2>
                    <div>
                        <p className="nfd-text-[#0F172A] nfd-text-base nfd-mb-7">
                            {__("Manage your site, build your brand, and monetize your content with essential tools.", "wp-module-ecommerce")}
                        </p>
                    </div>
                    <div  className="nfd-flex nfd-flex-row">
                        <ul className="nfd-mr-6">
                            <li className="nfd-flex nfd-flex-row nfd-items-center nfd-border-b nfd-border-[#cccccc] nfd-mb-3 nfd-pb-3">
                                <GreenTick className="nfd-mt-1.5 nfd-mr-2" />
                                <span className="nfd-text-[#404040] nfd-text-base">
                                    {__("Monetize Content with Ease", "wp-module-ecommerce")}
                                </span>
                            </li>
                            <li className="nfd-flex nfd-flex-row nfd-items-center">
                                <GreenTick className="nfd-mt-1.5 nfd-mr-2" />
                                <span className="nfd-text-[#404040] nfd-text-base">
                                    {__("6 Exclusive Marketing Plugins", "wp-module-ecommerce")}
                                </span>
                            </li>
                        </ul>
                        <ul className="nfd-mr-16">
                            <li className="nfd-flex nfd-flex-row nfd-items-center nfd-border-b nfd-border-[#cccccc] nfd-mb-3 nfd-pb-3">
                                <GreenTick className="nfd-mt-1.5 nfd-mr-2" />
                                <span className="nfd-text-[#404040] nfd-text-base">
                                    {__("4 Exclusive Social Media Plugins", "wp-module-ecommerce")}
                                </span>
                            </li>
                            <li className="nfd-flex nfd-flex-row nfd-items-center">
                                <GreenTick className="nfd-mt-1.5 nfd-mr-2" />
                                <span className="nfd-text-[#404040] nfd-text-base">
                                    {__("Secure Payment Gateway Included", "wp-module-ecommerce")}
                                </span>
                            </li>
                        </ul>
                        <Button as="a" href="" className="nfd-button nfd-button--secondary nfd-self-end nfd-ml-auto">
                            {__("Learn more", "wp-module-ecommerce")}
                        </Button>     
                    </div>
                </div>

                <div className="nfd-border nfd-border-[#E2E8F0] nfd-p-6 nfd-rounded-lg nfd-mb-6">
                    <h2 className="nfd-text-[#0F172A] nfd-text-lg nfd-font-semibold nfd-mb-5">
                        {__("SERVICE BUSINESS", "wp-module-ecommerce")}
                    </h2>
                    <div>
                        <p className="nfd-text-[#0F172A] nfd-text-base nfd-mb-7">
                            {__("Boost local visibility and streamline your business operations with specialized tools.", "wp-module-ecommerce")}
                        </p>

                    </div>
                    
                    <div className="nfd-flex nfd-flex-row">
                        <ul className="nfd-mr-6">
                            <li className="nfd-flex nfd-flex-row nfd-items-center nfd-border-b nfd-border-[#cccccc] nfd-mb-3 nfd-pb-3">
                                <GreenTick className="nfd-mt-1.5 nfd-mr-2" />
                                <span className="nfd-text-[#404040] nfd-text-base">
                                    {__("Includes the Content Creator bundle", "wp-module-ecommerce")}
                                </span>
                            </li>
                            <li className="nfd-flex nfd-flex-row nfd-items-center">
                                <GreenTick className="nfd-mt-1.5 nfd-mr-2" />
                                <span className="nfd-text-[#404040] nfd-text-base">
                                    {__("Integrated Invoicing", "wp-module-ecommerce")}
                                </span>
                            </li>
                        </ul>
                        <ul className="nfd-mr-16">
                            <li className="nfd-flex nfd-flex-row nfd-items-center nfd-border-b nfd-border-[#cccccc] nfd-mb-3 nfd-pb-3">
                                <GreenTick className="nfd-mt-1.5 nfd-mr-2" />
                                <span className="nfd-text-[#404040] nfd-text-base">
                                    {__("8 Exclusive Local Business Plugins", "wp-module-ecommerce")}
                                </span>
                            </li>
                            <li className="nfd-flex nfd-flex-row nfd-items-center">
                                <GreenTick className="nfd-mt-1.5 nfd-mr-2" />
                                <span className="nfd-text-[#404040] nfd-text-base">
                                    {__("Local Social Media and SEO Plugins", "wp-module-ecommerce")}
                                </span>
                            </li>
                        </ul>
                        <Button as="a" href="" className="nfd-button nfd-button--secondary nfd-self-end nfd-ml-auto">
                            {__("Learn more", "wp-module-ecommerce")}
                        </Button>     
                    </div>

                </div>

                <div className="nfd-border nfd-border-[#E2E8F0] nfd-p-6 nfd-rounded-lg">
                    <h2 className="nfd-text-[#0F172A] nfd-text-lg nfd-font-semibold nfd-mb-5">
                        {__("COMMERCE", "wp-module-ecommerce")}
                    </h2>
                    <div>
                        <p className="nfd-text-[#0F172A] nfd-text-base nfd-mb-7">
                            {__("Manage your site, build your brand, and monetize your content with essential tools.", "wp-module-ecommerce")}
                        </p>

                    </div>
                    <div className="nfd-flex nfd-flex-row">
                        <ul className="nfd-mr-6">
                            <li className="nfd-flex nfd-flex-row nfd-items-center nfd-border-b nfd-border-[#cccccc] nfd-mb-3 nfd-pb-3">
                                <GreenTick className="nfd-mt-1.5 nfd-mr-2" />
                                <span className="nfd-text-[#404040] nfd-text-base">
                                    {__("Includes the Service Business bundle", "wp-module-ecommerce")}
                                </span>
                            </li>
                            <li className="nfd-flex nfd-flex-row nfd-items-center">
                                <GreenTick className="nfd-mt-1.5 nfd-mr-2" />
                                <span className="nfd-text-[#404040] nfd-text-base">
                                    {__("24 Exclusive eCommerce Plugins", "wp-module-ecommerce")}
                                </span>
                            </li>
                        </ul>
                        <ul className="nfd-mr-16">
                            <li className="nfd-flex nfd-flex-row nfd-items-center nfd-border-b nfd-border-[#cccccc] nfd-mb-3 nfd-pb-3">
                                <GreenTick className="nfd-mt-1.5 nfd-mr-2" />
                                <span className="nfd-text-[#404040] nfd-text-base">
                                    {__("Express 1-Click Checkout", "wp-module-ecommerce")}
                                </span>
                            </li>
                            <li className="nfd-flex nfd-flex-row nfd-items-center">
                                <GreenTick className="nfd-mt-1.5 nfd-mr-2" />
                                <span className="nfd-text-[#404040] nfd-text-base">
                                    {__("Customizable Customer Account Creation", "wp-module-ecommerce")}
                                </span>
                            </li>
                        </ul>
                        <Button as="a" href="" className="nfd-button nfd-button--secondary nfd-self-end nfd-ml-auto">
                            {__("Learn more", "wp-module-ecommerce")}
                        </Button>     
                    </div>
                </div>

            </Section.Content>
        </Section.Container>
    )    
}