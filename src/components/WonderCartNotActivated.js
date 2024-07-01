import { Button, Modal } from "@newfold/ui-component-library";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import classNames from "classnames";
import { ReactComponent as BuyOndGetOne } from "../icons/wondercart/buy1get1.svg";
import { ReactComponent as CategoryDiscount } from "../icons/wondercart/category-discount.svg";
import { ReactComponent as FreeShipping } from "../icons/wondercart/free-shipping.svg";
import { ReactComponent as GiftCard } from "../icons/wondercart/gift-card.svg";
import { ReactComponent as LastMinuteDeal } from "../icons/wondercart/last-minute-deal.svg";
import { ReactComponent as ThankYouDiscount } from "../icons/wondercart/thank-you-discount.svg";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { LoadingPanel } from "./LoadingPanel";
import { Section } from "./Section";
import { useInstallWonderCart } from "./useInstallWonderCart";
import { wonderCartPopularCampaignsList } from "../constants";

export function WonderCarNotActivated(props) {
    
    const {wonderCartStatus, wpModules} = props;
    const [isOpen, setIsOpen] = useState(false);
    const canAccessGlobalCTB = NewfoldRuntime.hasCapability("canAccessGlobalCTB");
    const hasYithExtended = NewfoldRuntime.hasCapability("hasYithExtended");
    const isEcommerce = NewfoldRuntime.hasCapability("isEcommerce");
    
    let [installWonderCart, isInstalling] = useInstallWonderCart({ wpModules });
    let showInProgress = isInstalling || wonderCartStatus.data?.isInstalling;

    useEffect(() => {
        (wonderCartStatus.data?.isInstalling && !wonderCartStatus.data.isInstalled) ? setIsOpen(true) : setIsOpen(false)
      }, [wonderCartStatus.data?.isInstalling])
    
    useEffect(() => {
        isInstalling ? setIsOpen(true) : setIsOpen(false)
    }, [isInstalling])

    const handleWonderCart = () => {
        return installWonderCart();
    }
    
    const renderCampaignIcon = (icon) => {
        switch(icon) {
          case 'FreeShipping':
            return <FreeShipping className="nfd-my-0 nfd-mx-auto" />;
          case 'BuyOndGetOne':
            return <BuyOndGetOne className="nfd-my-0 nfd-mx-auto" />;
          case 'GiftCard':
            return <GiftCard className="nfd-my-0 nfd-mx-auto" />;      
          case 'CategoryDiscount':
            return <CategoryDiscount className="nfd-my-0 nfd-mx-auto" />;
          case 'ThankYouDiscount':
            return <ThankYouDiscount className="nfd-my-0 nfd-mx-auto" />  
          case 'LastMinuteDeal':
            return <LastMinuteDeal className="nfd-my-0 nfd-mx-auto" />  
          default:
            return null;
        }
    }   
       
    return(
            <Section.Container>
                <div className="nfd-flex nfd-flex-row nfd-flex-wrap nfd-items-center nfd-mx-8">
                    <Section.Header className="nfd-border nfd-border-[#FFFFFF] nfd-w-10/12 nfd-px-0" 
                    title={__('Create a campaign and boost your sales!', "wp-module-ecommerce")} 
                    subTitle={__("Create custom upsell, cross-sell and other promotional campaigns to generate more sales.", "wp-module-ecommerce")} 
                    />                                        
                    <Button
                    className="nfd-button nfd-button--primary nfd-w-32 nfd-h-8 nfd-py-1 nfd-ml-auto nfd-text-[#FFFFFF]"
                    variant="primary"
                    onClick={handleWonderCart}
                    data-ctb-id={
                              canAccessGlobalCTB && !hasYithExtended
                                ? "f95ccf1e-3028-4ea7-b2c2-847969348e8b"
                                : null
                            }
                    as="a"
                    href=""
                    isLoading={showInProgress}
                    disabled={!(canAccessGlobalCTB && hasYithExtended && isEcommerce )}
                    id="install_activate_wondercart"
                    >
                    <span>
                        {(wonderCartStatus.data.isInstalling && !wonderCartStatus.data.isInstalled)
                        ? __("Installing...", "wp-module-ecommerce")
                        : __("Get Started", "wp-module-ecommerce")}
                    </span>
                    </Button>
                </div>                      
                <Section.Content>                        
                    <p className="nfd-text-[#111729] nfd-text-base nfd-font-semibold nfd-mb-6 nfd--mt-10">
                        {__("Not sure where to start? Try one of these popular promotions:", "wp-module-ecommerce")}
                    </p>
                    <div className={classNames("nfd-grid nfd-gap-6", "sm:nfd-grid-cols-1", "md:nfd-grid-cols-2", "lg:nfd-grid-cols-3")}>  
                        {                            
                            wonderCartPopularCampaignsList.map((campaign) => {

                                return(<div className="nfd-flex nfd-flex-col nfd-border nfd-border nfd-border-[#E5E7EB] nfd-pt-4 nfd-pb-3 nfd-px-6 nfd-rounded-lg nfd-card">            
                                        {renderCampaignIcon(campaign.icon)}            
                                        <h2 className="nfd-font-medium nfd-text-base">{__(`${campaign.title}`, "wp-module-ecommerce")}</h2>
                                        <p className="nfd-text-[#4A5567] nfd-mt-1 nfd-grow">
                                            {__(`${campaign.description}`, "wp-module-ecommerce")}
                                        </p>                            
                                        <Button
                                        className="nfd-button nfd-button--secondary"
                                        variant="secondary"
                                        onClick={handleWonderCart}
                                        data-ctb-id={
                                                canAccessGlobalCTB && !hasYithExtended
                                                    ? "f95ccf1e-3028-4ea7-b2c2-847969348e8b"
                                                    : null
                                                }
                                        as="a"
                                        href=""
                                        isLoading={showInProgress}
                                        disabled={!(canAccessGlobalCTB && hasYithExtended && isEcommerce )}
                                        id={`${campaign.icon}_install_activate_wondercart`}
                                        >
                                        <span>
                                            {(wonderCartStatus.data.isInstalling && !wonderCartStatus.data.isInstalled)
                                            ? __("Installing...", "wp-module-ecommerce")
                                            : __("Create a Campaign", "wp-module-ecommerce")}
                                        </span>
                                        </Button>
                                    </div>)  
                            })
                        }
                    </div>                    
                </Section.Content>
                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="wppbh-app-sidenav-mobile nfd-z-40"
                    initialFocus
                    >
                    <Modal.Panel className="nfd-p-0 nfd-overflow-visible" hasCloseButton={false}>
                        <div className="wppbh-app-sidenav nfd-p-5 nfd-max-h-[70vh] nfd-overflow-y-auto">
                            <LoadingPanel pluginName="WonderCart" />
                        </div>
                    </Modal.Panel>
                </Modal>
            </Section.Container> 
    )
}